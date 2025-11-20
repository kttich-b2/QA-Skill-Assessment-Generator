import React, { useState, useCallback, useMemo } from "react";
import { THEMES } from "./constants";
import { QuizQuestion } from "./types";
import ThemeSelector from "./components/ThemeSelector";
import MarkdownRenderer from "./components/MarkdownRenderer";
import {
  generateTestQuestion,
  getFeedbackOnAnswer,
  generateQuizQuestions,
} from "./services/geminiService";
import {
  BrainCircuitIcon,
  SparklesIcon,
  AlertTriangleIcon,
  ClipboardListIcon,
} from "./components/icons";

const App: React.FC = () => {
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [generatedQuestion, setGeneratedQuestion] = useState<string>("");
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [isLoadingQuestion, setIsLoadingQuestion] = useState<boolean>(false);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // New state for the quiz feature
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [userQuizAnswers, setUserQuizAnswers] = useState<
    Record<number, number>
  >({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState<boolean>(false);

  const handleThemeToggle = useCallback((themeId: string) => {
    setSelectedThemes((prev) =>
      prev.includes(themeId)
        ? prev.filter((id) => id !== themeId)
        : [...prev, themeId],
    );
  }, []);

  const clearState = () => {
    setError(null);
    setGeneratedQuestion("");
    setUserAnswer("");
    setFeedback("");
    setQuizQuestions([]);
    setUserQuizAnswers({});
    setQuizSubmitted(false);
  };

  const handleGenerateTest = async () => {
    if (selectedThemes.length === 0) {
      setError("Please select at least one theme.");
      return;
    }
    clearState();
    setIsLoadingQuestion(true);

    try {
      const selectedThemeObjects = THEMES.filter((theme) =>
        selectedThemes.includes(theme.id),
      );
      const question = await generateTestQuestion(selectedThemeObjects);
      setGeneratedQuestion(question);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoadingQuestion(false);
    }
  };

  const handleGenerateQuiz = async () => {
    clearState();
    setIsLoadingQuiz(true);
    try {
      const questions = await generateQuizQuestions();
      setQuizQuestions(questions);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoadingQuiz(false);
    }
  };

  const handleGetFeedback = async () => {
    if (!userAnswer.trim()) {
      setError("Please provide an answer before getting feedback.");
      return;
    }
    setIsLoadingFeedback(true);
    setError(null);
    setFeedback("");

    try {
      const result = await getFeedbackOnAnswer(generatedQuestion, userAnswer);
      setFeedback(result);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoadingFeedback(false);
    }
  };

  const handleQuizAnswerChange = (
    questionIndex: number,
    optionIndex: number,
  ) => {
    setUserQuizAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  const quizScore = useMemo(() => {
    if (!quizSubmitted) return 0;
    return quizQuestions.reduce((score, question, index) => {
      return userQuizAnswers[index] === question.correctAnswerIndex
        ? score + 1
        : score;
    }, 0);
  }, [quizSubmitted, quizQuestions, userQuizAnswers]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <BrainCircuitIcon className="h-8 w-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-slate-900">
            QA Skill Assessment Generator
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <ThemeSelector
            themes={THEMES}
            selectedThemes={selectedThemes}
            onThemeToggle={handleThemeToggle}
          />

          <div className="flex justify-center items-center gap-4 flex-wrap">
            <button
              onClick={handleGenerateTest}
              disabled={isLoadingQuestion || selectedThemes.length === 0}
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg"
            >
              {isLoadingQuestion ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating Scenario...
                </>
              ) : (
                <>
                  <SparklesIcon className="mr-3 h-5 w-5" />
                  Generate Scenario
                </>
              )}
            </button>
            <button
              onClick={handleGenerateQuiz}
              disabled={isLoadingQuiz}
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 disabled:bg-indigo-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg"
            >
              {isLoadingQuiz ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating Quiz...
                </>
              ) : (
                <>
                  <ClipboardListIcon className="mr-3 h-5 w-5" />
                  Generate Multiple-Choice Quiz
                </>
              )}
            </button>
          </div>

          {error && (
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-center gap-3"
              role="alert"
            >
              <AlertTriangleIcon className="h-6 w-6 text-red-600" />
              <div>
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </div>
            </div>
          )}

          {generatedQuestion && (
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">
                  Step 2: Your Scenario
                </h2>
                <div className="prose prose-slate max-w-none bg-slate-50 p-4 rounded-md border border-slate-200">
                  <MarkdownRenderer content={generatedQuestion} />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">
                  Step 3: Your Answer
                </h2>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Describe your approach, decisions, and reasoning here..."
                  rows={10}
                  className="w-full p-4 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                />
              </div>

              <div className="text-center">
                <button
                  onClick={handleGetFeedback}
                  disabled={isLoadingFeedback || !userAnswer.trim()}
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-lg"
                >
                  {isLoadingFeedback ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Evaluating Answer...
                    </>
                  ) : (
                    "Get Feedback"
                  )}
                </button>
              </div>
            </div>
          )}

          {quizQuestions.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">
                  Strategic QA Quiz
                </h2>
                {quizSubmitted && (
                  <div className="text-center bg-indigo-100 text-indigo-800 font-bold p-3 rounded-lg text-lg">
                    Your Score: {quizScore} / {quizQuestions.length}
                  </div>
                )}
              </div>

              {quizQuestions.map((q, qIndex) => (
                <div key={qIndex} className="border-t border-slate-200 pt-6">
                  <p className="font-semibold text-slate-800 mb-4">
                    {qIndex + 1}. {q.question}
                  </p>
                  <div className="space-y-3">
                    {q.options.map((option, oIndex) => {
                      const isSelected = userQuizAnswers[qIndex] === oIndex;
                      const isCorrect = q.correctAnswerIndex === oIndex;
                      let optionClasses =
                        "p-3 rounded-md border text-left w-full transition-colors duration-200";

                      if (quizSubmitted) {
                        if (isCorrect) {
                          optionClasses +=
                            " bg-green-100 border-green-300 text-green-900 font-semibold";
                        } else if (isSelected && !isCorrect) {
                          optionClasses +=
                            " bg-red-100 border-red-300 text-red-900";
                        } else {
                          optionClasses +=
                            " bg-slate-50 border-slate-200 text-slate-600";
                        }
                      } else {
                        optionClasses += ` cursor-pointer ${isSelected ? "bg-indigo-100 border-indigo-300 ring-2 ring-indigo-400" : "bg-white border-slate-300 hover:bg-slate-50"}`;
                      }

                      return (
                        <button
                          key={oIndex}
                          onClick={() =>
                            !quizSubmitted &&
                            handleQuizAnswerChange(qIndex, oIndex)
                          }
                          disabled={quizSubmitted}
                          className={optionClasses}
                        >
                          <span
                            className={`inline-block mr-3 font-mono ${isSelected || (quizSubmitted && isCorrect) ? "text-indigo-600" : "text-slate-500"}`}
                          >
                            {String.fromCharCode(65 + oIndex)}
                          </span>
                          {option}
                        </button>
                      );
                    })}
                  </div>
                  {quizSubmitted && (
                    <div className="mt-4 p-4 bg-slate-100 border-l-4 border-slate-400 rounded-r-md">
                      <h4 className="font-bold text-slate-700">Rationale:</h4>
                      <p className="text-slate-600">{q.rationale}</p>
                    </div>
                  )}
                </div>
              ))}
              <div className="text-center pt-6 border-t border-slate-200">
                {!quizSubmitted ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={
                      Object.keys(userQuizAnswers).length !==
                      quizQuestions.length
                    }
                    className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-lg"
                  >
                    Submit Answers
                  </button>
                ) : (
                  <button
                    onClick={handleGenerateQuiz}
                    className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg"
                  >
                    Take Another Quiz
                  </button>
                )}
              </div>
            </div>
          )}

          {feedback && (
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-4">
                AI Feedback
              </h2>
              <div className="prose prose-slate max-w-none bg-slate-50 p-4 rounded-md border border-slate-200 space-y-2">
                <MarkdownRenderer content={feedback} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
