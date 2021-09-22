import { IoIosArrowDropdown, IoIosArrowDropup, IoIosTrendingUp, IoMdCreate, IoMdDownload, IoMdTrash } from 'react-icons/io'
import { useEffect, useState } from 'react'

import { BackendApi } from '../services/api.serviecs'
import dynamic from 'next/dynamic'
import faker from 'faker'
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
  type: string
  initialDate: string
  finalDate: string
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
  const [without, setWithout] = useState<number>( faker.random.number( 10000 ) )
  const [input, setInput] = useState<number>( faker.random.number( 10000 ) )
  const [allMoney, setAllMoney] = useState<number>( without + input )

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
        const { id, title, description, category, amount, installments, type, initialDate, finalDate } = expense

        return {
          id,
          title,
          description,
          category,
          amount: String( new Intl.NumberFormat( 'pt-BR', { style: 'currency', currency: 'BRL' } ).format( Number( amount ) ) ),
          installments,
          type,
          initialDate: new Date( initialDate ).toLocaleDateString( 'eng-US', { day: '2-digit', month: 'short', } ),
          finalDate: new Date( finalDate ).toLocaleDateString( 'eng-US', { day: '2-digit', month: 'short', } ),
        }
      } )

      setExpenses( expensesFormatted )
    } )
  }, [] )

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.header}>
          <div className={styles.leftHeaderContent}>
            <h1>Money</h1>
            <section className={styles.money}>
              <h2><IoIosTrendingUp size={'24px'} /> {allMoney}</h2>
              <div>
                <h3 className={styles.without}> <IoIosArrowDropdown size={'24px'} /> {input}</h3>
                <h3 className={styles.input}> <IoIosArrowDropup size={'24px'} /> {without}</h3>

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
                <button><IoMdDownload size={'24px'} /></button>
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
                  <td>{expense.amount}</td>
                  <td>{expense.installments}</td>
                  <td>{expense.type}</td>
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
