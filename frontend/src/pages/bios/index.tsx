import { Text, Flex, Spacer, Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import SpectroLogo from "../public/img/SpectroLogo.png"

const Main: NextPage = () => {
    return (
        <>
            <Flex flexDir="column">
                <Box w="100%" textAlign="center" p="1rem">
                    <Text>Spectral BIOS v1</Text>
                </Box>
                <Flex flexDir="row" p="2rem">
                    <Flex id="spectral-bios-sidebar" flexDir="column">
                        <Text>SETTINGS</Text>
                        <Text>OVERCLOCK</Text>
                        <Text>UPGRADE BIOS</Text>
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

                    <Flex flexDir="column">
                        <Text>Peripherals</Text>
                        {/* peripherals here */}
                        <Text>USB</Text>
                    </Flex>
                </Flex>
                {/* Could put a footer and disclaimer for the bios here */}
            </Flex>

        </>
    )
}

export default Main
