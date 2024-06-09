/* eslint-disable jsx-a11y/media-has-caption */
import { Button, Spinner } from "@nextui-org/react"
import { useEffect, useMemo, useRef, useState } from "react"
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid"
import { motion, AnimatePresence, cubicBezier } from "framer-motion"

interface Lyrics {
  time: number;
  text: string;
}

const lyricsList: Lyrics[] = [
  { "text": "눈, 코, 입", "time": 0 },
  { "text": "미안해 미안해 하지마", "time": 8070 },
  { "text": "내가 초라해지잖아", "time": 10000 },
  { "text": "빨간 예쁜 입술로", "time": 13390 },
  { "text": "어서 나를 죽이고 가", "time": 15640 },
  { "text": "나는 괜찮아", "time": 18033 },
  { "text": "마지막으로 나를 바라봐줘", "time": 20050 },
  { "text": "아무렇지 않은 듯 웃어줘", "time": 23380 },
  { "text": "네가 보고 싶을 때", "time": 26700 },
  { "text": "기억할 수 있게", "time": 28120 },
  { "text": "나의 머릿속에 네 얼굴", "time": 30550 },
  { "text": "그릴 수 있게", "time": 32595 },
  { "text": "널 보낼 수 없는 나의 욕심이", "time": 36210 },
  { "text": "집착이 되어 널 가뒀고", "time": 39250 },
  { "text": "혹시 이런 나 땜에 힘들었니", "time": 42750 },
  { "text": "아무 대답 없는 너", "time": 45953 },
  { "text": "바보처럼 왜", "time": 49773 },
  { "text": "너를 지우지 못해", "time": 53437 },
  { "text": "넌 떠나버렸는데", "time": 56743 },
  { "text": "너의 눈 코 입", "time": 60160 },
  { "text": "날 만지던 네 손길", "time": 63395 },
  { "text": "작은 손톱까지 다", "time": 65760 },
  { "text": "여전히 널 느낄 수 있지만", "time": 70150 },
  { "text": "꺼진 불꽃처럼", "time": 73910 },
  { "text": "타들어가버린", "time": 76011 },
  { "text": "우리 사랑 모두 다", "time": 79349 },
  { "text": "너무 아프지만 이젠 널", "time": 83820 },
  { "text": "추억이라 부를게", "time": 86273 },
  { "text": "사랑해 사랑했지만", "time": 90933 },
  { "text": "내가 부족했었나 봐", "time": 93367 },
  { "text": "혹시 우연이라도", "time": 96667 },
  { "text": "한순간만이라도 널", "time": 98888 },
  { "text": "볼 수 있을까", "time": 101425 },
  { "text": "하루하루가 불안해져", "time": 103784 },
  { "text": "네 모든 게 갈수록 희미해져", "time": 106108 },
  { "text": "사진 속에 너는 왜", "time": 109388 },
  { "text": "해맑게 웃는데", "time": 110841 },
  { "text": "우리에게 다가오는", "time": 111588 },
  { "text": "이별을 모른 채", "time": 112638 },
  { "text": "널 보낼 수 없는 나의 욕심이", "time": 119014 },
  { "text": "집착이 되어 널 가뒀고", "time": 122533 },
  { "text": "혹시 이런 나 땜에 힘들었니", "time": 126011 },
  { "text": "아무 대답 없는 너", "time": 128833 },
  { "text": "바보처럼 왜", "time": 132604 },
  { "text": "너를 지우지 못해", "time": 135681 },
  { "text": "넌 떠나버렸는데", "time": 139068 },
  { "text": "너의 눈 코 입", "time": 143694 },
  { "text": "날 만지던 네 손길", "time": 146355 },
  { "text": "작은 손톱까지 다", "time": 149289 },
  { "text": "여전히 널 느낄 수 있지만", "time": 153800 },
  { "text": "꺼진 불꽃처럼", "time": 157222 },
  { "text": "타들어가버린", "time": 159775 },
  { "text": "우리 사랑 모두 다", "time": 162849 },
  { "text": "너무 아프지만 이젠 널", "time": 167521 },
  { "text": "추억이라 부를게", "time": 170272 },
  { "text": "나만 바라보던 너의 까만 눈", "time": 204380 },
  { "text": "향기로운 숨을 담은 너의 코", "time": 207166 },
  { "text": "사랑해 사랑해", "time": 210422 },
  { "text": "내게 속삭이던 그 입술을 난", "time": 215211 },
  { "text": "너의 눈 코 입", "time": 219216 },
  { "text": "날 만지던 네 손길", "time": 222366 },
  { "text": "작은 손톱까지 다", "time": 225233 },
  { "text": "여전히 널 느낄 수 있지만", "time": 229777 },
  { "text": "꺼진 불꽃처럼", "time": 233277 },
  { "text": "타들어가버린", "time": 235585 },
  { "text": "우리 사랑 모두 다", "time": 238589 },
  { "text": "너무 아프지만 이젠 널", "time": 243321 },
  { "text": "추억이라 부를게", "time": 246022 },
  { "text": "너의 눈 코 입", "time": 242320 },
  { "text": "날 만지던 네 손길", "time": 244700 },
  { "text": "작은 손톱까지 다", "time": 247850 },
  { "text": "여전히 널 느낄 수 있지만", "time": 250656 },
  { "text": "꺼진 불꽃처럼", "time": 253919 },
  { "text": "타들어가버린", "time": 256919 },
  { "text": "우리 사랑 모두 다", "time": 259955 }
]

const lyricsStyle = [
  'text-3xl text-center transition-all ease-in-out duration-700 text-white',
  'text-3xl text-center transition-all ease-in-out duration-700 text-default-400',
  'text-3xl text-center transition-all ease-in-out duration-700 text-default-500',
  'text-3xl text-center transition-all ease-in-out duration-700 text-default-500/0',
  'text-3xl text-center transition-all ease-in-out duration-700 text-default-500/0',
]

export default function IndexPage() {

  const [currentTime, setCurrentTime] = useState<number>(0)
  const [isPaused, setIsPaused] = useState<boolean>(true)
  const [isEnded, setIsEnded] = useState<boolean>(false)
  const timeInterval = 50

  const [currentLyricIdx, setCurrentLyricIdx] = useState<number>(0)
  const endDelay = 1000

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (!isPaused && !isEnded) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + timeInterval)
      }, timeInterval)
    }

    return () => clearInterval(interval)
  }, [isPaused, isEnded])

  useEffect(() => {
    if (isEnded || isPaused) {
      return
    }

    // 定位当前歌词
    for (let i = lyricsList.length - 1; i >= 0; i--) {
      if (currentTime >= lyricsList[i].time) {
        setCurrentLyricIdx(i)
        break
      }
    }

    // 播放结束
    if (currentTime - endDelay >= lyricsList[lyricsList.length - 1].time) {
      setIsEnded(true)
      setIsPaused(true)
    }
  }, [currentTime, isPaused, isEnded])

  const playOrPause = () => {
    if (!isPaused) {
      setIsPaused(true)
      pauseSong()
      return
    }

    if (isEnded) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 200)
      setIsEnded(false)
      setCurrentTime(0)
    }

    setIsPaused(false)
    playSong()
  }

  const lyricShow = (lyric: Lyrics, index: number) => {
    const startTime = lyricsList[currentLyricIdx].time
    const endTime = index === lyricsList.length - 1 ? lyricsList[index].time + endDelay : lyricsList[index + 1].time

    return <p
      key={index}
      className={`${lyricsStyle[Math.min(lyricsStyle.length - 1, Math.abs(index - currentLyricIdx))]} px-4 transition-all ease-in-out`}
    >
      {
        currentLyricIdx === index
          ? Array.from(lyric.text).map((char, idx) => {
            const charTime = startTime + (endTime - startTime) * idx / lyric.text.length
            return <span
              key={idx}
              className={`transition-all ease-in-out ${currentTime > charTime ? ' text-white ' : ' text-default-400 '}`}
            >{char}</span>
          })
          : lyric.text
      }
    </p>
  }

  const visibleLyrics = useMemo(() => {
    if (isLoading === true) return <Spinner color="default" className="h-[14rem] mx-auto" />

    return <div className={`h-[14rem] w-full transition-all ease-in-out
    `}>
      <AnimatePresence>
        {
          lyricsList.map((lyric, index) => {
            const isVisible = Math.abs(index - currentLyricIdx) < lyricsStyle.length
            if (!isVisible) {
              return null
            }

            const isFade = Math.abs(index - currentLyricIdx) === lyricsStyle.length - 1
            const isOut = currentLyricIdx > index

            return (
              isFade
                ? <motion.div
                  key={index}
                  initial={{ opacity: isOut ? 1 : 0, height: isOut ? 'auto' : 0 }}
                  animate={{ opacity: isOut ? 0 : 1, height: isOut ? 0 : 'auto' }}
                  exit={{ opacity: isOut ? 0 : 1, height: isOut ? 0 : 'auto' }}
                  transition={{ duration: 0.5, ease: cubicBezier(.35, .17, .3, .86) }}
                >
                  {lyricShow(lyric, index)}
                </motion.div>
                : lyricShow(lyric, index)
            )
          })
        }
      </AnimatePresence>
    </div>
  }, [currentTime, currentLyricIdx, isLoading])

  const playSong = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  const pauseSong = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  return (
    <div className="h-screen bg-black relative flex flex-col justify-center transition-all ease-in-out">
      {/* 背景 */}
      <video
        className="z-0 w-full opacity-60"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* 歌曲 */}
      <audio ref={audioRef} src="music/song.mp3"></audio>
      {/* 歌词显示 */}
      <div className="absolute left-1/2 -translate-x-1/2">
        {visibleLyrics}
      </div>
      {/* 播放/暂停按钮 */}
      <Button
        className="absolute bottom-10 w-32 left-1/2 -translate-x-1/2 z-10 mx-auto mt-12 text-lg text-white"
        color={isPaused ? 'success' : 'warning'}
        startContent={
          isPaused ? <PlayIcon className="size-5" /> : <PauseIcon className="size-5" />
        }
        onPress={playOrPause}
      >
        {isEnded ? 'Replay' : isPaused ? 'Play' : 'Pause'}
      </Button>
    </div>
  )
}