import { createContext, useContext, useEffect, useState } from 'react'

import { BackendApi } from '../services/api.services'
import { formatDate } from '../utils/format.utils'

type FormattedTransactions = {
  [month: string]: {
    month: string
    transactions: Transaction[]
  }
}

export type Transaction = {
  id: number
  title: string
  description: string
  category: string
  amount: string
  installments: string
  typeMoney: string
  createdAt: string
  finalDate: string
  typeTransaction: string
}

type ResponseCreateTransaction = {
  data: {
    transaction: Transaction
  }
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

type TransactionContext = {
  idToUpdate: number
  transactions: Transaction[]
  addTransaction: ( transaction: TransactionInput ) => Promise<void>
  deleteTransaction: () => Promise<void>
  editTransaction: ( transaction: Transaction ) => Promise<void>
  getTransactionById: ( id: number ) => Promise<Transaction>
  handleSetIdToDelete: ( id: number ) => void
  setIdToUpdate: ( id: number ) => void
}

type TransactionProviderProps = {
  children: React.ReactNode
}

const TransactionContext = createContext<TransactionContext>( {} as TransactionContext )

export function TransactionProvider ( { children }: TransactionProviderProps ) {
  const [transactions, setTransactions] = useState<Transaction[]>( [] )
  const [idToDelete, setIdToDelete] = useState<number>( 0 )
  const [idToUpdate, setIdToUpdate] = useState<number>( 0 )

  useEffect( () => {
    BackendApi.get( '/transactions' ).then( ( { data } ) => {
      const { transactions } = data

      const transactionsFormatted: Transaction[] = transactions.map( ( transaction: Transaction ) => {
        const { id, title, description, category, amount, installments, typeTransaction, createdAt, finalDate, typeMoney } = transaction

        return {
          id,
          title,
          description,
          category,
          amount,
          installments,
          typeTransaction,
          createdAt,
          finalDate: formatDate( finalDate ),
          typeMoney
        }
      } )

      setTransactions( transactionsFormatted )

    } )
  }, [] )

  async function deleteTransaction () {
    BackendApi.delete( `/transactions/${idToDelete}` ).then( () => {
      const newTransactions = transactions.filter( transaction => transaction.id !== idToDelete )
      setTransactions( newTransactions )
    } )
  }

  async function addTransaction ( transactionInput: TransactionInput ) {
    const response: ResponseCreateTransaction = await BackendApi.post( '/transactions', transactionInput )
    const { transaction } = response.data

    setTransactions( [...transactions, { ...transaction, finalDate: formatDate( transaction.finalDate ) }] )
  }

  async function editTransaction ( transaction: Transaction ) {
    const response: ResponseCreateTransaction = await BackendApi.patch( `/transactions/${transaction.id}`, transaction )
    const { transaction: updatedTransaction } = response.data

    setTransactions( transactions.map( transaction => transaction.id === updatedTransaction.id ? updatedTransaction : transaction ) )
  }

  function handleSetIdToDelete ( id: number ) {
    setIdToDelete( id )
  }

  function getTransactionById ( id: number ): Promise<Transaction> {
    const transaction = BackendApi.get( `/transactions/${id}` ).then( ( { data } ) => data.transaction )

    return transaction
  }

  return (
    <TransactionContext.Provider value={{
      transactions,
      addTransaction,
      deleteTransaction,
      editTransaction,
      handleSetIdToDelete,
      getTransactionById,
      setIdToUpdate,
      idToUpdate
    }}>
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions () {
  const context = useContext( TransactionContext )
  return context
}