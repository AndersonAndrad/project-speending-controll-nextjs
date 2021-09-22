import { IoIosArrowDropdown, IoIosArrowDropup, IoIosTrendingUp, IoMdCreate, IoMdDownload, IoMdTrash } from 'react-icons/io'

import dynamic from 'next/dynamic'
import { options } from '../config/graph.config'
import styles from '../styles/Home.module.scss'

const Chart = dynamic( () => import( 'react-apexcharts' ), { ssr: false } )

export default function Home () {

  const series = [{
    name: 'Input',
    data: [1, 10, 15]
  },
  {
    name: 'Without',
    data: [11, 32, 19]
  },
  {
    name: 'Current',
    data: [1, 10, 15]
  }
  ]

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.header}>
          <div className={styles.leftHeaderContent}>
            <h1>Money</h1>
            <section className={styles.money}>
              <h2><IoIosTrendingUp size={'24px'} /> R$19.000,00</h2>
              <div>
                <h3 className={styles.without}><IoIosArrowDropup size={'24px'} /> R$20.000,00</h3>
                <h3 className={styles.input}> <IoIosArrowDropdown size={'24px'} /> R$1.000,00</h3>

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
            <tr>
              <td>asdf</td>
              <td>asdf</td>
              <td>asdf</td>
              <td>asdf</td>
              <td>asdf</td>
              <td>asdf</td>
              <td>asdf</td>
              <td>asdf</td>
              <td>
                <button className={styles.edit}><IoMdCreate color={'#fff'} size={'24px'} /></button>
                <button className={styles.delete}><IoMdTrash color={'#262626'} size={'24px'} /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
