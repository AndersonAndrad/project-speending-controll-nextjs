import '../styles/globals.scss'

import type { AppProps } from 'next/app'
import { TransactionProvider } from '../context/transaction.context'
import { makeServer } from './../config/miragejs.config'

if ( process.env.NODE_ENV === 'development' ) {
  makeServer()
}

function MyApp ( { Component, pageProps }: AppProps ) {
  return (
    <TransactionProvider>
      <Component {...pageProps} />
    </TransactionProvider>
  )
}
export default MyApp
