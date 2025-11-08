"use client";

import { useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import Game from "./Game";

export default function RiddleStart() {
  const [start, setStart] = useState(false);

  return start ? <Game /> : <WelcomeScreen onStart={() => setStart(true)} />;
}
