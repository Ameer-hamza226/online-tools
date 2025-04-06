'use client';

import { useState } from 'react';

export default function RandomNumber() {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState('1');
  const [numbers, setNumbers] = useState<number[]>([]);
  const [unique, setUnique] = useState(true);
  const [error, setError] = useState('');

  const generateNumbers = () => {
    const minNum = parseInt(min);
    const maxNum = parseInt(max);
    const numCount = parseInt(count);

    // Validation
    if (isNaN(minNum) || isNaN(maxNum) || isNaN(numCount)) {
      setError('Please enter valid numbers');
      return;
    }

    if (minNum >= maxNum) {
      setError('Maximum number must be greater than minimum number');
      return;
    }

    if (numCount < 1) {
      setError('Count must be at least 1');
      return;
    }

    if (unique && (maxNum - minNum + 1) < numCount) {
      setError('Not enough unique numbers in the range');
      return;
    }

    setError('');
    const result: number[] = [];
    const used = new Set<number>();

    while (result.length < numCount) {
      const num = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
      if (!unique || !used.has(num)) {
        result.push(num);
        used.add(num);
      }
    }

    setNumbers(result.sort((a, b) => a - b));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Random Number Generator</h1>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Minimum
            </label>
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Maximum
            </label>
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              How many numbers?
            </label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              min="1"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="unique"
            checked={unique}
            onChange={(e) => setUnique(e.target.checked)}
            className="rounded text-blue-500 focus:ring-blue-500"
          />
          <label htmlFor="unique" className="text-sm">
            Generate unique numbers only
          </label>
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <button
          onClick={generateNumbers}
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Generate Numbers
        </button>

        {numbers.length > 0 && (
          <div className="p-4 border rounded-lg">
            <h2 className="font-semibold mb-2">Generated Numbers:</h2>
            <div className="flex flex-wrap gap-2">
              {numbers.map((num, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
