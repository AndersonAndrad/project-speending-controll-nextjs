import { ReactNode, createContext, useContext, useState } from 'react'

type EditModalProvider = {
  children: ReactNode
}

type EditModalContext = {
  isOpen: boolean
  handleOpenEditModal: () => void
  handleCloseEditModal: () => void
}

const EditModalContext = createContext<EditModalContext>( {} as EditModalContext )

export function EditModalProvider ( { children }: EditModalProvider ) {
  const [isOpen, setIsOpen] = useState( false )

  function handleOpenEditModal () {
    setIsOpen( true )
  }

  function handleCloseEditModal () {
    setIsOpen( false )
  }

  return (
    <EditModalContext.Provider value={{ isOpen, handleOpenEditModal, handleCloseEditModal }}>
      {children}
    </EditModalContext.Provider>
  )
}

export function useEditModal () {
  return useContext( EditModalContext )
}