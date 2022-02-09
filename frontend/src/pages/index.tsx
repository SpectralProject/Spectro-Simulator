import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <Link href='/bios'>Boot Full Machine</Link>
      <Link href='/simulator'>Simulate CPU</Link>
    </>
  )
}
export default Home
