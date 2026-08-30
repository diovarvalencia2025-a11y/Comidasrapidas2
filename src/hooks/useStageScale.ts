import React, { useEffect, useRef, useState } from 'react';


export interface StageScaleResult {
  containerRef: React.RefObject<HTMLDivElement | null>;
  scale: number;
  stageWidth: number;
  stageHeight: number;
}

/**
 * Desktop Cover Scale Hook
 * Computes cover-fit scale against a fixed 1440x810 design canvas
 */
export function useStageScale(): StageScaleResult {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState<number>(1);
  const stageWidth = 1440;
  const stageHeight = 810;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const vw = el.clientWidth || window.innerWidth;
      const vh = el.clientHeight || window.innerHeight;
      const nextScale = Math.max(vw / stageWidth, vh / stageHeight);
      setScale(nextScale);
    };

    updateScale();

    const resizeObserver = new ResizeObserver(() => {
      updateScale();
    });

    resizeObserver.observe(el);
    window.addEventListener('orientationchange', updateScale);
    window.addEventListener('resize', updateScale);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('orientationchange', updateScale);
      window.removeEventListener('resize', updateScale);
    };
  }, [stageWidth, stageHeight]);

  return {
    containerRef,
    scale,
    stageWidth,
    stageHeight,
  };
}
