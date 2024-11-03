import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import Particles from "./ui/particles";

export interface AuraBackgroundProps {
    colors: string[];
    color?: string | null;
}

export default function AuraBackground({ color, colors }: AuraBackgroundProps) {
    const motionColor = useMotionValue(colors[0]); // Iniciar con el primer color
    const backgroundImage = useMotionTemplate`radial-gradient(150% 175% at 50% 0%, #0a0a0a 50%, ${motionColor})`;
    const colorIndex = useRef(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (color) {
            animate(motionColor, color, {
                ease: "easeInOut",
                duration: 2,
            });

            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        } else if (colors.length > 0) {
            if (!intervalRef.current) {
                animate(motionColor, colors[0], {
                    ease: "easeInOut",
                    duration: 2,
                });

                intervalRef.current = setInterval(() => {
                    const nextColorIndex = (colorIndex.current + 1) % colors.length;
                    animate(motionColor, colors[nextColorIndex], {
                        ease: "easeInOut",
                        duration: 2,
                    });
                    colorIndex.current = nextColorIndex;
                }, 2000);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [color, colors, motionColor]);

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
