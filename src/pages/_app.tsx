import '../styles/globals.scss'

import type { AppProps } from 'next/app'
import { NewTransactionModal } from '../components/NewTransactionModal'
import { TransactionModalProvider } from '../context/transactionModal.context'
import { TransactionProvider } from '../context/transaction.context'
import { makeServer } from './../config/miragejs.config'

if ( process.env.NODE_ENV === 'development' ) {
  makeServer()
}

function MyApp ( { Component, pageProps }: AppProps ) {

  return (
    <TransactionProvider>
      <TransactionModalProvider>
        <Component {...pageProps} />
        <NewTransactionModal />
      </TransactionModalProvider>
    </TransactionProvider>
  )
}

export default MyApp
