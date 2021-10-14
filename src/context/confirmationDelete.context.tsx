import { createContext, useContext, useState } from "react"

type ConfirmationDeleteModalProps = {
  children: React.ReactNode
}

type ConfirmationDeleteModalContextType = {
  isOpen: boolean
  handleOpenConfirmationDeleteModal: () => void
  handleCloseConfirmationDeleteModal: () => void
}

const ConfirmationDeleteModal = createContext<ConfirmationDeleteModalContextType>( {} as ConfirmationDeleteModalContextType )

export function ConfirmationDeleteModalProvider ( { children }: ConfirmationDeleteModalProps ) {
  const [isOpen, setIsOpen] = useState( false )

  function handleOpenConfirmationDeleteModal () {
    setIsOpen( true )
  }

  function handleCloseConfirmationDeleteModal () {
    setIsOpen( false )
  }

  return (
    <ConfirmationDeleteModal.Provider value={{ isOpen, handleOpenConfirmationDeleteModal, handleCloseConfirmationDeleteModal }}>
      {children}
    </ConfirmationDeleteModal.Provider>
  )
}

export function useConfirmationDeleteModal () {
  const context = useContext( ConfirmationDeleteModal )
  return context
}