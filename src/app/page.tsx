"use client"

import { motion } from "framer-motion"
import AuraBackground from "@/components/AuraBackground";
import chroma from "chroma-js";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

function Home() {
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
        <div className="text-center w-2/3">
          <div className="inline">
            {heading.map((el, i) => (
              <motion.span
                className="text-8xl font-bold"
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
        </div>
        <Button variant="secondary" onClick={() => signIn('spotify', {callbackUrl: "/aura"})} className="mt-4">Discover your Aura</Button>
      </section>
    </>
  );
}

export default Home