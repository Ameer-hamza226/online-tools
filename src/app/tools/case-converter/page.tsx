'use client';

import { useState } from 'react';

export default function CaseConverter() {
  const [text, setText] = useState('');

  const convertCase = (type: string) => {
    switch (type) {
      case 'upper':
        setText(text.toUpperCase());
        break;
      case 'lower':
        setText(text.toLowerCase());
        break;
      case 'title':
        setText(
          text.toLowerCase().replace(/(^|\s)\w/g, letter => letter.toUpperCase())
        );
        break;
      case 'sentence':
        setText(
          text.toLowerCase().replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase())
        );
        break;
      case 'alternating':
        setText(
          text.split('').map((char, i) => 
            i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
          ).join('')
        );
        break;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Case Converter</h1>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="text" className="block text-sm font-medium mb-2">
            Enter your text
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 border rounded-lg h-40 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Type or paste your text here..."
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <button
            onClick={() => convertCase('upper')}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            UPPERCASE
          </button>
          <button
            onClick={() => convertCase('lower')}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            lowercase
          </button>
          <button
            onClick={() => convertCase('title')}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Title Case
          </button>
          <button
            onClick={() => convertCase('sentence')}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Sentence case
          </button>
          <button
            onClick={() => convertCase('alternating')}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            aLtErNaTiNg CaSe
          </button>
        </div>
      </div>
    </div>
  );
}
