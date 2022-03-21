// STUFF TO HANDLE APP METADATA AND LOGIC
// TECHNICALLY IN OLDER OPS EACH APP CAN HAVE 0 or MORE WINDOWS
// BUT IN ARC DE ALL ARC APPS MUST BE A SINGLE EXECUTABLE ELF64 and USE ARCWIN API
// AND CAN ONLY HAVE 1 DEFAULT, MAIN WINDOW. Extra WINDOWS CAN BE AND SHOULD BE OPENED VIA IMGUI TYPE DIALOGUES
// EACH APP CAN HAVE 0 OR MORE WINDOW INSTANCES AT THE SAME TIME
// YOU CAN SPECIFY HOW MANY WINDOW INSTANCES MAX. TO HAVE

import React from 'react'

interface ArcAppProps {
    max_instances: number,
    // pointer/ref to the specific ArcWindow config. E.g. in umbral_word.window
    default_window: any
}

function ArcApp() {
    return (
        <div>This is an Arc App</div>
    )
}

export default ArcApp