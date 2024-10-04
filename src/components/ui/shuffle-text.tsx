import { useRandomReveal } from './RandomReveal'

export default function ShuffleText({ characters = '0', isFake = false }: { characters?: string; isFake?: boolean }) {
  return useRandomReveal({
    isPlaying: true,
    duration: isFake ? 100000 : 8,
    revealDuration: 0,
    characters,
    characterSet: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  })
}
