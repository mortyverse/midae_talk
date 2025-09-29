'use client'

import { useActionState, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { addFeedback } from './actions'

type FeedbackFormProps = {
  postId: number
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
    >
      {pending ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          등록 중...
        </>
      ) : (
        <>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          피드백 등록
        </>
      )}
    </button>
  )
}

export default function FeedbackForm({ postId }: FeedbackFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  
  const handleFormAction = async (formData: FormData) => {
    const content = formData.get('content') as string;
    await addFeedback(postId, content);
    formRef.current?.reset();
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 mb-8">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-900">피드백 작성</h3>
      </div>
      
      <form ref={formRef} action={handleFormAction} className="space-y-4">
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <textarea
            id="content"
            name="content"
            rows={4}
            className="w-full px-4 py-3 text-slate-900 bg-white border-0 focus:ring-0 resize-none placeholder-slate-400"
            placeholder="작품에 대한 건설적인 피드백을 작성해주세요..."
            required
          ></textarea>
        </div>
        
        <div className="flex justify-end">
          <SubmitButton />
        </div>
      </form>
    </div>
  )
}
