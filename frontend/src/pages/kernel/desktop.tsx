import { Text, Flex, Spacer, Box, Grid } from '@chakra-ui/react'
import type { NextPage } from 'next'
import React from 'react'
import ArcWindow from '../../components/arcwin'
import useScrollBlock from '../../components/scroll_block'

const DesktopEnv: NextPage = () => {
    const [blockScroll, allowScroll] = useScrollBlock()
    blockScroll()

    return (
        <>
            <Flex flexDir="column" maxH="100vh" h="100vh" color="black">
                <Box w="100%" textAlign="center" p="1rem" fontSize="3xl">
                    <Text>Welcome to ArcDesktop!</Text>
                </Box>
                <Box id="workspaces">
                    {/* only render the current workspace with dot */}
                    {/* LIST OF APPS AND WIDGETS ON A GRID */}
                    <Grid>
                        This is a widget
                    </Grid>
                </Box>
                {/* PLACE WINDOW LOGIC HERE. ALSO WHERE BOTTOM DOCK LIVES USUALLY */}
                <ArcWindow header={null} content={null} />
            </Flex>
        </>
    )
}

export default DesktopEnv
