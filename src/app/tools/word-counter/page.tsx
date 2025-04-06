'use client';

import { useState, useEffect } from 'react';

export default function WordCounter() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0
  });

  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(Boolean).length : 0;

    setStats({
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs
    });
  }, [text]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Word Counter</h1>

      <div className="space-y-6">
        <div>
          <label htmlFor="text" className="block text-sm font-medium mb-2">
            Enter your text
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 border rounded-lg h-64 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Type or paste your text here..."
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-500">{stats.words}</div>
            <div className="text-sm text-gray-600">Words</div>
          </div>
          
          <div className="p-4 border rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-500">{stats.characters}</div>
            <div className="text-sm text-gray-600">Characters</div>
          </div>
          
          <div className="p-4 border rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-500">{stats.charactersNoSpaces}</div>
            <div className="text-sm text-gray-600">Characters (no spaces)</div>
          </div>
          
          <div className="p-4 border rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-500">{stats.sentences}</div>
            <div className="text-sm text-gray-600">Sentences</div>
          </div>
          
          <div className="p-4 border rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-500">{stats.paragraphs}</div>
            <div className="text-sm text-gray-600">Paragraphs</div>
          </div>
        </div>
      </div>
    </div>
  );
}
