import { Text, Flex, Spacer, Box, Image } from '@chakra-ui/react'
import type { NextPage } from 'next'
import React from 'react'
import { useRouter } from 'next/router'

const ArcbootMain: NextPage = () => {
    const [loaded, setLoaded] = React.useState(false)
    const router = useRouter()

    const redirectKernel = () => {
        router.push("../kernel")
    }
    // set loaded after 10s
    // setTimeout(() => setLoaded(true), 10000)

    return (
        <>
            <Flex flexDir="column" justifyContent="space-between" h="100vh">
                <Box textAlign="left" p="1rem">
                    <Text>Arcboot v1</Text>
                </Box>

                <Flex flexDir="column">
                    <Flex flexDir="row" p="2rem">
                        <Flex flexDir="column" alignItems="center" textAlign="center" w="100%">
                            <Image src="img/SpectroLogo.png" h="10rem" />
                            {/* <img src="img/SpectroLogo.png" height="1rem"/> */}
                            <Text>Starting Up...</Text>
                        </Flex>
                    </Flex>

                    {/* Should be no bigger than 25rem, should scroll when overflow y */}
                    <Flex id="logger" flexDir="column" textAlign="center" alignContent="center" overflowY="scroll" maxH="12rem">
                        <Box>
                            Fast Boot <Box color="red">[Disabled]</Box>
                        </Box>
                        <Box>
                            Verbose <Box color="green">[Enabled]</Box>
                        </Box>

                        Waiting for all devices ACK and ready - 100% [10 Devices Ready, 1 Did Not Respond]<br />
                        Loading Arcdrivers - 100%<br />
                        Finding multiboot compliant kernel images - 100% [Found 1]<br />
                        <Spacer mb="1rem" />
                        Loading OS [Quantii] - 99%
                        {
                            loaded && redirectKernel()
                        }
                    </Flex>
                </Flex>

                <Box p="1rem">
                    <Text>Neutron Duck says: Quack, Starting!</Text>
                </Box>

            </Flex>

        </>
    )
}

export default ArcbootMain
