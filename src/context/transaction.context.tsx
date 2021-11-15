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
  transaction: Transaction
  addTransaction: ( transaction: TransactionInput ) => Promise<void>
  deleteTransaction: () => Promise<void>
  handleSetIdToDelete: ( id: number ) => void
  editTransaction: ( transaction: Omit<Transaction, 'createdAt'> ) => Promise<void>
}

type TransactionProviderProps = {
  children: React.ReactNode
}

const TransactionContext = createContext<TransactionContext>( {} as TransactionContext )

export function TransactionProvider ( { children }: TransactionProviderProps ) {
  const [transactions, setTransactions] = useState<Transaction[]>( [] )
  const [idTransaction, setIdTransaction] = useState<number>( 0 )
  const [transaction, setTransaction] = useState<Transaction>( {} as Transaction )


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
    await BackendApi.delete( `/transactions/${idTransaction}` ).then( () => {
      const newTransactions = transactions.filter( transaction => transaction.id !== idTransaction )
      setTransactions( newTransactions )
    } )
  }

  async function addTransaction ( transactionInput: TransactionInput ): Promise<void> {
    const response: ResponseCreateTransaction = await BackendApi.post( '/transactions', transactionInput )
    const { transaction } = response.data

    setTransactions( [...transactions, { ...transaction, finalDate: formatDate( transaction.finalDate ) }] )
  }

  function handleSetIdToDelete ( id: number ): void {
    setIdTransaction( id )
  }

  async function editTransaction ( transaction: Omit<Transaction, 'createdAt'> ): Promise<void> {
    // await BackendApi.put( `/transactions/${transaction.id}`, transaction ).then( () => { console.log( 'is ok' ) } )

    console.log( transaction )
  }

  return (
    <TransactionContext.Provider value={{ transactions, transaction, addTransaction, deleteTransaction, handleSetIdToDelete, editTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions () {
  return useContext( TransactionContext )
}