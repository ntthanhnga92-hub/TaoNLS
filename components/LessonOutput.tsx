import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, CheckCheck, ClipboardList, Sparkles } from 'lucide-react';
import { LoadingState } from '../types';

interface LessonOutputProps {
  content: string;
  loadingState: LoadingState;
}

const LessonOutput: React.FC<LessonOutputProps> = ({ content, loadingState }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loadingState === LoadingState.IDLE) {
    return (
      <div className="h-full bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
        <div className="bg-teal-50 p-6 rounded-full mb-4">
          <ClipboardList className="w-8 h-8 text-teal-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">Chưa có kết quả</h3>
        <p className="max-w-md text-slate-400 text-sm leading-relaxed">
          Điền thông tin và tải lên tài liệu SGK bên trái, sau đó nhấn "Tạo Kế Hoạch Bài Dạy" để bắt đầu.
        </p>
      </div>
    );
  }

  if (loadingState === LoadingState.THINKING || loadingState === LoadingState.GENERATING) {
    return (
      <div className="h-full bg-white rounded-lg shadow-sm border border-slate-200 p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-teal-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <h3 className="text-lg font-bold text-teal-800 mb-2">Đang soạn giáo án...</h3>
        <p className="text-slate-500 text-center max-w-sm text-sm">
          Hệ thống đang phân tích yêu cầu và tích hợp khung năng lực số 3456. Vui lòng đợi trong giây lát.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="p-4 px-6 border-b border-slate-100 flex justify-between items-center bg-white">
        <h2 className="font-bold text-teal-800 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          Kế hoạch bài dạy
        </h2>
        <button 
          onClick={handleCopy}
          className="px-3 py-1.5 hover:bg-slate-50 border border-slate-200 rounded text-slate-600 transition-all flex items-center gap-2 text-xs font-medium"
        >
          {copied ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Đã chép' : 'Sao chép'}
        </button>
      </div>
      
      <div className="p-8 overflow-y-auto flex-1 bg-white custom-scrollbar">
        <div className="markdown-body">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default LessonOutput;