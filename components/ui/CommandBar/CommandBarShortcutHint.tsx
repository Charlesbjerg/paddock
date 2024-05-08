import React from 'react'

export default function CommandBarShortcutHint() {
  return (
    <span className='bg-zinc-900 py-1 px-2 rounded-xl'>
        <kbd className='text-sm text-gray-400'>⌘</kbd>
        <span className='text-sm text-gray-400'> + </span>
        <kbd className='text-sm text-gray-400'>K</kbd>
    </span>
  )
}
