import { Text, Flex, Spacer, Box, Grid, useDisclosure, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import type { NextPage } from 'next'
import React from 'react'
import useScrollBlock from '../../components/scroll_block'
import WorkspaceManager from '../../components/workspaces'


const DesktopEnv: NextPage = () => {
  const [blockScroll, allowScroll] = useScrollBlock()
  // blockscroll on desktop itself
  blockScroll()

  return (
    <>
      <Flex flexDir="column" maxH="100vh" h="100vh" color="white" bgColor="grey">
        <Flex id="top-bar" w="100%" flexDir="row" justifyContent="space-between">
          <Flex id="quick-icons" ml="2rem">Wifi Bluetooth Location</Flex>
          <Flex id="quick-info" mr="2rem">Weather</Flex>
        </Flex>
        <Box id="workspace-manager">
          <WorkspaceManager/>
        </Box>
      </Flex>
    </>
  )
}

export default DesktopEnv
