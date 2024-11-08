import { cn } from "@/lib/utils"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { motion } from "framer-motion"

interface AuraCardProps {
    title: string
    description: string
    btnClick: () => void
}

export default function AuraCard({ title, description, btnClick }: AuraCardProps) {
  const MotionCard = motion.create(Card)

    return (
      <MotionCard
        className={cn("w-full md:w-[380px] cursor-pointer z-10")}
        whileHover={{
          scale: [1, 1.04, 1],
          transition: { duration: 0.75, repeat: Infinity }
        }}
        animate={{ scale: 1 }}
        onClick={() => btnClick()}
        >
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </MotionCard>
    )
}