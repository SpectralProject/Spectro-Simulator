import { Box } from '@chakra-ui/react'
import React from 'react'

function WorkspaceManager() {
    const [workspaces, setWorkspaces] = React.useState([])
    // the active workspace is 0th by default. Let them change this val
    const [activeWorkspaceIndex, setActiveWorkspaceIndex] = React.useState(0)
    // ?maybe create a workspace and pass the workspaces down first

    // pass down to active workspace all the possible workspaces. Have it render them in the top right sidebar
    return (
        <>
            {workspaces[activeWorkspaceIndex]}
        </>
    )
}

import ArcApp from '../apps'

// represents an entire desktop grid + app drawer + dock + opened windows and their locations and statuses (opened or minimised)
function Workspace() {
    // grid. Including a sidebar to scroll and change workspaces. Pass up to Workspace manager to change to another workspace id
    const DesktopGrid = () => <></>
    // app drawer
    // basically a list of ascending order in name of ArcApps. Drawn as a grid
    const [apps, setApps] = React.useState([])

    // dock
    const [dockApps, setDockApps] = React.useState([])

    // opened windows -> window manager. Desktop grid and dock need to communicate with manager
    let win_manager = WinManager

    return (
        <>
            <DesktopGrid />
        </>
    )
}

// TODO: initialise with a few windows including the main DE window/desktop (workspace)
// each workspace contains a set of its own desktop widgets on a 21x9 grid. And a dock with at most 10 pinned or opened windows. Extra windows are scrollable horizontally
function WinManager() {
    // for each 'opened' window, it is either "live" or "minimised"
    // unopened windows are irrelevant
    enum WindowStatus {
        live, minimised
    }



    return (
        <Box>Window Manager</Box>
    )
}

export default WorkspaceManager