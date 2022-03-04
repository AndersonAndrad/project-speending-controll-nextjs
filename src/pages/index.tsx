import { IoMdCreate, IoMdTrash } from 'react-icons/io'
import { formatCash, formatDate } from '../utils/format.utils'
import { useEffect, useState } from 'react'

import { BackendApi } from '../services/api.services'
import { Header } from '../components/Header'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'
import { useConfirmationDeleteModal } from '../context/confirmationDelete.context'
import { useTransactionModal } from '../context/transactionModal.context'
import { useTransactions } from '../context/transaction.context'

type ResponseMoneyAxios = {
  data: {
    money: GraphMoney[]
  }
}

type GraphMoney = {
  name: string
  data: number[]
}

export default function Home () {
  const [graphMoney, setGraphMoney] = useState<GraphMoney[]>( [] )
  const { transactions, handleSetIdToDelete, setIdToUpdate } = useTransactions()
  const { handleOpenConfirmationDeleteModal } = useConfirmationDeleteModal()
  const { handleOpenEditTransactionModal } = useTransactionModal()

  useEffect( () => {
    BackendApi.get( '/money' ).then( ( moneys: ResponseMoneyAxios ) => {
      const { data } = moneys
      const { money } = data

      setGraphMoney( money )
    } )
  }, [] )

  return (
    <div className={styles.container}>
      <Header series={graphMoney} />
      <div className={styles.content}>
        <ul>
          <li><button>all</button></li>
          <li><button>2021</button></li>
          <li><button>2022</button></li>
          <li><button>2023</button></li>
          <li><button>2024</button></li>
          <li><button>2025</button></li>
        </ul>
        <table>
          <thead>
            <tr>
              <th>Created</th>
              <th>Final date</th>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Value</th>
              <th>Installments</th>
              <th>Type</th>
              <th>Actions </th>
            </tr>
          </thead>
          <tbody>
            {
              transactions?.map( transaction => {
                return (
                  <tr key={transaction.id}>
                    <td>{formatDate( transaction.createdAt )}</td>
                    <td>{transaction.finalDate}</td>
                    <td>{transaction.title}</td>
                    <td>{transaction.description}</td>
                    <td className={styles.category}><Link href={`/category/${transaction.category}`}>{transaction.category}</Link></td>
                    {transaction.typeMoney === 'income' ? <td className={styles.income}>{formatCash( Number( transaction.amount ) )}</td> : <td className={styles.without}>{formatCash( Number( transaction.amount ) )}</td>}
                    <td>{transaction.installments}</td>
                    <td>{transaction.typeTransaction}</td>
                    <td>
                      <button className={styles.edit} onClick={() => { setIdToUpdate( transaction.id ), handleOpenEditTransactionModal() }}>
                        <IoMdCreate color={'#fff'} size={'24px'} />
                      </button>
                      <button className={styles.delete} onClick={() => { handleSetIdToDelete( transaction.id ), handleOpenConfirmationDeleteModal() }} >
                        <IoMdTrash color={'#262626'} size={'24px'} />
                      </button>
                    </td>
                  </tr>
                )
              } )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
