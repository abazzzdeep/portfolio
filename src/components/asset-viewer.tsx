import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import type { PortfolioAsset } from '../data/portfolio';

type AssetImageProps = {
  asset: PortfolioAsset;
  onOpen: () => void;
  className?: string;
  priority?: boolean;
};

export function AssetImage({ asset, onOpen, className = '', priority = false }: AssetImageProps) {
  return (
    <button className={`asset-image ${className}`} type="button" onClick={onOpen} aria-label={`Open ${asset.label}`} data-testid={`button-open-${asset.id}`}>
      <img src={asset.src} alt={asset.alt} loading={priority ? 'eager' : 'lazy'} />
      <span className="asset-image__hint">Open full frame</span>
    </button>
  );
}

type AssetViewerProps = {
  assets: PortfolioAsset[];
  activeIndex: number;
  onClose: () => void;
  onChange: (index: number) => void;
};

export function AssetViewer({ assets, activeIndex, onClose, onChange }: AssetViewerProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const changeRef = useRef(onChange);
  changeRef.current = onChange;
  const activeAsset = assets[activeIndex];

  useEffect(() => {
    if (!activeAsset) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft' && assets.length > 1) changeRef.current((activeIndex - 1 + assets.length) % assets.length);
      if (event.key === 'ArrowRight' && assets.length > 1) changeRef.current((activeIndex + 1) % assets.length);
    };
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeAsset, activeIndex, assets.length, onClose]);

  return (
    <AnimatePresence>
      {activeAsset && (
        <motion.div
          className="asset-viewer-backdrop"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
        >
          <motion.div className="asset-viewer" role="dialog" aria-modal="true" aria-labelledby="asset-viewer-title" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }}>
            <div className="asset-viewer__top">
              <div>
                <span className="asset-viewer__kicker">{activeAsset.label}</span>
                <h2 id="asset-viewer-title">{activeAsset.alt}</h2>
              </div>
              <button ref={closeRef} className="asset-viewer__close" type="button" onClick={onClose} aria-label="Close image viewer" data-testid="button-close-image-viewer"><X size={18} /></button>
            </div>
            <div className="asset-viewer__frame">
              <img src={activeAsset.src} alt={activeAsset.alt} />
            </div>
            <div className="asset-viewer__bottom">
              <span>{String(activeIndex + 1).padStart(2, '0')} / {String(assets.length).padStart(2, '0')}</span>
              {assets.length > 1 && <div className="asset-viewer__controls">
                <button type="button" onClick={() => changeRef.current((activeIndex - 1 + assets.length) % assets.length)} aria-label="Previous image" data-testid="button-previous-image"><ArrowLeft size={16} /></button>
                <button type="button" onClick={() => changeRef.current((activeIndex + 1) % assets.length)} aria-label="Next image" data-testid="button-next-image"><ArrowRight size={16} /></button>
              </div>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}