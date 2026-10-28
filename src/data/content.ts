export type NavItem = {
  id: string;
  label: string;
  index: string;
};

export type ExperienceItem = {
  period: string;
  org: string;
  role: string;
  location: string;
};

export type Stat = {
  value: string;
  unit?: string;
  label: string;
};

export type Project = {
  id: string;
  index: string;
  title: string;
  english: string;
  category: string;
  year: string;
  role: string;
  image: string;
  aspect: "featured" | "wide" | "tall" | "standard";
  summary: string;
  description: string;
  highlights: string[];
  meta: { label: string; value: string }[];
  video?: string;
  videoPoster?: string;
  videoMeta?: string;
  videoTitle?: string;
  titleCard?: boolean;
  gallery?: GalleryItem[];
  featured?: boolean;
};

export type GalleryItem = {
  title: string;
  meta: string;
  poster: string;
  src?: string;
  external?: string;
  externalLabel?: string;
};

export type Capability = {
  index: string;
  title: string;
  english: string;
  description: string;
  keywords: string[];
};

export const profile = {
  name: "贾蕙铭",
  nameEn: "JIA HUIMING",
  role: "摄影师 / 剪辑师",
  roleEn: "PHOTOGRAPHER · FILMMAKER",
  city: "西安",
  cityEn: "XI'AN, CN",
  available: "西安 / 杭州",
  phone: "18634956659",
  phoneDisplay: "186 3495 6659",
  phoneHref: "tel:18634956659",
  email: "1790543131@qq.com",
  emailHref: "mailto:1790543131@qq.com",
  education: "西安培华学院 · 广播电视编导",
  degree: "本科在读 · 2023.09 — 2027.06",
  intro: [
    "贾蕙铭，23 岁，西安培华学院广播电视编导专业在读。2024 年起在「光距离」影视公司担任摄影摄像剪辑师，服务商业品牌，参与广告短片与宣传片的拍摄制作。",
    "我有能力完成从脚本、分镜、拍摄到剪辑、调色、声音包装的全流程。比起一张漂亮的画面，我更在意一支片子能不能让人看完、记住、然后转发。",
    "工作之外，我喜欢健身和户外徒步——保持体能，也保持对画面和生活的感受力。",
  ],
};

export const navItems: NavItem[] = [
  { id: "home", label: "首页", index: "01" },
  { id: "about", label: "关于", index: "02" },
  { id: "work", label: "作品", index: "03" },
  { id: "capabilities", label: "优势", index: "04" },
  { id: "contact", label: "联系", index: "05" },
];

export const experiences: ExperienceItem[] = [
  {
    period: "2024.09 — 至今",
    org: "光距离",
    role: "摄影摄像剪辑师",
    location: "西安",
  },
  {
    period: "2025.09 — 2026.06",
    org: "西安培华学院 校媒记者团",
    role: "主席团 · 主席",
    location: "西安",
  },
  {
    period: "2023.09 — 2027.06",
    org: "西安培华学院",
    role: "广播电视编导 · 本科",
    location: "西安",
  },
];

export const stats: Stat[] = [
  { value: "70", unit: "万+", label: "全网累计播放量" },
  { value: "01", label: "校史首位学生导演" },
  { value: "04", label: "全流程主创环节" },
  { value: "2023", label: "开始职业影像工作" },
];

export const projects: Project[] = [
  {
    id: "a-yao",
    index: "01",
    title: "《寻找阿耀》",
    english: "FINDING A-YAO",
    category: "毕业典礼主题片",
    year: "2026",
    role: "导演 / 编剧 / 摄影 / 后期",
    image: "/images/work-01-ayao.webp",
    aspect: "featured",
    video: "/video/a-yao.mp4",
    videoPoster: "/images/a-yao-poster.webp",
    videoMeta: "14:06 · 完整影片",
    videoTitle: "《寻找阿耀》四人奔跑",
    titleCard: true,
    featured: true,
    summary:
      "以剧情短片的结构完成一次毕业告别：在四位室友的四年记忆里，寻找一位叫「阿耀」的军训故人。",
    description:
      "受西安培华学院委托创作的 2026 届毕业典礼现场放映主题片。全片采用剧情短片结构，融合校园实景拍摄、群像采访与无人机航拍，最终在结尾反转点题——阿耀不是某个人，而是我们自己的青春。",
    highlights: [
      "独立完成编剧、导演、主摄影与后期，一人跑通全流程",
      "2026.06.14 于毕业典礼现场大屏放映，为典礼核心节目之一",
      "全网播放量 70 万+，成为本届毕业季高传播度原创作品",
      "校史首位以在校学生身份独立操刀毕业典礼主题片的创作者",
    ],
    meta: [
      { label: "客户", value: "西安培华学院" },
      { label: "形式", value: "剧情短片 / 毕业典礼放映" },
      { label: "制作", value: "索尼 FX3 / FX6 · 大疆无人机" },
      { label: "年份", value: "2026.05 — 2026.06" },
    ],
  },
  {
    id: "wei-guang",
    index: "02",
    title: "《微光成炬，培华纪事》",
    english: "LIGHT BY LIGHT",
    category: "校史纪录片",
    year: "2025",
    role: "导演 / 摄像",
    image: "/images/work-02-weiguang.webp",
    aspect: "standard",
    video: "/video/wei-guang.mp4",
    videoPoster: "/images/wei-guang-poster.webp",
    videoMeta: "13:57 · 完整影片",
    videoTitle: "《微光成炬，培华纪事》",
    summary: "跟随姜维之先生的脚步，把培华的来路重新走一遍。",
    description:
      "为西安培华学院制作的校史纪录短片。以姜维之先生在校园与旧地间的行走为线索，穿插校史档案、人物访谈与校园实景，讲述培华如何从微光走到成炬。",
    highlights: [
      "担任导演与摄像，统筹现场拍摄与画面风格",
      "以人物行走串联校史节点，档案、访谈与实景交替",
      "校园实景与航拍结合，建立时间与空间的对照",
      "以「微光成炬」为视觉母题，从个体记忆落到学校的历史",
    ],
    meta: [
      { label: "客户", value: "西安培华学院" },
      { label: "形式", value: "校史纪录片" },
      { label: "片长", value: "13:57" },
      { label: "年份", value: "2025.09" },
    ],
  },
  {
    id: "we-present",
    index: "03",
    title: "《我们·在场》",
    english: "WE ARE PRESENT",
    category: "校园纪录片",
    year: "2025",
    role: "导演 / 拍摄 / 剪辑 / 调色",
    image: "/images/work-03-wepresent.webp",
    aspect: "standard",
    video: "/video/we-present.mp4",
    videoPoster: "/images/wepresent-poster.webp",
    videoMeta: "5:17 · 完整影片",
    videoTitle: "《我们·在场》",
    summary: "镜头对准校园里的记录者：选题、拍摄、熬夜剪辑，以及镜头之外的我们。",
    description:
      "一部关于校媒记者团的纪录短片。跟拍选题会、拍摄现场与深夜剪辑，记录一群学生记者如何把校园里发生的事，变成被看见的影像，也把镜头转向自己。",
    highlights: [
      "独立完成导演、拍摄、剪辑与调色",
      "跟拍校媒记者团的选题、拍摄与剪辑日常",
      "以「在场」为题，讨论记录者与被记录者的关系",
    ],
    meta: [
      { label: "客户", value: "西安培华学院" },
      { label: "形式", value: "校园纪录片" },
      { label: "片长", value: "5:17" },
      { label: "年份", value: "2025.11" },
    ],
  },
  {
    id: "exhibition",
    index: "04",
    title: "影像展厅",
    english: "SELECTED WORKS",
    category: "作品集 / 展映",
    year: "2025—2026",
    role: "导演 / 摄影 / 剪辑",
    image: "/images/gallery/exhibition-card.webp",
    aspect: "standard",
    summary: "五部短片，一间展厅。",
    description: "",
    highlights: [],
    meta: [],
    gallery: [
      {
        title: "雪山之旅—奥太娜",
        meta: "27:25 · 纪录",
        poster: "/images/gallery/aotaina-poster.webp",
        src: "/video/aotaina.mp4",
      },
      {
        title: "一分钟情绪短片",
        meta: "1:04 · 情绪短片",
        poster: "/images/gallery/one-minute-poster.webp",
        src: "/video/one-minute.mp4",
      },
      {
        title: "《蜕变》",
        meta: "5:18 · 短片",
        poster: "/images/gallery/tuibian-poster.webp",
        src: "/video/tuibian.mp4",
      },
      {
        title: "《叁佰》",
        meta: "6:59 · 短片",
        poster: "/images/gallery/sanbai-poster.webp",
        src: "/video/sanbai.mp4",
      },
      {
        title: "校园文化的守望者",
        meta: "视频号 · 记者节",
        poster: "/images/gallery/wechat-poster.webp",
        external: "https://weixin.qq.com/sph/A5UxMxnPgi",
        externalLabel: "在微信视频号观看",
      },
    ],
  },
  {
    id: "qinling",
    index: "05",
    title: "《秦岭深处 烟火千年》",
    english: "A THOUSAND YEARS IN QINLING",
    category: "人文纪录片",
    year: "2026",
    role: "导演 / 拍摄 / 剪辑",
    image: "/images/work-05-qinling.webp",
    aspect: "standard",
    video: "/video/qinling.mp4",
    videoPoster: "/images/qinling-poster.webp",
    videoMeta: "13:27 · 完整影片",
    videoTitle: "《秦岭深处 烟火千年》",
    summary: "走进秦岭深处的古镇，记录街巷、灶台和寻常人家不紧不慢的千年烟火。",
    description:
      "一部关于秦岭深处古镇的人文纪录片。以老街、灶台、手艺人和返乡的年轻人为线索，记录山水之间延续千年的生活方式。",
    highlights: [
      "独立完成导演、拍摄与剪辑",
      "以古镇日常为线索，记录秦岭深处的生活方式",
      "山水、街巷、灶台与人物访谈交织",
    ],
    meta: [
      { label: "形式", value: "人文纪录片" },
      { label: "拍摄地", value: "陕西 · 汉中" },
      { label: "片长", value: "13:27" },
      { label: "年份", value: "2026.06" },
    ],
  }
];

export const capabilities: Capability[] = [
  {
    index: "01",
    title: "全流程独立成片",
    english: "END TO END",
    description:
      "从脚本、分镜到拍摄、剪辑、调色与声音包装，一个人跑完整条链路。减少沟通损耗，也让成片的每一帧都保持在同一个判断里。",
    keywords: ["脚本", "分镜", "拍摄", "后期"],
  },
  {
    index: "02",
    title: "叙事与节奏",
    english: "STORYTELLING",
    description:
      "不满足于素材堆叠。用剧情结构、悬念与反转完成情绪落点，让一支片子有开头、有转折，也有值得被记住的结尾。",
    keywords: ["剧本", "结构", "情绪", "反转"],
  },
  {
    index: "03",
    title: "摄影与器材",
    english: "CAMERA & LIGHT",
    description:
      "熟悉专业机身、稳定器、灯光与无人机航拍。在有限的时间与条件下，快速判断光线、构图和机位，把现场变成可用的画面。",
    keywords: ["布光", "运镜", "航拍", "现场"],
  },
  {
    index: "04",
    title: "后期与调色",
    english: "POST PRODUCTION",
    description:
      "Premiere Pro 与 DaVinci Resolve 完成粗剪到精调；Lightroom 与 Photoshop 处理人像与静帧，保持质感的统一与克制。",
    keywords: ["剪辑", "调色", "修图", "包装"],
  },
  {
    index: "05",
    title: "团队与统筹",
    english: "PRODUCTION",
    description:
      "校媒记者团主席的经历让我习惯拆分排期、协调人员、推进多组并行。也组织培训、完善采编流程，让团队能持续产出。",
    keywords: ["统筹", "排期", "协作", "培训"],
  },
  {
    index: "06",
    title: "商业与交付",
    english: "CLIENT WORK",
    description:
      "理解品牌诉求与预算边界，在周期内把控拍摄与交付标准。清楚地沟通能做什么、不能做什么，也守得住交片时间。",
    keywords: ["需求", "预算", "周期", "交付"],
  },
];

export const tools = [
  "Premiere Pro",
  "DaVinci Resolve",
  "After Effects",
  "Lightroom",
  "Photoshop",
  "DJI",
  "Sony",
  "Canon",
];

export const marqueeItems = [
  "PHOTOGRAPHY",
  "FILMMAKING",
  "DIRECTION",
  "EDITING",
  "COLOR GRADING",
  "AERIAL",
  "STORYBOARD",
];
