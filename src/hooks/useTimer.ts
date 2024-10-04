import { useAnimate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

type Units = 'Day' | 'Hour' | 'Minute' | 'Second'

export const useTimer = (unit: Units, countdownFrom: Date | null) => {
  const [ref, animate] = useAnimate()

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeRef = useRef(0)

  const [time, setTime] = useState(0)

  useEffect(() => {
    intervalRef.current = setInterval(handleCountdown, 1000)

    return () => clearInterval(intervalRef.current || undefined)
  }, [])

  const handleCountdown = async () => {
    const end = countdownFrom ? new Date(countdownFrom) : 0
    const now = countdownFrom ? new Date() : 0
    const distance = +end - +now

    let newTime = 0

    if (unit === 'Day') {
      newTime = Math.floor(distance / DAY)
    } else if (unit === 'Hour') {
      newTime = Math.floor((distance % DAY) / HOUR)
    } else if (unit === 'Minute') {
      newTime = Math.floor((distance % HOUR) / MINUTE)
    } else {
      newTime = Math.floor((distance % MINUTE) / SECOND)
    }

    if (newTime !== timeRef.current) {
      // Exit animation
      await animate(ref.current, { y: ['0%', '-50%'], opacity: [1, 0] }, { duration: 0.35 })

      timeRef.current = newTime
      setTime(newTime)

      // Enter animation
      await animate(ref.current, { y: ['50%', '0%'], opacity: [0, 1] }, { duration: 0.35 })
    }
  }

  return { ref, time }
}
