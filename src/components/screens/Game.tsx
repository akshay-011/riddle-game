import { Riddle, RiddleResult } from "@/src/model/riddle";
import { FormEvent, useEffect, useState } from "react";
import { startNewGame, submitRiddleAnswer } from "@/src/lib/actions";

export default function Game() {
  const [riddle, setRiddle] = useState<Riddle | null>(null);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<RiddleResult | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const initGame = async () => {
    const r = await startNewGame();
    setRiddle(r);
    setIsLoading(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!riddle) return;
    setIsLoading(true);
    const res = await submitRiddleAnswer(riddle, answer);
    setResult(res);
    setIsLoading(false);
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading riddle...</div>;
  }

  if (!riddle) {
    return <div className="text-center mt-8">Failed to load riddle</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-2">{riddle.title}</h1>
      <div className="mb-4 text-gray-600">
        Difficulty: {riddle.challengeLevel}
      </div>

      <p className="text-lg mb-8 font-medium">{riddle.riddleText}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer..."
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="mt-8 px-4 py-2 text-white bg-blue-500 rounded"
        >
          Submit Answer
        </button>
      </form>

      {result && (
        <div
          className={`mt-6 p-4 rounded ${
            result.isCorrect ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <p className="font-medium">
            {result.isCorrect
              ? "🎉 Congratulations! That's correct!"
              : "❌ Not quite right. Try again!"}
          </p>
          {!result.isCorrect && (
            <button
              onClick={() => setResult(undefined)}
              className="mt-4 px-3 py-1 text-white bg-blue-500 rounded"
            >
              Try Again
            </button>
          )}
        </div>
      )}
    </div>
  );
}
