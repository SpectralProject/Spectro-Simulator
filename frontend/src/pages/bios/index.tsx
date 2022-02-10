import { Text, Flex, Spacer, Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Link from 'next/link'

const BiosMain: NextPage = () => {
    return (
        <>
            <Flex flexDir="column" maxH="100vh" h="100vh">
                <Box w="100%" textAlign="center" p="1rem" fontSize="3xl">
                    <Text>Spectral BIOS v1</Text>
                </Box>
                <Flex flexDir="row" h="100%" w="100%">
                    <Flex id="spectral-bios-sidebar" flexDir="column" justifyContent="space-evenly" fontSize="2xl" p="1rem" ml="1.5rem">
                        <Text>SETTINGS</Text>
                        <Text>OVERCLOCK</Text>
                        <Text>BIOS UPDATE [NONE]</Text>
                        <Box color="#013d0d" fontWeight="bold" bgColor="#e1e6e2" borderRadius={20} textAlign="center">
                            <Link href="arcboot">RUN ARCBOOT</Link>
                        </Box>
                    </Flex>

                    <Flex id="hardware-details" flexDir="row" justifyContent="space-between" w="100%" p="2rem">
                        <Flex flexDir="column">
                            <Text>Hardware</Text>
                        </Flex>

                        <Flex flexDir="column">
                            <Text>Drives</Text>

                        </Flex>

                        <Flex flexDir="column" justifyContent="flex-start">
                            <Box>
                                <Text>Peripherals</Text>
                            </Box>
                            <Box mb="2rem" />
                            {/* peripherals here */}
                            <Text>USB</Text>
                        </Flex>
                    </Flex>
                </Flex>
                {/* Could put a footer and disclaimer for the bios here */}
            </Flex>

        </>
    )
}

export default BiosMain
