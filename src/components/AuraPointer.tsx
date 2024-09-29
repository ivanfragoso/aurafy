import { CodeSandboxLogoIcon } from "@radix-ui/react-icons";
import chroma from "chroma-js";
import { animate, motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export interface AuraPointerProps {
    colors: string[];
    color?: string | null;
    stickyElement?: any;
}

export default function AuraPointer({ color, colors, stickyElement }: AuraPointerProps) {
    const auraColor = color ? color : colors[0]

    const [isHovered, setIsHovered] = useState(false)
    const motionColor = useMotionValue(auraColor)
    const boxShadowColor = useMotionTemplate`${motionColor}  0px 0px 30px 10px`

    const cursorSize = isHovered ? 64 : 32 /* w-8 */

    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0)
    }

    const smoothOptions = {damping: 20, stiffness: 700, mass: 0.5}
    const smoothMouse = {
        x: useSpring(mouse.x, smoothOptions),
        y: useSpring(mouse.y, smoothOptions)
    }

    const manageMouseOver = () => {
        stickyElement.current.style.boxShadow = `${motionColor}  0px 0px 30px 10px`
        setIsHovered(true)
    }

    const manageMouseLeave = () => {
        setIsHovered(false)
    }

    const manageMouseMove = (e) => {
        const { clientX, clientY } = e
        mouse.x.set(clientX - cursorSize / 2)
        mouse.y.set(clientY - cursorSize / 2)
    }

    useEffect(() => {
        window.addEventListener('mousemove', manageMouseMove)
        stickyElement.current.addEventListener("mouseover", manageMouseOver)
        stickyElement.current.addEventListener("mouseleave", manageMouseLeave)

        return () => {
            window.removeEventListener('mousemove', manageMouseMove)
            stickyElement.current.removeEventListener("mouseover", manageMouseOver)
            stickyElement.current.removeEventListener("mouseleave", manageMouseLeave)
        }
    }, []);

    useEffect(() => {
        animate(motionColor, colors, {
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            duration: 20,
        });
    }, [colors, motionColor])

    return (
        <motion.div
        className="cursor w-8 h-8 rounded-full absolute pointer-events-none bg-white z-30"
        style={{
          left: smoothMouse.x,
          top: smoothMouse.y,
          boxShadow: boxShadowColor,
          backgroundColor: "#ededed"
        }}
        animate={{width: cursorSize, height: cursorSize}}
      ></motion.div>
    );
}
