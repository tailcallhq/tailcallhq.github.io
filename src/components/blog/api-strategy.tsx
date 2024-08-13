import React, {useState} from "react"
import {SmilePlus, Meh, Frown} from "lucide-react"
import LinkButton from "../shared/LinkButton"
import {analyticsHandler} from "@site/src/utils"
import {Theme} from "@site/src/constants"

type Question = {
  id: number
  text: string
}

const questions: Question[] = [
  {
    id: 1,
    text: "Do you have a complete, up-to-date inventory of all your APIs?",
  },
  {
    id: 2,
    text: "Is there a clear, documented process for API design and development in your organization?",
  },
  {
    id: 3,
    text: "Do you have metrics in place to measure the usage and performance of your APIs?",
  },
  {
    id: 4,
    text: "Is there a designated team or individual responsible for API governance?",
  },
  {
    id: 5,
    text: "Do you have a system in place for managing API versions and deprecating old APIs?",
  },
  {
    id: 6,
    text: "Are your APIs consistently documented and easily discoverable by developers?",
  },
  {
    id: 7,
    text: "Do you have security protocols in place specifically for API protection?",
  },
  {
    id: 8,
    text: "Is API development aligned with your business objectives and KPIs?",
  },
  {
    id: 9,
    text: "Do you have a process for gathering and incorporating feedback from API consumers?",
  },
  {
    id: 10,
    text: "Are you able to quickly onboard new partners or customers using your APIs?",
  },
]

type Answer = "yes" | "no"

const APIStrategyQuiz: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, Answer>>({})
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [animation, setAnimation] = useState("")

  const handleAnswer = (answer: Answer) => {
    setAnswers((prev) => ({...prev, [questions[currentQuestion].id]: answer}))
    setAnimation("fadeOut")
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
      } else {
        setShowResult(true)
      }
      setAnimation("fadeIn")
    }, 300)
  }

  const calculateScore = (): number => {
    return Object.values(answers).filter((answer) => answer === "yes").length
  }

  const getResultData = (score: number) => {
    if (score >= 8) {
      return {
        icon: <SmilePlus className="w-24 h-24 text-green-500" />,
        title: "Excellent!",
        message: "Your API strategy is robust and well-implemented.",
        gradient: "from-green-400 to-blue-500",
      }
    } else if (score >= 5) {
      return {
        icon: <Meh className="w-24 h-24 text-yellow-500" />,
        title: "Good Start",
        message: "Your API strategy is on the right track but has room for improvement.",
        gradient: "from-yellow-400 to-orange-500",
      }
    } else {
      return {
        icon: <Frown className="w-24 h-24 text-red-500" />,
        title: "Needs Work",
        message: "Your API strategy needs significant attention and improvement.",
        gradient: "from-red-400 to-pink-500",
      }
    }
  }

  const resetQuiz = () => {
    setAnswers({})
    setCurrentQuestion(0)
    setShowResult(false)
    setAnimation("fadeIn")
  }

  const score = calculateScore()
  const resultData = getResultData(score)

  const progressPercentage = (currentQuestion / questions.length) * 100

  return (
    <div
      className={`max-w-2xl mx-auto p-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-lg text-white ${animation} min-h-[500px] flex flex-col justify-center`}
    >
      {showResult ? (
        <div className="text-center">
          {resultData.icon}
          <h2 className="text-3xl font-bold mt-4">{resultData.title}</h2>
          <p className="text-xl mt-2">Your score: {score} out of 10</p>
          <p className="text-lg mt-4">{resultData.message}</p>
          {score < 8 && (
            <p className="mt-4 text-white opacity-80">
              Consider revisiting the key components and best practices of API strategy outlined in this blog.
            </p>
          )}
          <div className="flex justify-center space-x-4 mt-4">
            <LinkButton
              title="Retake Quiz"
              theme={Theme.Gray}
              width="auto"
              onClick={() => {
                analyticsHandler("Quiz", "Click", "Retake Quiz")
                resetQuiz()
              }}
            />
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-6 text-center">API Strategy Assessment Quiz</h2>
          {questions[currentQuestion] && ( // Safeguard to ensure currentQuestion index is valid
            <div className="mb-6 flex-grow flex flex-col justify-center items-center">
              <h2 className="font-semibold mb-4 text-lg text-center">{questions[currentQuestion].text}</h2>
              <div className="flex justify-center space-x-4 mt-4">
                <LinkButton
                  title="Yes"
                  theme={Theme.Gray}
                  width="auto"
                  onClick={() => {
                    analyticsHandler("Quiz", "Click", `Answer Yes - Q${currentQuestion + 1}`)
                    handleAnswer("yes")
                  }}
                />
                <LinkButton
                  title="No"
                  theme={Theme.Gray}
                  width="auto"
                  onClick={() => {
                    analyticsHandler("Quiz", "Click", `Answer No - Q${currentQuestion + 1}`)
                    handleAnswer("no")
                  }}
                />
              </div>
            </div>
          )}
          <div className="mt-8">
            <div className="w-full bg-white rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{width: `${progressPercentage}%`}}
              ></div>
            </div>
            <div className="mt-2 text-center text-white">
              Question {Math.min(currentQuestion + 1, questions.length)} of {questions.length}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default APIStrategyQuiz
