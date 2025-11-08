export interface Riddle {
  title: string;
  challengeLevel: string;
  riddleText: string;
  correctAnswer: string;
}

export interface RiddleAnswer {
  isCorrect: boolean;
}

export interface RiddleResult {
  correctAnswer: string;
  userInput: string;
  isCorrect: boolean;
}
