import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  FiArrowUpRight,
  FiImage,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { theme } from '../../../styles/theme';
import {
  ELENA_GALLERY_URLS,
  loadDesignerGalleryUrls,
} from '../../../data/designerProjectGalleries';
import DesignerProjectGalleryModal from './DesignerProjectGalleryModal';

/** Акцент кнопки на карточке (тёмно-зелёный, как в макете) */
const CARD_ACCENT = '#1b4332';

/** По умолчанию — Telegram Viva Kitchen; переопределение: REACT_APP_VIDEOBLOG_URL */
const VIDEOBLOG_DEFAULT = 'https://t.me/+R6u4qvNIxdRjZWUy';

const VIDEOBLOG_URL =
  typeof process.env.REACT_APP_VIDEOBLOG_URL === 'string' &&
  process.env.REACT_APP_VIDEOBLOG_URL.trim()
    ? process.env.REACT_APP_VIDEOBLOG_URL.trim()
    : VIDEOBLOG_DEFAULT;

/** Пути к файлам в public/assets (сегменты — латиница, без пробелов) */
const publicAsset = (...pathSegments) =>
  `${process.env.PUBLIC_URL || ''}/assets/${pathSegments.join('/')}`;

const Section = styled.section`
  padding: ${(p) => p.theme.spacing['5xl']} 0;
  background: ${(p) => p.theme.colors.white};
  max-width: 100%;
  overflow-x: clip;

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    padding: ${(p) => p.theme.spacing['3xl']} 0;
  }
`;

const HeadRow = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${(p) => p.theme.spacing.xl};
  margin-bottom: ${(p) => p.theme.spacing['3xl']};

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    padding: 0 16px;
    margin-bottom: ${(p) => p.theme.spacing['2xl']};
  }
`;

const VideoblogBar = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${(p) => p.theme.spacing.xl};
  margin-bottom: ${(p) => p.theme.spacing['2xl']};
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    padding: 0 16px;
    margin-bottom: ${(p) => p.theme.spacing.xl};
  }
`;

const VideoblogLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(12px, 3vw, 28px);
  max-width: 100%;
  box-sizing: border-box;
  padding: 12px 12px 12px ${(p) => p.theme.spacing.xl};
  white-space: nowrap;
  border-radius: 999px;
  background: #f0f0f0;
  color: ${(p) => p.theme.colors.primary};
  text-decoration: none;
  font-family: ${(p) => p.theme.fonts.primary};
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition:
    background 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    background: #e8e8e8;
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid ${(p) => p.theme.colors.primary};
    outline-offset: 3px;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    padding: 10px 10px 10px 18px;
    font-size: 10px;
    letter-spacing: 0.11em;
  }
`;

const VideoblogIconWrap = styled.span`
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${CARD_ACCENT};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  pointer-events: none;

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-family: ${(p) => p.theme.fonts.primary};
  font-size: ${(p) => p.theme.fontSizes.md};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${(p) => p.theme.colors.primary};
  margin: 0;
  max-width: 900px;
  line-height: 1.45;

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    font-size: ${(p) => p.theme.fontSizes.sm};
    letter-spacing: 0.17em;
  }
`;

const CarouselWrap = styled.div`
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${(p) => p.theme.spacing.xl};
  min-width: 0;

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    padding: 0 16px;
  }
`;

const CarouselStage = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing.md};
  min-width: 0;
`;

const NavButton = styled.button`
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid ${(p) => p.theme.colors.border};
  background: ${(p) => p.theme.colors.white};
  color: ${(p) => p.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    transform 0.2s ease,
    opacity 0.2s ease;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover:not(:disabled) {
    background: ${(p) => p.theme.colors.primary};
    color: ${(p) => p.theme.colors.white};
    border-color: ${(p) => p.theme.colors.primary};
  }

  &:disabled {
    opacity: 0.28;
    cursor: not-allowed;
    box-shadow: none;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const Viewport = styled.div`
  flex: 1;
  min-width: 0;
  overflow: hidden;
`;

const Track = styled(motion.div)`
  display: flex;
  gap: ${(p) => p.theme.spacing.md};
  will-change: transform;
`;

const Slide = styled.div`
  flex: 0 0 ${(p) => (p.$widthPx > 0 ? `${p.$widthPx}px` : '100%')};
  width: ${(p) => (p.$widthPx > 0 ? `${p.$widthPx}px` : '100%')};
  min-width: 0;
  box-sizing: border-box;
`;

const DotsRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: ${(p) => p.theme.spacing.lg};

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    gap: 6px;
    margin-top: ${(p) => p.theme.spacing.md};
  }
`;

/** Визуальная «капсула» внутри кнопки — сами точки не растягиваются под глобальный min-height: 44px у button на мобилке */
const DotVisual = styled.span`
  display: block;
  width: ${(p) => (p.$active ? '20px' : '6px')};
  height: 6px;
  border-radius: 3px;
  background: ${(p) =>
    p.$active ? p.theme.colors.primary : 'rgba(0, 0, 0, 0.14)'};
  transition:
    width 0.3s ease,
    background 0.25s ease;
  pointer-events: none;

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    width: ${(p) => (p.$active ? '18px' : '5px')};
    height: 5px;
    border-radius: 2.5px;
  }
`;

const Dot = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  height: auto;
  width: auto;
  padding: 10px 6px;
  margin: 0;
  border: none;
  border-radius: 0;
  background: transparent;
  cursor: pointer;
  transition: opacity 0.2s ease;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    min-height: 0;
    padding: 12px 5px;
  }

  &:focus-visible ${DotVisual} {
    box-shadow: 0 0 0 2px ${(p) => p.theme.colors.white},
      0 0 0 4px ${(p) => p.theme.colors.primary};
  }
`;

const ProjectCard = styled.article`
  position: relative;
  width: 100%;
  margin: 0 auto;
  min-height: ${(p) => (p.$compact ? 'min(42vw, 360px)' : '420px')};
  border-radius: ${(p) => (p.$compact ? '22px' : '28px')};
  overflow: hidden;
  background-color: #141414;
  background-image: ${(p) =>
    p.$imageUrl
      ? `url(${p.$imageUrl})`
      : `linear-gradient(160deg, #2a2a2a 0%, #181818 50%, #222 100%)`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    box-shadow 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 48px rgba(0, 0, 0, 0.16);
  }

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    min-height: min(88vw, 400px);
    border-radius: 22px;

    &:hover {
      transform: none;
    }
  }
`;

const CardShade = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.05) 38%,
    rgba(0, 0, 0, 0.25) 58%,
    rgba(0, 0, 0, 0.82) 100%
  );
  pointer-events: none;
`;

const CardText = styled.div`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  color: #ffffff;
  left: ${(p) => (p.$compact ? p.theme.spacing.md : p.theme.spacing.lg)};
  right: ${(p) => (p.$compact ? p.theme.spacing.md : p.theme.spacing.lg)};
  bottom: ${(p) => (p.$compact ? '4.25rem' : '5.5rem')};
  padding: 0;

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    left: ${(p) => p.theme.spacing.md};
    right: ${(p) => p.theme.spacing.md};
    bottom: 4.75rem;
  }
`;

const TextKicker = styled.span`
  display: block;
  font-family: ${(p) => p.theme.fonts.primary};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: ${(p) => p.theme.spacing.sm};
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.6);

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    font-size: 9px;
    letter-spacing: 0.16em;
  }
`;

const ProjectDescription = styled.p`
  margin: 0;
  font-family: ${(p) => p.theme.fonts.secondary};
  font-size: ${(p) =>
    p.$compact ? p.theme.fontSizes.lg : p.theme.fontSizes.xl};
  font-weight: 400;
  line-height: ${(p) => (p.$compact ? 1.3 : 1.32)};
  letter-spacing: -0.02em;
  color: #ffffff;
  text-shadow:
    0 1px 2px rgba(0, 0, 0, 0.9),
    0 4px 24px rgba(0, 0, 0, 0.45);

  ${(p) =>
    p.$compact &&
    `
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `}

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    font-size: ${(p) => p.theme.fontSizes.lg};
    line-height: 1.3;
    display: block;
    -webkit-line-clamp: unset;
    overflow: visible;
  }
`;

const CardOpenButton = styled.button`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: ${(p) => (p.$compact ? 'min(42vw, 360px)' : '420px')};
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: #ffffff;

  &:hover,
  &:active {
    color: #ffffff;
  }

  &:focus-visible {
    outline: 2px solid ${(p) => p.theme.colors.white};
    outline-offset: -4px;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    min-height: min(88vw, 400px);
  }
`;

const ActionBtn = styled.span`
  position: absolute;
  bottom: ${(p) => p.theme.spacing.md};
  right: ${(p) => p.theme.spacing.md};
  left: auto;
  z-index: 2;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${CARD_ACCENT};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.colors.white};
  pointer-events: none;
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.35),
    0 0 0 1px rgba(255, 255, 255, 0.12);

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    width: 48px;
    height: 48px;
    bottom: ${(p) => p.theme.spacing.md};
    right: ${(p) => p.theme.spacing.md};
  }
`;

const PROJECTS = [
  {
    id: 'perezhogina',
    description:
      'Комплексная меблировка квартиры по проекту дизайнера Елены Пережогиной.',
    imageUrl: publicAsset('elena-perezhogina', 'son01752.jpg'),
  },
  {
    id: 'kondratieva',
    description:
      'Комплексная меблировка квартиры по проекту дизайнера Кондратьевой.',
    imageUrl: publicAsset('kondratieva', '3k5a4741.jpg'),
  },
  {
    id: 'ushakova',
    description:
      'Комплексная меблировка квартиры по проекту дизайнера Светланы Ушаковой.',
    imageUrl: publicAsset('svetlana-ushakova', 'imgl0592-hdr.jpg'),
  },
  {
    id: 'potapova',
    description:
      'Комплексная меблировка квартиры по проекту дизайнера Екатерины Потаповой.',
    imageUrl: publicAsset('ekaterina-potapova', '01-mak_9698.jpg'),
  },
];

const slideTransition = { type: 'spring', stiffness: 320, damping: 36 };

/** Совпадает с `theme.spacing.md` при 1rem = 16px */
const GAP_PX = 16;

/** Автопрокрутка по кругу без остановки на концах (интервал, мс) */
const AUTOPLAY_INTERVAL_MS = 3600;

/** Копий ряда для бесконечной прокрутки вперёд без «отмотки» */
const LOOP_COPIES = 3;

const DesignerProjects = () => {
  const [galleryModal, setGalleryModal] = useState(null);
  const [windowStart, setWindowStart] = useState(PROJECTS.length);
  const [transitionMode, setTransitionMode] = useState('spring');
  const [autoplayPausedByHover, setAutoplayPausedByHover] = useState(false);
  const vpRef = useRef(null);
  const windowStartRef = useRef(windowStart);
  const skipNextCompleteRef = useRef(true);
  const [viewportW, setViewportW] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const n = PROJECTS.length;
  const visibleCount = isMobile ? 1 : 3;
  const loopEnabled = n > visibleCount;

  const extendedProjects = useMemo(() => {
    if (!loopEnabled) return PROJECTS.map((p, i) => ({ ...p, loopKey: `0-${p.id}-${i}` }));
    return Array.from({ length: LOOP_COPIES }, (_, copy) =>
      PROJECTS.map((p) => ({
        ...p,
        loopKey: `${copy}-${p.id}`,
      }))
    ).flat();
  }, [loopEnabled]);

  const slideWidth =
    viewportW > 0
      ? (viewportW - GAP_PX * (visibleCount - 1)) / visibleCount
      : 0;
  const slideWidthPx = Math.max(0, Math.round(slideWidth));
  const stepPx = slideWidthPx + GAP_PX;

  useEffect(() => {
    windowStartRef.current = windowStart;
  }, [windowStart]);

  useLayoutEffect(() => {
    if (loopEnabled) {
      setWindowStart(n);
    } else {
      setWindowStart(0);
    }
    skipNextCompleteRef.current = true;
  }, [n, visibleCount, loopEnabled]);

  useLayoutEffect(() => {
    const mq = window.matchMedia(
      `(max-width: ${theme.breakpoints.mobile})`
    );
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useLayoutEffect(() => {
    const el = vpRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => {
      setViewportW(el.offsetWidth);
    });
    ro.observe(el);
    setViewportW(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  const go = useCallback(
    (dir) => {
      if (!loopEnabled) return;
      setWindowStart((w) => w + dir);
    },
    [loopEnabled]
  );

  const handleTrackAnimationComplete = useCallback(() => {
    if (!loopEnabled) return;
    if (skipNextCompleteRef.current) {
      skipNextCompleteRef.current = false;
      return;
    }
    const ws = windowStartRef.current;
    if (ws >= 2 * n) {
      setTransitionMode('instant');
      setWindowStart(ws - n);
      requestAnimationFrame(() => setTransitionMode('spring'));
    } else if (ws < n) {
      setTransitionMode('instant');
      setWindowStart(ws + n);
      requestAnimationFrame(() => setTransitionMode('spring'));
    }
  }, [loopEnabled, n]);

  useEffect(() => {
    if (!loopEnabled) return undefined;
    if (galleryModal != null || autoplayPausedByHover) return undefined;
    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;
    const id = window.setInterval(() => {
      setWindowStart((w) => w + 1);
    }, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [loopEnabled, galleryModal, autoplayPausedByHover]);

  const compact = visibleCount >= 3;
  const trackX =
    viewportW > 0 && stepPx > 0
      ? -(loopEnabled ? windowStart : 0) * stepPx
      : 0;
  const dotCount = n;
  const navDisabled = !loopEnabled;
  const activeDot = loopEnabled
    ? ((windowStart - n) % n + n) % n
    : 0;

  const transition =
    transitionMode === 'instant' ? { duration: 0 } : slideTransition;

  const setDot = useCallback(
    (k) => {
      if (!loopEnabled) return;
      setWindowStart(n + k);
    },
    [loopEnabled, n]
  );

  const closeGallery = useCallback(() => setGalleryModal(null), []);

  const openProjectGallery = useCallback(async (project) => {
    const title = project.description.replace(/\.$/, '');
    const startFromCover = (urls) =>
      project.imageUrl
        ? Math.max(0, urls.indexOf(project.imageUrl))
        : 0;

    if (project.id === 'perezhogina') {
      const urls = ELENA_GALLERY_URLS.slice();
      setGalleryModal({
        title,
        projectId: project.id,
        urls,
        loading: false,
        error: false,
        startIndex: startFromCover(urls),
      });
      return;
    }

    setGalleryModal({
      title,
      projectId: project.id,
      urls: null,
      loading: true,
      error: false,
      startIndex: 0,
    });
    try {
      const urls = await loadDesignerGalleryUrls(project.id);
      setGalleryModal({
        title,
        projectId: project.id,
        urls,
        loading: false,
        error: false,
        startIndex: startFromCover(urls),
      });
    } catch {
      setGalleryModal({
        title,
        projectId: project.id,
        urls: [],
        loading: false,
        error: true,
        startIndex: 0,
      });
    }
  }, []);

  return (
    <Section aria-labelledby="designer-projects-heading">
      <motion.div
        style={{ width: '100%' }}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <VideoblogBar>
          <VideoblogLink
            href={VIDEOBLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Перейти в Telegram-канал, откроется в новой вкладке"
          >
            Перейти в Telegram-канал
            <VideoblogIconWrap aria-hidden>
              <FiArrowUpRight size={20} strokeWidth={2.2} />
            </VideoblogIconWrap>
          </VideoblogLink>
        </VideoblogBar>
      </motion.div>

      <HeadRow>
        <SectionTitle
          id="designer-projects-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
        >
          Реализованное с дизайнерами
        </SectionTitle>
      </HeadRow>

      <CarouselWrap
        onMouseEnter={() => setAutoplayPausedByHover(true)}
        onMouseLeave={() => setAutoplayPausedByHover(false)}
      >
        <CarouselStage
          role="region"
          aria-roledescription="карусель"
          aria-label="Проекты с дизайнерами"
        >
          <NavButton
            type="button"
            aria-label="Предыдущий проект"
            onClick={() => go(-1)}
            disabled={navDisabled}
          >
            <FiChevronLeft size={22} strokeWidth={1.75} />
          </NavButton>

          <Viewport ref={vpRef}>
            <Track
              animate={{ x: trackX }}
              transition={transition}
              onAnimationComplete={handleTrackAnimationComplete}
            >
              {extendedProjects.map((project) => (
                <Slide key={project.loopKey} $widthPx={slideWidthPx}>
                  <ProjectCard $imageUrl={project.imageUrl} $compact={compact}>
                    <CardOpenButton
                      type="button"
                      aria-label={`${project.description.replace(/\.$/, '')} — открыть фотогалерею`}
                      onClick={() => openProjectGallery(project)}
                    >
                      <CardShade aria-hidden />
                      <CardText $compact={compact}>
                        <TextKicker>Проект с дизайнером</TextKicker>
                        <ProjectDescription $compact={compact}>
                          {project.description}
                        </ProjectDescription>
                      </CardText>
                      <ActionBtn aria-hidden>
                        <FiImage size={compact ? 18 : 20} strokeWidth={2} />
                      </ActionBtn>
                    </CardOpenButton>
                  </ProjectCard>
                </Slide>
              ))}
            </Track>
          </Viewport>

          <NavButton
            type="button"
            aria-label="Следующий проект"
            onClick={() => go(1)}
            disabled={navDisabled}
          >
            <FiChevronRight size={22} strokeWidth={1.75} />
          </NavButton>
        </CarouselStage>

        {loopEnabled ? (
          <DotsRow>
            {Array.from({ length: dotCount }, (_, i) => (
              <Dot
                key={i}
                type="button"
                aria-label={`Слайд ${i + 1} из ${dotCount}`}
                aria-current={i === activeDot ? 'true' : undefined}
                onClick={() => setDot(i)}
              >
                <DotVisual $active={i === activeDot} aria-hidden />
              </Dot>
            ))}
          </DotsRow>
        ) : null}
      </CarouselWrap>

      {galleryModal ? (
        <DesignerProjectGalleryModal
          open
          onClose={closeGallery}
          title={galleryModal.title}
          urls={galleryModal.urls}
          loading={galleryModal.loading}
          error={galleryModal.error}
          startIndex={galleryModal.startIndex}
        />
      ) : null}
    </Section>
  );
};

export default DesignerProjects;
