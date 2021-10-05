import { BackendApi } from '../../services/api.services'
import { GetServerSideProps } from 'next'
import { Header } from '../../components/Header'
import { formatDate } from '../../utils/format.utils'

type Transaction = {
  id: number
  title: string
  description: string
  category: string
  amount: string
  installments: number
  typeMoney: string
  createdAt: string
  finalDate: string
  typeTransaction: string
}

type ResponseGetTransactionsAxios = {
  data: {
    transactions: Transaction[]
  }
}

type CategoryProps = {
  transactions: Transaction[]
}

export default function Category ( { transactions }: CategoryProps ) {

  const series = [
    {
      name: 'category',
      data: [4000, 500, 100, 30, 10, 10000]
    },
  ]

  console.log( transactions )

  return (
    <div>
      <Header series={series} />
      <h1>Category</h1>
      {/* {transactions.map( transaction => {
        return (
          <ul key={transaction.id}>
            <li>{transaction.title}</li>
          </ul>
        )
      } )} */}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ( { req, params } ) => {
  // const { slug } = params

  const slug = 'games'

  const response: ResponseGetTransactionsAxios = await BackendApi.get( `/games` )

  const { transactions } = response.data

  const formattedTransactions: Transaction[] = transactions.map( ( transaction: Transaction ) => {
    return {
      ...transaction,
      createdAt: formatDate( transaction.createdAt ),
    }
  } )

  return {
    props: {
      transactions: formattedTransactions
    }
  }
}