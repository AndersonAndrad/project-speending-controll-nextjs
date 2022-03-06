import { createContext, useContext, useState } from "react"

import { useTransactions } from './transaction.context'

type TransactionModalProps = {
  children: React.ReactNode
}

type TransactionModalContextType = {
  isOpen: boolean
  isOpenEditModal: boolean
  isOpenDeleteModal: boolean
  handleOpenNewTransactionModal: () => void
  handleCloseNewTransactionModal: () => void
  handleOpenEditTransactionModal: ( id: number ) => void
  handleCloseEditTransactionModal: () => void
  handleOpenConfirmationDeleteModal: () => void
  handleCloseConfirmationDeleteModal: () => void
}

const TransactionModalContext = createContext<TransactionModalContextType>( {} as TransactionModalContextType )

export function TransactionModalProvider ( { children }: TransactionModalProps ) {
  const [isOpen, setIsOpen] = useState<boolean>( false )
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>( false )
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>( false )


  const { setIdToUpdate } = useTransactions()

  function handleOpenNewTransactionModal () {
    setIsOpen( true )
  }

  function handleCloseNewTransactionModal () {
    setIsOpen( false )
  }

  function handleOpenEditTransactionModal ( id: number ) {
    setIsOpenEditModal( true )
    setIdToUpdate( id )
    return
  }

  function handleCloseEditTransactionModal () {
    setIsOpenEditModal( false )
  }

  function handleOpenConfirmationDeleteModal () {
    setIsOpenDeleteModal( true )
  }

  function handleCloseConfirmationDeleteModal () {
    setIsOpenDeleteModal( false )
  }

  return (
    <TransactionModalContext.Provider value={{
      isOpen,
      isOpenEditModal,
      isOpenDeleteModal,
      handleOpenNewTransactionModal,
      handleCloseNewTransactionModal,
      handleCloseEditTransactionModal,
      handleOpenEditTransactionModal,
      handleCloseConfirmationDeleteModal,
      handleOpenConfirmationDeleteModal
    }}>
      {children}
    </TransactionModalContext.Provider>
  )
}

export function useTransactionModal () {
  const context = useContext( TransactionModalContext )
  return context
}