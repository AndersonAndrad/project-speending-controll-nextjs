import { FormEvent, useEffect, useState } from 'react'

import { BackendApi } from '../../../services/api.services'
import { formatDate } from '../../../utils/format.utils'
import styles from '../../../styles/TransactionsUpdate.module.scss'
import { useRouter } from 'next/router'
import { useTransactions } from '../../../context/transaction.context'

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

export default function UpdateTransaction () {
  const router = useRouter()

  const { editTransaction } = useTransactions()
  const { id } = router.query

  useEffect( () => {
    BackendApi.get( `/transactions/${id}` ).then( ( { data } ) => {

      const transactionsFormatted: Transaction = { ...data.transaction, finalDate: formatDate( data.transaction.finalDate ) }

      setIdTransaction( transactionsFormatted.id )
      setTitle( transactionsFormatted.title )
      setDescription( transactionsFormatted.description )
      setCategory( transactionsFormatted.category )
      setAmount( transactionsFormatted.amount )
      setInstallments( transactionsFormatted.installments )
      setDescription( transactionsFormatted.description )
      setTitle( transactionsFormatted.title )
      setDate( transactionsFormatted.finalDate )
    } )
  }, [] )

  const [idTransaction, setIdTransaction] = useState<number>( 0 )
  const [income, setIncome] = useState( false )
  const [without, setWithout] = useState( false )
  const [title, setTitle] = useState( '' )
  const [description, setDescription] = useState( '' )
  const [category, setCategory] = useState( '' )
  const [typeTransaction, setTypeTransaction] = useState( '' )
  const [amount, setAmount] = useState( '' )
  const [installments, setInstallments] = useState( '' )
  const [date, setDate] = useState( '' )

  function cleanAllState () {
    setIncome( false )
    setWithout( false )
    setTitle( '' )
    setDescription( '' )
    setCategory( '' )
    setTypeTransaction( '' )
    setAmount( '' )
    setInstallments( '' )
    setDate( '' )
  }

  function handleDefineIncome () {
    setIncome( true )
    setWithout( false )
  }

  function handleDefineWithout () {
    setWithout( true )
    setIncome( false )
  }

  function handleSubmitNewTransaction ( event: FormEvent ) {
    event.preventDefault()
    cleanAllState()

    const newTransaction: Omit<Transaction, 'createdAt'> = {
      id: idTransaction,
      title,
      description,
      category,
      typeTransaction,
      amount: String( amount ),
      installments: String( installments ),
      finalDate: date,
      typeMoney: income ? 'income' : 'without',
    }

    editTransaction( newTransaction )
    router.push( '/' )
  }

  return (
    <div className={styles.container}>
      <h1>Update Transaction {title}</h1>

      <form onSubmit={handleSubmitNewTransaction} className={styles.content}>
        <label>
          <span>Title</span>
          <input type="text" placeholder='My account' onChange={event => { setTitle( event.target.value ) }} value={title} />
        </label>
        <label>
          <span>Description</span>
          <input type="text" placeholder='Buy a new game' onChange={event => { setDescription( event.target.value ) }} value={description} />
        </label>
        <div className={styles.smallBox}>
          <label>
            <span>Category</span>
            <input type="text" placeholder='Game' onChange={event => { setCategory( event.target.value ) }} value={category} />
          </label>
          <label>
            <span>Type</span>
            <input type="text" placeholder='Debit' onChange={event => { setTypeTransaction( event.target.value ) }} value={typeTransaction} />
          </label>
        </div>
        <div className={styles.smallBox}>
          <label>
            <span>Value</span>
            <input type="text" placeholder='R$100,00' onChange={event => { setAmount( event.target.value ) }} value={amount} />
          </label>
          <label>
            <span>Installements</span>
            <input type="text" placeholder='4' onChange={event => { setInstallments( event.target.value ) }} value={installments} />
          </label>
        </div >
        <div className={styles.smallBox}>
          <label>
            <span>Date end</span>
            <input type="date" placeholder='12/12/12' onChange={event => { setAmount( event.target.value ) }} value={date} />
          </label>
          <label>
            <span>Start date</span>
            <span>{formatDate( String( new Date() ) )}</span>
          </label>
        </div >
        <label></label>
        <div className={styles.smallBox}>
          <button type='button' onClick={() => handleDefineIncome()} className={without ? `${styles.without}` : `${styles.noWithout}`}>Without</button>
          <button type='button' onClick={() => handleDefineWithout()} className={income ? `${styles.income}` : `${styles.noIncome}`} >Income</button>
        </div>
        <label className={styles.submitButton}>
          <button type='submit'>
            Edit
          </button>
        </label>
      </form>
    </div>
  )
}