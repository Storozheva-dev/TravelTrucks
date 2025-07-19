import css from "./ImageModal.module.css";
import { useEffect } from "react";

function ImageModal({ src, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img src={src} alt="Enlarged" />
        <button className={css.closeBtn} onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
}
export default ImageModal;
