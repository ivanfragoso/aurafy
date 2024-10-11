"use client"

import chroma from "chroma-js";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import AuraBackground from "@/components/AuraBackground";
import BlurFade from "@/components/ui/blur-fade";
import { RainbowButton } from "@/components/ui/rainbow-button";

function Home() {
  const stickyElement = useRef(null)
  const heading = "Get your Aura based on your Spotify activity".split(" ")
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    const generatedColors = Array.from({ length: 20 }, () => chroma.random().hex());
    setColors(generatedColors);
  }, []);

  return (
    <>
      <AuraBackground colors={colors}/>
      <section className="h-full flex flex-col justify-center items-center relative z-20 gap-8">
        <div className="text-center px-3 sm:px-0 inline">
          {heading.map((el, i) => (
            <motion.span
              className="text-4xl md:text-6xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }} 
              transition={{
                duration: 1,
                delay: i / 8,
              }}
              key={i}
            >
              {el}{" "}
            </motion.span>
          ))}
        </div>
        <BlurFade delay={1}>
          <RainbowButton onClick={() => signIn('spotify', {callbackUrl: "/aura"})}>Discover your Aura</RainbowButton>
        </BlurFade>
      </section>
    </>
  );
}

export default Home