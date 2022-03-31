import { Box } from '@chakra-ui/react'
import React from 'react'

// render the widget, usually just an icon or a large icon/animated gif or preview of a window
function Widget(location: [number, number], size: [number, number]) {
  return (
    <>
      {location}
      {size}
    </>
  )
}

// default docked apps, browser, umbral suite, app drawer
let defaultDock = []

// store user's workspaces, like any other phone
// by default, has two workspaces, the first one with a browser widget and the second empty
let userWorkspaces = []

// create a new workspace, usually just an empty one with the default docked apps
function createWorkspace() {
  return <Workspace />
}

function WorkspaceManager() {
  // use user preferences and settings to setup their default workspaces
  // so a list of docked apps, and list of widgets (and their locations + sizes)
  function setupWorkspaces() {

  }

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
function Workspace(dockedApps: []) {
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

interface DockProps {
  favoritedApps: []
}

const Dock = ({ favoritedApps }: DockProps) => {
  // Dock contains a list of 'favorited' apps by the workspace and a list of opened apps
  // if an app has 2 or more instances, render a number on the top right of the app icon
  // Prioritise opened apps first. Render them left to right with x scroll
  return (
    <>
      {favoritedApps.map(f => (
        <>
          {f}
        </>
      ))}
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

  const [liveWindows, setLiveWindows] = React.useState([])

  return (
    <Box>
      Window Manager
      {liveWindows.map(w => (
        <>
          {/* if w.live is true, render window. Else dont */}
          {w}
        </>
      ))}
    </Box>
  )
}

export default WorkspaceManager