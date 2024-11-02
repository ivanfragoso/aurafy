import { useState } from "react";
import { motion, useMotionTemplate } from "framer-motion";

interface AuraSphereProps {
    gradientColors: string[]
    btnClick: () => void
}

export default function AuraSphere({ gradientColors, btnClick }: AuraSphereProps) {
    const [isHovered, setIsHovered] = useState(false);
    const glowColor = gradientColors[1] || "rgba(255, 255, 255, 0.6)";

    const radialBackgroundImage = useMotionTemplate`radial-gradient(circle, ${gradientColors[0]} 10%, ${gradientColors[1]} 40%, ${gradientColors[2]} 70%)`;

    return (
        <motion.div
            className="z-10 w-[200px] h-[200px] md:w-[270px] md:h-[270px] lg:w-[375px] lg:h-[375px] hover:cursor-pointer"
            style={{
                backgroundImage: radialBackgroundImage,
                borderRadius: "50%",
                filter: "blur(30px)",
                border: isHovered ? `8px solid ${glowColor}` : "8px solid transparent",
                boxShadow: isHovered
                    ? `0 0 30px 15px ${glowColor}`
                    : "0 0 0px 0px transparent",
                transition: "border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            }}
            onClick={() => btnClick()}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
                opacity: 1,
                scale: [0.9, 1, 0.9],
            }}
            transition={{
                opacity: { duration: 1, ease: "easeInOut" },
                scale: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "loop" },
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
        </motion.div>
    )
}