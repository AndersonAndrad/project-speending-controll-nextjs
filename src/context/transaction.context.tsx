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


  async function addTransaction ( transactionInput: TransactionInput ) {
    const response: ResponseCreateTransaction = await BackendApi.post( '/transactions', transactionInput )
    const { transaction } = response.data

    setTransactions( [...transactions, { ...transaction, finalDate: formatDate( transaction.finalDate ) }] )
  }

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions () {
  const context = useContext( TransactionContext )
  return context
}