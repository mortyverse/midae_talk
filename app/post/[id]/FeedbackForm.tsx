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
      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
    >
      {pending ? '등록 중...' : '피드백 등록'}
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
    <form ref={formRef} action={handleFormAction} className="mt-6">
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
        <div className="px-4 py-2 bg-white rounded-t-lg">
          <label htmlFor="content" className="sr-only">Your feedback</label>
          <textarea
            id="content"
            name="content"
            rows={4}
            className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0"
            placeholder="피드백을 작성해주세요..."
            required
          ></textarea>
        </div>
        <div className="flex items-center justify-end px-3 py-2 border-t">
          <SubmitButton />
        </div>
      </div>
    </form>
  )
}
