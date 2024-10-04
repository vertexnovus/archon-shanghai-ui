import { cloneElement, isValidElement, useRef } from 'react'
import { useElapsedTime } from 'use-elapsed-time'
import { getCharactersData, getRandomCharacter } from './constant'

export const useRandomReveal = (props: {
  isPlaying?: any
  duration: any
  revealDuration?: any
  characters?: any
  characterSet?: any
  updateInterval?: any
  onComplete?: any
  revealEasing?: any
  ignoreCharacterSet?: any
}) => {
  const prevTimeRef = useRef()
  const charactersRef = useRef([])

  const { elapsedTime } = useElapsedTime({
    isPlaying: props.isPlaying,
    duration: props.duration,
    updateInterval: props.updateInterval ?? 0.065,
    onComplete: props.onComplete,
  })

  if (prevTimeRef.current === elapsedTime) {
    return charactersRef.current
  }

  // @ts-ignore
  prevTimeRef.current = elapsedTime
  charactersRef.current = []

  // @ts-ignore
  const charactersData = getCharactersData(props)

  // the fastest way to iterate over an array
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < charactersData.length; i++) {
    const { character, isIgnored, revealTime } = charactersData[i]
    const nextCharacter = isIgnored || elapsedTime >= revealTime ? character : getRandomCharacter(props.characterSet)

    // @ts-ignore
    charactersRef.current.push(isValidElement(nextCharacter) ? cloneElement(nextCharacter, { key: i }) : nextCharacter)
  }

  return charactersRef.current
}
