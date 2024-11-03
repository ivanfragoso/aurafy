import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import Particles from "./ui/particles";

export interface AuraBackgroundProps {
    colors: string[];
    color?: string | null;
}

export default function AuraBackground({ color, colors }: AuraBackgroundProps) {
    const motionColor = useMotionValue(colors[0]);
    const backgroundImage = useMotionTemplate`radial-gradient(150% 175% at 50% 0%, #0a0a0a 50%, ${motionColor})`;

    useEffect(() => {
        animate(motionColor, color || colors[0], {
            ease: "easeInOut",
            duration: 2,
        });
    }, [color, colors, motionColor]);

    useEffect(() => {
        if (!color) {
            const animation = animate(motionColor, colors, {
                ease: "easeInOut",
                duration: 20,
                repeat: Infinity,
                repeatType: "mirror",
            });
            return () => animation.stop();
        }
    }, [colors, motionColor, color]);

    return (
        <>
            <motion.div
                className="w-full h-full absolute"
                style={{ backgroundImage }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                }}
            />
            <Particles className="absolute inset-0" color={"#ffffff"} refresh />
        </>
    );
}
