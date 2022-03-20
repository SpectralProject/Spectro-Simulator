//@ts-nocheck
import { useState, useRef, useEffect } from 'react'

/* CREDIT: https://codepen.io/jkasun/pen/QrLjXP */

import { Box } from '@chakra-ui/react'

// TODO: I think the prev did it for every element
// just have to do it for a single element

export default function ArcWindow({ header, content }) {
    var handleDoubleClick

    initDragElement()
    // ! doesnt work, need to use ref={child} or something
    handleDoubleClick = initResizeElement()

    // var prevX, prevY

    function initDragElement(popup_ref, popup_header_ref) {
        var pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0
        // * basically pass the ref of popup to this 
        var popups = document.getElementsByClassName("popup")
        var elmnt = null
        var currentZIndex = 100

        for (var i = 0; i < popups.length; i++) {
            var popup = popups[i]
            var header = getHeader(popup)

            popup.onmousedown = function () {
                this.style.zIndex = "" + ++currentZIndex
            }

            if (header) {
                header.parentPopup = popup
                header.onmousedown = dragMouseDown
            }
        }

        function dragMouseDown(e) {
            // STOP PROPAGATING
            e.stopPropagation()
            elmnt = this.parentPopup
            elmnt.style.zIndex = "" + ++currentZIndex

            e = e || window.event
            // get the mouse cursor position at startup:
            pos3 = e.clientX
            pos4 = e.clientY
            document.onmouseup = closeDragElement
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag
        }

        function elementDrag(e) {
            if (!elmnt) {
                return
            }

            e = e || window.event
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX
            pos2 = pos4 - e.clientY
            pos3 = e.clientX
            pos4 = e.clientY
            // set the element's new position:
            elmnt.style.top = elmnt.offsetTop - pos2 + "px"
            elmnt.style.left = elmnt.offsetLeft - pos1 + "px"
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null
            document.onmousemove = null
        }

        function getHeader(element) {
            var headerItems = element.getElementsByClassName("popup-header")

            if (headerItems.length === 1) {
                return headerItems[0]
            }

            return null
        }
    }
    function initResizeElement(popup_ref, popup_header_ref) {
        var popups = document.getElementsByClassName("popup")
        var element = null
        var startX, startY, startWidth, startHeight
        var prevX, prevY

        for (var i = 0; i < popups.length; i++) {
            var p = popups[i]

            var right = document.createElement("div")
            right.className = "resizer-right"
            p.appendChild(right)
            right.addEventListener("mousedown", initDrag, false)
            right.parentPopup = p

            var bottom = document.createElement("div")
            bottom.className = "resizer-bottom"
            p.appendChild(bottom)
            bottom.addEventListener("mousedown", initDrag, false)
            bottom.parentPopup = p

            var both = document.createElement("div")
            both.className = "resizer-both"
            p.appendChild(both)
            both.addEventListener("mousedown", initDrag, false)
            both.parentPopup = p
        }

        function initDrag(e) {
            element = this.parentPopup

            startX = e.clientX
            startY = e.clientY
            startWidth = parseInt(
                document.defaultView.getComputedStyle(element).width,
                10
            )
            startHeight = parseInt(
                document.defaultView.getComputedStyle(element).height,
                10
            )
            document.documentElement.addEventListener("mousemove", doDrag, false)
            document.documentElement.addEventListener("mouseup", stopDrag, false)
        }

        function doDrag(e) {
            element.style.width = startWidth + e.clientX - startX + "px"
            element.style.height = startHeight + e.clientY - startY + "px"
            // TODO: idk i think we have local vars in ArcWindow
            // since this entire function gets called each time we open a new window
            prevX = element.style.width
            prevY = element.style.height
        }

        function handleDoubleClick() {
            if (element.style.height == 300 && element.style.width == 600) {
                element.style.width = prevX
                element.style.height = prevY
            }
            else {
                element.style.height = 300
                element.style.width = 600
            }
        }

        function stopDrag() {
            document.documentElement.removeEventListener("mousemove", doDrag, false)
            document.documentElement.removeEventListener("mouseup", stopDrag, false)
        }

        return handleDoubleClick
    }

    return (
        <>
            <Box className="popup">
                <Box className='popup-header' onDoubleClick={handleDoubleClick}>
                    {header}
                </Box>
                <Box>
                    {content}
                </Box>
            </Box>
        </>
    )
}