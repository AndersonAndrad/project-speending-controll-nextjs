import '../styles/globals.scss'

import type { AppProps } from 'next/app'
import { ConfirmationDeleteModal } from '../components/ConfirmationDelete'
import { ConfirmationDeleteModalProvider } from '../context/confirmationDelete.context'
import { EditModalProvider } from '../context/EditModal.context'
import { EditTransactionModal } from '../components/EditTransactionModal'
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
        <ConfirmationDeleteModalProvider>
          <EditModalProvider>
            <Component {...pageProps} />
            <NewTransactionModal />
            <ConfirmationDeleteModal />
            <EditTransactionModal />
          </EditModalProvider>
        </ConfirmationDeleteModalProvider>
      </TransactionModalProvider>
    </TransactionProvider>
  )
}

export default MyApp
