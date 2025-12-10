import { GoogleGenAI } from "@google/genai";
import { LessonData } from "../types";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const MODEL_NAME = 'gemini-2.5-flash';

// Definitions based on Official Dispatch 3456/BGDĐT-GDPT
const DIGITAL_FRAMEWORK_CONTEXT = `
KHUNG NĂNG LỰC SỐ CHO HỌC SINH PHỔ THÔNG (Theo CV 3456/BGDĐT-GDPT):

1. KHAI THÁC DỮ LIỆU VÀ THÔNG TIN
- 1.1.NC1a: Đáp ứng nhu cầu thông tin.
- 1.1.NC1b: Áp dụng kỹ thuật tìm kiếm để lấy dữ liệu.
- 1.2.NC1a: Đánh giá độ tin cậy của nguồn dữ liệu.
- 1.3.NC1b: Tổ chức, sắp xếp dữ liệu (Ví dụ: Dùng Excel, bảng tính).

2. GIAO TIẾP VÀ HỢP TÁC
- 2.1.NC1a: Sử dụng công nghệ để tương tác.
- 2.2.NC1a: Chia sẻ dữ liệu qua công cụ số.
- 2.5.NC1a: Áp dụng chuẩn mực hành vi/quy tắc ứng xử trên mạng.

3. SÁNG TẠO NỘI DUNG SỐ
- 3.1.NC1a: Tạo và chỉnh sửa nội dung ở định dạng khác nhau (Văn bản, hình ảnh, video).
- 3.1.NC1b: Thể hiện bản thân qua nội dung số.
- 3.4.NC1a: Lập trình/Tự thao tác hướng dẫn máy tính (Ví dụ: Scratch, Python cơ bản).

4. AN TOÀN
- 4.1.NC1a: Bảo vệ thiết bị và nội dung số.
- 4.2.NC1a: Bảo vệ dữ liệu cá nhân và quyền riêng tư.
- 4.3.NC1a: Tránh rủi ro sức khỏe khi dùng công nghệ.

5. GIẢI QUYẾT VẤN ĐỀ
- 5.1.NC1a: Giải quyết vấn đề kỹ thuật.
- 5.2.NC1a/b: Xác định nhu cầu và giải pháp công nghệ (Ví dụ: Dùng phần mềm Toán học như GeoGebra, Desmos, máy tính cầm tay để giải toán/vẽ đồ thị).
- 5.3.NC1b: Sử dụng sáng tạo công nghệ để giải quyết vấn đề khái niệm/trừu tượng.

6. TRÍ TUỆ NHÂN TẠO (AI)
- 6.1.NC1a: Phân tích cách AI hoạt động.
- 6.2.NC1a: Sử dụng ứng dụng AI để giải quyết vấn đề cụ thể.

LƯU Ý ĐẶC THÙ MÔN TOÁN (Tham khảo Phụ lục):
- Sử dụng GeoGebra/Desmos để vẽ đồ thị/hình học: Thường là 5.2.NC1b hoặc 3.1.NC1a.
- Sử dụng Excel/Bảng tính để thống kê: Thường là 1.3.NC1b hoặc 5.2.NC1b.
- Sử dụng Máy tính cầm tay (MTCT) để tính toán: 5.2.NC1b.
- Tìm kiếm thông tin/dữ liệu thực tế: 1.1.NC1b.
`;

/**
 * Generates an enhanced lesson plan integrating digital competence.
 */
export const generateDigitalLessonPlan = async (data: LessonData): Promise<string> => {
  try {
    const textPrompt = `
      Bạn là chuyên gia giáo dục về **Khung năng lực số (Digital Competence Framework)** theo hướng dẫn của **Công văn 3456/BGDĐT-GDPT** tại Việt Nam.
      
      Nhiệm vụ: Thiết kế kế hoạch tích hợp năng lực số vào bài dạy.

      THÔNG TIN BÀI DẠY:
      - Bộ sách: ${data.book}
      - Môn: ${data.subject}
      - Lớp: ${data.gradeLevel}
      - Chủ đề/Bài học: ${data.topic}
      - Thời lượng: ${data.totalPeriods} tiết
      - Cấu trúc soạn thảo: ${data.structure === 'lesson' ? 'Chia cụ thể từng tiết' : 'Soạn theo bài (Chuỗi hoạt động liên mạch)'}

      THAM CHIẾU KHUNG NĂNG LỰC SỐ (Bắt buộc sử dụng mã NC):
      ${DIGITAL_FRAMEWORK_CONTEXT}

      YÊU CẦU ĐẦU RA (Định dạng Markdown):
      
      # KẾ HOẠCH BÀI DẠY TÍCH HỢP NĂNG LỰC SỐ (Bộ sách: ${data.book})

      ## 1. Mục tiêu Năng lực số (Theo CV 3456)
      *(Liệt kê cụ thể các mã năng lực sẽ đạt được. Ví dụ: **5.2.NC1b**: Sử dụng GeoGebra để vẽ đồ thị)*
      - **[Mã NC]**: [Mô tả hành vi cụ thể của học sinh trong bài này]
      - ...

      ## 2. Thiết bị và Học liệu số
      - Phần mềm/Công cụ: (Ví dụ: GeoGebra, Padlet, Canva, Google Sheets...)
      - Thiết bị: (Máy tính, điện thoại, máy chiếu...)

      ## 3. Tiến trình dạy học (Chi tiết các hoạt động)
      
      ${data.structure === 'lesson' ? '*(Lưu ý: Hãy chia rõ Tiết 1, Tiết 2... nếu số tiết > 1)*' : ''}

      ### Hoạt động 1: Khởi động (Tích hợp số)
      - **Mục tiêu**: ...
      - **Cách thức**: Mô tả cách dùng công nghệ để gây hứng thú.
      
      ### Hoạt động 2: Hình thành kiến thức (Trọng tâm)
      - **Hoạt động của GV & HS**: ...
      - **Ứng dụng công nghệ**: Mô tả chi tiết HS dùng công cụ gì (Ví dụ: Dùng GeoGebra trượt tham số a, b để quan sát biến thiên).
      - **Mã năng lực số tương ứng**: [Điền mã NC phù hợp, ví dụ 5.2.NC1b]

      ### Hoạt động 3: Luyện tập & Vận dụng
      - **Bài tập thực hành**: ...
      - **Sản phẩm số**: (Ví dụ: File báo cáo, Link bảng tin, Video...)

      ## 4. Kiểm tra & Đánh giá
      - Cách đánh giá năng lực số của HS trong bài này.

      Hãy tư duy sư phạm, bám sát nội dung Môn ${data.subject} Lớp ${data.gradeLevel} và đặc trưng của bộ sách ${data.book}. Ưu tiên các phần mềm mã nguồn mở hoặc phổ biến tại Việt Nam.
      ${data.fileName ? `\nLƯU Ý QUAN TRỌNG: Hãy phân tích nội dung từ file hình ảnh/PDF đính kèm để soạn bài sát với sách giáo khoa.` : ''}
    `;

    // Construct request contents
    let contents: any = [
      {
        text: textPrompt
      }
    ];

    // If there is file data, add it to the request
    if (data.fileData && data.mimeType) {
      contents = [
        {
          inlineData: {
            mimeType: data.mimeType,
            data: data.fileData
          }
        },
        {
          text: textPrompt
        }
      ];
    }

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: { parts: contents }, // Correct format for @google/genai with parts array
      config: {
        thinkingConfig: { 
          thinkingBudget: 24576 
        },
        maxOutputTokens: 8192, 
        temperature: 0.5,
      }
    });

    if (response.text) {
      return response.text;
    } else {
      throw new Error("Không nhận được phản hồi từ Gemini.");
    }

  } catch (error) {
    console.error("Error generating lesson plan:", error);
    throw error;
  }
};
