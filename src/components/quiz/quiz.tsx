import React, {useState} from "react"
import {Check, X, Frown} from "lucide-react"
import {analyticsHandler} from "@site/src/utils"

type Question = {
  id: number
  text: string
  options: string[]
  correctAnswer: number
}

type QuizProps = {
  questions: Question[]
  title: string
}

const TwitterLogo = () => (
  <svg className="w-5 h-5 inline-block mr-2" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const Quiz: React.FC<QuizProps> = ({questions, title}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const handleAnswerClick = (selectedOption: number) => {
    analyticsHandler(title, "Click", "Answer Clicked")
    setSelectedAnswer(selectedOption)

    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    setTimeout(() => {
      setSelectedAnswer(null)
      const nextQuestion = currentQuestion + 1
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion)
      } else {
        setShowScore(true)
      }
    }, 1000)
  }

  const resetQuiz = () => {
    analyticsHandler(title, "Click", "reset Clicked")
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
    setSelectedAnswer(null)
  }

  const shareScore = (platform: "twitter" | "linkedin", score: number, questionsLength: number, title: string) => {
    analyticsHandler(title, "score", "score shared")
    const text = `I scored ${score} out of ${questionsLength} on the ${title} Quiz! Test your knowledge too!`
    const url = document.location.href
    let shareUrl = ""

    if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&via=tailcallhq`
    }

    window.open(shareUrl, "_blank")
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-purple-100 to-blue-100 shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{title} Quiz!</h2>
      {showScore ? (
        <div className="text-center">
          <p className="text-2xl mb-4 font-semibold text-gray-700">
            You scored {score} out of {questions.length}
          </p>
          {score > 3 ? (
            <div className="flex flex-col items-center">
              <p className="text-5xl mb-4">🎉</p>
              <p className="text-green-600 font-bold text-xl">
                Congratulations! You're a GraphQL schema change expert!
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Frown size={64} className="text-red-500 mb-4" />
              <p className="text-red-600 font-bold text-xl">Keep learning about schema changes. You'll get there!</p>
            </div>
          )}
          <div className="mt-6 space-y-3">
            <button
              onClick={() => shareScore("twitter", score, questions.length, title)}
              className="w-full bg-black text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors duration-300 shadow-md flex items-center justify-center"
            >
              <TwitterLogo /> Share on X (Twitter)
            </button>
          </div>
          <button
            onClick={resetQuiz}
            className="mt-6 bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors duration-300 shadow-md w-full"
          >
            Retry Quiz
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-4 text-lg font-semibold text-gray-600">
            Question {currentQuestion + 1}/{questions.length}
          </p>
          <p className="text-xl font-bold mb-6 text-gray-800">{questions[currentQuestion].text}</p>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                  selectedAnswer === null
                    ? "bg-white hover:bg-gray-100 shadow-md"
                    : selectedAnswer === index
                      ? index === questions[currentQuestion].correctAnswer
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : "bg-white"
                }`}
                disabled={selectedAnswer !== null}
              >
                <span className="text-lg font-medium">{option}</span>
                {selectedAnswer === index && (
                  <span className="float-right">
                    {index === questions[currentQuestion].correctAnswer ? (
                      <Check className="inline text-white" size={24} />
                    ) : (
                      <X className="inline text-white" size={24} />
                    )}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Quiz
