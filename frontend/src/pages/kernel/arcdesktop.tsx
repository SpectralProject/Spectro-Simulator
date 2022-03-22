import { Text, Flex, Spacer, Box, Grid, useDisclosure, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import type { NextPage } from 'next'
import React from 'react'
import useScrollBlock from '../../components/scroll_block'
import ArcWindow from '../../components/arcwindow'
import { Circle, CircleFill } from 'react-bootstrap-icons'

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

// TODO: abstract windowing in window manager. Each workspace should have its own dock, grid of widgets/apps, app drawer for all the available apps (and windows that can be opened or closed)
const TestWindow = () => {
    const [closed, setClosed] = React.useState(false)

    const handleClose = () => {
        setClosed(true)
    }

    const header = (
        <Flex flexDir="row">
            <CircleFill color='green' />
            <Text ml="1rem">Umbral Word</Text>
        </Flex>
    )
    const content = (
        <Flex flexDir="column" h="100%">
            <Text>Font: Verdanta</Text>
        </Flex>
    )
    return closed ? (
        null
    ) : <ArcWindow header_box={header} content_box={content} close_callback={handleClose} />
}

const DesktopEnv: NextPage = () => {
    const [blockScroll, allowScroll] = useScrollBlock()
    blockScroll()

    return (
        <>
            <Flex flexDir="column" maxH="100vh" h="100vh" color="white" bgColor="grey">
                <__Modal />
                <Box id="workspaces">
                    <Grid>
                        This is a widget
                    </Grid>
                </Box>
                <TestWindow />
            </Flex>
        </>
    )
}

export default DesktopEnv
