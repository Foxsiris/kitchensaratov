import React from 'react';
import { motion } from 'framer-motion';

const spring = { type: 'spring', stiffness: 420, damping: 26 };
const wiggle = { duration: 0.42, ease: [0.34, 1.56, 0.64, 1] };

function GlyphWrap({ children, active, reduceMotion, origin = '24px 26px' }) {
  const on = active && !reduceMotion;
  return (
    <motion.g
      style={{ transformOrigin: origin }}
      initial={false}
      animate={{
        scale: on ? 1.07 : 1,
        rotate: on ? [0, -6, 5, -3, 0] : 0,
      }}
      transition={on ? { ...wiggle, times: [0, 0.25, 0.5, 0.75, 1] } : spring}
    >
      {children}
    </motion.g>
  );
}

const svgBase = {
  viewBox: '0 0 48 48',
  width: '100%',
  height: '100%',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.65,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

/** Чертёж / индивидуальный проект */
export function GlyphAuthor({ active, reduceMotion }) {
  return (
    <svg {...svgBase}>
      <GlyphWrap active={active} reduceMotion={reduceMotion}>
        <path d="M8 36h32" />
        <path d="M12 36V14l14 10-14 12" />
        <path d="M30 12l6 6-6 6" />
        <circle cx="30" cy="12" r="1.8" fill="currentColor" stroke="none" />
      </GlyphWrap>
    </svg>
  );
}

/** Фасад / панель */
export function GlyphFacade({ active, reduceMotion }) {
  return (
    <svg {...svgBase}>
      <GlyphWrap active={active} reduceMotion={reduceMotion}>
        <rect x="10" y="8" width="28" height="32" rx="2.5" />
        <rect x="15" y="13" width="18" height="22" rx="1.5" />
        <motion.line
          x1="24"
          y1="13"
          x2="24"
          y2="35"
          initial={false}
          animate={{ opacity: active ? 1 : 0.32 }}
          transition={{ duration: 0.28 }}
        />
      </GlyphWrap>
    </svg>
  );
}

/** Фабрики */
export function GlyphFactory({ active, reduceMotion }) {
  return (
    <svg {...svgBase}>
      <GlyphWrap active={active} reduceMotion={reduceMotion} origin="24px 28px">
        <path d="M6 38h36" />
        <path d="M10 38V22l8-6v22" />
        <path d="M20 38V16l8-5 8 5v22" />
        <path d="M36 38V20l6-4v22" />
        <path d="M24 10l3 3-3 3-3-3 3-3z" />
      </GlyphWrap>
    </svg>
  );
}

/** Ценовой спектр */
export function GlyphSpectrum({ active, reduceMotion }) {
  return (
    <svg {...svgBase}>
      <GlyphWrap active={active} reduceMotion={reduceMotion} origin="24px 30px">
        <path d="M10 38h28" />
        <motion.rect
          x="12"
          y="28"
          width="6"
          height="10"
          rx="1"
          initial={false}
          animate={{ opacity: active && !reduceMotion ? [0.5, 1] : 1 }}
          transition={{ duration: 0.35 }}
        />
        <motion.rect
          x="21"
          y="22"
          width="6"
          height="16"
          rx="1"
          initial={false}
          animate={{ opacity: active && !reduceMotion ? [0.5, 1] : 1 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        />
        <motion.rect
          x="30"
          y="16"
          width="6"
          height="22"
          rx="1"
          initial={false}
          animate={{ opacity: active && !reduceMotion ? [0.5, 1] : 1 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        />
        <path d="M20 10h8l-2 4h-4l-2-4z" fill="currentColor" stroke="none" />
      </GlyphWrap>
    </svg>
  );
}

/** Доставка */
export function GlyphDelivery({ active, reduceMotion }) {
  return (
    <svg {...svgBase}>
      <GlyphWrap active={active} reduceMotion={reduceMotion} origin="22px 30px">
        <rect x="6" y="18" width="20" height="14" rx="1.5" />
        <path d="M26 24h10l4 4v8H26" />
        <circle cx="14" cy="36" r="3.5" />
        <circle cx="34" cy="36" r="3.5" />
        <motion.g
          initial={false}
          animate={{ opacity: active ? 1 : 0.4 }}
          transition={{ duration: 0.25 }}
        >
          <line x1="10" y1="22" x2="18" y2="22" />
          <line x1="10" y1="26" x2="16" y2="26" />
        </motion.g>
      </GlyphWrap>
    </svg>
  );
}

/** Команда */
export function GlyphTeam({ active, reduceMotion }) {
  return (
    <svg {...svgBase}>
      <GlyphWrap active={active} reduceMotion={reduceMotion} origin="24px 24px">
        <circle cx="14" cy="14" r="4.5" />
        <circle cx="24" cy="11" r="5" />
        <circle cx="34" cy="14" r="4.5" />
        <path d="M6 40c2-7 6-10 10-10s6 3 8 10" />
        <path d="M16 40c1.5-6 4.5-8 8-8s6.5 2 8 8" />
        <path d="M26 40c1.5-5 4-7 8-7s6.5 2 8 7" />
      </GlyphWrap>
    </svg>
  );
}
