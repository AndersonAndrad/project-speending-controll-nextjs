import { IoMdCreate, IoMdTrash } from 'react-icons/io'
import { useEffect, useState } from 'react'

import { BackendApi } from '../services/api.services'
import { Header } from '../components/Header'
import { formatCash } from '../utils/formatCash.utils'
import styles from '../styles/Home.module.scss'
import { useTransactions } from '../context/transaction.context'

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

  const { transactions } = useTransactions()

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

        <h1>October 2021</h1>
        <table>
          <thead>
            <tr>
              <th>Initial date</th>
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
            {transactions.map( ( transaction: Transaction ) => {
              return (
                <tr key={transaction.id}>
                  <td>{transaction.initialDate}</td>
                  <td>{transaction.finalDate}</td>
                  <td>{transaction.title}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.category}</td>
                  {transaction.typeMoney === 'outcome' ? <td className={styles.outcome}>{formatCash( Number( transaction.amount ) )}</td> : <td className={styles.income}>{formatCash( Number( transaction.amount ) )}</td>}
                  <td>{transaction.installments}</td>
                  <td>{transaction.typeTransaction}</td>
                  <td>
                    <button className={styles.edit}><IoMdCreate color={'#fff'} size={'24px'} /></button>
                    <button className={styles.delete}><IoMdTrash color={'#262626'} size={'24px'} /></button>
                  </td>
                </tr>
              )
            } )}

          </tbody>
        </table>
      </div>
    </div>
  )
}
