'use server'

import { createClient } from '@/app/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function addFeedback(postId: number, content: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return redirect('/login')
  }

  if (!content.trim()) {
    // Optionally return an error state
    return
  }

  const { error } = await supabase.from('feedback').insert({
    post_id: postId,
    user_id: user.id,
    content: content,
  })

  if (error) {
    console.error('Error adding feedback:', error)
    // Optionally return an error state
    return
  }

  // Revalidate the post page to show the new feedback
  revalidatePath(`/post/${postId}`)
}
