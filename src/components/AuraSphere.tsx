import { motion, useMotionTemplate } from "framer-motion";

interface AuraSphereProps {
    gradientColors: string[]
}
export default function AuraSphere({gradientColors}: AuraSphereProps) {
    const radialBackgroundImage = useMotionTemplate`radial-gradient(circle, ${gradientColors[0]} 10%, ${gradientColors[1]} 40%, ${gradientColors[2]} 70%)`
    /* 375px shoud lbe */

    return (
        <motion.div
            className="z-10 w-[200px] h-[200px] md:w-[270px] md:h-[270px] lg:w-[375px] lg:h-[375px]"
            style={{
                backgroundImage: radialBackgroundImage,
                borderRadius: "50%",
                filter: "blur(30px)",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
                opacity: 1,
                scale: [0.9, 1, 0.9],
            }}
            transition={{
                opacity: { duration: 1, ease: "easeInOut" },
                scale: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "loop" },
            }}
        >
        </motion.div>
    )

}