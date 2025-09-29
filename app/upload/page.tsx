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
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
          작품 업로드
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          새로운 작품을 업로드하고 다른 사람들의 피드백을 받아보세요
        </p>
      </div>
      
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <UploadForm />
      </div>
    </div>
  )
}
