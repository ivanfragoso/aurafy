"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Lora } from 'next/font/google';
import { useMediaQuery } from 'react-responsive';
import { AnimatePresence, motion } from "framer-motion";
import AuraBackground from "@/components/AuraBackground";
import AuraCard from "@/components/AuraCard";
import AuraSphere from "@/components/AuraSphere";
import axios from "axios";
import chroma from "chroma-js";
import OrbitingCircles from "@/components/ui/orbiting-circles";
import { useEffect, useMemo, useState } from "react";

const lora = Lora({ subsets: ['latin'] })

export default function Aura() {
    const [type, setType] = useState<string>('')
    const [aura, setAura] = useState<string>('');
    const [names, setNames] = useState<string[]>([])
    const [randomColors, setRandomColors] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const [showNames, setShowNames] = useState<boolean>(false)
    const [quote, setQuote] = useState<{ quoteText: string, quoteAuthor: string }>({quoteText: '', quoteAuthor: ''})
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    useEffect(() => {
        const generatedColors = Array.from({ length: 20 }, () => chroma.random().hex());
        setRandomColors(generatedColors);
    }, []);

    // Memoize gradient colors
    const gradientColors = useMemo(() => {
        if (aura) {
            return [
                chroma(aura).brighten(1).hex(),
                chroma(aura).saturate(1).hex(),
                chroma(aura).darken(1).hex(),
                aura,
            ];
        }

        return randomColors;
    }, [aura, randomColors]);

    const getAura = async (type: string) => {
        try {
            setLoading(true)
            const result = await axios.get('/api/aura', {
                params: { type }
            })

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

    const getQuote = async () => {
        try {
            const result = await axios.get('/api/quote');
            if (result.status === 200) {
                setQuote(result.data);
            } else {
                console.error("Error getting quote");
            }
        } catch (error) {
            console.error("Error getting quote", error); // TODO: ui friendly error
        }
    };

    useEffect(() => {
        if (type) {
            getAura(type);
            getQuote();
        } else {
            setAura('')
        }
    }, [type]);

    const randomQuote = () => {
        return (
            <motion.div 
                className="absolute flex flex-col items-center top-48 lg:top-36 xl:top-58 z-40 px-4 lg:px-4 container"
                initial={{ opacity: 0 }}
                animate={{ opacity: showNames ? 0 : 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className={`${lora.className} text-md text-center md:text-2xl font-bold opacity-90`}>&quot;{quote.quoteText}&quot;</h2>
                <span className={`${lora.className} text-sm md:text-lg !italic opacity-90`}>{quote.quoteAuthor}</span>
            </motion.div>
        );
    };

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
        <section className={cn("h-full relative", { "cursor-normal": aura })} style={{backgroundColor: "#0a0a0a"}}>
            <AuraBackground colors={gradientColors} color={aura}/>
            <AnimatePresence mode="wait">
                {aura ? (
                    <>
                        <motion.div
                            key={"return"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }} 
                            className="container w-full absolute top-0 p-4 left-1/2 transform -translate-x-1/2 flex justify-center z-30"
                        >
                            <Button variant="ghost" size={"sm"} onClick={() => setType('')}>Go back</Button>
                        </motion.div>
                        <motion.section 
                            key={"aura"}
                            className="h-full flex justify-center items-center relative"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <article className="flex flex-col justify-center h-full items-center">
                                {quote && randomQuote()}
                                <AuraSphere gradientColors={gradientColors} btnClick={() => (setShowNames((prev) => !prev))}/>
                                <motion.div
                                    className="absolute flex justify-center h-full w-full items-center overflow-hidden"
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
                                            } else if (isDesktop) {
                                                return index <= 9 ? 200 : index <= 19 ? 250 : 300;
                                            }
                                        };                        
                                        
                                        return <OrbitingCircles
                                                key={index}
                                                className=" border-none bg-transparent h-auto w-auto text-xs md:text-sm"
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
                        </motion.section>
                    </>
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
                            <h1 className="w-full text-center font-bold mb-2 text-2xl lg:text-3xl">Make your choice</h1>
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
                                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-lg z-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                            >
                                <motion.span
                                    animate={{
                                        opacity: [0, 1, 0],
                                    }}
                                    transition={{
                                        opacity: { duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }
                                    }}
                                >
                                    Fetching your aura...
                                </motion.span>
                            </motion.div>
                        )}
                    </motion.section>
                )}
            </AnimatePresence>
        </section>
    );
}
