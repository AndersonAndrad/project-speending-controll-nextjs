import { createContext, useContext, useState } from "react"

type TransactionModalProps = {
  children: React.ReactNode
}

type TransactionModalContextType = {
  isOpen: boolean
  isOpenEditModal: boolean
  handleOpenNewTransactionModal: () => void
  handleCloseNewTransactionModal: () => void
  handleOpenEditTransactionModal: () => void
  handleCloseEditTransactionModal: () => void
}

const TransactionModalContext = createContext<TransactionModalContextType>( {} as TransactionModalContextType )

export function TransactionModalProvider ( { children }: TransactionModalProps ) {
  const [isOpen, setIsOpen] = useState( false )
  const [isOpenEditModal, setIsOpenEditModal] = useState( false )

  function handleOpenNewTransactionModal () {
    setIsOpen( true )
  }

  function handleCloseNewTransactionModal () {
    setIsOpen( false )
  }

  function handleOpenEditTransactionModal () {
    setIsOpenEditModal( true )
  }

  function handleCloseEditTransactionModal () {
    setIsOpenEditModal( false )
  }

  return (
    <TransactionModalContext.Provider value={{
      isOpen,
      isOpenEditModal,
      handleOpenNewTransactionModal,
      handleCloseNewTransactionModal,
      handleCloseEditTransactionModal,
      handleOpenEditTransactionModal
    }}>
      {children}
    </TransactionModalContext.Provider>
  )
}

export function useTransactionModal () {
  const context = useContext( TransactionModalContext )
  return context
}