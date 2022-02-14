import { Text, Flex, Spacer, Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import React from 'react'

const DesktopEnv: NextPage = () => {
    return (
        <>
            <Flex flexDir="column" maxH="100vh" h="100vh" color="black">
                <Box w="100%" textAlign="center" p="1rem" fontSize="3xl">
                    <Text>Welcome to ArcDesktop!</Text>
                </Box>
            </Flex>
        </>
    )
}

export default DesktopEnv
