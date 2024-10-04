const easing = {
  // @ts-ignore
  easeOutQuad: (t, b, c, d) => {
    t /= d
    return -c * t * (t - 2) + b
  },
  // @ts-ignore
  easeInQuad: (t, b, c, d) => {
    t /= d
    return c * t * t + b
  },
  // @ts-ignore
  random: (_, b, c) => Math.floor(Math.random() * (c - b + 1) + b),
  // @ts-ignore
  linear: (t, b, c, d) => (c * t) / d + b,
}

// @ts-ignore
export const getEasingInterval = (charactersArray, ignoreCharacterSet) => {
  // @ts-ignore
  const charactersToAnimate = charactersArray.filter((character) => !ignoreCharacterSet?.includes(character)).length

  return 1 / (charactersToAnimate - 1)
}

const DEFAULT_CHARACTER_SET = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
]

// eslint-disable-next-line max-len
export const getRandomCharacter = (set = DEFAULT_CHARACTER_SET) => set[Math.floor(Math.random() * set.length)]

/**
 * returns an array of 2 numbers where the first one is
 * the duration of the random characters and the second one is the
 * the revealing duration
 */

// @ts-ignore
const getPartsTime = (duration, revealDuration) => {
  if (revealDuration === 0) {
    return [duration, 0]
  }

  let revealFraction = revealDuration > 1 ? 1 : revealDuration
  revealFraction = revealFraction < 0 ? 0 : revealFraction

  const revealDurationSec = duration * revealFraction
  return [duration - revealDurationSec, revealDurationSec]
}

/**
 * returns an array of objects where each object contains data for each character
 */

export const getCharactersData = ({
  // @ts-ignore
  characters,
  // @ts-ignore
  duration,
  revealDuration = 0.6,
  revealEasing = 'linear',
  // @ts-ignore
  ignoreCharacterSet,
}) => {
  const charactersArray = Array.isArray(characters) ? characters : characters.split('')
  const [randomSec, revealingSec] = getPartsTime(duration, revealDuration)
  // @ts-ignore
  const easingFunc = easing[revealEasing]
  const interval = getEasingInterval(charactersArray, ignoreCharacterSet)
  let step = 0

  // @ts-ignore
  const getRevealTime = (isIgnored) => {
    if (isIgnored || revealDuration === 0 || charactersArray.length === 1) {
      return duration
    }

    const revealTime = easingFunc(step * interval, 0, revealingSec, 1)
    step += 1

    return randomSec + revealTime
  }

  // @ts-ignore
  return charactersArray.map((character) => {
    // @ts-ignore
    const isIgnored = !!ignoreCharacterSet?.find((ignoreCharacter) => ignoreCharacter === character)

    return {
      character,
      isIgnored,
      revealTime: getRevealTime(isIgnored),
    }
  })
}
