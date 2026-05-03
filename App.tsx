import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { ContentCategory, ContentPlanItem, GeneratorSettings, CATEGORY_LIST } from './types';
import InputPanel from './components/InputPanel';
import PlanTable from './components/PlanTable';
import { generateContentPlan } from './services/geminiService';

const App: React.FC = () => {
  // Initialize default weights (even distribution approx 12-13% or just 0 for auto)
  // Let's set them to 10 as a base line, user can adjust.
  const initialWeights: Record<string, number> = {};
  CATEGORY_LIST.forEach(cat => {
    initialWeights[cat] = 10;
  });

  const [settings, setSettings] = useState<GeneratorSettings>({
    customApiKey: '',
    category: ContentCategory.ALL,
    count: 5,
    customPrompt: '',
    knowledgeBase: `HỆ THỐNG ANH NGỮ QUỐC TẾ QUEEN

I. CHƯƠNG TRÌNH TIẾNG ANH GIAO TIẾP OFFLINE
1. Chi nhánh QUEEN:
- Khu vực: Trảng Dài
- Phân khúc học viên (nhiều nhất đến ít nhất): Cấp tiểu học -> Cấp 2 -> Mầm non -> Cấp 3

2. Chi nhánh THIÊN VĂN:
- Khu vực: Tân Phong, Thạnh Phú - Vĩnh Cửu, Trảng Dài (khu vực giáp với Tân Phong)
- Phân khúc học viên: Cấp tiểu học -> Cấp 2 -> Mầm non -> Cấp 3

3. Chi nhánh QUEEN LONG BÌNH:
- Khu vực: An Bình, Long Bình
- Phân khúc học viên: Cấp tiểu học -> Cấp 2 -> Mầm non -> Cấp 3

(Vui lòng bổ sung thêm các chương trình học khác nếu có...)`, // Initialize knowledge base
    videoPercentage: 30,
    designPercentage: 50,
    tone: 'mixed',
    targetAudience: 'mixed',
    postLength: 'mixed',
    courseSegment: 'mixed',
    purposeWeights: initialWeights
  });

  const [planItems, setPlanItems] = useState<ContentPlanItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateContentPlan(settings);
      setPlanItems(result);
    } catch (err: any) {
      setError(err.message || "Đã có lỗi xảy ra khi tạo nội dung. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = () => {
    if (planItems.length === 0) return;

    // Prepare data for Excel
    const dataToExport = planItems.map((item, index) => ({
      'STT': index + 1,
      'MỤC ĐÍCH': item.purpose,
      'CHỦ ĐỀ': item.topic,
      'GHI CHÚ': item.note,
      'TIÊU ĐỀ': item.title,
      'NỘI DUNG CHI TIẾT': item.content,
      'HÌNH ẢNH/VIDEO': item.visuals,
      'BRIEF DESIGN': item.designBrief,
      'HASHTAG': item.hashtags,
      'NGÀY ĐĂNG': '',
      'DEADLINE': '',
      'ĐỊNH DẠNG': '',
      'TÌNH TRẠNG': 'Pending',
      'TIẾN ĐỘ': '',
      'LINK ẢNH': ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Content Plan");

    // Adjust column widths (approximate)
    const wscols = [
      { wch: 5 },  // STT
      { wch: 20 }, // MUC DICH
      { wch: 25 }, // CHU DE
      { wch: 20 }, // GHI CHU
      { wch: 40 }, // TIEU DE
      { wch: 60 }, // NOI DUNG
      { wch: 30 }, // HINH ANH
      { wch: 30 }, // DESIGN
      { wch: 20 }, // HASHTAG
    ];
    worksheet['!cols'] = wscols;

    XLSX.writeFile(workbook, `Ke_Hoach_Content_Queen_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-queen-600 w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl shadow-md">
              🇬🇧
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">Queen English AI Planner</h1>
              <p className="text-xs text-gray-500">Trợ lý viết nội dung Anh ngữ tự động</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             {planItems.length > 0 && (
              <button 
                onClick={handleExportExcel}
                className="hidden sm:inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Xuất Excel
              </button>
            )}
            <div className="hidden sm:block">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Gemini 3.1 Pro Active
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-[1920px] mx-auto w-full flex flex-col">
        
        {/* Controls */}
        <InputPanel 
          settings={settings} 
          setSettings={setSettings} 
          onGenerate={handleGenerate}
          isLoading={loading}
        />

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Table */}
        <div className="flex-grow flex flex-col">
          <div className="flex justify-between items-center mb-4 sm:hidden">
             <h2 className="text-lg font-semibold text-gray-800">Kết quả</h2>
             {planItems.length > 0 && (
              <button 
                onClick={handleExportExcel}
                className="inline-flex items-center px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg shadow-sm"
              >
                Xuất Excel
              </button>
            )}
          </div>
          <PlanTable items={planItems} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Queen English Content Planner. Powered by Google Gemini.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;