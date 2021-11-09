import { createContext, useContext, useEffect, useState } from 'react'

import { BackendApi } from '../services/api.services'
import { formatDate } from '../utils/format.utils'

type FormattedTransactions = {
  [month: string]: {
    month: string
    transactions: Transaction[]
  }
}

type Transaction = {
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
  transactions: Transaction[]
  addTransaction: ( transaction: TransactionInput ) => Promise<void>
  deleteTransaction: () => Promise<void>
  handleSetIdToDelete: ( id: number ) => void
  handleSetIdToEdit: ( id: number ) => void
  editTransaction: ( transaction: Omit<Transaction, 'createdAt'> ) => Promise<void>
  getOnlyTransaction: () => Promise<Transaction>
}

type TransactionProviderProps = {
  children: React.ReactNode
}

const TransactionContext = createContext<TransactionContext>( {} as TransactionContext )

export function TransactionProvider ( { children }: TransactionProviderProps ) {
  const [transactions, setTransactions] = useState<Transaction[]>( [] )
  const [idToDelete, setIdToDelete] = useState<number>( 0 )
  const [idToEdit, setIdToEdit] = useState<number>( 0 )


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

  async function deleteTransaction (): Promise<void> {
    await BackendApi.delete( `/transactions/${idToDelete}` ).then( () => {
      const newTransactions = transactions.filter( transaction => transaction.id !== idToDelete )
      setTransactions( newTransactions )
    } )
  }

  async function addTransaction ( transactionInput: TransactionInput ): Promise<void> {
    const response: ResponseCreateTransaction = await BackendApi.post( '/transactions', transactionInput )
    const { transaction } = response.data

    setTransactions( [...transactions, { ...transaction, finalDate: formatDate( transaction.finalDate ) }] )
  }

  function handleSetIdToDelete ( id: number ): void {
    setIdToDelete( id )
  }

  function handleSetIdToEdit ( id: number ): void {
    setIdToEdit( id )
  }

  async function editTransaction ( transaction: Omit<Transaction, 'createdAt'> ): Promise<void> {
    await BackendApi.put( `/transactions/${transaction.id}`, transaction )

    await BackendApi.get( '/transactions' ).then( ( { data } ) => {
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
  }

  async function getOnlyTransaction (): Promise<Transaction> {
    const transaction = await BackendApi.get( `/transactions/${idToEdit}` ).then( ( { data } ) => {

      const transactionsFormatted: Transaction = { ...data.transaction, finalDate: formatDate( data.transaction.finalDate ) }

      return transactionsFormatted
    } )


    return transaction
  }

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, deleteTransaction, handleSetIdToDelete, editTransaction, getOnlyTransaction, handleSetIdToEdit }}>
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions () {
  return useContext( TransactionContext )
}