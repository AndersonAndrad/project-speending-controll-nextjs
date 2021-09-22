import { Factory, Model, createServer } from "miragejs"

import faker from 'faker'

type Expense = {
  id: number
  title: string
  description: string
  category: string
  amount: number
  installments: number
  type: string
  initialDate: string
  finalDate: string
}

type Money = {
  name: string
  data: number[]
  color: string
}

export function makeServer () {
  const server = createServer( {
    models: {
      expense: Model.extend<Partial<Expense>>( {} ),
      money: Model.extend<Partial<Money>>( {} )
    },

    factories: {
      expense: Factory.extend( {
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
          return faker.random.number( 2 )
        },
        installments () {
          return faker.random.number( 2 )
        },
        type () {
          return faker.random.arrayElement( ['credit', 'debit', 'pix'] )
        },
        initialDate () {
          return faker.date.past().toISOString()
        },
        finalDate () {
          return faker.date.future().toISOString()
        }
      } ),
      money: Factory.extend( {
        name () {
          return faker.random.arrayElement( ['input', 'without', 'currency'] )
        },
        data () {
          return [
            faker.random.number( 10000 ),
            faker.random.number( 10000 ),
            faker.random.number( 10000 ),
            faker.random.number( 10000 ),
            faker.random.number( 10000 ),
            faker.random.number( 10000 ),
            faker.random.number( 10000 ),
            faker.random.number( 10000 ),
            faker.random.number( 10000 ),
            faker.random.number( 10000 ),
            faker.random.number( 10000 ),
            faker.random.number( 10000 )
          ]
        },
      } )
    },

    seeds ( server ) {
      server.createList( 'expense', 10 ),
        server.createList( 'money', 3 )
    },

    routes () {
      this.namespace = 'api'
      this.timing = 750

      this.get( '/expenses' )
      this.get( '/money' )

      this.namespace = ''
      this.passthrough()
    }
  } )

  return server
}