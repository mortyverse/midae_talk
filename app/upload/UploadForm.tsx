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
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
    >
      {pending ? '업로드 중...' : '업로드'}
    </button>
  )
}

export default function UploadForm() {
  const [state, formAction] = useActionState(uploadArtwork, initialState)

  return (
    <form action={formAction} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          작품 제목
        </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          작품 설명
        </label>
        <textarea
          name="description"
          id="description"
          rows={4}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
        ></textarea>
      </div>
      <div>
        <label htmlFor="artwork" className="block text-sm font-medium text-gray-700">
          이미지 파일
        </label>
        <input
          type="file"
          name="artwork"
          id="artwork"
          required
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>
      <div>
        <SubmitButton />
      </div>
      {state?.error && (
        <p className="text-sm text-red-600 text-center">{state.error}</p>
      )}
    </form>
  )
}
