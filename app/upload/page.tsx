import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'
import UploadForm from './UploadForm' // Client component to be created

export default async function UploadPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== '학생') {
    // Or show an unauthorized message
    return redirect('/')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">작품 업로드</h1>
      <UploadForm />
    </div>
  )
}
