import React from 'react'
import CommandBarShortcutHint from '../ui/CommandBar/CommandBarShortcutHint'

export default function Header() {
  return (
    <header className='fixed z-30 top-6 left-0 w-full'>
        <div className='shadow-neon bg-black py-2 px-6 border border-white/40 max-w-sm mx-auto rounded-3xl flex items-center justify-between cursor-pointer opacity-50 transition-all hover:opacity-100'>
            <p className='text-lg'>Search Anywhere</p>
            <CommandBarShortcutHint />
        </div>
    </header>
  )
}
