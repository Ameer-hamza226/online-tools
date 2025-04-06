import Image from "next/image";

export default function Home() {
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

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Free Online Tools</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A collection of free online tools to help with your daily tasks. No registration required.
        </p>
      </div>

      <div className="space-y-12">
        {tools.map((category) => (
          <div key={category.id} className="space-y-6">
            <h2 className="text-2xl font-semibold">{category.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((tool) => (
                <a
                  key={tool.id}
                  href={tool.path}
                  className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                  <p className="text-gray-600">{tool.description}</p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}