'use client';

import { useState } from 'react';

export default function PercentageCalculator() {
  const [calc1, setCalc1] = useState({ x: '', y: '', result: '' });
  const [calc2, setCalc2] = useState({ value: '', total: '', result: '' });
  const [calc3, setCalc3] = useState({ original: '', change: '', result: '' });

  const calculatePercentageOf = () => {
    if (calc1.x && calc1.y) {
      const result = (parseFloat(calc1.x) * parseFloat(calc1.y)) / 100;
      setCalc1({ ...calc1, result: result.toFixed(2) });
    }
  };

  const calculatePercentage = () => {
    if (calc2.value && calc2.total) {
      const result = (parseFloat(calc2.value) / parseFloat(calc2.total)) * 100;
      setCalc2({ ...calc2, result: result.toFixed(2) });
    }
  };

  const calculatePercentageChange = () => {
    if (calc3.original && calc3.change) {
      const original = parseFloat(calc3.original);
      const change = parseFloat(calc3.change);
      const result = ((change - original) / original) * 100;
      setCalc3({ ...calc3, result: result.toFixed(2) });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Percentage Calculator</h1>

      <div className="space-y-8">
        {/* What is X% of Y? */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">What is X% of Y?</h2>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              value={calc1.x}
              onChange={(e) => setCalc1({ ...calc1, x: e.target.value })}
              className="w-20 p-2 border rounded"
              placeholder="X"
            />
            <span>% of</span>
            <input
              type="number"
              value={calc1.y}
              onChange={(e) => setCalc1({ ...calc1, y: e.target.value })}
              className="w-20 p-2 border rounded"
              placeholder="Y"
            />
            <button
              onClick={calculatePercentageOf}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Calculate
            </button>
            {calc1.result && (
              <span className="font-semibold">= {calc1.result}</span>
            )}
          </div>
        </div>

        {/* X is what percent of Y? */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">X is what percent of Y?</h2>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              value={calc2.value}
              onChange={(e) => setCalc2({ ...calc2, value: e.target.value })}
              className="w-20 p-2 border rounded"
              placeholder="X"
            />
            <span>is what % of</span>
            <input
              type="number"
              value={calc2.total}
              onChange={(e) => setCalc2({ ...calc2, total: e.target.value })}
              className="w-20 p-2 border rounded"
              placeholder="Y"
            />
            <button
              onClick={calculatePercentage}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Calculate
            </button>
            {calc2.result && (
              <span className="font-semibold">= {calc2.result}%</span>
            )}
          </div>
        </div>

        {/* Percentage Change */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Percentage Change</h2>
          <div className="flex items-center space-x-4">
            <span>From</span>
            <input
              type="number"
              value={calc3.original}
              onChange={(e) => setCalc3({ ...calc3, original: e.target.value })}
              className="w-20 p-2 border rounded"
              placeholder="Original"
            />
            <span>to</span>
            <input
              type="number"
              value={calc3.change}
              onChange={(e) => setCalc3({ ...calc3, change: e.target.value })}
              className="w-20 p-2 border rounded"
              placeholder="New Value"
            />
            <button
              onClick={calculatePercentageChange}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Calculate
            </button>
            {calc3.result && (
              <span className="font-semibold">= {calc3.result}% change</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
