import { useEffect, useState } from "react";

export default function App() {
  const [step, setStep] = useState(1);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setStep(5);

    if (counter > 0) {
      setStep(10);
    }

    function addCounter() {
      setCounter(counter + step);
    }

    window.addEventListener("click", addCounter);
  }, []);

  return (
    <div className="App">
      <h2>Click The Screen To Add {step} To Counter</h2>
      <h1>Counter: {counter}</h1>
    </div>
  );
}