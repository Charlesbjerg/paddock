"use client";
import React, {useState, useCallback, useEffect} from 'react'
import { useRouter } from 'next/navigation';
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
import commandCache from "@/lib/cache.json";  
import { ClipboardIcon } from '@radix-ui/react-icons';
import CircuitIcon from "@/components/icons/Circuit";
import HelmetIcon from '@/components/icons/Helmet';
import TeamIcon from '@/components/icons/Team';
import FlagIcon from '@/components/icons/Flag';

type CommandBarPage = {
  closeCommand: (command: () => unknown) => void
  changePageCommand?: (page: string) => void
}

const pages = {
  SEASONS: 'seasons',
  CIRCUITS: 'circuits',
  DRIVERS: 'drivers',
  CONSTRUCTORS: 'constructors',
  RACES: 'races',
}

export function CommandBar() {
    const [open, setOpen] = useState(false)
    const [activePage, setActivePage] = useState('')
    const [search, setSearch] = useState('')

    const router = useRouter();

    const runCommand = useCallback((command: () => unknown) => {
      setOpen(false)
      setSearch('');
      setActivePage('');
      command()
    }, [])

    const changePageCommand = useCallback((page: string) => {
      setSearch('')
      setActivePage(page)
    }, []);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
      // Open/close the command bar
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
      // Go back a page
      if (search === '' && activePage !== '' && e.key === "Backspace" && open) {
        setActivePage('')
      }
    },[activePage, open, search]);

    useEffect(() => {
      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }, [activePage, open, search])
  
    return (
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput className='text-sans' placeholder={activePage === "" ? "Type a command or search..." : "Press backspace to go back"} value={search} onValueChange={value => setSearch(value)} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {activePage === '' && <Home closeCommand={runCommand} changePageCommand={changePageCommand} />}
          {activePage === pages.DRIVERS && <Drivers closeCommand={runCommand} />}
          {activePage === pages.CONSTRUCTORS && <Constructors closeCommand={runCommand} />}
          {activePage === pages.RACES && <Races closeCommand={runCommand} />}
          {activePage === pages.SEASONS && <Seasons closeCommand={runCommand} />}
        </CommandList>
      </CommandDialog>
    )
  }
 
function Home({ closeCommand, changePageCommand }: CommandBarPage) {

  if (!changePageCommand) {
    throw new Error('changePageCommand is required for Home');
  }

  const router = useRouter();
  return (
    <CommandGroup heading="Select a section to search deeper">
            <CommandItem onSelect={() => {
              closeCommand(() => {
                router.push('/circuits')
              });
            }}>
              <CircuitIcon className="mr-2" />
              Circuits
            </CommandItem>
            <CommandItem onSelect={() => changePageCommand(pages.DRIVERS)}>
              <HelmetIcon className="mr-2" /> 
              Drivers
            </CommandItem>
            <CommandItem onSelect={() => changePageCommand(pages.CONSTRUCTORS)}>
              <TeamIcon className="mr-2" />
              Constructors
            </CommandItem>
            <CommandItem onSelect={() => changePageCommand(pages.RACES)}>
              <FlagIcon className="mr-2" />
              Races
            </CommandItem>
            <CommandItem onSelect={() => changePageCommand(pages.SEASONS)}>
              <ClipboardIcon className='mr-2' />
              Seasons
            </CommandItem>
          </CommandGroup>
  )
}

function Seasons({ closeCommand }: { closeCommand: (command: () => unknown) => void}) {

  const router = useRouter();

  return (
    <CommandGroup heading="Seasons">
      {commandCache.seasons.map((season) => (
        <CommandItem key={season} onSelect={() => {
            closeCommand(() => {
              router.push(`/seasons/${season}`)
            });
          }}>
            {season}
        </CommandItem>
      ))}
    </CommandGroup>
  )
}

function Drivers({ closeCommand }: { closeCommand: (command: () => unknown) => void}) {
  const router = useRouter();

  return (
    <CommandGroup heading="Drivers">
      <CommandItem onSelect={() => closeCommand(() => {
        router.push('/drivers')
      })}>
        <ClipboardIcon className='mr-2' />
        An driver
      </CommandItem>
    </CommandGroup>
  );

}

function Constructors({ closeCommand }: { closeCommand: (command: () => unknown) => void}) {
  const router = useRouter();

  return (
    <CommandGroup heading="Constructors">
      <CommandItem onSelect={() => closeCommand(() => {
        router.push('/constructors')
      })}>
        <ClipboardIcon className='mr-2' />
        An Constructor
      </CommandItem>
    </CommandGroup>
  );
}

function Races({ closeCommand }: { closeCommand: (command: () => unknown) => void}) {
  const router = useRouter();

  return (
    <CommandGroup heading="Races">
      <CommandItem onSelect={() => closeCommand(() => {
        router.push('/races')
      })}>
        <ClipboardIcon className='mr-2' />
        An race
      </CommandItem>
    </CommandGroup>
  );
}