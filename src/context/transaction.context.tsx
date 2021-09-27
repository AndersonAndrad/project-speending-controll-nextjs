import { createContext, useContext, useEffect, useState } from 'react'

import { BackendApi } from '../services/api.services'
import { formatDate } from '../utils/formatCash.utils'

type Transaction = {
  id: number
  title: string
  description: string
  category: string
  amount: string
  installments: number
  typeMoney: string
  initialDate: string
  finalDate: string
  typeTransaction: string
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

type TransactionContext = {
  transactions: Transaction[]
  // addTransaction: ( transaction: TransactionInput ) => Promise<void>
}

type TransactionProviderProps = {
  children: React.ReactNode
}

const TransactionContext = createContext<TransactionContext>( {} as TransactionContext )

export function TransactionProvider ( { children }: TransactionProviderProps ) {
  const [transactions, setTransactions] = useState<Transaction[]>( [] )

  useEffect( () => {
    BackendApi.get( '/transactions' ).then( ( { data } ) => {
      const { transactions } = data

      const transactionsFormatted = transactions.map( ( transaction: Transaction ) => {
        const { id, title, description, category, amount, installments, typeTransaction, initialDate, finalDate, typeMoney } = transaction

        return {
          id,
          title,
          description,
          category,
          amount,
          installments,
          typeTransaction,
          initialDate: formatDate( initialDate ),
          finalDate: formatDate( finalDate ),
          typeMoney
        }
      } )

      setTransactions( transactionsFormatted )
    } )
  }, [] )

  return (
    <TransactionContext.Provider value={{ transactions }}>
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions () {
  const context = useContext( TransactionContext )
  return context
}