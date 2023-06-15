import React from 'react'
import Style from './HeaderBG.module.css'
export default function HeaderBG({titel}) {
  return (
    <>
        <div className={`${Style.header} d-flex justify-content-center align-items-center text-center`}>
            <div>
            <span className='text-uppercase'>
                HOME {titel}
            </span>    
            <h2 className='text-black text-uppercase'>
               {titel}
            </h2>
            </div>
        </div>
    </>
  )
}
