import Button from "../common/Button";

export default function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <>
      <h1 className="text-4xl font-bold">Welcome to the Riddle Game!</h1>
      <p className="mt-4 text-lg">Can you solve the riddles?</p>
      <Button onClick={onStart}>Start</Button>
    </>
  );
}
