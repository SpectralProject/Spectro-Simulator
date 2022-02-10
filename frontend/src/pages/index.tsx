import { Flex, Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <Flex w="100vw" h="100vh" flexDir="row" justifyContent="space-around" alignItems="center">
        <Box bgColor="black" color="white" borderRadius={20} p="1rem">
          <Link href='/bios'>Boot Full Machine</Link>
        </Box>
        <Box bgColor="black" color="white" borderRadius={20} p="1rem">
          <Link href='/simulator'>Simulate CPU</Link>
        </Box>
      </Flex>
    </>
  )
}
export default Home
