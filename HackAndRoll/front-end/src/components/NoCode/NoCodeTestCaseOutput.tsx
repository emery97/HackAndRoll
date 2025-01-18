import React, { useState, useRef, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaClipboard, FaEdit, FaDownload } from 'react-icons/fa';

interface NoCodeTestCaseOutputProps {
  generatedTestCase: string | null;
}

// Utility function to clean delimiters
const cleanCodeSnippet = (code: string) => {
  return code.replace(/^```javascript\s*|\s*```$/g, '').trim();
};

const NoCodeTestCaseOutput: React.FC<NoCodeTestCaseOutputProps> = ({ generatedTestCase }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(generatedTestCase ? cleanCodeSnippet(generatedTestCase) : '');
  const [improvementPrompt, setImprovementPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopy = () => {
    if (content) {
      navigator.clipboard.writeText(content);
      alert('Code copied to clipboard!');
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleDownload = () => {
    if (content) {
      const blob = new Blob([content], { type: 'text/javascript' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'generatedTestCase.js';
      link.click();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height to recalculate
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on scrollHeight
    }
  };

  const handlePromptSubmit = async () => {
    setLoading(true);
    if (improvementPrompt && content) {
      try {
        const response = await fetch("http://localhost:3000/improvetestcase", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              testCase: content,
              improvements: improvementPrompt
            }),
        });

        if (!response.ok) {
            throw new Error('Response not ok.');
        }

        const data = await response.json();

        if (response.status === 200) {
            // Update the content with the improved code
            setContent(cleanCodeSnippet(data.improvement));
        } else {
            alert(data.error);
        }

      } catch (error) {
          console.error("Error generating test case:", error);
      } finally {
          setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (textareaRef.current) adjustTextareaHeight();
  }, [isEditing]);

  useEffect(() => {
    if (generatedTestCase) {
      setContent(cleanCodeSnippet(generatedTestCase));
    }
  }, [generatedTestCase]);

  return (
    <div className="flex flex-col w-full h-full dark:bg-gray-800 cursor-pointer">
      {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                  <p className="text-lg font-medium">Generating...</p>
              </div>
          </div>
      )}

      {/* Prompt for Improvements Section */}
      <div className="p-4 bg-gray-100 rounded-lg dark:bg-gray-700 mb-2">
        <h3 className="text-lg font-medium dark:text-white mb-2">
          Suggest Improvements
        </h3>
        <textarea
          value={improvementPrompt}
          onChange={(e) => {
            setImprovementPrompt(e.target.value);
            if (e.target.scrollHeight > e.target.clientHeight) {
              e.target.style.height = `${e.target.scrollHeight}px`;
            }
          }}
          placeholder="Describe what you'd like to improve about this code..."
          className="w-full p-2 border border-gray-400 rounded-lg dark:bg-gray-800 dark:text-white mb-4"
          style={{
            fontFamily: 'sans-serif',
            resize: 'none',
            lineHeight: '1.5rem',
            minHeight: '7.5rem', 
          }}
        />
        <button
          onClick={handlePromptSubmit}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors bg-primary"
        >
          Generate Improvements
        </button>
      </div>

      {/* Code Display Section */}
      {content && (
        <div className="mt-6 p-4 bg-gray-200 rounded-lg dark:bg-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium dark:text-white">Generated Test Case</h3>
            <div className="flex space-x-2">
              <button
                onClick={handleCopy}
                className="flex items-center px-4 py-2 border border-primary-500 text-primary-500 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <FaClipboard className="mr-2" />
                Copy
              </button>
              <button
                onClick={toggleEditMode}
                className="flex items-center px-4 py-2 border border-primary-500 text-primary-500 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <FaEdit className="mr-2" />
                {isEditing ? 'Stop Editing' : 'Edit'}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center px-4 py-2 border border-primary-500 text-primary-500 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <FaDownload className="mr-2" />
                Download (.js)
              </button>
            </div>
          </div>
          {isEditing ? (
            <textarea
              ref={textareaRef}
              value={content}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-400 rounded-lg dark:bg-gray-800 dark:text-white"
              style={{
                fontFamily: 'monospace',
                resize: 'none',
                lineHeight: '1.5rem',
                overflow: 'hidden',
              }}
            />
          ) : (
            <SyntaxHighlighter
              language="javascript"
              style={vscDarkPlus}
              showLineNumbers
              customStyle={{
                borderRadius: '0.5rem',
                padding: '1rem',
                fontSize: '0.9rem',
              }}
            >
              {content}
            </SyntaxHighlighter>
          )}
        </div>
      )}
    </div>
  );
};

export default NoCodeTestCaseOutput;
