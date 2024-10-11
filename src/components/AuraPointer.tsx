import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface AuraPointerProps {
    text?: string
    pointerClick?: () => void
}
export default function AuraPointer({ text, pointerClick }: AuraPointerProps) {
    const cursorSize = 96
    const [isClicked, setIsClicked] = useState(false)

    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0)
    }

    const smoothOptions = {damping: 20, stiffness: 700, mass: 0.5}
    const smoothMouse = {
        x: useSpring(mouse.x, smoothOptions),
        y: useSpring(mouse.y, smoothOptions)
    }

    const manageMouseMove = (e) => {
        const { clientX, clientY } = e
        mouse.x.set(clientX - cursorSize / 2)
        mouse.y.set(clientY - cursorSize / 2)
    }

    const handleMouseDown = () => {
        setIsClicked(true)

        if (pointerClick) {
            pointerClick()
        }
    };

    const handleMouseUp = () => setIsClicked(false)
  
    useEffect(() => {
      window.addEventListener("mousemove", manageMouseMove)
      window.addEventListener("mousedown", handleMouseDown)
      window.addEventListener("mouseup", handleMouseUp)
  
      return () => {
        window.removeEventListener("mousemove", manageMouseMove)
        window.removeEventListener("mousedown", handleMouseDown)
        window.removeEventListener("mouseup", handleMouseUp)
      };
    }, [])

    return (
        <motion.div
            className="cursor w-24 h-24 rounded-full absolute pointer-events-none border-2 border-white z-10 p-3 flex justify-center items-center"
            style={{
                left: smoothMouse.x,
                top: smoothMouse.y,
            }}
            animate={{
                scale: isClicked ? 1.2 : 1,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
            <span className="text-sm text-center">{text}</span>
        </motion.div>
    );
}
