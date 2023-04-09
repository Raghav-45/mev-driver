import React, { useEffect } from "react";
import css from "./Softkey.module.css";

export const Softkey = ({ left,      center,      right,
                          onKeyLeft, onKeyCenter, onKeyRight }) => {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = evt => {
    switch (evt.key) {
      case "SoftLeft":
      case "7":
        return onKeyLeft && onKeyLeft(evt);
      // case "Enter":
      case "8":
        return onKeyCenter && onKeyCenter(evt);
      case "SoftRight":
      case "9":
        return onKeyRight && onKeyRight(evt);
      default:
        return;
    }
  };

  return (
    <div className={css.softkey}>
      <label onClick={() => onKeyLeft()} className={css.left}>{left}</label>
      <label onClick={() => onKeyCenter()} className={css.center}>{center}</label>
      <label onClick={() => onKeyRight()} className={css.right}>{right}</label>
    </div>
  );
};
