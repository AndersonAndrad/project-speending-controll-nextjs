import { IoIosArrowDropdown, IoIosArrowDropup, IoIosTrendingUp } from 'react-icons/io'

import dynamic from 'next/dynamic'
import { formatCash } from '../../utils/format.utils'
import { options } from '../../config/graph.config'
import styles from './styles.module.scss'
import { useTransactions } from '../../context/transaction.context'

type DataToShowInGraph = {
  name: string
  data: number[]
}

type HeaderProps = {
  series: DataToShowInGraph[]
}


const Chart = dynamic( () => import( 'react-apexcharts' ), { ssr: false } )

export function Header ( { series }: HeaderProps ) {
  const { transactions } = useTransactions()

  const summary = transactions.reduce( ( acc, curr ) => {
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
      <header >
        <div className={styles.leftHeaderContent}>
          <h1>Money</h1>
          <section className={styles.money}>
            <h2><IoIosTrendingUp size={'24px'} /> {formatCash( summary.all )} ({new Date().getFullYear()}) </h2>
            <div>
              <h3 className={styles.outcome}> <IoIosArrowDropdown size={'24px'} /> {formatCash( summary.withdrawals )}</h3>
              <h3 className={styles.income}> <IoIosArrowDropup size={'24px'} /> {formatCash( summary.deposits )}</h3>
            </div>
          </section>
        </div>
        <div>
          <Chart
            options={options}
            series={series}
            type='area'
            height={300}
            width={500}
          />
        </div>
        <div className={styles.rightHeaderContent}>
          <button>New expensive</button>
          <div className={styles.exportFiles}>
            <span>Export with</span>
            <div>
              <h1>export</h1>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}