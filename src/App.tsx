import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Reel from "./components/Reel";
import ResultModal from "./components/ResultModal";
import { applyFilters, DEFAULT_FILTERS, FOODS, type Filters, type Food } from "./data/foods";

const STORAGE_KEY = "daily-bite:v1";
const HISTORY_LIMIT = 4;

const FILTER_CHIPS: Array<{ key: keyof Filters; icon: string; label: string }> = [
  { key: "noSpicy", icon: "🌶️", label: "不想吃辣" },
  { key: "hotOnly", icon: "🍲", label: "想吃热的" },
  { key: "budget", icon: "💰", label: "20 块以内" },
];

interface Persisted {
  count: number;
  historyIds: string[];
  filters: Filters;
}

function readStore(): { count: number; history: Food[]; filters: Filters } {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { count: 0, history: [], filters: DEFAULT_FILTERS };

    const parsed = JSON.parse(raw) as Partial<Persisted>;
    const history = (parsed.historyIds ?? [])
      .map((id) => FOODS.find((food) => food.id === id))
      .filter((food): food is Food => Boolean(food));

    return {
      count: typeof parsed.count === "number" ? parsed.count : 0,
      history,
      filters: { ...DEFAULT_FILTERS, ...parsed.filters },
    };
  } catch {
    return { count: 0, history: [], filters: DEFAULT_FILTERS };
  }
}

export default function App() {
  const initial = useMemo(readStore, []);

  const [spinToken, setSpinToken] = useState(0);
  const [target, setTarget] = useState<Food | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Food | null>(null);
  const [history, setHistory] = useState<Food[]>(initial.history);
  const [count, setCount] = useState(initial.count);
  const [filters, setFilters] = useState<Filters>(initial.filters);

  const spinningRef = useRef(false);
  const targetRef = useRef<Food | null>(null);
  const resultRef = useRef<Food | null>(null);

  /** 筛选后的池子：抽签只从这里挑，转盘的滚动画面也用这一份 */
  const pool = useMemo(() => applyFilters(filters), [filters]);
  const empty = pool.length === 0;

  const spin = useCallback(() => {
    if (spinningRef.current || pool.length === 0) return;

    const next = pool[Math.floor(Math.random() * pool.length)];

    spinningRef.current = true;
    targetRef.current = next;
    setSpinning(true);
    setTarget(next);
    setSpinToken((token) => token + 1);
  }, [pool]);

  const toggleFilter = useCallback((key: keyof Filters) => {
    if (spinningRef.current) return;
    setFilters((previous) => ({ ...previous, [key]: !previous[key] }));
  }, []);

  const handleSettled = useCallback(() => {
    const picked = targetRef.current;
    if (!picked) return;

    spinningRef.current = false;
    resultRef.current = picked;
    setSpinning(false);
    setResult(picked);
    setCount((value) => value + 1);
    setHistory((previous) =>
      [picked, ...previous.filter((item) => item.id !== picked.id)].slice(0, HISTORY_LIMIT),
    );
  }, []);

  const closeResult = useCallback(() => {
    resultRef.current = null;
    setResult(null);
  }, []);

  const spinAgain = useCallback(() => {
    closeResult();
    spin();
  }, [closeResult, spin]);

  /** 空格 / 回车也能抽，别让用户非得找鼠标 */
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.code !== "Space" && event.key !== "Enter") return;

      const el = event.target;
      if (el instanceof HTMLElement && ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName)) return;
      if (resultRef.current) return;

      event.preventDefault();
      spin();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [spin]);

  /** 只存 id，食物信息以代码为准，避免旧数据结构残留 */
  useEffect(() => {
    const payload: Persisted = { count, historyIds: history.map((food) => food.id), filters };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* 无痕模式下写不进去，忽略即可 */
    }
  }, [count, history, filters]);

  const petals = useMemo(
    () =>
      Array.from({ length: 9 }, (_, index) => ({
        left: `${(index * 11 + 4) % 94}%`,
        delay: `${(index * 1.9) % 9}s`,
        duration: `${10 + (index % 5) * 2}s`,
        scale: 0.6 + (index % 4) * 0.18,
        color: ["#ffb7c5", "#ffd3b6", "#c9e4ff", "#d9cef7"][index % 4],
      })),
    [],
  );

  return (
    <div className="page">
      <div className="petals" aria-hidden="true">
        {petals.map((petal, index) => (
          <span
            key={index}
            className="petal"
            style={{
              left: petal.left,
              animationDelay: petal.delay,
              animationDuration: petal.duration,
              transform: `scale(${petal.scale})`,
              background: petal.color,
            }}
          />
        ))}
      </div>

      <header className="hero">
        <p className="kicker">今日のごはん</p>
        <h1 className="title">
          <span className="title-word title-word--pink">What</span>
          <span className="title-word title-word--mint">To</span>
          <span className="title-word title-word--butter">Eat</span>
        </h1>
        <p className="subtitle">选择困难症救星 · 按一下，让命运替你决定今天吃什么</p>
      </header>

      <main className="machine">
        <div className="machine-bar">
          <span className="dot dot--pink" />
          <span className="dot dot--butter" />
          <span className="dot dot--mint" />
          <span className="machine-label">今日のメニュー</span>
        </div>

        <Reel spinToken={spinToken} target={target} pool={pool} onSettled={handleSettled} />

        <div className="filters">
          <span className="filters-label">今 天 的 要 求</span>
          <div className="chips" role="group" aria-label="筛选条件">
            {FILTER_CHIPS.map((chip) => (
              <button
                key={chip.key}
                type="button"
                className="chip"
                aria-pressed={filters[chip.key]}
                disabled={spinning}
                onClick={() => toggleFilter(chip.key)}
              >
                <span aria-hidden="true">{chip.icon}</span>
                {chip.label}
              </button>
            ))}
          </div>
          <p className="filter-hint">
            {empty
              ? "这三个条件同时满足的菜还没被发明出来…"
              : `符合条件 ${pool.length} 道`}
          </p>
        </div>

        <p className="caption">{spinning ? "正在翻找冰箱…" : "准备好了就按下面那颗按钮"}</p>

        <button
          type="button"
          className="spin-btn"
          onClick={spin}
          disabled={spinning || empty}
        >
          {spinning ? "让我想想…" : empty ? "换个条件吧" : "吃什么呢？？"}
        </button>

        <p className="count">
          今天已经替你决定 <b>{count}</b> 次啦
        </p>
      </main>

      {history.length > 0 && (
        <section className="history">
          <h2>最 近 的 决 定</h2>
          <ul>
            {history.map((food, index) => (
              <li key={`${food.id}-${index}`}>
                <span aria-hidden="true">{food.emoji}</span>
                {food.name}
                <em>¥{food.price}</em>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="footer">
        <p>数据只存在你的浏览器里 · 没有服务器，也没有人在偷看</p>
      </footer>

      <p className="sr-only" role="status" aria-live="polite">
        {result ? `今天吃${result.name}，大概 ${result.price} 元` : ""}
      </p>

      <ResultModal food={result} onClose={closeResult} onAgain={spinAgain} />
    </div>
  );
}
