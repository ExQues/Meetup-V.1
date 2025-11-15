import { FC } from 'react'
 

interface TypingTextProps {
  text: string
  speed?: number
  delay?: number
  once?: boolean
  className?: string
}

export const TypingText: FC<TypingTextProps> = ({
  text,
  speed = 40,
  delay = 0,
  once = true,
  className,
}) => {
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduceMotion) {
    return <span className={className} aria-label={text}>{text}</span>
  }

  const chars = Array.from(text)

  return (
    <span className={className} aria-label={text}>{text}</span>
  )
}

