import { CheckIcon } from "@radix-ui/react-icons" 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface AuraCardProps {
    title: string,
    description: string
    btnClick: () => void
}

export default function AuraCard({ title, description, btnClick }: AuraCardProps) {
    return (
        <Card className={cn("w-[380px]")}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/*
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <BellIcon />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Push Notifications
              </p>
              <p className="text-sm text-muted-foreground">
                Send notifications to device.
              </p>
            </div>
          </div>
          <div>
              <div
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    aaaa
                  </p>
                  <p className="text-sm text-muted-foreground">
                    adadsasd
                  </p>
                </div>
            </div>
          </div>
          */}
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => btnClick()}>
            <CheckIcon className="mr-2 h-4 w-4" /> Get your Aura
          </Button>
        </CardFooter>
      </Card>
    )
}