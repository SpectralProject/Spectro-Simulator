import { Text, Flex, Spacer, Box } from '@chakra-ui/react'
import type { NextPage } from 'next'

const LoginManager: NextPage = () => {
    return (
        <>
            <Flex flexDir="column" maxH="100vh" h="100vh" color="black">
                <Box w="100%" textAlign="center" p="1rem" fontSize="3xl">
                    <Text>Login</Text>
                </Box>
            </Flex>

        </>
    )
}

export default LoginManager
