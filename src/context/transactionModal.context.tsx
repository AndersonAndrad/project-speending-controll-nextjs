import { createContext, useContext, useState } from "react"

type TransactionModalProps = {
  children: React.ReactNode
}

type TransactionModalContextType = {
  isOpen: boolean
  handleOpenNewTransactionModal: () => void
  handleCloseNewTransactionModal: () => void
}

const TransactionModalContext = createContext<TransactionModalContextType>( {} as TransactionModalContextType )

export function TransactionModalProvider ( { children }: TransactionModalProps ) {
  const [isOpen, setIsOpen] = useState( false )

  function handleOpenNewTransactionModal () {
    setIsOpen( true )
  }

  function handleCloseNewTransactionModal () {
    setIsOpen( false )
  }

  return (
    <TransactionModalContext.Provider value={{ isOpen, handleOpenNewTransactionModal, handleCloseNewTransactionModal }}>
      {children}
    </TransactionModalContext.Provider>
  )
}

export function useTransactionModal () {
  const context = useContext( TransactionModalContext )
  return context
}