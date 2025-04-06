import React from 'react';

export default function ToolsPage() {
  // Using the same tools data structure from the homepage
  const tools = [
    {
      id: 'security-tools',
      title: 'Security Tools',
      items: [
        {
          id: 'password-strength',
          name: 'Password Strength Checker',
          description: 'Check how strong your password is',
          path: '/tools/password-strength'
        }
      ]
    },
    {
      id: 'text-tools',
      title: 'Text Tools',
      items: [
        {
          id: 'case-converter',
          name: 'Case Converter',
          description: 'Convert text between different cases',
          path: '/tools/case-converter'
        },
        {
          id: 'base64',
          name: 'Base64 Encoder/Decoder',
          description: 'Convert text to and from Base64 format',
          path: '/tools/base64'
        },
        {
          id: 'url-encode',
          name: 'URL Encoder/Decoder',
          description: 'Encode and decode URLs safely',
          path: '/tools/url-encode'
        }
      ]
    },
    {
      id: 'math-tools',
      title: 'Math Tools',
      items: [
        {
          id: 'percentage-calculator',
          name: 'Percentage Calculator',
          description: 'Calculate percentages easily',
          path: '/tools/percentage-calculator'
        }
      ]
    },
    {
      id: 'utility-tools',
      title: 'Utility Tools',
      items: [
        {
          id: 'word-counter',
          name: 'Word Counter',
          description: 'Count words and characters in text',
          path: '/tools/word-counter'
        },
        {
          id: 'random-number',
          name: 'Random Number Generator',
          description: 'Generate random numbers in a range',
          path: '/tools/random-number'
        },
        {
          id: 'todo-list',
          name: 'To-Do List Generator',
          description: 'Create a printable to-do list',
          path: '/tools/todo-list'
        }
      ]
    },
    {
      id: 'dev-tools',
      title: 'Developer Tools',
      items: [
        {
          id: 'color-converter',
          name: 'Color Code Converter',
          description: 'Convert between HEX and RGB colors',
          path: '/tools/color-converter'
        },
        {
          id: 'json-formatter',
          name: 'JSON Formatter',
          description: 'Format and validate JSON data',
          path: '/tools/json-formatter'
        },
        {
          id: 'html-escape',
          name: 'HTML Escape/Unescape',
          description: 'Convert HTML special characters',
          path: '/tools/html-escape'
        },
      ]
    }
  ];

  // Flatten all tools into a single array for display
  const allTools = tools.flatMap(category => 
    category.items.map(tool => ({
      ...tool,
      category: category.title
    }))
  );

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">All Tools</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse our complete collection of free online tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allTools.map((tool) => (
          <a
            key={tool.id}
            href={tool.path}
            className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col h-full">
              <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
              <p className="text-gray-600 mb-2">{tool.description}</p>
              <span className="mt-auto text-sm text-gray-500">
                Category: {tool.category}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
