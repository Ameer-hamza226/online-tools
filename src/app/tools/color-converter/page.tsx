'use client';

import { useState, useEffect } from 'react';

export default function ColorConverter() {
  const [hex, setHex] = useState('#000000');
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });
  const [error, setError] = useState('');

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      };
    }
    return null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (n: number) => {
      const hex = Math.max(0, Math.min(255, n)).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const handleHexChange = (value: string) => {
    setError('');
    if (value.startsWith('#')) {
      value = value.slice(1);
    }
    value = '#' + value;
    
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setHex(value);
      const rgbValue = hexToRgb(value);
      if (rgbValue) {
        setRgb(rgbValue);
      }
    } else {
      setError('Invalid HEX color code');
    }
  };

  const handleRgbChange = (color: 'r' | 'g' | 'b', value: string) => {
    setError('');
    const numValue = parseInt(value);
    if (isNaN(numValue) || numValue < 0 || numValue > 255) {
      setError('RGB values must be between 0 and 255');
      return;
    }

    const newRgb = { ...rgb, [color]: numValue };
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Color Code Converter</h1>

      <div className="space-y-6">
        <div
          className="w-full h-32 rounded-lg border"
          style={{ backgroundColor: error ? '#000000' : hex }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* HEX Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              HEX Color Code
            </label>
            <input
              type="text"
              value={hex}
              onChange={(e) => handleHexChange(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="#000000"
              maxLength={7}
            />
          </div>

          {/* RGB Inputs */}
          <div className="space-y-4">
            <label className="block text-sm font-medium">
              RGB Values
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <input
                  type="number"
                  value={rgb.r}
                  onChange={(e) => handleRgbChange('r', e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="R"
                  min="0"
                  max="255"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={rgb.g}
                  onChange={(e) => handleRgbChange('g', e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="G"
                  min="0"
                  max="255"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={rgb.b}
                  onChange={(e) => handleRgbChange('b', e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="B"
                  min="0"
                  max="255"
                />
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold mb-2">CSS Values:</h2>
          <div className="space-y-2 font-mono text-sm">
            <div>HEX: {hex}</div>
            <div>RGB: rgb({rgb.r}, {rgb.g}, {rgb.b})</div>
          </div>
        </div>
      </div>
    </div>
  );
}
