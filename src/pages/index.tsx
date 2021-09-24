import { IoIosArrowDropdown, IoIosArrowDropup, IoIosTrendingUp, IoMdCreate, IoMdDownload, IoMdTrash } from 'react-icons/io'
import { formatCash, formatDate } from '../utils/formatCash.utils'
import { useEffect, useState } from 'react'

import { BackendApi } from '../services/api.services'
import dynamic from 'next/dynamic'
import { exportFile } from '../utils/exportFile.utils'
import { options } from '../config/graph.config'
import styles from '../styles/Home.module.scss'

const Chart = dynamic( () => import( 'react-apexcharts' ), { ssr: false } )

type Expense = {
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

type ResponseExpenseAxios = {
  data: {
    expenses: Expense[]
  }
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
  const [expenses, setExpenses] = useState<Expense[]>( [] )
  const [graphMoney, setGraphMoney] = useState<GraphMoney[]>( [] )

  useEffect( () => {
    BackendApi.get( '/money' ).then( ( moneys: ResponseMoneyAxios ) => {
      const { data } = moneys
      const { money } = data

      setGraphMoney( money )
    } )
  }, [] )


  useEffect( () => {
    BackendApi.get( '/expenses' ).then( ( expense: ResponseExpenseAxios ) => {
      const { data } = expense
      const { expenses } = data

      const expensesFormatted = expenses.map( ( expense: Expense ) => {
        const { id, title, description, category, amount, installments, typeTransaction, initialDate, finalDate, typeMoney } = expense

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

      setExpenses( expensesFormatted )
    } )
  }, [] )


  const summary = expenses.reduce( ( acc, curr ) => {
    if ( curr.typeMoney === 'income' ) {
      acc.deposits += Number( curr.amount )
      acc.all += Number( curr.amount )
    } else {
      acc.withdrawals += Number( curr.amount )
      acc.all += Number( curr.amount )
    }

    return acc
  }, {
    deposits: 0,
    withdrawals: 0,
    all: 0
  } )

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.header}>
          <div className={styles.leftHeaderContent}>
            <h1>Money</h1>
            <section className={styles.money}>
              <h2><IoIosTrendingUp size={'24px'} /> {formatCash( summary.all )}</h2>
              <div>
                <h3 className={styles.without}> <IoIosArrowDropdown size={'24px'} /> {formatCash( summary.deposits )}</h3>
                <h3 className={styles.input}> <IoIosArrowDropup size={'24px'} /> {formatCash( summary.withdrawals )}</h3>

              </div>
            </section>
          </div>
          <div>
            <Chart
              options={options}
              series={graphMoney}
              type='area'
              height={300}
              width={500}
            />
          </div>
          <div className={styles.rightHeaderContent}>
            <button>New expensive</button>
            <label>
              <span>Export with</span>
              <div>
                <select name="" id="">
                  <option value="">PDF</option>
                  <option value="">PDF</option>
                  <option value="">PDF</option>
                  <option value="">PDF</option>
                </select>
                <button><IoMdDownload size={'24px'} onClick={() => exportFile( { data: expenses, fileName: 'expenses', exportType: 'json' } )} /></button>
              </div>
            </label>
          </div>
        </div>
      </header>
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
            {expenses.map( ( expense: Expense ) => {
              return (
                <tr key={expense.id}>
                  <td>{expense.initialDate}</td>
                  <td>{expense.finalDate}</td>
                  <td>{expense.title}</td>
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
                  {expense.typeMoney === 'outcome' ? <td className={styles.outcome}>{formatCash( Number( expense.amount ) )}</td> : <td className={styles.income}>{formatCash( Number( expense.amount ) )}</td>}
                  <td>{expense.installments}</td>
                  <td>{expense.typeTransaction}</td>
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
