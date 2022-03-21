import { Flex, Box } from "@chakra-ui/react"
import { Rnd } from "react-rnd"
import { X as XIcon } from "react-bootstrap-icons"
import React from "react"

interface ArcWinProps {
    header_box: any
    content_box: any
    close_callback: any
}

export default function ArcWindow({ header_box, content_box, close_callback }: ArcWinProps) {

    const [contentOver, setContentOver] = React.useState(false)
    const handleMouseOverContent = () => setContentOver(true)
    const handleMouseOut = () => setContentOver(false)

    // TODO: hold prevx, prevy
    // onDoubleClick header, do the stuff

    return (
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
                <Flex userSelect="none" className='header' p="0.5rem" flexDir="row" justifyContent="space-between">
                    <Box>{header_box}</Box>
                    <XIcon onClick={close_callback} />
                </Flex>
                <Box cursor="default" color="black" className='content' onMouseEnter={handleMouseOverContent} onMouseLeave={handleMouseOut} bgColor="orange.50" p="0.5rem" overflow="scroll" overflowY="auto" overflowX="auto" h="70%">
                    {content_box}
                </Box>
            </Box>
        </Rnd>
    )
}