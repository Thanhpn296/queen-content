import React, { useState } from 'react';
import { ContentCategory, GeneratorSettings, ToneType, AudienceType, LengthType, CATEGORY_LIST, SHORT_CATEGORY_NAMES } from '../types';

interface InputPanelProps {
  settings: GeneratorSettings;
  setSettings: React.Dispatch<React.SetStateAction<GeneratorSettings>>;
  onGenerate: () => void;
  isLoading: boolean;
}

const InputPanel: React.FC<InputPanelProps> = ({ settings, setSettings, onGenerate, isLoading }) => {
  const [showDistribution, setShowDistribution] = useState(false);

  const handleChange = (field: keyof GeneratorSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleWeightChange = (category: string, value: number) => {
    setSettings(prev => ({
      ...prev,
      purposeWeights: {
        ...prev.purposeWeights,
        [category]: value
      }
    }));
  };

  // Helper to check if distribution is balanced (default)
  const isDefaultDistribution = CATEGORY_LIST.every(cat => settings.purposeWeights[cat] === 10);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Category Selection */}
        <div className="md:col-span-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nhóm bài viết
          </label>
          <select
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-queen-500 focus:border-transparent outline-none transition-all"
            value={settings.category}
            onChange={(e) => handleChange('category', e.target.value as ContentCategory)}
          >
            {Object.values(ContentCategory).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Course Segment Selection */}
        <div className="md:col-span-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phân khúc đối tượng
          </label>
          <select
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-queen-500 focus:border-transparent outline-none transition-all"
            value={settings.courseSegment}
            onChange={(e) => handleChange('courseSegment', e.target.value)}
          >
            <option value="mixed">Đa dạng (Trẻ em & Người lớn)</option>
            <option value="kids">Chỉ nội dung Trẻ em / Thiếu niên</option>
            <option value="adults">Chỉ nội dung Người lớn</option>
          </select>
        </div>

        {/* Count Selection */}
        <div className="md:col-span-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Số lượng bài
          </label>
          <input
            type="number"
            min={1}
            max={30}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-queen-500 focus:border-transparent outline-none transition-all"
            value={settings.count}
            onChange={(e) => handleChange('count', parseInt(e.target.value))}
          />
        </div>

        {/* Custom Prompt */}
        <div className="md:col-span-12">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Ghi chú / Yêu cầu thêm (Prompt)
          </label>
          <textarea
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-queen-500 focus:border-transparent outline-none transition-all h-[46px] min-h-[46px] resize-none overflow-hidden focus:h-24 focus:absolute focus:z-10 focus:shadow-lg"
            placeholder="VD: Viết theo phong cách hài hước, tập trung vào tiếng Anh giao tiếp..."
            value={settings.customPrompt}
            onChange={(e) => handleChange('customPrompt', e.target.value)}
            style={{ transition: 'height 0.2s' }}
          />
        </div>

        {/* Custom API Key Input */}
        <div className="md:col-span-12">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Custom Gemini API Key (Tùy chọn)
          </label>
          <input
            type="password"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-queen-500 focus:border-transparent outline-none transition-all"
            placeholder="Nhập API Key của bạn nếu muốn dùng key riêng. Để trống để dùng key mặc định."
            value={settings.customApiKey || ''}
            onChange={(e) => handleChange('customApiKey', e.target.value)}
          />
          {settings.customApiKey && settings.customApiKey.trim().length > 0 && (
            <p className="mt-1.5 text-xs text-green-600 font-medium flex items-center">
              <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Hệ thống sẽ sử dụng Custom API Key của bạn cho lần tạo tiếp theo.
            </p>
          )}
        </div>

        {/* Knowledge Base Input (New Field) */}
        <div className="md:col-span-12">
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-queen-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            Kiến thức chuyên môn / Sự thật (Bắt buộc)
          </label>
          <textarea
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-queen-500 focus:border-transparent outline-none transition-all min-h-[80px]"
            placeholder="Nhập các kiến thức, quy trình, giá cả chính xác hoặc các lưu ý đặc biệt để tránh AI viết sai sự thật. 
VD: Khóa IELTS cam kết đầu ra 7.0+ trong 14 tháng... Học phí giảm 5% cho anh em ruột..."
            value={settings.knowledgeBase}
            onChange={(e) => handleChange('knowledgeBase', e.target.value)}
          />
          <p className="text-xs text-gray-400 mt-1 italic">* AI sẽ sử dụng thông tin này làm cơ sở sự thật để viết bài.</p>
        </div>
      </div>
      
      {/* Category Distribution Controls (Only visible when ALL is selected) */}
      {settings.category === ContentCategory.ALL && (
        <div className="mt-4 border-t border-gray-100 pt-4">
           <button 
            onClick={() => setShowDistribution(!showDistribution)}
            className="flex items-center text-sm font-semibold text-queen-600 hover:text-queen-700 focus:outline-none transition-colors"
           >
             <span className="mr-2">{showDistribution ? '▼' : '▶'}</span>
             Điều chỉnh tỷ lệ từng loại bài viết {isDefaultDistribution && !showDistribution && <span className="ml-2 font-normal text-gray-400 text-xs">(Đang để tự động)</span>}
           </button>
           
           {showDistribution && (
             <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                {CATEGORY_LIST.map((cat) => (
                  <div key={cat} className="flex flex-col">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-700 truncate mr-2" title={cat}>
                        {SHORT_CATEGORY_NAMES[cat]}
                      </span>
                      <span className="text-xs font-bold text-queen-600 w-8 text-right">
                        {settings.purposeWeights[cat] || 0}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={settings.purposeWeights[cat] || 0}
                      onChange={(e) => handleWeightChange(cat, parseInt(e.target.value))}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-queen-600"
                    />
                  </div>
                ))}
                <div className="col-span-full text-xs text-gray-400 italic text-center mt-2">
                  * Tỷ lệ % là con số ước lượng mong muốn để AI phân bổ.
                </div>
             </div>
           )}
        </div>
      )}

      {/* Advanced Settings */}
      <div className="mt-6 border-t border-gray-100 pt-4">
        <h4 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Cấu hình định dạng & Phong cách</h4>
        
        {/* Sliders Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          {/* Video Ratio */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Nhiều Hình ảnh hơn</span>
              <span className="font-bold text-queen-600">Tỷ lệ Video: {settings.videoPercentage}%</span>
              <span className="text-gray-600">Nhiều Video hơn</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={settings.videoPercentage}
              onChange={(e) => handleChange('videoPercentage', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-queen-600"
            />
          </div>

          {/* Design Ratio */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Hình thực tế</span>
              <span className="font-bold text-queen-600">Tỷ lệ Thiết kế: {settings.designPercentage}%</span>
              <span className="text-gray-600">Hình thiết kế</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={settings.designPercentage}
              onChange={(e) => handleChange('designPercentage', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-queen-600"
            />
          </div>
        </div>

        {/* Dropdowns Row - New Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Tone of Voice */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Giọng văn (Tone)</label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-queen-500 outline-none bg-white"
              value={settings.tone}
              onChange={(e) => handleChange('tone', e.target.value as ToneType)}
            >
              <option value="mixed">✨ Đa dạng (Khuyên dùng)</option>
              <option value="expert">Chuyên gia & Uy tín</option>
              <option value="friendly">Thân thiện & Gần gũi</option>
              <option value="trendy">Hài hước & Bắt trend</option>
            </select>
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Khách hàng mục tiêu</label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-queen-500 outline-none bg-white"
              value={settings.targetAudience}
              onChange={(e) => handleChange('targetAudience', e.target.value as AudienceType)}
            >
              <option value="mixed">✨ Đa dạng (Khuyên dùng)</option>
              <option value="students">Học sinh, sinh viên</option>
              <option value="workers">Người đi làm</option>
              <option value="parents">Phụ huynh</option>
              <option value="kids">Trẻ em</option>
            </select>
          </div>

          {/* Post Length */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Độ dài bài viết</label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-queen-500 outline-none bg-white"
              value={settings.postLength}
              onChange={(e) => handleChange('postLength', e.target.value as LengthType)}
            >
              <option value="mixed">✨ Linh hoạt (Khuyên dùng)</option>
              <option value="short">Ngắn (Caption ảnh)</option>
              <option value="medium">Vừa (Tiêu chuẩn)</option>
              <option value="long">Dài (Chuyên sâu)</option>
            </select>
          </div>

        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className={`
            px-8 py-3 rounded-lg font-bold text-white shadow-lg transform transition-all
            ${isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-queen-600 to-queen-500 hover:from-queen-700 hover:to-queen-600 hover:scale-[1.02] active:scale-95'
            }
          `}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang viết bài...
            </span>
          ) : (
            "Lên kế hoạch ngay ✨"
          )}
        </button>
      </div>
    </div>
  );
};

export default InputPanel;