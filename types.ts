export enum ContentCategory {
  ALL = 'Tất cả',
  COMMUNICATION = '1. Tiếng Anh Giao tiếp',
  IELTS = '2. Luyện thi IELTS',
  ONLINE_1ON1 = '3. Tiếng Anh 1:1 Online',
  KIDS_TEENS = '4. Tiếng Anh Trẻ em & Thiếu niên',
  PROMO = '5. Khuyến mãi & Học phí',
  EVENTS = '6. Sự kiện & Hoạt động',
  SOCIAL_PROOF = '7. Feedback & Thành tích',
  TIPS = '8. Kiến thức & Mẹo học',
  INSPIRATION = '9. Truyền cảm hứng & Tư duy'
}

export const CATEGORY_LIST = [
  ContentCategory.COMMUNICATION,
  ContentCategory.IELTS,
  ContentCategory.ONLINE_1ON1,
  ContentCategory.KIDS_TEENS,
  ContentCategory.PROMO,
  ContentCategory.EVENTS,
  ContentCategory.SOCIAL_PROOF,
  ContentCategory.TIPS,
  ContentCategory.INSPIRATION
];

export const SHORT_CATEGORY_NAMES: Record<ContentCategory, string> = {
  [ContentCategory.ALL]: 'Tất cả',
  [ContentCategory.COMMUNICATION]: 'Giao tiếp',
  [ContentCategory.IELTS]: 'IELTS',
  [ContentCategory.ONLINE_1ON1]: 'Online 1:1',
  [ContentCategory.KIDS_TEENS]: 'Trẻ em',
  [ContentCategory.PROMO]: 'Khuyến mãi',
  [ContentCategory.EVENTS]: 'Sự kiện',
  [ContentCategory.SOCIAL_PROOF]: 'Feedback',
  [ContentCategory.TIPS]: 'Mẹo học',
  [ContentCategory.INSPIRATION]: 'Truyền cảm hứng',
};

export interface ContentPlanItem {
  purpose: string; // MỤC ĐÍCH
  topic: string; // CHỦ ĐỀ
  note: string; // GHI CHÚ
  title: string; // TIÊU ĐỀ
  content: string; // NỘI DUNG CHI TIẾT
  visuals: string; // HÌNH ẢNH/VIDEO
  designBrief: string; // BRIEF DESIGN
  hashtags: string; // HASHTAG
}

export type ToneType = 'mixed' | 'expert' | 'friendly' | 'trendy';
export type AudienceType = 'mixed' | 'students' | 'workers' | 'parents' | 'kids';
export type LengthType = 'mixed' | 'short' | 'medium' | 'long';
export type CourseSegmentType = 'mixed' | 'kids' | 'adults';

export interface GeneratorSettings {
  customApiKey?: string;
  category: ContentCategory;
  count: number;
  customPrompt: string;
  knowledgeBase: string; // New field for specific knowledge
  videoPercentage: number; // 0-100
  designPercentage: number; // 0-100 (Design vs Real Photo)
  tone: ToneType;
  targetAudience: AudienceType;
  postLength: LengthType;
  courseSegment: CourseSegmentType;
  purposeWeights: Record<string, number>; // Weights for each category (0-100)
}