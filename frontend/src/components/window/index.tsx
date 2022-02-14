import { Box } from "@chakra-ui/react"
import React from "react"

const ArcWindow = ({ titleWidgets, contentWidgets }: any) => {
    const [hoverCircleLeft, setHoverCircleLeft] = React.useState(false)
    const [hoverCircleRight, setHoverCircleLRight] = React.useState(false)

    return (
        <>
            {/* titlebar that can be hooked onto with custom logic and views/widgets like menus, tabs, or any other custom widget
            circular expanded stuff/3x bigger with menus laid evenly n/360 around the circle */}
            <Box className="title-bar">
                {hoverCircleLeft && <></>}
                {titleWidgets}
                {hoverCircleRight && <></>}
            </Box>
            <Box className="content-area">
                {contentWidgets}
            </Box>
        </>
    )
}

export default ArcWindow
