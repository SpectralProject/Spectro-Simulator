import { Text, Flex, Spacer, Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Link from 'next/link'

const SimulatorMain: NextPage = () => {

    return (
        <>
            <Flex flexDir="column" maxH="100vh" h="100vh" backgroundColor="grey" color="white">
                <Box w="100%" textAlign="center" p="1rem" fontSize="3xl">
                    <Text>Spectral Sim</Text>
                </Box>
                <Box textAlign="center" bgColor="black" borderRadius={20}>
                    <Link href="simulator/hardware">Go to Hardware</Link>
                </Box>
                <Flex flexDir="row" p="2rem" h="100%" justifyContent="space-around">
                    <Flex flexDir="column">
                        <Text>Assembly Code</Text>
                        <Box mb="1rem" />
                        <Box id="asm-code-area">
                            loadi x0, 0x1
                        </Box>
                    </Flex>
                    <Flex flexDir="column">
                        <Text>INT64 Registers</Text>
                    </Flex>
                    <Flex flexDir="column">
                        <Text>FLOAT32 Registers</Text>
                    </Flex>
                    <Flex flexDir="column">
                        <Text>RAM</Text>
                    </Flex>
                </Flex>
            </Flex>

        </>
    )
}

export default SimulatorMain
