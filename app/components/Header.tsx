import { createClient } from '@/app/utils/supabase/server'
import Link from 'next/link'
import { logout } from '@/app/auth/actions'

export default async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null;
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    profile = data
  }

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          미대톡
        </Link>
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              {profile?.role === '학생' && (
                <Link href="/upload" className="px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
                  작품 업로드
                </Link>
              )}
              <span className="text-gray-700">안녕하세요, {user.email} 님</span>
              <form action={logout}>
                <button className="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                  로그아웃
                </button>
              </form>
            </div>
          ) : (
            <div className="space-x-4">
              <Link href="/login" className="px-4 py-2 font-medium text-indigo-600 rounded-md hover:bg-gray-100">
                로그인
              </Link>
              <Link href="/signup" className="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                회원가입
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
