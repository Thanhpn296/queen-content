import React from 'react';
import { ContentPlanItem } from '../types';

interface PlanTableProps {
  items: ContentPlanItem[];
}

const PlanTable: React.FC<PlanTableProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
        <div className="text-6xl mb-4">🇬🇧</div>
        <h3 className="text-xl font-medium text-gray-600">Chưa có nội dung nào</h3>
        <p className="text-gray-400 mt-2">Nhập thông tin và nhấn "Lên kế hoạch" để AI viết bài giúp bạn.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col h-full">
      <div className="overflow-auto custom-scrollbar">
        <table className="min-w-[1500px] w-full border-collapse bg-white text-sm">
          <thead className="bg-queen-900 text-white sticky top-0 z-10">
            <tr>
              <th className="py-4 px-3 text-center border-r border-queen-700 w-12 font-semibold">STT</th>
              <th className="py-4 px-3 text-left border-r border-queen-700 w-48 font-semibold">MỤC ĐÍCH</th>
              <th className="py-4 px-3 text-left border-r border-queen-700 w-48 font-semibold">CHỦ ĐỀ</th>
              <th className="py-4 px-3 text-left border-r border-queen-700 w-48 font-semibold">GHI CHÚ</th>
              <th className="py-4 px-3 text-left border-r border-queen-700 w-64 font-semibold">TIÊU ĐỀ</th>
              <th className="py-4 px-3 text-left border-r border-queen-700 w-96 font-semibold">NỘI DUNG CHI TIẾT</th>
              <th className="py-4 px-3 text-left border-r border-queen-700 w-64 font-semibold">HÌNH ẢNH/VIDEO</th>
              <th className="py-4 px-3 text-left border-r border-queen-700 w-48 font-semibold">BRIEF DESIGN</th>
              <th className="py-4 px-3 text-left border-r border-queen-700 w-32 font-semibold">HASHTAG</th>
              {/* Placeholder columns to match user request */}
              <th className="py-4 px-3 text-center border-r border-queen-700 w-32 font-semibold opacity-80">NGÀY ĐĂNG</th>
              <th className="py-4 px-3 text-center border-r border-queen-700 w-32 font-semibold opacity-80">TRẠNG THÁI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item, index) => (
              <tr key={index} className="hover:bg-queen-50 transition-colors group">
                <td className="py-4 px-3 text-center font-medium text-gray-500 border-r border-gray-200">
                  {index + 1}
                </td>
                <td className="py-4 px-3 align-top border-r border-gray-200">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-md">
                    {item.purpose}
                  </span>
                </td>
                <td className="py-4 px-3 align-top border-r border-gray-200 font-medium text-gray-800">
                  {item.topic}
                </td>
                <td className="py-4 px-3 align-top border-r border-gray-200 text-gray-500 italic">
                  {item.note || '-'}
                </td>
                <td className="py-4 px-3 align-top border-r border-gray-200 font-bold text-queen-700">
                  {item.title}
                </td>
                <td className="py-4 px-3 align-top border-r border-gray-200 text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {item.content}
                </td>
                <td className="py-4 px-3 align-top border-r border-gray-200 text-gray-600">
                  {item.visuals}
                </td>
                <td className="py-4 px-3 align-top border-r border-gray-200 text-gray-600 text-xs bg-gray-50 p-2 rounded">
                  {item.designBrief}
                </td>
                <td className="py-4 px-3 align-top border-r border-gray-200 text-blue-500 text-xs">
                  {item.hashtags}
                </td>
                 {/* Empty columns for manual entry */}
                <td className="py-4 px-3 align-top border-r border-gray-200 text-center">
                   <div className="h-8 bg-gray-100 rounded"></div>
                </td>
                <td className="py-4 px-3 align-top border-r border-gray-200 text-center">
                    <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Pending</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanTable;