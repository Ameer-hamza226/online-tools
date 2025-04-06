'use client';

import { useState } from 'react';

export default function PasswordStrength() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState<{ score: number; feedback: { message: string; passed: boolean }[] }>({ score: 0, feedback: [] });

  const checkStrength = (pass: string) => {
    const criteria = [
      { test: /.{8,}/, message: 'At least 8 characters long' },
      { test: /[A-Z]/, message: 'Contains uppercase letters' },
      { test: /[a-z]/, message: 'Contains lowercase letters' },
      { test: /[0-9]/, message: 'Contains numbers' },
      { test: /[^A-Za-z0-9]/, message: 'Contains special characters' }
    ];

    const passedCriteria = criteria.filter(c => c.test.test(pass));
    const score = passedCriteria.length;
    const feedback = criteria.map(c => ({
      message: c.message,
      passed: c.test.test(pass)
    }));

    return { score, feedback };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pass = e.target.value;
    setPassword(pass);
    setStrength(checkStrength(pass));
  };

  const getStrengthLabel = (score: number) => {
    if (score <= 1) return { text: 'Weak', color: 'text-red-500' };
    if (score <= 3) return { text: 'Medium', color: 'text-yellow-500' };
    return { text: 'Strong', color: 'text-green-500' };
  };

  const strengthLabel = getStrengthLabel(strength.score);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Password Strength Checker</h1>
      <div className="space-y-6">
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Enter your password
          </label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Type your password here..."
          />
        </div>

        {password && (
          <div className="space-y-4">
            <div>
              <span className="font-semibold">Strength: </span>
              <span className={strengthLabel.color}>{strengthLabel.text}</span>
            </div>

            <div>
              <h2 className="font-semibold mb-2">Password Requirements:</h2>
              <ul className="space-y-2">
                {strength.feedback.map((item, index) => (
                  <li key={index} className="flex items-center">
                    {item.passed ? (
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    {item.message}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
