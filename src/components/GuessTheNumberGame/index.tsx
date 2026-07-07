import React, { useState } from 'react';

const GuessTheNumberGame = () => {
  console.log('Rendering GuessTheNumberGame');
  const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;

  const [guessNumber, setGuessNumber] = useState(generateRandomNumber);
  const [attemptCount, setAttemptCount] = useState(0);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'low' | 'high' | 'win' | 'error'>('idle');
  const [history, setHistory] = useState<number[]>([]);

  const handleGuess = () => {
    const num = parseInt(guess);
    if (!guess || num < 1 || num > 100 || isNaN(num)) {
      setMessage('Please enter a number between 1 and 100');
      setStatus('error');
      return;
    }

    const newAttempts = attemptCount + 1;
    setAttemptCount(newAttempts);
    setHistory(prev => [num, ...prev]);

    if (num === guessNumber) {
      setMessage(`🎉 You guessed it in ${newAttempts} ${newAttempts === 1 ? 'attempt' : 'attempts'}!`);
      setStatus('win');
    } else if (num < guessNumber) {
      setMessage('Too low! Try a higher number.');
      setStatus('low');
    } else {
      setMessage('Too high! Try a lower number.');
      setStatus('high');
    }
    setGuess('');
  };

  const resetGame = () => {
    setGuessNumber(generateRandomNumber());
    setAttemptCount(0);
    setGuess('');
    setMessage('');
    setStatus('idle');
    setHistory([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleGuess();
  };

  const feedbackConfig = {
    idle:  { bg: 'bg-indigo-50',  text: 'text-indigo-500',  border: 'border-indigo-100', icon: '🎯' },
    low:   { bg: 'bg-orange-50',  text: 'text-orange-600',  border: 'border-orange-100', icon: '⬆️' },
    high:  { bg: 'bg-blue-50',    text: 'text-blue-600',    border: 'border-blue-100',   icon: '⬇️' },
    win:   { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200',icon: '🏆' },
    error: { bg: 'bg-red-50',     text: 'text-red-600',     border: 'border-red-100',    icon: '⚠️' },
  };
  const fb = feedbackConfig[status];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-500 p-4">

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-purple-400/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-blue-400/30 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">

        {/* Card */}
        <div className="rounded-3xl border border-white/20 bg-white/10 p-1 shadow-2xl backdrop-blur-xl">
          <div className="rounded-[22px] bg-white p-7">

            {/* Header */}
            <div className="mb-6 text-center">
              <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-indigo-200">
                <span className="text-2xl">🔢</span>
              </div>
              <h1 className="font-serif text-2xl font-semibold text-stone-800">Guess the Number</h1>
              <p className="mt-1 text-sm text-stone-400">Pick a number between 1 and 100</p>
            </div>

            {/* Attempt counter */}
            <div className="mb-5 flex items-center justify-center gap-2">
              <div className="flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1.5">
                <span className="text-xs text-indigo-400">Attempts</span>
                <span className="text-sm font-bold text-indigo-600">{attemptCount}</span>
              </div>
            </div>

            {/* Input */}
            <div className="relative mb-4">
              <input
                id="guess-input"
                type="number"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your guess..."
                disabled={status === 'win'}
                className="w-full rounded-2xl border-2 border-stone-100 bg-stone-50 px-5 py-3.5 text-center text-lg font-semibold text-stone-800 outline-none transition placeholder:font-normal placeholder:text-stone-300 focus:border-indigo-400 focus:bg-white disabled:cursor-not-allowed disabled:opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            {/* Feedback message */}
            {message && (
              <div className={`mb-4 flex items-center gap-2.5 rounded-2xl border px-4 py-3 ${fb.bg} ${fb.border}`}>
                <span className="text-lg">{fb.icon}</span>
                <p className={`text-sm font-medium ${fb.text}`}>{message}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleGuess}
                disabled={status === 'win'}
                className="flex-1 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:from-violet-600 hover:to-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                Check Guess
              </button>
              <button
                onClick={resetGame}
                className="rounded-2xl border-2 border-stone-100 bg-stone-50 px-4 py-3 text-sm font-semibold text-stone-500 transition hover:border-stone-200 hover:bg-stone-100 active:scale-95 cursor-pointer"
              >
                Reset
              </button>
            </div>

            {/* Guess history */}
            {history.length > 0 && (
              <div className="mt-5 border-t border-stone-100 pt-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-widest text-stone-400">Previous guesses</p>
                <div className="flex flex-wrap gap-2">
                  {history.map((h, i) => (
                    <span
                      key={i}
                      className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                        h === guessNumber
                          ? 'bg-emerald-100 text-emerald-700'
                          : h < guessNumber
                          ? 'bg-orange-100 text-orange-600'
                          : 'bg-blue-100 text-blue-600'
                      }`}
                    >
                      {h}
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-3 text-[10px] text-stone-400">
                  <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-sm bg-orange-300" /> Too low</span>
                  <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-sm bg-blue-300" /> Too high</span>
                  <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-sm bg-emerald-400" /> Correct</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Press enter hint */}
        <p className="mt-3 text-center text-xs text-white/50">Press Enter to submit your guess</p>
      </div>
    </div>
  );
};

export default GuessTheNumberGame;