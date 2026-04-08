import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  flex-direction: column;
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom)
    env(safe-area-inset-left);
`;

const TopBar = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${(p) => p.theme.spacing.md};
  padding: ${(p) => p.theme.spacing.md} ${(p) => p.theme.spacing.lg};
`;

const TitleBlock = styled.div`
  min-width: 0;
  padding-top: 2px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-family: ${(p) => p.theme.fonts.secondary};
  font-size: ${(p) => p.theme.fontSizes.md};
  font-weight: 400;
  line-height: 1.35;
  color: #fff;
  letter-spacing: -0.02em;

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    font-size: ${(p) => p.theme.fontSizes.sm};
  }
`;

const Counter = styled.p`
  margin: 6px 0 0;
  font-family: ${(p) => p.theme.fonts.primary};
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
`;

const IconButton = styled.button`
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.35);
  }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }
`;

const Stage = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.spacing.sm};
  padding: 0 ${(p) => p.theme.spacing.md};
  position: relative;
`;

const SideNav = styled(IconButton)`
  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const MainImageWrap = styled.div`
  flex: 1;
  min-width: 0;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: pan-y;
`;

const MainImage = styled.img`
  max-width: 100%;
  max-height: min(78vh, 900px);
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  user-select: none;
  -webkit-user-drag: none;
`;

const BottomNav = styled.div`
  display: none;
  flex-shrink: 0;
  justify-content: center;
  gap: ${(p) => p.theme.spacing.xl};
  padding: ${(p) => p.theme.spacing.md} 0 ${(p) => p.theme.spacing.lg};

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    display: flex;
  }
`;

const BottomNavBtn = styled(IconButton)`
  width: 52px;
  height: 52px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${(p) => p.theme.spacing['2xl']};
  max-width: 360px;
`;

const EmptyText = styled.p`
  margin: 0 0 ${(p) => p.theme.spacing.lg};
  font-family: ${(p) => p.theme.fonts.primary};
  font-size: ${(p) => p.theme.fontSizes.md};
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.75);
`;

const CatalogLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 22px;
  border-radius: 999px;
  background: #fff;
  color: ${(p) => p.theme.colors.primary};
  font-family: ${(p) => p.theme.fonts.primary};
  font-size: ${(p) => p.theme.fontSizes.sm};
  font-weight: 500;
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const LoadingText = styled.p`
  margin: 0;
  font-family: ${(p) => p.theme.fonts.primary};
  font-size: ${(p) => p.theme.fontSizes.sm};
  color: rgba(255, 255, 255, 0.5);
`;

const SWIPE_THRESHOLD = 48;

/**
 * @param {{
 *   open: boolean;
 *   onClose: () => void;
 *   title: string;
 *   urls: string[] | null;
 *   loading: boolean;
 *   error: boolean;
 *   startIndex: number;
 * }} props
 */
const DesignerProjectGalleryModal = ({
  open,
  onClose,
  title,
  urls,
  loading,
  error,
  startIndex,
}) => {
  const [index, setIndex] = useState(0);
  const closeRef = useRef(null);
  const touchStartX = useRef(null);

  const len = urls?.length ?? 0;
  const hasPhotos = len > 0;
  const currentUrl = hasPhotos ? urls[index] : null;

  useEffect(() => {
    if (!open || !urls?.length) return;
    const i = Math.min(Math.max(0, startIndex), urls.length - 1);
    setIndex(i);
  }, [open, urls, startIndex]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const t = window.setTimeout(() => closeRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [open]);

  const go = useCallback(
    (dir) => {
      if (!urls?.length) return;
      setIndex((i) => (i + dir + urls.length) % urls.length);
    },
    [urls]
  );

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
      if (!hasPhotos || loading) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, go, hasPhotos, loading]);

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start == null || !hasPhotos || loading) return;
    const end = e.changedTouches[0]?.clientX;
    if (end == null) return;
    const dx = end - start;
    if (dx > SWIPE_THRESHOLD) go(-1);
    else if (dx < -SWIPE_THRESHOLD) go(1);
  };

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <Overlay
      role="dialog"
      aria-modal="true"
      aria-labelledby="designer-gallery-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <TopBar>
        <TitleBlock>
          <ModalTitle id="designer-gallery-title">{title}</ModalTitle>
          {hasPhotos && !loading ? (
            <Counter>
              {index + 1} / {len}
            </Counter>
          ) : null}
        </TitleBlock>
        <IconButton
          ref={closeRef}
          type="button"
          aria-label="Закрыть просмотр"
          onClick={onClose}
        >
          <FiX size={22} strokeWidth={2} />
        </IconButton>
      </TopBar>

      <Stage>
        {loading ? (
          <LoadingText>Загрузка фотографий…</LoadingText>
        ) : error ? (
          <EmptyState>
            <EmptyText>Не удалось загрузить галерею. Попробуйте позже.</EmptyText>
            <CatalogLink to="/catalog">Перейти в каталог</CatalogLink>
          </EmptyState>
        ) : !hasPhotos ? (
          <EmptyState>
            <EmptyText>Фотографии этого проекта скоро появятся.</EmptyText>
            <CatalogLink to="/catalog">Перейти в каталог</CatalogLink>
          </EmptyState>
        ) : (
          <>
            <SideNav
              type="button"
              aria-label="Предыдущее фото"
              onClick={() => go(-1)}
            >
              <FiChevronLeft size={26} strokeWidth={1.75} />
            </SideNav>
            <MainImageWrap
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <MainImage
                src={currentUrl}
                alt=""
                decoding="async"
                fetchPriority="high"
              />
            </MainImageWrap>
            <SideNav
              type="button"
              aria-label="Следующее фото"
              onClick={() => go(1)}
            >
              <FiChevronRight size={26} strokeWidth={1.75} />
            </SideNav>
          </>
        )}
      </Stage>

      {hasPhotos && !loading ? (
        <BottomNav>
          <BottomNavBtn
            type="button"
            aria-label="Предыдущее фото"
            onClick={() => go(-1)}
          >
            <FiChevronLeft size={28} strokeWidth={1.75} />
          </BottomNavBtn>
          <BottomNavBtn
            type="button"
            aria-label="Следующее фото"
            onClick={() => go(1)}
          >
            <FiChevronRight size={28} strokeWidth={1.75} />
          </BottomNavBtn>
        </BottomNav>
      ) : null}
    </Overlay>,
    document.body
  );
};

export default DesignerProjectGalleryModal;
