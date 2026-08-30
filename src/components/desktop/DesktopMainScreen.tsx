import React, { useRef, useState, useCallback, useMemo } from 'react';
import { PARAGRAPH_TEXT } from '../../constants';
import { useStageScale } from '../../hooks/useStageScale';
import { useHeroTimeline } from '../../hooks/useHeroTimeline';
import { BurgerGlyph, InstagramIcon, FacebookIcon, YouTubeIcon, VideoCameraIcon, UploadIcon } from '../icons/Icons';
import { useApp } from '../../context/AppContext';

// Helper to generate sine-perturbed SVG wavy path around center (128, 128)
function generateWavyRingPath(radius: number, amplitude: number, waves: number): string {
  const points = 72;
  const cx = 128;
  const cy = 128;
  const d: string[] = [];

  for (let i = 0; i <= points; i++) {
    const theta = (i / points) * Math.PI * 2;
    const r = radius + amplitude * Math.sin(theta * waves);
    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);
    if (i === 0) {
      d.push(`M ${x.toFixed(2)} ${y.toFixed(2)}`);
    } else {
      d.push(`L ${x.toFixed(2)} ${y.toFixed(2)}`);
    }
  }
  d.push('Z');
  return d.join(' ');
}

export function DesktopMainScreen() {
  const { containerRef, scale, stageWidth, stageHeight } = useStageScale();
  const stageRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const readyFiredRef = useRef(false);
  const {
    heroVideoUrl,
    videoBlendMode,
    setVideoModalOpen,
    handleVideoFileUpload,
    showToast,
  } = useApp();

  const handleVideoReady = useCallback(() => {
    if (!readyFiredRef.current) {
      readyFiredRef.current = true;
      setVideoReady(true);
    }
  }, []);

  // Guarantee entrance animation fires even if video event was delayed or already cached
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (!readyFiredRef.current) {
        readyFiredRef.current = true;
        setVideoReady(true);
      }
    }, 350);

    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may wait for user gesture, but muted videos play seamlessly
      });
    }

    return () => clearTimeout(timer);
  }, [heroVideoUrl]);

  // [EFFECT-01] GSAP Entrance Reveal Timeline
  useHeroTimeline(stageRef, videoReady);

  const outerWavyPath = useMemo(() => generateWavyRingPath(114, 2.5, 14), []);
  const innerWavyPath = useMemo(() => generateWavyRingPath(82, 2.0, 14), []);

  const paragraphWords = useMemo(() => PARAGRAPH_TEXT.split(' '), []);

  // Drag and Drop video file handler
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleVideoFileUpload(file);
    }
  };

  return (
    <div
      ref={containerRef}
      id="desktop-hero-top"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#25140e] select-none flex items-center justify-center"
    >
      {/* Drag & Drop Visual Overlay */}
      {isDraggingFile && (
        <div className="absolute inset-0 z-50 bg-[#25140e]/95 backdrop-blur-md flex flex-col items-center justify-center border-4 border-dashed border-[#ffd689] animate-pulse pointer-events-none">
          <UploadIcon className="w-16 h-16 text-[#ffd689] mb-4" />
          <h2
            className="text-4xl font-bold uppercase tracking-tight text-white mb-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Soltar Video para el Hero
          </h2>
          <p className="text-white/80 text-sm">
            Sube tu animación o clip de smash burger (.mp4, .webm)
          </p>
        </div>
      )}

      {/* Scaled 1440x810 Canvas Stage */}
      <div
        ref={stageRef}
        id="desktop-main-stage"
        className="absolute left-1/2 top-1/2 origin-center overflow-hidden"
        style={{
          width: stageWidth,
          height: stageHeight,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        {/* BACKGROUND VIDEO LAYER */}
        <video
          ref={videoRef}
          key={heroVideoUrl}
          id="desktop-hero-video"
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
          onCanPlay={handleVideoReady}
          onLoadedData={handleVideoReady}
          className="absolute object-cover max-w-none pointer-events-none transition-all duration-300"
          style={{
            left: '332.72px',
            top: '-12.37px',
            width: '1483.97px',
            height: '834.73px',
            mixBlendMode: videoBlendMode === 'multiply' ? 'multiply' : videoBlendMode === 'screen' ? 'screen' : 'normal',
          }}
        >
          <source src={heroVideoUrl} type="video/mp4" />
          <source src="/hero-burger.mp4" type="video/mp4" />
          <source src="/hero-burger.webm" type="video/webm" />
          <source src="/hero-burger-h264.mp4" type="video/mp4" />
        </video>

        {/* 1. Left-edge blend gradient */}
        <div
          id="desktop-left-edge-blend"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, #25140e 0%, #25140e 25%, rgba(37,20,14,0.85) 34%, rgba(37,20,14,0.5) 45%, rgba(37,20,14,0.2) 55%, rgba(37,20,14,0) 65%)',
          }}
        />

        {/* 2. Floor glow gradient */}
        <div
          id="desktop-floor-glow"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(480px 320px at 8% 92%, rgba(255,214,137,0.22), rgba(37,20,14,0) 70%)',
          }}
        />

        {/* 3. Top/bottom vignette gradient */}
        <div
          id="desktop-top-bottom-vignette"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(20,10,6,0.35) 0%, rgba(0,0,0,0) 12%, rgba(0,0,0,0) 82%, rgba(15,7,4,0.55) 100%)',
          }}
        />

        {/* FILM GRAIN (SVG feTurbulence) */}
        <div
          id="desktop-film-grain"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='160' height='160' filter='url(%23noiseFilter)'/></svg>")`,
          }}
        />

        {/* Floating Special Offer Banner (Inspired by reference layout) */}
        <div
          id="desktop-special-offer-card"
          className="absolute right-28 top-[140px] z-20 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/40 flex items-center gap-3.5 max-w-[320px] transition-all hover:scale-105"
        >
          <div className="size-12 rounded-xl bg-[#ffd689] flex items-center justify-center text-2xl shrink-0 shadow-xs">
            🍔
          </div>
          <div>
            <span className="inline-block px-2 py-0.5 rounded-sm bg-red-500 text-white text-[9px] font-black uppercase tracking-wider mb-0.5">
              Special Offer
            </span>
            <div className="text-xs font-black text-gray-900 leading-tight">
              HASTA 20% OFF EN COMBOS
            </div>
            <div className="text-[10px] text-gray-500 font-medium">
              Con código: <strong className="text-red-600">CANGER10</strong>
            </div>
          </div>
        </div>

        {/* Floating Hero Video Configuration Trigger */}
        <button
          id="desktop-video-config-trigger"
          onClick={() => setVideoModalOpen(true)}
          className="absolute right-28 bottom-10 z-30 flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md border border-white/20 shadow-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <VideoCameraIcon className="w-4 h-4 text-[#ffd689]" />
          <span>Cambiar Video Hero</span>
        </button>

        {/* HEADLINE */}
        <div
          id="desktop-headline-block"
          className="absolute left-0 top-[200.76px] w-[900px] pointer-events-none select-none z-10"
        >
          {/* Line 1: CRISPY SMASH */}
          <div className="flex items-end ml-[24px] gap-[16px]">
            {/* CRISPY */}
            <div
              className="grunge-text whitespace-nowrap w-max shrink-0 leading-[0.84] text-[#fefff0]"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '140px',
                letterSpacing: '-3.5px',
                textShadow: '0 6px 28px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.4)',
              }}
            >
              {'CRISPY'.split('').map((letter, idx) => (
                <span
                  key={`crispy-${idx}`}
                  data-anim
                  data-headline-letter
                  data-from-y="99.37"
                  className="inline-block"
                >
                  {letter}
                </span>
              ))}
            </div>

            {/* SMASH */}
            <div
              className="grunge-text whitespace-nowrap w-max shrink-0 leading-[0.84] text-[#ffd689]"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '140px',
                letterSpacing: '-3.5px',
                textShadow: '0 6px 28px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.4)',
              }}
            >
              {'SMASH'.split('').map((letter, idx) => (
                <span
                  key={`smash-${idx}`}
                  data-anim
                  data-headline-letter
                  data-from-y="99.37"
                  className="inline-block"
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>

          {/* Line 2: BURGERS */}
          <div
            className="grunge-text whitespace-nowrap w-max shrink-0 leading-[0.84] text-[#fefff0] mt-[31px] ml-[240px]"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '190px',
              letterSpacing: '-5px',
              textShadow: '0 6px 28px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.4)',
            }}
          >
            {'BURGERS'.split('').map((letter, idx) => (
              <span
                key={`burgers-${idx}`}
                data-anim
                data-headline-letter
                data-from-y="99.37"
                className="inline-block"
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* BADGE (Sine Perturbed Ring + Text Path + Centered Glyph) */}
        <div
          id="desktop-badge-container"
          className="absolute left-[0.52px] top-[328.52px] w-[256.48px] height-[256.48px] z-10"
        >
          {/* Badge Ring SVG */}
          <svg
            data-anim
            data-badge-ring
            data-from-scale="0"
            viewBox="0 0 256 256"
            className="w-[256.48px] h-[256.48px] origin-center"
          >
            <defs>
              <path
                id="badge-text-circle"
                d="M128,128 m-98,0 a98,98 0 1,1 196,0 a98,98 0 1,1 -196,0"
              />
            </defs>

            {/* Outer Wavy Ring */}
            <path
              d={outerWavyPath}
              fill="none"
              stroke="#ffd689"
              strokeWidth="1.4"
              opacity="0.65"
            />

            {/* Inner Wavy Ring */}
            <path
              d={innerWavyPath}
              fill="none"
              stroke="#ffd689"
              strokeWidth="1.1"
              opacity="0.45"
            />

            {/* Text Path Around Circle */}
            <text fill="#fefff0" fontSize="12.5" letterSpacing="2.2" fontFamily="var(--font-sans)" fontWeight="700">
              <textPath href="#badge-text-circle" startOffset="0%">
                PURE BEEF POWER • PURE BEEF POWER •{' '}
              </textPath>
            </text>

            {/* Two Dots */}
            <circle cx="128" cy="30" r="2.6" fill="#ffd689" />
            <circle cx="128" cy="226" r="2.6" fill="#ffd689" />
          </svg>

          {/* Centered Burger Glyph */}
          <div
            data-anim
            data-badge-glyph
            data-from-x="-140"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[68px] h-[68px] flex items-center justify-center text-[#ffd689] pointer-events-none"
          >
            <BurgerGlyph className="w-12 h-12 text-[#ffd689]" />
          </div>
        </div>

        {/* INTRO PARAGRAPH */}
        <p
          id="desktop-intro-paragraph"
          className="absolute left-[170.7px] top-[602px] w-[459.25px] text-[18px] leading-[1.4] text-white select-none z-10"
          style={{
            textShadow: '0 2px 10px rgba(0,40,44,0.5)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {paragraphWords.map((word, idx) => {
            const isCanger = word === 'Canger';
            return (
              <span
                key={`p-word-${idx}`}
                data-anim
                data-paragraph-word
                data-from-y="28"
                className={`inline-block mr-[0.32em] ${isCanger ? 'font-bold' : 'font-normal'}`}
              >
                {word}
              </span>
            );
          })}
        </p>

        {/* SOCIAL ACTION RAIL */}
        <div
          id="desktop-social-rail"
          className="absolute left-[1368.87px] top-[152px] w-[47.26px] h-[201px] z-20"
        >
          {/* 1. Instagram */}
          <a
            href="#instagram"
            onClick={(e) => {
              e.preventDefault();
              showToast('Opening @cangerburgers on Instagram');
            }}
            data-anim
            data-social-icon
            data-from-x="110"
            aria-label="Instagram"
            className="absolute left-0 size-[47.26px] rounded-full border border-white/70 text-white flex items-center justify-center transition-colors duration-200 hover:bg-white hover:text-[#009ca6] cursor-pointer shadow-md"
            style={{ top: '0px' }}
          >
            <InstagramIcon className="w-5 h-5" />
          </a>

          {/* 2. Facebook */}
          <a
            href="#facebook"
            onClick={(e) => {
              e.preventDefault();
              showToast('Opening Canger Burgers Facebook');
            }}
            data-anim
            data-social-icon
            data-from-x="190"
            aria-label="Facebook"
            className="absolute left-0 size-[47.26px] rounded-full border border-white/70 text-white flex items-center justify-center transition-colors duration-200 hover:bg-white hover:text-[#009ca6] cursor-pointer shadow-md"
            style={{ top: '76.87px' }}
          >
            <FacebookIcon className="w-5 h-5" />
          </a>

          {/* 3. YouTube */}
          <a
            href="#youtube"
            onClick={(e) => {
              e.preventDefault();
              showToast('Opening Canger Burger Channel');
            }}
            data-anim
            data-social-icon
            data-from-x="270"
            aria-label="YouTube"
            className="absolute left-0 size-[47.26px] rounded-full border border-white/70 text-white flex items-center justify-center transition-colors duration-200 hover:bg-white hover:text-[#009ca6] cursor-pointer shadow-md"
            style={{ top: '153.74px' }}
          >
            <YouTubeIcon className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Floating Bottom Scroll Hint Indicator to Menu */}
      <a
        href="#menu-section"
        onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById('menu-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/35 text-white backdrop-blur-md border border-white/30 text-xs font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 cursor-pointer animate-bounce shadow-lg"
      >
        <span>Explorar Menú & Comidas</span>
        <span className="text-sm">↓</span>
      </a>
    </div>
  );
}
