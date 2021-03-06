import { FormEvent, useState } from 'react'

import { IoIosClose } from 'react-icons/io'
import Modal from 'react-modal'
import { formatDate } from '../../utils/format.utils'
import styles from './styles.module.scss'
import { useTransactionModal } from '../../context/transactionModal.context'
import { useTransactions } from '../../context/transaction.context'

type NewTransactionModalProps = {
  isOpen: boolean
  handleCloseNewTransactionModal: () => void
}

export function NewTransactionModal () {
  const { isOpen, handleCloseNewTransactionModal } = useTransactionModal()
  const { addTransaction } = useTransactions()

  const [income, setIncome] = useState( false )
  const [without, setWithout] = useState( false )
  const [title, setTitle] = useState( '' )
  const [description, setDescription] = useState( '' )
  const [category, setCategory] = useState( '' )
  const [typeTransaction, setTypeTransaction] = useState( '' )
  const [amount, setAmount] = useState( '' )
  const [installments, setInstallments] = useState( '' )
  const [date, setDate] = useState( '' )

  function handleDefineIncome () {
    setIncome( true )
    setWithout( false )
  }

  function handleDefineWithout () {
    setWithout( true )
    setIncome( false )
  }

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

  function handleSubmitNewTransaction ( event: FormEvent ) {
    event.preventDefault()
    handleCloseNewTransactionModal()
    cleanAllState()

    const newTransaction = {
      title,
      description,
      category,
      typeTransaction,
      amount: String( amount ),
      installments: String( installments ),
      finalDate: date,
      typeMoney: income ? 'income' : 'without',
    }


    addTransaction( newTransaction )
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseNewTransactionModal}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >
      <form onSubmit={handleSubmitNewTransaction}>
        <header className={styles.header}>
          <h3>New Transaction</h3>
          <button onClick={() => handleCloseNewTransactionModal()}><IoIosClose size={34} color={'#fff'} /></button>
        </header>
        <div className={styles.content}>

          <label>
            <span>Title</span>
            <input type="text" placeholder='My account' onChange={event => { setTitle( event.target.value ) }} value={title} />
          </label>
          <label>
            <span>Description</span>
            <input type="text" placeholder='Buy a new game' onChange={event => { setDescription( event.target.value ) }} value={description} />
          </label>

          <div className={styles.smallBox}>
            <label className={styles.smallInput}>
              <span>Category</span>
              <input type="text" placeholder='Game' onChange={event => { setCategory( event.target.value ) }} value={category} />
            </label>
            <label className={styles.smallInput}>
              <span>Type</span>
              <input type="text" placeholder='Debit' onChange={event => { setTypeTransaction( event.target.value ) }} value={typeTransaction} />
            </label>
          </div>

          <div className={styles.smallBox}>
            <label className={styles.smallInput} >
              <span>Value</span>
              <input type="text" placeholder='R$100,00' onChange={event => setAmount( event.target.value )} value={amount} />
            </label>
            <label className={styles.smallInput}>
              <span>Installments</span>
              <input type="number" placeholder='4' onChange={event => setInstallments( event.target.value )} value={installments} />
            </label>
          </div>

          <div className={styles.smallBox}>
            <label>
              <span>End date</span>
              <input type="date" onChange={event => setDate( event.target.value )} value={date} />
            </label>
            <label>
              <span>{formatDate( String( new Date() ) )}</span>
            </label>
          </div>

          <div className={styles.smallBox}>
            <button type='button' onClick={() => handleDefineWithout()} className={without ? `${styles.noWithout}` : `${styles.without}`}>Without</button>
            <button type='button' onClick={() => handleDefineIncome()} className={income ? `${styles.noIncome}` : `${styles.income}`}>Income</button>
          </div>
          <section>
            <button type='submit'>Add</button>
          </section>
        </div>
      </form>
    </Modal>

  )
}