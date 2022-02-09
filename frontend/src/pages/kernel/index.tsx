// ASSUME ARCBOOT DRIVERS LOADED
// LOAD HIGHER ORDER DRIVERS
// LOAD A COMMAND LINE

import { Text, Flex, Spacer, Box } from '@chakra-ui/react'
import type { NextPage } from 'next'

const KernelEntry: NextPage = () => {
    return (
        <>
            <Flex flexDir="column" maxH="100vh" h="100vh" backgroundColor="grey" color="white">
                <Box w="100%" textAlign="center" p="1rem" fontSize="3xl">
                    <Text>Arcterm</Text>
                </Box>
                <Flex flexDir="row" p="2rem" h="100%">
                    {'>'}
                </Flex>
            </Flex>

        </>
    )
}

export default KernelEntry
