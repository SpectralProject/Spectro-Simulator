import { Text, Flex, Spacer, Box, Grid, useDisclosure, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import type { NextPage } from 'next'
import React from 'react'
import useScrollBlock from '../../components/scroll_block'
import { Rnd } from 'react-rnd'

function __Modal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button maxW="10rem" onClick={onOpen} color="orange">Open Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Box w="100%" textAlign="center" p="1rem" fontSize="3xl">
                            <Text>Welcome to ArcDesktop!</Text>
                        </Box>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

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

                <__Modal />
                <Box id="workspaces">
                    <Grid>
                        This is a widget
                    </Grid>
                </Box>
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
                    <Box bgColor="orange" cursor="default" h="100%" w="100%" p="0.05rem" boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)">
                        <Box userSelect="none" className='header' p="0.5rem">
                            Header
                        </Box>
                        <Box cursor="default" color="black" className='content' onMouseEnter={handleMouseOverContent} onMouseLeave={handleMouseOut} bgColor="orange.50" p="0.5rem" overflow="scroll" overflowY="auto" overflowX="auto" h="70%">
                            Content
                        </Box>
                    </Box>
                </Rnd>
            </Flex>
        </>
    )
}

export default DesktopEnv
