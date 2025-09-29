'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { uploadArtwork, FormState } from './actions'

const initialState: FormState = {
  error: null,
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
    >
      {pending ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          업로드 중...
        </>
      ) : (
        <>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          작품 업로드
        </>
      )}
    </button>
  )
}

export default function UploadForm() {
  const [state, formAction] = useActionState(uploadArtwork, initialState)

  return (
    <div className="p-8">
      <form action={formAction} className="space-y-8">
        {/* Title Field */}
        <div className="space-y-3">
          <label htmlFor="title" className="block text-sm font-semibold text-slate-900 flex items-center">
            <svg className="w-4 h-4 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            작품 제목
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            className="w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 placeholder-slate-400 transition-colors duration-200"
            placeholder="작품의 제목을 입력해주세요"
          />
        </div>

        {/* Description Field */}
        <div className="space-y-3">
          <label htmlFor="description" className="block text-sm font-semibold text-slate-900 flex items-center">
            <svg className="w-4 h-4 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            작품 설명
          </label>
          <textarea
            name="description"
            id="description"
            rows={6}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 placeholder-slate-400 resize-none transition-colors duration-200"
            placeholder="작품에 대한 설명을 자유롭게 작성해주세요 (선택사항)"
          ></textarea>
        </div>

        {/* File Upload Field */}
        <div className="space-y-3">
          <label htmlFor="artwork" className="block text-sm font-semibold text-slate-900 flex items-center">
            <svg className="w-4 h-4 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            이미지 파일
          </label>
          <div className="relative">
            <input
              type="file"
              name="artwork"
              id="artwork"
              required
              accept="image/*"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-colors duration-200"
            />
          </div>
          <p className="text-sm text-slate-500">
            JPG, PNG, GIF 형식의 이미지 파일을 업로드해주세요 (최대 10MB)
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <SubmitButton />
        </div>

        {/* Error Message */}
        {state?.error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-red-700 font-medium">{state.error}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
