import { GetServerSideProps } from "next"
import { Header } from '../../components/Header'

export default function Category () {
  const dataToGraph = [
    { name: 'Games', data: [1000, 100, 2909, 1, 30] }
  ]

  return (
    <div>
      <Header series={dataToGraph} />
      <h1>Category</h1>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ( { req, params } ) => {
  const { slug } = params as { slug: string }

  // console.log( String( slug ) )

  // const response = await BackendApi.get( `/category/${String( slug )}` )

  // console.log( response.data )

  return {
    props: {}
  }
}