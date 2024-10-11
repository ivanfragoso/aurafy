"use client";

import chroma from "chroma-js";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionTemplate } from "framer-motion";
import axios from "axios";
import AuraCard from "@/components/AuraCard";
import FloatingText from "@/components/FloatingText";
import AuraBackground from "@/components/AuraBackground";

export default function Aura() {
    const [type, setType] = useState('')
    const [aura, setAura] = useState('')
    const [names, setNames] = useState<string[]>([])
    const [gradientColors, setGradientColors] = useState<string[]>([])
    const [backgroundColor, setBackgroundColor] = useState<string[]>([])
    const [loading, setLoading] = useState(false)

    const radialBackgroundImage = useMotionTemplate`radial-gradient(circle, ${gradientColors[0]} 10%, ${gradientColors[1]} 40%, ${gradientColors[2]} 70%)`

    const getAura = async (type: string) => {
        try {
            setLoading(true)
            const result = await axios.get('/api/aura', {
                params: { type }
            });

            if (result.status === 200) {
                setAura(result.data.aura);
                setNames(result.data.names);
            } else {
                console.error("Error getting aura");
            }
        } catch (error) {
            console.error("Error getting aura", error); // TODO: ui friendly error
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        const generatedColors = Array.from({ length: 20 }, () => chroma.random().hex());
        setBackgroundColor(generatedColors);
    }, []);

    useEffect(() => {
        (type) && getAura(type)
    }, [type]);

    useEffect(() => {
        if (aura) {
            const colorVariations = [
                chroma(aura).brighten(1).hex(),
                chroma(aura).saturate(1).hex(),
                chroma(aura).darken(1).hex(),
                aura,
            ];

            setGradientColors(colorVariations)
            setBackgroundColor([aura])
        }
    }, [aura]);

    const auraCards = [
        {
            'title': 'Based on your most recently listened artists',
            'description': 'Get your aura based on the artists you\'ve listened to most recently. This will reflect your current musical style and your personality.',
            'type': 'artists'
        },
        {
            'title': 'Based on your most recently listened tracks',
            'description': 'Get your aura based on the tracks you\'ve listened to most recently. This will reflect your current musical style and mood.',
            'type': 'tracks'
        }
    ];

    return (
        <section className="h-full" style={{backgroundColor: "#0a0a0a"}}>
            <AuraBackground colors={backgroundColor} color={aura}/>

            <AnimatePresence mode="wait">
            {aura ? (
                <div className="flex justify-center h-full items-center">

                    {/* Glowing sphere overlay */}
                    <motion.div
                        className="absolute z-10"
                        style={{
                            backgroundImage: radialBackgroundImage,
                            width: "375px",
                            height: "375px",
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

                    {/*}
                    {names.map((name, index) => {
                        const position = {
                        left: Math.random() * (100 - 10),
                        top: Math.random() * (100 - 10),
                        };
                        return <FloatingText key={index} text={name} position={position} />;
                    })}
                    */}
                </div>
            ) : (
                <motion.div 
                    key={"loading"}
                    className="h-full flex justify-center items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    <motion.div
                        className="flex flex-wrap flex-col justify-center items-center px-4 gap-2 md:flex-row md:px-0 lg:gap-4"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: loading ? 0 : 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="w-full text-center text-5xl font-bold mb-4">Make your choice</h1>
                        {auraCards.map((auraCard, index) => (
                            <AuraCard
                                key={index}
                                title={auraCard.title}
                                description={auraCard.description}
                                btnClick={() => setType(auraCard.type)}
                            />
                        ))}
                    </motion.div>

                    {loading && (
                        <motion.div
                            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                        >
                            <span className="font-bold">Fetching your aura...</span>
                        </motion.div>
                    )}
                </motion.div>
            )}

            </AnimatePresence>
        </section>
    );
}
