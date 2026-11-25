export type Tag = "饭" | "面" | "小吃" | "快餐" | "轻食" | "硬菜" | "甜品";

export interface Food {
  id: string;
  name: string;
  emoji: string;
  tag: Tag;
  note: string;
}

/** 食物池：加新菜只要往这里塞一条，其他地方不用改 */
export const FOODS: Food[] = [
  { id: "jianbing", name: "手抓饼", emoji: "🫓", tag: "小吃", note: "咔滋一口，快乐加倍" },
  { id: "instant-noodle", name: "泡面", emoji: "🍜", tag: "面", note: "三分钟的幸福，记得加个蛋" },
  { id: "hainanese-chicken", name: "海南鸡饭", emoji: "🍛", tag: "饭", note: "鸡油饭香到会点头" },
  { id: "fried-rice", name: "蛋炒饭", emoji: "🍚", tag: "饭", note: "锅气一开，烦恼走开" },
  { id: "malatang", name: "麻辣烫", emoji: "🥘", tag: "硬菜", note: "想吃什么自己点，自由的味道" },
  { id: "dumpling", name: "饺子", emoji: "🥟", tag: "面", note: "一口一个，刚刚好圆满" },
  { id: "sushi", name: "寿司", emoji: "🍣", tag: "饭", note: "安静地好吃" },
  { id: "ramen", name: "拉面", emoji: "🍥", tag: "面", note: "吸溜一声，汤也见底" },
  { id: "burger", name: "汉堡", emoji: "🍔", tag: "快餐", note: "双手捧着吃才香" },
  { id: "pizza", name: "披萨", emoji: "🍕", tag: "快餐", note: "拉丝的快乐最诚实" },
  { id: "fried-chicken", name: "炸鸡", emoji: "🍗", tag: "快餐", note: "脆皮是唯一的真理" },
  { id: "bbq", name: "烤肉", emoji: "🍖", tag: "硬菜", note: "滋滋作响的满足感" },
  { id: "salad", name: "沙拉", emoji: "🥗", tag: "轻食", note: "给身体放个假" },
  { id: "sandwich", name: "三明治", emoji: "🥪", tag: "轻食", note: "简单，但不会出错" },
  { id: "hotpot", name: "火锅", emoji: "🍲", tag: "硬菜", note: "万物皆可涮" },
  { id: "oden", name: "关东煮", emoji: "🍢", tag: "小吃", note: "热乎乎的，冬天最懂" },
  { id: "takoyaki", name: "章鱼小丸子", emoji: "🐙", tag: "小吃", note: "烫嘴也要吃" },
  { id: "cake", name: "蛋糕", emoji: "🍰", tag: "甜品", note: "心情不好就吃甜的" },
];

/** 标签配色，散落在卡片和小徽章上 */
export const TAG_COLORS: Record<Tag, string> = {
  饭: "#FFE0A3",
  面: "#FFC9C9",
  小吃: "#CDEBFF",
  快餐: "#FFCFD9",
  轻食: "#C8F0DD",
  硬菜: "#FFD3B6",
  甜品: "#E0D4FF",
};
