import React from 'react'

export const Header = ({ title }) => {
  return (
    <header className='flex h-[32px] blue-bg items-center bg-[#4299E1] px-[10px] flex-none'>
      <span className='text-center text-base font-semibold'>{title}</span>
    </header>
  )
}
