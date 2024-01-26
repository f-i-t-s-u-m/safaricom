'use cliet'

import {useFormStatus} from "react-dom"

export function SubmitButton() {
    const {pending} = useFormStatus()

    return (
        <button
        type="submit"
        disabled={pending}
        className="w-full px-4 py-3 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700"
      >
        {pending ? 'loging' : 'Sign In'}
      </button>
    )
}

