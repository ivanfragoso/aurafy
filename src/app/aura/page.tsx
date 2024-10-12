"use client";

import chroma from "chroma-js";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionTemplate } from "framer-motion";
import axios from "axios";
import AuraCard from "@/components/AuraCard";
import AuraBackground from "@/components/AuraBackground";
import AuraPointer from "@/components/AuraPointer";
import { cn } from "@/lib/utils";
import OrbitingCircles from "@/components/ui/orbiting-circles";
import AuraSphere from "@/components/AuraSphere";
import { useMediaQuery } from 'react-responsive';

export default function Aura() {
    const [type, setType] = useState('')
    const [aura, setAura] = useState('')
    const [names, setNames] = useState<string[]>([])
    const [gradientColors, setGradientColors] = useState<string[]>([])
    const [backgroundColor, setBackgroundColor] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [showNames, setShowNames] = useState(false)
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
    const isLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1280 });
    const isDesktop = useMediaQuery({ minWidth: 1280 });

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
        <section className={cn("h-full", { "cursor-none": aura })} style={{backgroundColor: "#0a0a0a"}}>
            <AuraBackground colors={backgroundColor} color={aura}/>

            <AnimatePresence mode="wait">
            {aura ? (
                <article className="flex justify-center h-full items-center">
                    {isLaptop || isDesktop && <AuraPointer text={showNames ? "Hide names" : "Show names"} pointerClick={() => setShowNames((prev) => !prev)}></AuraPointer>}
                    <AuraSphere gradientColors={gradientColors}></AuraSphere>

                    <motion.div
                        className="flex justify-center h-full w-full items-center overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: showNames ? 1 : 0 }}
                        transition={{ duration: 0.5 }}>
                        {names.map((name, index) => {
                            const delay = index * 2
                            const radius = () => {
                                if (isMobile) {
                                    return index <= 9 ? 100 : index <= 19 ? 140 : 180;
                                } else if (isTablet) {
                                    return index <= 9 ? 150 : index <= 19 ? 200 : 250;
                                } else if (isLaptop) {
                                    return index <= 9 ? 200 : index <= 19 ? 250 : 300;
                                } else if (isDesktop) {
                                    console.log("entro")
                                    return index <= 9 ? 200 : index <= 19 ? 275 : 350;
                                }
                            };                        
                            
                            return <OrbitingCircles
                                    key={index}
                                    className=" border-none bg-transparent h-auto w-auto text-xs md:text-sm lg:text-base"
                                    radius={radius()}
                                    duration={20}
                                    delay={delay}
                                    reverse
                                >
                                    <span>{name}</span>
                                </OrbitingCircles>
                        })}
                    </motion.div>
                </article>
            ) : (
                <motion.section
                    key={"loading"}
                    className="h-full flex justify-center items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    <motion.div
                        className="flex flex-wrap flex-col justify-center items-center px-4 gap-2 md:flex-row lg:px-0 lg:gap-4"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: loading ? 0 : 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="w-full text-center font-bold mb-4 text-4xl lg:text-5xl">Make your choice</h1>
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
                </motion.section>
            )}

            </AnimatePresence>
        </section>
    );
}
