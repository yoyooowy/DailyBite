import { useCallback, useEffect, useRef, useState } from "react";
import { FOODS, type Food } from "../data/foods";

/** 转盘停下的格子序号（留足前摇距离，看起来才够"滚"） */
const RESULT_INDEX = 26;
/** 轨道格子总数 */
const STRIP_LENGTH = 32;
/** 转动时长，和 CSS transition 保持一致 */
export const SPIN_MS = 2600;

function randomFood(): Food {
  return FOODS[Math.floor(Math.random() * FOODS.length)];
}

function buildStrip(target: Food): Food[] {
  const strip = Array.from({ length: STRIP_LENGTH }, randomFood);
  strip[RESULT_INDEX] = target;
  return strip;
}

interface ReelProps {
  /** 每次 +1 触发一次转动 */
  spinToken: number;
  target: Food | null;
  /** 转停后回调，用来弹结果窗 */
  onSettled: () => void;
}

export default function Reel({ spinToken, target, onSettled }: ReelProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const settledRef = useRef(true);
  const onSettledRef = useRef(onSettled);

  const [strip, setStrip] = useState<Food[]>(() =>
    Array.from({ length: STRIP_LENGTH }, randomFood),
  );
  const [offset, setOffset] = useState(0);
  const [animating, setAnimating] = useState(false);

  onSettledRef.current = onSettled;

  /** 读取实际的格子宽度和间距，避免把尺寸写死在 JS 里 */
  const measure = useCallback(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport || track.children.length < 2) return null;

    const first = track.children[0] as HTMLElement;
    const second = track.children[1] as HTMLElement;
    const step = second.offsetLeft - first.offsetLeft;
    if (!step) return null;

    return { step, cellWidth: first.offsetWidth, viewportWidth: viewport.clientWidth };
  }, []);

  const offsetFor = useCallback(
    (index: number) => {
      const metrics = measure();
      if (!metrics) return 0;
      const centered = (metrics.viewportWidth - metrics.cellWidth) / 2;
      return -(index * metrics.step) + centered;
    },
    [measure],
  );

  /** 首屏把轨道摆正，让中间那格正好落在窗口中央 */
  useEffect(() => {
    const id = requestAnimationFrame(() => setOffset(offsetFor(2)));
    return () => cancelAnimationFrame(id);
  }, [offsetFor]);

  /** 触发转动 */
  useEffect(() => {
    if (spinToken === 0 || !target) return undefined;

    settledRef.current = false;
    setAnimating(false);
    setStrip(buildStrip(target));
    setOffset(0);

    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        setAnimating(true);
        setOffset(offsetFor(RESULT_INDEX));
      });
    });

    const timer = window.setTimeout(() => {
      settledRef.current = true;
      // 动画结束后关掉 transition，窗口缩放才能瞬间重新居中
      setAnimating(false);
      onSettledRef.current();
    }, SPIN_MS + 160);

    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
      window.clearTimeout(timer);
    };
  }, [spinToken, target, offsetFor]);

  /** 窗口尺寸变化时重新居中，别让结果跑偏 */
  useEffect(() => {
    const onResize = () => {
      if (settledRef.current) setOffset(offsetFor(RESULT_INDEX));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [offsetFor]);

  return (
    <div className="reel" ref={viewportRef} aria-hidden="true">
      <div
        ref={trackRef}
        className={`reel-track${animating ? " is-animating" : ""}`}
        style={{ transform: `translate3d(${offset}px, 0, 0)` }}
      >
        {strip.map((food, index) => (
          <div className="reel-cell" key={`${index}-${food.id}`}>
            <span className="reel-emoji">{food.emoji}</span>
            <span className="reel-name">{food.name}</span>
          </div>
        ))}
      </div>
      <div className="reel-marker">
        <span className="marker-pin marker-pin--top" />
        <span className="marker-pin marker-pin--bottom" />
      </div>
      <div className="reel-fade reel-fade--left" />
      <div className="reel-fade reel-fade--right" />
    </div>
  );
}
