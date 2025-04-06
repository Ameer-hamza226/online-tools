'use client';

import { useState } from 'react';

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleConvert = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (e) {
      setOutput('Invalid input');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Base64 Encoder/Decoder</h1>
        <p className="text-gray-600">Convert text to and from Base64 format. Useful for encoding binary data that needs to be stored and transferred over media that are designed to deal with text.</p>
      </div>
      
      <div className="space-y-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setMode('encode')}
            className={`px-4 py-2 rounded ${mode === 'encode' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-2 rounded ${mode === 'decode' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          >
            Decode
          </button>
        </div>

        <div className="space-y-2">
          <label htmlFor="input" className="block text-sm font-medium text-gray-700">
            Input Text
          </label>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={`Enter text to ${mode}`}
          />
        </div>

        <button
          onClick={handleConvert}
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Convert
        </button>

        <div className="space-y-2">
          <label htmlFor="output" className="block text-sm font-medium text-gray-700">
            Result
          </label>
          <textarea
            id="output"
            value={output}
            readOnly
            className="w-full h-32 p-2 border rounded bg-gray-50"
            placeholder="Result will appear here"
          />
        </div>
      </div>
    </div>
  );
}
