import React from 'react'

function Select() {
  return (
    <div>
         {label && (
        <label htmlFor={id} className="">
          {label}
        </label>
      )}
      
    </div>
  )
}

export default Select
