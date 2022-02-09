import { Text, Flex, Spacer, Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Link from 'next/link'

const BiosMain: NextPage = () => {
    return (
        <>
            <Flex flexDir="column" maxH="100vh" h="100vh" backgroundColor="grey" color="white">
                <Box w="100%" textAlign="center" p="1rem" fontSize="3xl">
                    <Text>Spectral BIOS v1</Text>
                </Box>
                <Flex flexDir="row" p="2rem" h="100%">
                    <Flex id="spectral-bios-sidebar" flexDir="column" justifyContent="center" backgroundColor="black" fontSize="2xl">
                        <Text mb="4rem">SETTINGS</Text>
                        <Text mb="4rem">OVERCLOCK</Text>
                        <Text mb="4rem">UPGRADE BIOS</Text>
                        <Link href="../arcboot">RUN ARCBOOT</Link>
                    </Flex>
                    <Spacer />

                    <Flex flexDir="column">
                        <Text>Hardware</Text>
                    </Flex>
                    <Spacer />

                    <Flex flexDir="column">
                        <Text>Drives</Text>

                    </Flex>
                    <Spacer />

                    <Flex flexDir="column" justifyContent="flex-start">
                        <Box>
                            <Text>Peripherals</Text>
                        </Box>
                        <Box mb="2rem" />
                        {/* peripherals here */}
                        <Text>USB</Text>
                    </Flex>
                </Flex>
                {/* Could put a footer and disclaimer for the bios here */}
            </Flex>

        </>
    )
}

export default BiosMain
