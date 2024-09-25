import { CheckIcon } from "@radix-ui/react-icons" 
import { cn } from "@/lib/utils"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { motion } from "framer-motion"

interface AuraCardProps {
    title: string,
    description: string
    btnClick: () => void
}

export default function AuraCard({ title, description, btnClick }: AuraCardProps) {
  const MotionCard = motion.create(Card)

    return (
      <MotionCard
        className={cn("w-full md:w-[380px] cursor-pointer")}
        whileHover={{
          scale: 1.05,
          transition: { duration: .2 },
        }}
        whileTap={{ 
          scale: 0.8 ,
          transition: { duration: 1 },
        }}
        onClick={() => btnClick()}
        >
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </MotionCard>
    )
}