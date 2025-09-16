import React, { useState, useCallback } from 'react';
import { AppState } from '../types';
import { generateVideoFromImage } from '../services/geminiService';
import ImageUploader from '../components/ImageUploader';
import Loader from '../components/Loader';
import VideoPlayer from '../components/VideoPlayer';

type AspectRatio = '16:9' | '9:16' | '1:1';

const aspectRatios: { value: AspectRatio; label: string }[] = [
  { value: '16:9', label: 'Widescreen' },
  { value: '9:16', label: 'Vertical' },
  { value: '1:1', label: 'Square' },
];

interface MainAppProps {
    onLogout: () => void;
    userEmail: string | null;
}

const MainApp: React.FC<MainAppProps> = ({ onLogout, userEmail }) => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleGenerate = useCallback(async () => {
    if (!imageFile || !prompt.trim()) {
      setError('Please provide both an image and a prompt.');
      return;
    }

    setAppState(AppState.GENERATING);
    setError(null);

    try {
      const finalPrompt = `${prompt.trim()}\n\nGenerate the video in a ${aspectRatio} aspect ratio.`;
      const base64Image = await fileToBase64(imageFile);
      const generatedVideoUrl = await generateVideoFromImage(base64Image, imageFile.type, finalPrompt);
      setVideoUrl(generatedVideoUrl);
      setAppState(AppState.SUCCESS);
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';

      const lowerCaseError = errorMessage.toLowerCase();
      if (lowerCaseError.includes('humans') && lowerCaseError.includes('not permitted')) {
        const friendlyMessage = 'The uploaded image contains people, which is not permitted for video generation in your region. Please choose an image without any humans.';
        setError(friendlyMessage);
        setAppState(AppState.IDLE);
      } else {
        setError(`Failed to generate video: ${errorMessage}`);
        setAppState(AppState.ERROR);
      }
    }
  }, [imageFile, prompt, aspectRatio]);

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setImageFile(null);
    setPrompt('');
    if(videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    setVideoUrl(null);
    setError(null);
  };

  const handleImageChange = (file: File | null) => {
    if (error) setError(null);
    setImageFile(file);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (error) setError(null);
    setPrompt(e.target.value);
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.GENERATING:
        return <Loader />;
      case AppState.SUCCESS:
        return videoUrl ? <VideoPlayer videoUrl={videoUrl} onReset={handleReset} aspectRatio={aspectRatio} /> : <div />;
      case AppState.ERROR:
        return (
          <div className="text-center p-8 bg-red-900/20 border border-red-500 rounded-lg">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Generation Failed</h2>
            <p className="text-red-300 mb-6">{error}</p>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-md font-semibold transition-colors"
            >
              Try Again
            </button>
          </div>
        );
      case AppState.IDLE:
      default:
        return (
          <>
            <ImageUploader imageFile={imageFile} setImageFile={handleImageChange} />
            {error && (
              <div className="mt-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-center" role="alert">
                <p className="text-red-300 text-sm font-medium">{error}</p>
              </div>
            )}
            <div className="w-full mt-6">
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
                Describe the motion
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={handlePromptChange}
                placeholder="e.g., a gentle breeze rustles the leaves, camera slowly zooms in"
                className="w-full h-24 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
            <div className="w-full mt-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {aspectRatios.map((ratio) => (
                  <button
                    key={ratio.value}
                    onClick={() => setAspectRatio(ratio.value)}
                    className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500
                      ${aspectRatio === ratio.value
                        ? 'bg-indigo-600 text-white shadow'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      }`}
                  >
                    {ratio.label} <span className="hidden sm:inline">({ratio.value})</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handleGenerate}
              disabled={!imageFile || !prompt.trim()}
              className="w-full mt-8 py-3 px-6 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-indigo-500/50"
            >
              Generate Video
            </button>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            Image to Video Generator
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Bring your images to life. Upload a picture, describe the scene, and let AI create a video.
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-700 relative">
            <div className="absolute top-4 right-12 text-gray-400 text-sm hidden sm:block truncate" title={userEmail || ''}>
              {userEmail}
            </div>
            <button 
                onClick={onLogout} 
                title="Logout"
                className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
                aria-label="Logout"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
            </button>
          {renderContent()}
        </div>
        
        <footer className="text-center mt-8 text-gray-500 text-sm">
            <p>Powered by Google's Gemini API</p>
        </footer>
      </main>
    </div>
  );
};

export default MainApp;