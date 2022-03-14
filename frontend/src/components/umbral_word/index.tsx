import { Flex } from "@chakra-ui/react"
import React from "react"
import ArcWindow from "../window"

// should latch onto window and render it there
// {...{ titleWidgets: null, contentWidgets: null }}
export default function UmbralApp() {

    const title_ = (
        <>
            Umbral Word
        </>
    )

    const content_ = (
        <>
            <Flex>
                H1, Bold, Font Selection, Font Size
            </Flex>
            <Flex>
                Write something...
            </Flex>
        </>
    )

    return (
        <>
            <ArcWindow titleWidgets={title_} contentWidgets={null} />
        </>
    )
}
