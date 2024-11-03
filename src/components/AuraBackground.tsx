import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import Particles from "./ui/particles";

export interface AuraBackgroundProps {
    colors: string[];
    color?: string | null;
}

export default function AuraBackground({ color, colors }: AuraBackgroundProps) {
    const auraColor = color ? color : colors[0]

    const motionColor = useMotionValue(auraColor)
    const backgroundImage = useMotionTemplate`radial-gradient(150% 175% at 50% 0%, #0a0a0a 50%, ${motionColor})`

    useEffect(() => {
        animate(motionColor, colors, {
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            duration: 20,
        });
    }, [colors, motionColor])

    return (
        <>
            <motion.div
                className="w-full h-full absolute"
                style={{
                    backgroundImage: backgroundImage,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                }}
            />
            <Particles
                className="absolute inset-0"
                color={"#ffffff"}
                refresh
            />
        </>
    );
}
