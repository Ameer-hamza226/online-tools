'use client';

import { useState, useEffect } from 'react';
import { Metadata } from 'next';
import Head from 'next/head';

// Define metadata for this page
export const metadata: Metadata = {
  title: 'Base64 Encoder/Decoder - Free Online Tool',
  description: 'Free online tool to encode and decode text to and from Base64 format. No ads, no registration, and completely free.',
  keywords: ['base64', 'encoder', 'decoder', 'base64 converter', 'online tool', 'free tool'],
};

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [fileContent, setFileContent] = useState<string | null>(null);

  // Auto-convert when input or mode changes
  useEffect(() => {
    if (input) {
      handleConvert();
    } else {
      setOutput('');
      setError(null);
    }
  }, [input, mode]);

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleConvert = () => {
    setError(null);
    
    if (!input.trim()) {
      setOutput('');
      return;
    }
    
    try {
      if (mode === 'encode') {
        // For encoding, we need to handle Unicode characters properly
        const encodedText = btoa(unescape(encodeURIComponent(input)));
        setOutput(encodedText);
      } else {
        // For decoding, ensure the input is valid Base64
        if (!/^[A-Za-z0-9+/=]+$/.test(input.trim())) {
          throw new Error('Input contains invalid Base64 characters');
        }
        const decodedText = decodeURIComponent(escape(atob(input.trim())));
        setOutput(decodedText);
      }
    } catch (e) {
      console.error('Conversion error:', e);
      setError(mode === 'encode' 
        ? 'Error encoding text. Please check your input.'
        : 'Error decoding Base64. Please ensure your input is valid Base64.');
      setOutput('');
    }
  };

  const handleCopyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
    setFileContent(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    
    if (mode === 'encode') {
      // For encoding, read as text
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          setInput(content);
          setFileContent(file.name);
        }
      };
      reader.readAsText(file);
    } else {
      // For decoding, read as text (assuming it's Base64 text)
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          setInput(content);
          setFileContent(file.name);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSwapMode = () => {
    // If we have output, set it as input when swapping modes
    if (output) {
      setInput(output);
      setOutput('');
    }
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Base64 Encoder/Decoder</h1>
        <p className="text-gray-600">
          Convert text to and from Base64 format. Useful for encoding binary data that needs 
          to be stored and transferred over media that are designed to deal with text.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex rounded-md overflow-hidden border border-gray-300">
            <button
              onClick={() => setMode('encode')}
              className={`px-4 py-2 ${mode === 'encode' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
              aria-pressed={mode === 'encode'}
            >
              Encode
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-4 py-2 ${mode === 'decode' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
              aria-pressed={mode === 'decode'}
            >
              Decode
            </button>
          </div>
          
          <button 
            onClick={handleSwapMode}
            className="flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            title="Swap input and output"
            aria-label="Swap input and output"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            <span className="ml-1">Swap</span>
          </button>
          
          <div className="flex-grow"></div>
          
          <label className="inline-flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded cursor-pointer transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            <span>Upload File</span>
            <input 
              type="file" 
              className="hidden" 
              onChange={handleFileUpload} 
              accept={mode === 'encode' ? '.txt,text/*' : '.txt,text/*'}
            />
          </label>
        </div>

        {fileContent && (
          <div className="text-sm text-gray-600 italic">
            File loaded: {fileContent}
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="input" className="block text-sm font-medium text-gray-700">
              Input Text {mode === 'encode' ? 'to Encode' : 'to Decode'}
            </label>
            <button 
              onClick={handleClear}
              className="text-sm text-gray-500 hover:text-gray-700"
              disabled={!input}
            >
              Clear
            </button>
          </div>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
            placeholder={mode === 'encode' 
              ? 'Enter text to encode to Base64' 
              : 'Enter Base64 text to decode'}
            aria-label={mode === 'encode' ? 'Text to encode' : 'Base64 to decode'}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="output" className="block text-sm font-medium text-gray-700">
              {mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
            </label>
            {output && (
              <button 
                onClick={handleCopyToClipboard}
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                aria-label="Copy to clipboard"
              >
                {copied ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy to Clipboard
                  </>
                )}
              </button>
            )}
          </div>
          <textarea
            id="output"
            value={output}
            readOnly
            className="w-full h-32 p-2 border rounded bg-gray-50 font-mono"
            placeholder={mode === 'encode' ? 'Encoded Base64 will appear here' : 'Decoded text will appear here'}
            aria-label={mode === 'encode' ? 'Encoded Base64 output' : 'Decoded text output'}
          />
        </div>

        <div className="bg-blue-50 p-4 rounded border border-blue-100">
          <h3 className="text-sm font-medium text-blue-800 mb-2">About Base64 Encoding</h3>
          <p className="text-sm text-blue-700">
            Base64 is a group of binary-to-text encoding schemes that represent binary data in an ASCII string format. 
            It's commonly used when there is a need to encode binary data that needs to be stored and transferred over 
            media that are designed to deal with text. This ensures that the data remains intact without modification 
            during transport.
          </p>
        </div>
      </div>
    </div>
  );
}
