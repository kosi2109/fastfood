import React from 'react'
import { ClipLoader } from 'react-spinners'

export default function FormButton({loading, text} : {loading : boolean , text : string | number}) {
  return (
    <button className="my-5 bg-bgGreen w-full flex items-center justify-center h-10 rounded-md text-textWhite font-bold hover:bg-textGreen">
        {loading ? <ClipLoader size={20} color="#ffffff" /> : text}
    </button>
  )
}
