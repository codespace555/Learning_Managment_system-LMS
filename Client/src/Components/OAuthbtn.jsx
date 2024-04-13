import React from 'react'

function oAuthbtn({oauth,icon,singupWithoauth}) {
  return (
    <div>
    <button
      className="w-full mt-5 bg-gray-700 hover:bg-gray-600 flex p-3 items-center gap-2 justify-center rounded-lg dark:text-gray-200"
      onClick={singupWithoauth}
    >
      {icon} {oauth}
    </button>
  </div>
  )
}

export default oAuthbtn
