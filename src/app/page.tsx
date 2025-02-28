"use client"
import React, { useState, useEffect } from "react";

export default function Home() {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [counter3, setCounter3] = useState(0);
  const [running, setRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!running) return;

    const timer1 = setInterval(() => {
      setCounter1((prev) => prev + 1);
    }, 2000);

    const timer2 = setInterval(() => {
      setCounter2((prev) => prev + 1);
    }, 200);

    const countdown = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const timer3Timeout = setTimeout(() => {
      setRunning(false);
      setShowModal(true);
    }, 30000);

    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
      clearInterval(countdown);
      clearTimeout(timer3Timeout);
    };
  }, [running]);

  const handleIncrementAndStart = () => {
    if (!running) {
      setRunning(true);
      setTimeRemaining(30);
    }
    setCounter3((prev) => prev + 1);
  };

  const handleReset = () => {
    setCounter1(0);
    setCounter2(0);
    setCounter3(0);
    setRunning(false);
    setTimeRemaining(30);
  };

  return (
    <div className="main">
      <h1>Welcome to Blockbuster Game!</h1>
      <p>Flashblocks make Base 10x faster! Can you click faster than Flashblocks produced?</p>
      <p>Click the &quot;Push&quot; button as many times as possible, you have 30 seconds.</p>
      <div className="timer">
        <p>Time remaining:</p>
        <p>{timeRemaining}s</p>
      </div>
      <div className="counter">
        <h2>Base (2s block time)</h2>

        <p>Blocks produced:</p>
        <p>{counter1}</p>
      </div>
      <div className="counter">
        <h2>Base (with Flashblocks)</h2>
        <p>Blocks produced:</p>
        <p>{counter2}</p>
      </div>
      <div className="counter">
        <h2>Your clicks</h2>
        <p>{counter3}</p>
      </div>
      <div className="buttons">
        <button onClick={handleIncrementAndStart} className="start">PUSH!</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="modal-title">Time&apos;s up!</h2>
            <h4 className="modal-subtitle">You might have won, but check out how much faster Flashblocks are compared to Base&apos;s 2-second block time!</h4>
            <p className="modal-text">Blocks produced:</p>
            <p className="modal-text">Base(2s): {counter1}</p>
            <p className="modal-text">Base (Flashblocks): {counter2}</p>
            <p className="modal-text">Your clicks: {counter3}</p>
            <p style={{ textDecoration: 'underline' }}>Read more about Flashblocks <a href="https://base.mirror.xyz/HwG1GQ5hoxz0OTOF_nQhNcVTk4Ae9cRIrcqVQ14N4-c" target="_blank" rel="noopener noreferrer">here</a>.</p>
            <br />
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>Read more about Flashblocks <a href="https://base.mirror.xyz/HwG1GQ5hoxz0OTOF_nQhNcVTk4Ae9cRIrcqVQ14N4-c" target="_blank" rel="noopener noreferrer">here</a>.</p>
        <p>Built by <a href="https://twitter.com/torok_tomi" target="_blank" rel="noopener noreferrer">torok_tomi.</a> No rights reserved, have fun!</p>
      </footer>
    </div>
  );
}
