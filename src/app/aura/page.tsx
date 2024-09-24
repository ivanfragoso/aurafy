"use client";

import chroma from "chroma-js";
import { useEffect, useState } from "react";
import { motion, useMotionTemplate } from "framer-motion";
import axios from "axios";
import AuraCard from "@/components/aura-card";

export default function Aura() {
    const [type, setType] = useState('')
    const [aura, setAura] = useState('')
    const [gradientColors, setGradientColors] = useState(["", "", ""])
    const [backgroundColor, setBackgroundColor] = useState("")

    const backgroundImage = useMotionTemplate`radial-gradient(150% 175% at 50% 0%, #020617 50%, ${backgroundColor})`
    const radialBackgroundImage = useMotionTemplate`radial-gradient(circle, ${gradientColors[0]} 10%, ${gradientColors[1]} 40%, ${gradientColors[2]} 70%)`

    const getAura = async (type: string) => {
        try {
            const result = await axios.get('/api/aura', {
                params: { type }
            });

            if (result.status === 200) {
                setAura(result.data.aura);
            } else {
                console.error("Error getting aura");
            }
        } catch (error) {
            console.error("Error getting aura", error); // TODO: ui friendly error
        }
    };

    useEffect(() => {
        getAura(type);
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
            setBackgroundColor(aura)
        }
    }, [aura]);

    const auraCards = [
        {
            'title': 'Based on artists',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur diam ligula, interdum eu lorem in, sollicitudin mattis risus. Nullam consequat neque vel efficitur bibendum. Ut vitae auctor lectus. Donec sit amet tincidunt augue. Aenean egestas libero eu turpis gravida, at euismod quam sollicitudin. Nam rutrum quam tortor, quis lobortis dolor consequat vel. In nec malesuada enim. Aliquam vel mollis nunc, ac pulvinar neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus justo lorem, scelerisque a magna id, tempus pulvinar ante.',
            'type': 'artists'
        },
        {
            'title': 'Based on tracks',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur diam ligula, interdum eu lorem in, sollicitudin mattis risus. Nullam consequat neque vel efficitur bibendum. Ut vitae auctor lectus. Donec sit amet tincidunt augue. Aenean egestas libero eu turpis gravida, at euismod quam sollicitudin. Nam rutrum quam tortor, quis lobortis dolor consequat vel. In nec malesuada enim. Aliquam vel mollis nunc, ac pulvinar neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus justo lorem, scelerisque a magna id, tempus pulvinar ante.',
            'type': 'tracks'
        }
    ];

    return (
        <section className="flex justify-center gap-4 h-full items-center" style={{backgroundColor: "#020617"}}>
            {aura ? (
                <>
                    <motion.div
                        className="flex justify-center items-center w-full h-full absolute"
                        style={{
                            backgroundImage: backgroundImage,  // Existing background image
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ 
                            duration: 3,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "loop",
                        }}
                    >
                    </motion.div>

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
                            scale: [0.85, 1, 0.85],
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
                </>
            ) : (
                auraCards.map((auraCard, index) => (
                    <AuraCard
                        key={index}
                        title={auraCard.title}
                        description={auraCard.description}
                        btnClick={() => setType(auraCard.type)}
                    />
                ))
            )}
        </section>
    );
}
