import { useEffect, useRef } from "react";
import { TAG_COLORS, type Food } from "../data/foods";

interface ResultModalProps {
  food: Food | null;
  onClose: () => void;
  onAgain: () => void;
}

export default function ResultModal({ food, onClose, onAgain }: ResultModalProps) {
  const primaryRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!food) return undefined;

    primaryRef.current?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", handleKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [food]);

  if (!food) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="result-name"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="关闭">
          ×
        </button>

        <p className="modal-kicker">今天的答案是</p>
        <span className="modal-emoji" aria-hidden="true">
          {food.emoji}
        </span>
        <h2 className="modal-name" id="result-name">
          {food.name}
        </h2>
        <span className="modal-tag" style={{ background: TAG_COLORS[food.tag] }}>
          {food.tag}
        </span>
        <p className="modal-note">{food.note}</p>

        <div className="modal-actions">
          <button type="button" className="btn btn--ghost" onClick={onAgain}>
            再抽一次
          </button>
          <button type="button" className="btn btn--primary" ref={primaryRef} onClick={onClose}>
            就它了！
          </button>
        </div>
      </div>
    </div>
  );
}
