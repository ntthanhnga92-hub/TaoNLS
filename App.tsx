import React, { useState } from 'react';
import LessonInput from './components/LessonInput';
import LessonOutput from './components/LessonOutput';
import { generateDigitalLessonPlan } from './services/gemini';
import { LessonData, LoadingState } from './types';

const App: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLessonSubmit = async (data: LessonData) => {
    setLoadingState(LoadingState.THINKING);
    setError(null);
    setResult("");

    try {
      const generatedPlan = await generateDigitalLessonPlan(data);
      setResult(generatedPlan);
      setLoadingState(LoadingState.COMPLETE);
    } catch (err: any) {
      console.error(err);
      setError("Đã xảy ra lỗi khi kết nối với Gemini. Vui lòng kiểm tra API Key hoặc thử lại sau.");
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      {/* Header - Matches Screenshot Dark Teal */}
      <header className="bg-teal-700 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Soạn Giáo Án Năng Lực Số
            </h1>
            <p className="text-[11px] text-teal-100/80 font-normal">Hỗ trợ tích hợp Thông tư 02/2025/TT-BGDĐT</p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 bg-teal-800/50 rounded-full border border-teal-600/50 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-[10px] text-teal-50 font-medium">Powered by Gemini 2.5</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1600px] mx-auto w-full px-4 py-6">
        
        {error && (
          <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg shadow-sm flex items-center gap-3">
            <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-120px)] min-h-[650px]">
          {/* Left Column: Input (Matches screenshot width ratio approx 4/12) */}
          <div className="lg:col-span-4 xl:col-span-3 h-full flex flex-col">
            <LessonInput onSubmit={handleLessonSubmit} loadingState={loadingState} />
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-8 xl:col-span-9 h-full flex flex-col">
            <LessonOutput content={result} loadingState={loadingState} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;