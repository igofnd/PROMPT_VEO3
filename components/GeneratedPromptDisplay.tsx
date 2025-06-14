import React, { useState, useEffect } from 'react';
import Button from './Button';

interface GeneratedPromptDisplayProps {
  indonesianPrompt: string;
  englishPrompt: string;
  onIndonesianPromptChange: (newPrompt: string) => void;
  isLoading: boolean;
}

const CopyIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m9.75 0V9A1.875 1.875 0 0018.375 7.125h-3.375a1.875 1.875 0 00-1.875 1.875v.168m-7.5 0V9A1.875 1.875 0 006.375 7.125H3a1.875 1.875 0 00-1.875 1.875v10.5A1.875 1.875 0 003 21.375h9.375m-9.75-0a1.125 1.125 0 001.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v9.25c0 .621.504 1.125 1.125 1.125h.001z" />
  </svg>
);

const CheckIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const GeneratedPromptDisplay: React.FC<GeneratedPromptDisplayProps> = ({ 
  indonesianPrompt, 
  englishPrompt, 
  onIndonesianPromptChange,
  isLoading 
}) => {
  const [copiedIndonesian, setCopiedIndonesian] = useState(false);
  const [copiedEnglish, setCopiedEnglish] = useState(false);

  const copyToClipboard = async (text: string, setCopiedState: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedState(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedState(true);
      } catch (execErr) {
        console.error('Fallback copy failed: ', execErr);
        alert("Gagal menyalin prompt. Silakan salin secara manual.");
      }
      document.body.removeChild(textArea);
    }
  };
  
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (copiedIndonesian) {
      timerId = setTimeout(() => setCopiedIndonesian(false), 2000);
    }
    return () => clearTimeout(timerId);
  }, [copiedIndonesian]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (copiedEnglish) {
      timerId = setTimeout(() => setCopiedEnglish(false), 2000);
    }
    return () => clearTimeout(timerId);
  }, [copiedEnglish]);

  if (isLoading) {
    return (
      <div className="mt-6 p-4 bg-gray-800 rounded-md shadow text-center text-gray-300">
        <div className="flex justify-center items-center">
          <div className="loading-spinner mr-3"></div>
          Membuat prompt, mohon tunggu...
        </div>
      </div>
    );
  }

  if (!indonesianPrompt && !englishPrompt) {
    return (
      <div className="mt-6 p-4 bg-gray-800 rounded-md shadow text-center text-gray-400">
        Prompt yang Anda buat akan muncul di sini.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      {indonesianPrompt && (
        <div>
          <h3 className="text-lg font-semibold text-pink-400 mb-2">Prompt Bahasa Indonesia (Bisa Diedit):</h3>
          <div className="relative p-4 bg-gray-800 border border-gray-700 rounded-md shadow">
            <textarea
              value={indonesianPrompt}
              onChange={(e) => onIndonesianPromptChange(e.target.value)}
              className="w-full h-32 bg-gray-700 text-white p-2 rounded-md focus:ring-pink-500 focus:border-pink-500 resize-y"
              aria-label="Prompt Bahasa Indonesia yang bisa diedit"
            />
            <Button 
              onClick={() => copyToClipboard(indonesianPrompt, setCopiedIndonesian)}
              variant="icon"
              className="absolute top-2 right-2"
              title={copiedIndonesian ? "Disalin!" : "Salin prompt Indonesia"}
            >
              {copiedIndonesian ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
            </Button>
          </div>
          {copiedIndonesian && (
            <p className="mt-2 text-sm text-green-400 text-right">Prompt Indonesia disalin!</p>
          )}
        </div>
      )}

      {englishPrompt && (
        <div>
          <h3 className="text-lg font-semibold text-pink-400 mb-2">Prompt Bahasa Inggris (Final):</h3>
          <div className="relative p-4 bg-gray-800 border border-gray-700 rounded-md shadow">
            <pre className="whitespace-pre-wrap break-words text-sm text-white bg-gray-700 p-2 rounded-md">
              {englishPrompt}
            </pre>
             <Button 
              onClick={() => copyToClipboard(englishPrompt, setCopiedEnglish)}
              variant="icon"
              className="absolute top-2 right-2"
              title={copiedEnglish ? "Disalin!" : "Salin prompt Inggris"}
            >
              {copiedEnglish ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
            </Button>
          </div>
           {copiedEnglish && (
            <p className="mt-2 text-sm text-green-400 text-right">Prompt Inggris disalin!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GeneratedPromptDisplay;