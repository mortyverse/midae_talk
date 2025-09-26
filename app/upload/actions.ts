'use server'

import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function uploadArtwork(formData: FormData) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return redirect('/login')
  }

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const artworkFile = formData.get('artwork') as File

  if (!artworkFile || artworkFile.size === 0) {
    // Handle error: no file provided
    return { error: '이미지 파일을 선택해주세요.' }
  }

  // Create a unique file path
  const filePath = `${user.id}/${Date.now()}-${artworkFile.name}`

  // 1. Upload image to storage
  const { error: uploadError } = await supabase.storage
    .from('artworks')
    .upload(filePath, artworkFile)

  if (uploadError) {
    console.error('Storage upload error:', uploadError)
    return { error: '이미지 업로드에 실패했습니다.' }
  }

  // 2. Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('artworks')
    .getPublicUrl(filePath)

  // 3. Insert post into database
  const { error: insertError } = await supabase.from('posts').insert({
    user_id: user.id,
    title,
    description,
    image_url: publicUrl,
  })

  if (insertError) {
    console.error('Database insert error:', insertError)
    // Optionally, try to delete the uploaded file if the DB insert fails
    await supabase.storage.from('artworks').remove([filePath])
    return { error: '게시물 생성에 실패했습니다.' }
  }

  // Redirect to home page to see the new post
  redirect('/')
}
