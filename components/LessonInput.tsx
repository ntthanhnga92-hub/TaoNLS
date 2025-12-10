import React, { useState, useRef } from 'react';
import { LessonData, LoadingState } from '../types';
import { ImagePlus, Loader2, FileCheck, X } from 'lucide-react';

interface LessonInputProps {
  onSubmit: (data: LessonData) => void;
  loadingState: LoadingState;
}

const LessonInput: React.FC<LessonInputProps> = ({ onSubmit, loadingState }) => {
  const [formData, setFormData] = useState<LessonData>({
    book: 'Chân trời sáng tạo',
    gradeLevel: 'Lớp 10',
    totalPeriods: '1',
    structure: 'lesson', // default to 'Chia theo tiết'
    subject: '',
    topic: '',
  });

  // Ref để truy cập vào input file ẩn
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStructureChange = (mode: 'lesson' | 'topic') => {
    setFormData(prev => ({ ...prev, structure: mode }));
  };

  // Kích hoạt click vào input ẩn
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Xử lý khi chọn file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Kiểm tra kích thước (ví dụ 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("File quá lớn. Vui lòng chọn file dưới 10MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // Lấy phần data base64 sau dấu phẩy
        const base64Data = result.split(',')[1];
        
        setFormData(prev => ({
          ...prev,
          fileName: file.name,
          fileData: base64Data,
          mimeType: file.type
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
    setFormData(prev => ({
      ...prev,
      fileName: undefined,
      fileData: undefined,
      mimeType: undefined
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isThinking = loadingState === LoadingState.THINKING || loadingState === LoadingState.GENERATING;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 h-full flex flex-col overflow-hidden">
      {/* Header with Light Teal background */}
      <div className="px-5 py-4 bg-teal-50/80 border-b border-teal-100">
        <h2 className="text-base font-bold text-teal-800">
          Thông tin bài dạy
        </h2>
      </div>

      <div className="p-5 flex-1 overflow-y-auto custom-scrollbar">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Bộ sách */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Bộ sách</label>
            <div className="relative">
              <select
                name="book"
                value={formData.book}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 appearance-none shadow-sm"
                disabled={isThinking}
              >
                <option value="Chân trời sáng tạo">Chân trời sáng tạo</option>
                <option value="Kết nối tri thức">Kết nối tri thức với cuộc sống</option>
                <option value="Cánh diều">Cánh diều</option>
                <option value="Khác">Bộ sách khác</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {/* Row: Khối lớp & Tổng số tiết */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Khối lớp</label>
              <div className="relative">
                <select
                  name="gradeLevel"
                  value={formData.gradeLevel}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 appearance-none shadow-sm"
                  disabled={isThinking}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(grade => (
                    <option key={grade} value={`Lớp ${grade}`}>Lớp {grade}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Tổng số tiết</label>
              <input
                type="number"
                name="totalPeriods"
                min="1"
                value={formData.totalPeriods}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 shadow-sm"
                disabled={isThinking}
              />
            </div>
          </div>

          {/* Cấu trúc soạn thảo */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Cấu trúc soạn thảo</label>
            <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-md">
              <button
                type="button"
                onClick={() => handleStructureChange('lesson')}
                className={`text-xs py-1.5 rounded font-medium transition-all ${
                  formData.structure === 'lesson' 
                    ? 'bg-white text-teal-700 shadow-sm border border-slate-200' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Chia theo tiết
                <span className="block text-[9px] font-normal text-slate-400 mt-0.5">Tiết 1, Tiết 2...</span>
              </button>
              <button
                type="button"
                onClick={() => handleStructureChange('topic')}
                className={`text-xs py-1.5 rounded font-medium transition-all ${
                  formData.structure === 'topic' 
                    ? 'bg-white text-teal-700 shadow-sm border border-slate-200' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Theo bài
                <span className="block text-[9px] font-normal text-slate-400 mt-0.5">4 hoạt động liền mạch</span>
              </button>
            </div>
          </div>

          {/* Môn học */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Môn học</label>
            <input
              type="text"
              name="subject"
              required
              placeholder="VD: Toán, Ngữ Văn..."
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 shadow-sm"
              disabled={isThinking}
            />
          </div>

          {/* Tên bài học */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Tên bài học</label>
            <input
              type="text"
              name="topic"
              placeholder="Nhập tên bài hoặc để trống nếu dùng ảnh"
              value={formData.topic}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 shadow-sm"
              disabled={isThinking}
            />
          </div>

          {/* Tải lên tài liệu */}
          <div>
             <label className="block text-xs font-semibold text-teal-600 mb-1.5">Tải lên tài liệu (PDF hoặc Ảnh chụp SGK)</label>
             
             {/* Input ẩn để chọn file */}
             <input 
               type="file" 
               ref={fileInputRef} 
               onChange={handleFileChange} 
               className="hidden" 
               accept="image/*,application/pdf"
               disabled={isThinking}
             />
             
             {!formData.fileName ? (
               <div 
                 onClick={handleUploadClick}
                 className="border-2 border-dashed border-teal-200 bg-teal-50/30 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-teal-50/60 transition-colors group"
               >
                  <div className="bg-teal-100/50 p-2 rounded-lg mb-2 group-hover:bg-teal-100 transition-colors">
                    <ImagePlus className="w-6 h-6 text-teal-600" />
                  </div>
                  <p className="text-sm font-medium text-teal-700">Tải file lên <span className="text-slate-400 font-normal">hoặc kéo thả vào đây</span></p>
                  <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, PDF tối đa 10MB</p>
               </div>
             ) : (
               <div className="border border-teal-200 bg-teal-50 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="bg-white p-2 rounded border border-teal-100">
                      <FileCheck className="w-5 h-5 text-teal-600" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <p className="text-sm font-medium text-teal-800 truncate max-w-[150px]">{formData.fileName}</p>
                      <p className="text-[10px] text-teal-500">Đã sẵn sàng tải lên</p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={removeFile}
                    className="p-1 hover:bg-teal-100 rounded text-teal-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
               </div>
             )}
          </div>

        </form>
      </div>

      <div className="p-5 border-t border-slate-100 bg-white">
        <button
          onClick={handleSubmit}
          disabled={isThinking}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-md text-white font-semibold text-sm transition-all shadow-sm
            ${isThinking 
              ? 'bg-slate-300 cursor-not-allowed' 
              : 'bg-teal-500 hover:bg-teal-600 active:bg-teal-700'
            }`}
        >
          {isThinking ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Đang xử lý...
            </>
          ) : (
            'Tạo Kế Hoạch Bài Dạy'
          )}
        </button>
      </div>
    </div>
  );
};

export default LessonInput;