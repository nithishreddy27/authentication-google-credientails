import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='min-h-screen'>

      <form action="./api/data" method="post">

          <label htmlFor="name">Enter Name </label>
          <input type="text" name="name" id="name" />


          <label htmlFor="age"> Enter Age </label>
          <input type="text" name="age" id="age" />

          <input type="submit" value="submit" />

      </form>
    </div>
  )
}
