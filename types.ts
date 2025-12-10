export interface LessonData {
  book: string;
  gradeLevel: string;
  totalPeriods: string;
  structure: 'lesson' | 'topic'; // lesson = Chia theo tiết, topic = Theo bài
  subject: string;
  topic: string; // Tên bài học
  fileContent?: string; // Placeholder for file content
  fileName?: string; // Tên file hiển thị
  fileData?: string; // Base64 string của file
  mimeType?: string; // Loại file (image/png, application/pdf, etc.)
}

export interface GeneratedPlan {
  markdown: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  THINKING = 'THINKING',
  GENERATING = 'GENERATING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}