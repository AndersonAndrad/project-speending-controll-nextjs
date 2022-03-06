import { Factory, Model, createServer } from "miragejs"

import faker from 'faker'

type Transaction = {
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
      transaction: Model.extend<Partial<Transaction>>( {} ),
      money: Model.extend<Partial<Money>>( {} ),
      game: Model.extend<Partial<Transaction>>( {} )
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
          return 'games'
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
      } ),
      game: Factory.extend( {
        title () {
          return faker.name.firstName()
        },
        description () {
          return faker.lorem.sentence()
        },
        category () {
          return 'games'
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
          return 'outcome'
        }
      } )
    },

    seeds ( server ) {
      server.createList( 'transaction', 2 )
      server.createList( 'money', 3 )
      server.createList( 'game', 4 )
    },

    routes () {
      this.namespace = 'api'
      this.timing = 750

      this.get( '/transactions/:id' )

      this.get( '/transactions' )

      this.delete( '/transactions/:id' )

      this.post( '/transactions', ( schema, request ) => {
        const transaction = JSON.parse( request.requestBody )

        return schema.create( 'transaction', { ...transaction, createdAt: new Date() } )
      } )

      this.patch( 'transactions/:id', ( schema, request ) => {
        const updatedTransaction = JSON.parse( request.requestBody )
        const transaction = schema.find( 'transaction', request.params.id )

        return transaction?.update( updatedTransaction )
      } )

      this.get( '/money' )

      this.namespace = ''
      this.passthrough()
    }
  } )

  return server
}