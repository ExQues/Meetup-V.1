import { cn } from "@/lib/utils"
import { forwardRef, type HTMLAttributes } from "react"

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(className)} {...props} />
  )
)

Card.displayName = "Card"

