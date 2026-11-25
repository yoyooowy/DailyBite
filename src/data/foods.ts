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
  // ---- 早上 / 路上顺手买 ----
  { id: "jianbing", name: "手抓饼", emoji: "🫓", tag: "小吃", note: "咔滋一口，快乐加倍" },
  { id: "xiaolongbao", name: "小笼包", emoji: "🥟", tag: "小吃", note: "先咬破，再吸汤" },
  { id: "onigiri", name: "便利店饭团", emoji: "🍙", tag: "快餐", note: "微波炉叮三十秒就好" },

  // ---- 午饭主力：盖饭与快餐 ----
  { id: "huangmenji", name: "黄焖鸡米饭", emoji: "🍲", tag: "饭", note: "打工人的精神支柱，米饭能续" },
  { id: "zhujiao", name: "猪脚饭", emoji: "🍖", tag: "饭", note: "胶原蛋白充足，下午不困" },
  { id: "gaijiao", name: "盖浇饭", emoji: "🍱", tag: "饭", note: "菜和饭一次解决，效率至上" },
  { id: "tomato-egg", name: "番茄炒蛋盖饭", emoji: "🍅", tag: "饭", note: "国民下饭菜，永不踩雷" },
  { id: "shaxian", name: "沙县小吃", emoji: "🥡", tag: "快餐", note: "全国统一价，全国统一味" },
  { id: "hainanese-chicken", name: "海南鸡饭", emoji: "🍛", tag: "饭", note: "鸡油饭香到会点头" },
  { id: "fried-rice", name: "蛋炒饭", emoji: "🍚", tag: "饭", note: "锅气一开，烦恼走开" },

  // ---- 面食与粉 ----
  { id: "lanzhou", name: "兰州拉面", emoji: "🍝", tag: "面", note: "一清二白三红四绿，吃完还能加班" },
  { id: "luosifen", name: "螺蛳粉", emoji: "🥣", tag: "面", note: "闻着犹豫，吃着上瘾" },
  { id: "suanlafen", name: "酸辣粉", emoji: "🌶️", tag: "面", note: "一口酸辣，醒神半小时" },
  { id: "instant-noodle", name: "泡面", emoji: "🍜", tag: "面", note: "三分钟的幸福，记得加个蛋" },
  { id: "dumpling", name: "饺子", emoji: "🥟", tag: "面", note: "一口一个，刚刚好圆满" },
  { id: "ramen", name: "拉面", emoji: "🍥", tag: "面", note: "吸溜一声，汤也见底" },

  // ---- 重口 / 聚餐 ----
  { id: "malatang", name: "麻辣烫", emoji: "🥘", tag: "硬菜", note: "想吃什么自己点，自由的味道" },
  { id: "suancaiyu", name: "酸菜鱼", emoji: "🐟", tag: "硬菜", note: "聚餐首选，一个人也能点" },
  { id: "hotpot", name: "火锅", emoji: "🫕", tag: "硬菜", note: "万物皆可涮" },
  { id: "baiqieji", name: "白切鸡", emoji: "🐔", tag: "硬菜", note: "越简单越考验功力" },
  { id: "bbq", name: "烤肉", emoji: "🥩", tag: "硬菜", note: "滋滋作响的满足感" },

  // ---- 小吃 / 轻食 ----
  { id: "oden", name: "关东煮", emoji: "🍢", tag: "小吃", note: "热乎乎的，冬天最懂" },
  { id: "takoyaki", name: "章鱼小丸子", emoji: "🐙", tag: "小吃", note: "烫嘴也要吃" },
  { id: "salad", name: "沙拉", emoji: "🥗", tag: "轻食", note: "给身体放个假" },
  { id: "sandwich", name: "三明治", emoji: "🥪", tag: "轻食", note: "简单，但不会出错" },

  // ---- 洋快餐 ----
  { id: "burger", name: "汉堡", emoji: "🍔", tag: "快餐", note: "双手捧着吃才香" },
  { id: "pizza", name: "披萨", emoji: "🍕", tag: "快餐", note: "拉丝的快乐最诚实" },
  { id: "fried-chicken", name: "炸鸡", emoji: "🍗", tag: "快餐", note: "脆皮是唯一的真理" },
  { id: "sushi", name: "寿司", emoji: "🍣", tag: "饭", note: "安静地好吃" },

  // ---- 下午茶 ----
  { id: "milktea", name: "奶茶", emoji: "🧋", tag: "甜品", note: "不是饭，但打工人离不开" },
  { id: "egg-tart", name: "蛋挞", emoji: "🥧", tag: "甜品", note: "下午三点的续命甜" },
  { id: "shuangpinai", name: "双皮奶", emoji: "🍮", tag: "甜品", note: "顺滑到忘记开会" },
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
