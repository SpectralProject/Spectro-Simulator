import { Text, Flex, Spacer, Box, Grid } from '@chakra-ui/react'
import type { NextPage } from 'next'
import React from 'react'
import ArcWindow from '../../components/arcwin'
import useScrollBlock from '../../components/scroll_block'
import { Rnd } from 'react-rnd'

const DesktopEnv: NextPage = () => {
    const [blockScroll, allowScroll] = useScrollBlock()
    blockScroll()

    const [contentOver, setContentOver] = React.useState(false)
    const handleMouseOverContent = () => setContentOver(true)
    const handleMouseOut = () => setContentOver(false)

    // const handleContentDrag = () => false

    return (
        <>
            <Flex flexDir="column" maxH="100vh" h="100vh" color="white" bgColor="grey">
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
                {/* PLACE WINDOW LOGIC HERE. ALSO WHERE BOTTOM DOCK LIVES USUALLY 
                the header is the container row before the X on the right. The entire header is spaced [A A]*/}
                {/* <ArcWindow header={null} content={null} /> */}
                {/* TODO: hook onto double click on the header and tell Rnd to resize */}
                <Rnd
                    default={{
                        x: 0,
                        y: 0,
                        width: 320,
                        height: 200,
                    }}
                    minWidth={300}
                    minHeight={150}
                    enableUserSelectHack={false}
                    disableDragging={contentOver}
                >
                    <Box bgColor="orange" cursor="default" h="100%" w="100%">
                        <Box userSelect="none" className='header' pl="1rem" pt="0.5rem">
                            Header
                        </Box>
                        {/* draggable="false" doesnt work */}
                        {/* TODO: if trying to drag content, return; */}
                        <Box cursor="default" color="black" className='content' onMouseEnter={handleMouseOverContent} onMouseLeave={handleMouseOut} bgColor="orange.50" p="0.5rem">
                            Content
                        </Box>
                    </Box>
                </Rnd>
            </Flex>
        </>
    )
}

export default DesktopEnv
