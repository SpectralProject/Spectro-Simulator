import { Text, Flex, Spacer, Box } from '@chakra-ui/react'
import type { NextPage } from 'next'

const HardwareView: NextPage = () => {
    return (
        <>
            <Flex flexDir="column" maxH="100vh" h="100vh" backgroundColor="grey" color="white">
                <Box w="100%" textAlign="center" p="1rem" fontSize="3xl">
                    <Text>Spectral Hardware</Text>
                </Box>
                <Flex flexDir="row" p="2rem" h="100%" justifyContent="space-around">
                    BOARD, CONNECTED PERIPERALS, HARDWARE
                </Flex>
            </Flex>

        </>
    )
}

export default HardwareView
