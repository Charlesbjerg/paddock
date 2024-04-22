"use client";
import React from 'react'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandDialog,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import { useRouter } from 'next/navigation';
  
  export function CommandBar() {
    const [open, setOpen] = React.useState(false)
  
    const router = useRouter();

    const runCommand = React.useCallback((command: () => unknown) => {
      setOpen(false)
      command()
    }, [])

    React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          setOpen((open) => !open)
        }
      }
      document.addEventListener("keydown", down)
      return () => document.removeEventListener("keydown", down)
    }, [])
  
    return (
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput className='text-sans' placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => {
              runCommand(() => {
                router.push('/circuits')
              });
            }}>Circuits</CommandItem>
            <CommandItem onSelect={() => {
              runCommand(() => {
                router.push('/drivers')
              });
            }}>Drivers</CommandItem>
            <CommandItem>Constructors</CommandItem>
            <CommandItem>Races</CommandItem>
            <CommandItem>Seasons</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    )
  }
  
  