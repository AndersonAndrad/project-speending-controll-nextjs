import { Factory, Model, createServer } from "miragejs"

import faker from 'faker'

type Expense = {
  id: number
  title: string
  description: string
  category: string
  amount: number
  installments: number
  typeMoney: string
  createdAt: string
  finalDate: string
  typeTransaction: string
}

type Money = {
  name: string
  data: number[]
  color: string
}

export function makeServer () {
  const server = createServer( {
    models: {
      transaction: Model.extend<Partial<Expense>>( {} ),
      money: Model.extend<Partial<Money>>( {} )
    },

    factories: {
      transaction: Factory.extend( {
        title () {
          return faker.name.firstName()
        },
        description () {
          return faker.lorem.sentence()
        },
        category () {
          return faker.commerce.department()
        },
        amount () {
          return faker.random.number( 10000 )
        },
        installments () {
          return faker.random.number( 2 )
        },
        typeTransaction () {
          return faker.random.arrayElement( ['credit', 'debit', 'pix'] )
        },
        createdAt () {
          return faker.date.past().toISOString()
        },
        finalDate () {
          return faker.date.future().toISOString()
        },
        typeMoney () {
          return faker.random.arrayElement( ['income', 'outcome'] )
        }
      } ),
      money: Factory.extend( {
        name () {
          return faker.random.arrayElement( ['input', 'without', 'currency'] )
        },
        data () {
          return [
            faker.random.number( 1000000 ),
            faker.random.number( 1000000 ),
            faker.random.number( 1000000 ),
            faker.random.number( 1000000 ),
            faker.random.number( 1000000 ),
            faker.random.number( 1000000 ),
            faker.random.number( 1000000 ),
            faker.random.number( 1000000 ),
            faker.random.number( 1000000 ),
            faker.random.number( 1000000 ),
            faker.random.number( 1000000 ),
            faker.random.number( 1000000 )
          ]
        },
      } )
    },

    seeds ( server ) {
      server.createList( 'transaction', 10 ),
        server.createList( 'money', 3 )
    },

    routes () {
      this.namespace = 'api'
      this.timing = 750

      this.get( '/transactions' )
      this.post( '/transactions' )

      this.get( '/money' )

      this.namespace = ''
      this.passthrough()
    }
  } )

  return server
}