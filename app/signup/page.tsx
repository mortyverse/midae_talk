'use client'

import { signup } from '@/app/auth/actions'
import Link from 'next/link'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            회원가입
          </h1>
          <p className="mt-2 text-slate-600">
            미대톡 커뮤니티에 참여해보세요
          </p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                이름
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 placeholder-slate-400 transition-colors duration-200"
                placeholder="이름을 입력해주세요"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 placeholder-slate-400 transition-colors duration-200"
                placeholder="이메일을 입력해주세요"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-900 mb-2">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 placeholder-slate-400 transition-colors duration-200"
                placeholder="비밀번호를 입력해주세요"
              />
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-semibold text-slate-900 mb-2">
                역할
              </label>
              <select
                id="role"
                name="role"
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 transition-colors duration-200"
              >
                <option value="">역할을 선택해주세요</option>
                <option value="학생">학생 - 작품을 업로드하고 피드백을 받습니다</option>
                <option value="멘토">멘토 - 작품에 피드백을 제공합니다</option>
              </select>
            </div>
            
            <div>
              <button
                formAction={signup}
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                회원가입
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              이미 계정이 있으신가요?{' '}
              <Link href="/login" className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors duration-200">
                로그인
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
