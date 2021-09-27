import { createContext, useContext, useEffect, useState } from 'react'
import { formatDate, getMonth } from '../utils/format.utils'

import { BackendApi } from '../services/api.services'

type FormattedTransactions = {
  [month: string]: {
    month: string
    transactions: Transaction[]
  }
}

type final = { month: string, transactions: Transaction[] }

type Transaction = {
  id: number
  title: string
  description: string
  category: string
  amount: string
  installments: number
  typeMoney: string
  createdAt: string
  finalDate: string
  typeTransaction: string
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

type TransactionContext = {
  transactions: Transaction[]
  transactionsFormattedPerMonth: final[]
  // addTransaction: ( transaction: TransactionInput ) => Promise<void>
}

type TransactionProviderProps = {
  children: React.ReactNode
}

const TransactionContext = createContext<TransactionContext>( {} as TransactionContext )

export function TransactionProvider ( { children }: TransactionProviderProps ) {
  const [transactionsFormattedPerMonth, setTransactionsFormattedPerMonth] = useState<final[]>( [{}] as final[] )
  const [transactions, setTransactions] = useState<Transaction[]>( [] )

  let formattedTransactions: FormattedTransactions = {}

  useEffect( () => {
    BackendApi.get( '/transactions' ).then( ( { data } ) => {
      const { transactions } = data

      const transactionsFormatted = transactions.map( ( transaction: Transaction ) => {
        const { id, title, description, category, amount, installments, typeTransaction, createdAt, finalDate, typeMoney } = transaction

        return {
          id,
          title,
          description,
          category,
          amount,
          installments,
          typeTransaction,
          createdAt: createdAt,
          finalDate: formatDate( finalDate ),
          typeMoney
        }
      } )

      setTransactions( transactionsFormatted )

      transactionsFormatted.map( ( transactions: Transaction ) => {
        if ( !formattedTransactions[getMonth( transactions.createdAt )] ) {
          formattedTransactions[getMonth( transactions.createdAt )] = {
            month: getMonth( transactions.createdAt ),
            transactions: [transactions],
          }
        } else {
          formattedTransactions[getMonth( transactions.createdAt )].transactions.push( transactions )
        }
      } )

      const transactionFinal = Object.values( formattedTransactions )

      setTransactionsFormattedPerMonth( transactionFinal as final[] )
    } )
  }, [] )

  return (
    <TransactionContext.Provider value={{ transactionsFormattedPerMonth, transactions }}>
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions () {
  const context = useContext( TransactionContext )
  return context
}