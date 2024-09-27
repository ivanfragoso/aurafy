"use client";

import chroma from "chroma-js";
import { useEffect, useState } from "react";
import { motion, useMotionTemplate } from "framer-motion";
import axios from "axios";
import AuraCard from "@/components/AuraCard";
import FloatingText from "@/components/FloatingText";
import AuraBackground from "@/components/AuraBackground";

export default function Aura() {
    const [type, setType] = useState('')
    const [aura, setAura] = useState('')
    const [names, setNames] = useState([])
    const [gradientColors, setGradientColors] = useState<string[]>([])
    const [backgroundColor, setBackgroundColor] = useState<string[]>([])

    const radialBackgroundImage = useMotionTemplate`radial-gradient(circle, ${gradientColors[0]} 10%, ${gradientColors[1]} 40%, ${gradientColors[2]} 70%)`

    const getAura = async (type: string) => {
        try {
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
                        initial={{ scale: 0.5 }}
                        animate={{
                            scale: [0.9, 1, 0.9],
                        }}   
                        transition={{
                            duration: 3,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "loop",
                        }}
                    >
                    </motion.div>

                    {/* Aura text inside the sphere */}
                    <span className="text-white text-lg relative z-10">{aura}</span> 

                    {/*
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
                <div className="h-full px-4 flex gap-4 flex-col justify-center items-center md:flex-row">
                    {auraCards.map((auraCard, index) => (
                        <AuraCard
                            key={index}
                            title={auraCard.title}
                            description={auraCard.description}
                            btnClick={() => setType(auraCard.type)}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
