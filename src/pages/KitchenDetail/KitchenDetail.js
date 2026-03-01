import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiX, FiChevronDown, FiCheck } from 'react-icons/fi';
import { useModal } from '../../hooks/useModal';

/* ======================================================
   DATA
   ====================================================== */
const kitchensData = {
  1: {
    title: 'Кухня в современном стиле',
    composition: 'Композиция Minimal',
    tag: 'ХИТ',
    description: `Чистые линии, функциональность и стиль. Идеально подходит для современных интерьеров. Сочетание элегантности минимализма с практичностью современного дизайна. Каждая деталь — результат соавторства с вами.`,
    fullDescription: `Воплощение грациозности, сочетание авторского современного декора с высокими технологиями и наполнением. Эта кухня на заказ станет центральным элементом вашего интерьера.

Вдохновившись чистыми линиями скандинавского дизайна, мы создали модель, которая совмещает функциональность и эстетику. Фасады из высококачественного МДФ с покрытием премиум-класса обеспечивают долговечность и безупречный внешний вид.

Внешний вид, цвет и тип отделки могут меняться в зависимости от вашего видения. Каждая кухня этой модели, реализованная для наших клиентов, уникальна и особенна.`,
    price: '120 000',
    style: 'Современный',
    materialBody: 'МДФ, столярная плита, ЛДСП',
    materialFacade: 'МДФ',
    finish: 'Матовая, высокий глянец',
    processing: 'Покраска',
    colorOptions: 'более 200 вариантов + индивидуальный подбор',
    hardware: 'Blum',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    ],
    projects: [
      { id: 1, title: 'Минимализм в свете: кухня по проекту дизайнера', location: 'ЖК «Стрижи»', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80' },
      { id: 2, title: 'Современный стиль в загородном доме', location: 'Коттеджный посёлок «Лесной»', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80' },
      { id: 3, title: 'Функциональная кухня для большой семьи', location: 'ЖК «Панорама»', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80' },
      { id: 4, title: 'Компактная кухня в студии', location: 'ЖК «Центральный»', image: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80' },
    ],
  },
  2: {
    title: 'Кухня в классическом стиле',
    composition: 'Композиция Elegance',
    tag: 'Новинка',
    description: 'Утончённая классика с современным наполнением. Каждая деталь продумана до мелочей.',
    fullDescription: 'Классический стиль, воплощённый в современных материалах и технологиях. Элегантные фасады с фрезеровкой и патиной создают атмосферу утончённой роскоши.',
    price: '180 000',
    style: 'Классический',
    materialBody: 'МДФ, столярная плита',
    materialFacade: 'Массив, МДФ',
    finish: 'Матовая, патина',
    processing: 'Покраска, патинирование',
    colorOptions: 'более 150 вариантов',
    hardware: 'Blum',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    ],
    projects: [
      { id: 1, title: 'Классика в новом прочтении', location: 'ЖК «Волга»', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80' },
      { id: 2, title: 'Элегантная кухня для ценителей', location: 'Частный дом', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80' },
    ],
  },
  3: {
    title: 'Кухня в скандинавском стиле',
    composition: 'Композиция Nordic',
    tag: '',
    description: 'Лёгкость и функциональность скандинавского подхода. Природные материалы и светлые оттенки.',
    fullDescription: 'Скандинавский дизайн, который сочетает простоту и уют. Натуральные текстуры дерева, светлые фасады и продуманная эргономика.',
    price: '100 000',
    style: 'Скандинавский',
    materialBody: 'МДФ, ЛДСП',
    materialFacade: 'МДФ, шпон',
    finish: 'Матовая',
    processing: 'Покраска',
    colorOptions: 'более 100 вариантов',
    hardware: 'Blum',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    ],
    projects: [
      { id: 1, title: 'Скандинавский минимализм', location: 'ЖК «Северный»', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80' },
    ],
  },
};

/* ======================================================
   STYLED COMPONENTS
   ====================================================== */

/* -- Page wrapper -- */
const PageWrapper = styled.div`
  background: ${p => p.theme.colors.white};
  min-height: 100vh;
`;

/* ================= HERO ================= */
const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 85vh;
  min-height: 560px;
  max-height: 900px;
  overflow: hidden;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    height: 54vh;
    min-height: 420px;
    max-height: 520px;
  }
`;

const HeroImage = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: url(${p => p.$src}) center/cover no-repeat;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.15) 0%,
    rgba(0, 0, 0, 0.05) 40%,
    rgba(0, 0, 0, 0.4) 100%
  );
`;

const HeroContent = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 100px 60px 60px;
  z-index: 2;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 80px 16px 24px;
  }
`;

const Breadcrumb = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${p => p.theme.fontSizes.xs};
  color: rgba(255, 255, 255, 0.6);

  a {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: rgba(255, 255, 255, 1);
    }
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 11px;
  }
`;

const BreadcrumbSep = styled.span`
  color: rgba(255, 255, 255, 0.3);
  user-select: none;
`;

const HeroBottom = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${p => p.theme.spacing.xl};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${p => p.theme.spacing.md};
  }
`;

const HeroTitleBlock = styled(motion.div)``;

const HeroTag = styled.span`
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${p => p.theme.colors.white};
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  padding: 6px 14px;
  margin-bottom: 16px;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 9px;
    padding: 5px 12px;
    margin-bottom: 12px;
  }
`;

const HeroTitle = styled.h1`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: clamp(2rem, 5vw, ${p => p.theme.fontSizes['5xl']});
  font-weight: 400;
  color: ${p => p.theme.colors.white};
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 8px;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: clamp(26px, 7vw, 32px);
    margin-bottom: 6px;
  }
`;

const HeroSubtitle = styled.div`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes.xl};
  font-weight: 400;
  font-style: italic;
  color: rgba(255, 255, 255, 0.7);

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes.md};
  }
`;

const HeroActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    flex-direction: row;
    align-items: center;
    width: 100%;
    gap: ${p => p.theme.spacing.sm};
  }
`;

const PriceButton = styled.button`
  padding: 16px 40px;
  background: ${p => p.theme.colors.white};
  color: ${p => p.theme.colors.primary};
  border: none;
  font-family: ${p => p.theme.fonts.primary};
  font-size: ${p => p.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  cursor: pointer;
  transition: ${p => p.theme.transitions.fast};

  &:hover {
    background: ${p => p.theme.colors.primary};
    color: ${p => p.theme.colors.white};
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    flex: 1;
    padding: 14px 20px;
    font-size: 10px;
  }
`;

const ScrollHint = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: ${p => p.theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    flex: 1;
    font-size: 10px;
    justify-content: center;
  }
`;

/* ================= GALLERY ================= */
const GallerySection = styled.section`
  position: relative;
  background: ${p => p.theme.colors.light};
  padding: ${p => p.theme.spacing['3xl']} 0;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: ${p => p.theme.spacing.xl} 0;
  }
`;

const GalleryHeader = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${p => p.theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${p => p.theme.spacing.lg};
  margin-bottom: ${p => p.theme.spacing.xl};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 0 8px;
    gap: ${p => p.theme.spacing.sm};
    margin-bottom: ${p => p.theme.spacing.md};
  }
`;

const GalleryCounter = styled.div`
  min-width: 16px;
  font-family: ${p => p.theme.fonts.primary};
  font-size: ${p => p.theme.fontSizes.md};
  font-weight: 600;
  color: ${p => p.theme.colors.primary};
  letter-spacing: 0.03em;
  text-align: center;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 13px;
    min-width: 12px;
  }
`;

const GalleryProgress = styled.div`
  flex: 1;
  max-width: 380px;
  display: flex;
  align-items: center;
  gap: ${p => p.theme.spacing.md};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    max-width: 220px;
    gap: ${p => p.theme.spacing.sm};
  }
`;

const GalleryLine = styled.div`
  position: relative;
  flex: 1;
  height: 1px;
  background: rgba(20, 20, 20, 0.25);
`;

const GalleryLineFill = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${p => p.$progress}%;
  background: ${p => p.theme.colors.primary};
  transition: width 0.3s ease;
`;

const GalleryNavButtons = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    gap: 6px;
  }
`;

const GalleryNavBtn = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(20, 20, 20, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${p => p.theme.colors.primary};
  transition: ${p => p.theme.transitions.fast};

  &:hover {
    background: ${p => p.theme.colors.primary};
    color: ${p => p.theme.colors.white};
    border-color: ${p => p.theme.colors.primary};
  }

  &:disabled {
    opacity: 0.38;
    pointer-events: none;
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    width: 44px;
    height: 44px;
  }
`;

const GalleryTrack = styled.div`
  display: flex;
  gap: 6px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0 ${p => p.theme.spacing.xl};
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 0 8px;
    gap: 4px;
  }
`;

const GalleryImage = styled.div`
  flex: 0 0 auto;
  width: 520px;
  height: 380px;
  background: url(${p => p.$src}) center/cover no-repeat;
  cursor: pointer;
  transition: opacity 0.3s;
  position: relative;

  &:hover {
    opacity: 0.92;
  }

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    width: 400px;
    height: 300px;
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    width: 280px;
    height: 200px;
    border-radius: 10px;
    overflow: hidden;
  }
`;

const OpenGalleryBtn = styled.button`
  position: absolute;
  bottom: 16px;
  right: 16px;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  color: ${p => p.theme.colors.white};
  border: none;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.85);
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 9px;
    padding: 6px 12px;
    bottom: 10px;
    right: 10px;
  }
`;

/* ================= LIGHTBOX ================= */
const LightboxOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LightboxImage = styled(motion.img)`
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
`;

const LightboxClose = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: ${p => p.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: border-color 0.2s;

  &:hover {
    border-color: rgba(255, 255, 255, 0.6);
  }
`;

const LightboxNav = styled.button`
  width: 58px;
  height: 58px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 999px;
  color: ${p => p.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    width: 48px;
    height: 48px;
  }
`;

const LightboxControls = styled.div`
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: min(92vw, 640px);
  display: flex;
  align-items: center;
  gap: ${p => p.theme.spacing.lg};
  z-index: 10;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    gap: ${p => p.theme.spacing.md};
  }
`;

const LightboxCounter = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: ${p => p.theme.spacing.md};
  color: rgba(255, 255, 255, 0.95);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.02em;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 14px;
    gap: ${p => p.theme.spacing.sm};
  }
`;

const LightboxLine = styled.div`
  flex: 1;
  position: relative;
  height: 1px;
  background: rgba(255, 255, 255, 0.35);
`;

const LightboxLineFill = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${p => p.$progress}%;
  background: rgba(255, 255, 255, 0.95);
  transition: width 0.3s ease;
`;

/* ================= SPECS ================= */
const SpecsSection = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${p => p.theme.spacing['4xl']} ${p => p.theme.spacing.xl};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: ${p => p.theme.spacing.xl} 16px;
  }
`;

const SpecsToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  font-family: ${p => p.theme.fonts.primary};
  font-size: ${p => p.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: ${p => p.theme.colors.primary};
  cursor: pointer;
  padding: 0;
  margin-bottom: ${p => p.$open ? p.theme.spacing.xl : '0'};
  transition: margin 0.3s;

  svg {
    transition: transform 0.3s;
    transform: rotate(${p => p.$open ? '180deg' : '0deg'});
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 10px;
  }
`;

const SpecsContent = styled(motion.div)`
  overflow: hidden;
`;

const SpecsInner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${p => p.theme.spacing['3xl']};

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${p => p.theme.spacing['2xl']};
  }
`;

const SpecsLeft = styled.div``;

const SpecsSubtitle = styled.h3`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['2xl']};
  font-weight: 400;
  color: ${p => p.theme.colors.primary};
  margin-bottom: ${p => p.theme.spacing.sm};
`;

const SpecsNote = styled.p`
  font-size: ${p => p.theme.fontSizes.sm};
  color: ${p => p.theme.colors.gray};
  margin-bottom: ${p => p.theme.spacing.xl};
  line-height: 1.6;
  font-style: italic;
`;

const SpecsTable = styled.div``;

const SpecRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 14px 0;
  border-bottom: 1px solid ${p => p.theme.colors.border};

  &:first-child {
    border-top: 1px solid ${p => p.theme.colors.border};
  }
`;

const SpecLabel = styled.span`
  font-size: ${p => p.theme.fontSizes.sm};
  color: ${p => p.theme.colors.gray};
`;

const SpecValue = styled.span`
  font-size: ${p => p.theme.fontSizes.sm};
  color: ${p => p.theme.colors.primary};
  font-weight: 500;
  text-align: right;
  max-width: 55%;
`;

const SpecsRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${p => p.theme.spacing.lg};
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const BulletItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: ${p => p.theme.fontSizes.sm};
  color: ${p => p.theme.colors.grayDark};
  line-height: 1.6;
`;

const BulletIcon = styled.span`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border: 1px solid ${p => p.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  color: ${p => p.theme.colors.primary};
`;

const SpecsCTA = styled.button`
  align-self: flex-start;
  margin-top: auto;
  padding: 16px 40px;
  background: ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.white};
  border: 1px solid ${p => p.theme.colors.primary};
  font-size: ${p => p.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  cursor: pointer;
  transition: ${p => p.theme.transitions.fast};

  &:hover {
    background: transparent;
    color: ${p => p.theme.colors.primary};
  }
`;

/* ================= OTHER KITCHENS ================= */
const OtherSection = styled.section`
  background: ${p => p.theme.colors.light};
  padding: ${p => p.theme.spacing['4xl']} 0;
`;

const OtherContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${p => p.theme.spacing.xl};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 0 ${p => p.theme.spacing.md};
  }
`;

const OtherHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: ${p => p.theme.spacing['2xl']};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${p => p.theme.spacing.md};
  }
`;

const OtherTitle = styled.h2`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['3xl']};
  font-weight: 400;
  color: ${p => p.theme.colors.primary};
  margin-bottom: 0;
  letter-spacing: -0.02em;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes['2xl']};
  }
`;

const OtherCatalogLink = styled(Link)`
  font-size: ${p => p.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${p => p.theme.colors.primary};
  text-decoration: none;
  border-bottom: 1px solid ${p => p.theme.colors.primary};
  padding-bottom: 3px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.6;
  }
`;

const OtherGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 4px;
  }
`;

const OtherCard = styled(motion.div)`
  position: relative;
  overflow: hidden;
  cursor: pointer;

  a {
    display: block;
    text-decoration: none;
    color: inherit;
  }
`;

const OtherCardImage = styled.div`
  position: relative;
  width: 100%;
  height: 340px;
  background: url(${p => p.$src}) center/cover no-repeat;
  transition: transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  ${OtherCard}:hover & {
    transform: scale(1.05);
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    height: 260px;
  }
`;

const OtherCardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, 0.5) 100%);
  pointer-events: none;
`;

const OtherCardTag = styled.span`
  position: absolute;
  top: 16px;
  left: 16px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${p => p.theme.colors.white};
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  padding: 5px 12px;
  z-index: 2;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 9px;
    padding: 4px 10px;
    top: 12px;
    left: 12px;
  }
`;

const OtherCardInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  z-index: 2;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: ${p => p.theme.spacing.md};
  }
`;

const OtherCardTitle = styled.h3`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes.xl};
  font-weight: 400;
  color: ${p => p.theme.colors.white};
  margin-bottom: 4px;
  line-height: 1.25;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes.md};
  }
`;

const OtherCardComposition = styled.div`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes.sm};
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 8px;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 12px;
  }
`;

const OtherCardPrice = styled.div`
  font-size: ${p => p.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.8);

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 10px;
  }
`;

/* ================= DESCRIPTION ================= */
const DescSection = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${p => p.theme.spacing['4xl']} ${p => p.theme.spacing.xl};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: ${p => p.theme.spacing.xl} 16px;
  }
`;

const DescGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: ${p => p.theme.spacing['3xl']};

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${p => p.theme.spacing.xl};
  }
`;

const DescTitle = styled.h2`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['3xl']};
  font-weight: 400;
  color: ${p => p.theme.colors.primary};
  letter-spacing: -0.02em;
  line-height: 1.2;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes.xl};
  }
`;

const DescText = styled.div`
  font-size: ${p => p.theme.fontSizes.md};
  color: ${p => p.theme.colors.grayDark};
  line-height: 1.85;
  white-space: pre-line;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes.sm};
    line-height: 1.7;
  }
`;

const ShowMoreBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  font-size: ${p => p.theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${p => p.theme.colors.primary};
  font-weight: 500;
  cursor: pointer;
  margin-top: ${p => p.theme.spacing.md};
  padding: 0;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.6;
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 10px;
  }
`;

/* ================= REASONS ================= */
const ReasonsOuter = styled.div`
  padding: 0 ${p => p.theme.spacing.xl};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 0 8px;
  }
`;

const ReasonsSection = styled.section`
  background: ${p => p.theme.colors.primary};
  padding: ${p => p.theme.spacing['4xl']} 0;
  border-radius: 24px;
  overflow: hidden;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: ${p => p.theme.spacing.xl} 0;
    border-radius: 16px;
  }
`;

const ReasonsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${p => p.theme.spacing.xl};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 0 ${p => p.theme.spacing.lg};
  }
`;

const ReasonsTitle = styled.h2`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['3xl']};
  font-weight: 400;
  color: ${p => p.theme.colors.white};
  margin-bottom: ${p => p.theme.spacing['2xl']};
  letter-spacing: -0.02em;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes.xl};
    margin-bottom: ${p => p.theme.spacing.lg};
  }
`;

const ReasonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(255, 255, 255, 0.1);

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ReasonCard = styled(motion.div)`
  background: ${p => p.theme.colors.primary};
  padding: ${p => p.theme.spacing['2xl']};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: ${p => p.theme.spacing.lg};
  }
`;

const ReasonNumber = styled.div`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['4xl']};
  font-weight: 400;
  color: rgba(255, 255, 255, 0.12);
  margin-bottom: ${p => p.theme.spacing.md};
  line-height: 1;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes['2xl']};
  }
`;

const ReasonText = styled.p`
  font-size: ${p => p.theme.fontSizes.sm};
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.65;
  margin: 0;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 13px;
  }
`;

/* ================= BOTTOM CTA ================= */
const BottomCTA = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${p => p.theme.spacing['4xl']} ${p => p.theme.spacing.xl};
  text-align: center;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: ${p => p.theme.spacing.xl} 16px;
  }
`;

const CTAHeading = styled.h2`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['3xl']};
  font-weight: 400;
  color: ${p => p.theme.colors.primary};
  margin-bottom: ${p => p.theme.spacing.md};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes.xl};
  }
`;

const CTASubtext = styled.p`
  font-size: ${p => p.theme.fontSizes.md};
  color: ${p => p.theme.colors.gray};
  margin-bottom: ${p => p.theme.spacing.xl};
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes.sm};
  }
`;

const CTAButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: ${p => p.theme.spacing.md};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${p => p.theme.spacing.sm};
  }
`;

const CTAPrimary = styled.button`
  padding: 16px 48px;
  background: ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.white};
  border: 1px solid ${p => p.theme.colors.primary};
  font-size: ${p => p.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  cursor: pointer;
  transition: ${p => p.theme.transitions.fast};

  &:hover {
    background: transparent;
    color: ${p => p.theme.colors.primary};
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 14px 24px;
    font-size: 10px;
  }
`;

const CTASecondary = styled.button`
  padding: 16px 48px;
  background: transparent;
  color: ${p => p.theme.colors.primary};
  border: 1px solid ${p => p.theme.colors.primary};
  font-size: ${p => p.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  cursor: pointer;
  transition: ${p => p.theme.transitions.fast};

  &:hover {
    background: ${p => p.theme.colors.primary};
    color: ${p => p.theme.colors.white};
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 14px 24px;
    font-size: 10px;
  }
`;

/* ================= STICKY PRICE BAR ================= */
const fadeIn = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const StickyBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: ${p => p.theme.colors.white};
  border-top: 1px solid ${p => p.theme.colors.border};
  padding: 14px 0;
  animation: ${fadeIn} 0.4s ease forwards;
  display: ${p => p.$visible ? 'block' : 'none'};
`;

const StickyInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${p => p.theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 0 16px;
    flex-direction: column;
    gap: 8px;
    align-items: stretch;
  }
`;

const StickyLeft = styled.div`
  display: flex;
  align-items: baseline;
  gap: 16px;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
  }
`;

const StickyName = styled.span`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes.lg};
  font-weight: 400;
  color: ${p => p.theme.colors.primary};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes.md};
  }
`;

const StickyPrice = styled.span`
  font-size: ${p => p.theme.fontSizes.sm};
  color: ${p => p.theme.colors.gray};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 12px;
  }
`;

const StickyButton = styled.button`
  padding: 12px 32px;
  background: ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.white};
  border: none;
  font-size: ${p => p.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: ${p => p.theme.transitions.fast};

  &:hover {
    opacity: 0.85;
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    width: 100%;
    text-align: center;
    padding: 14px 20px;
    font-size: 10px;
  }
`;

/* ======================================================
   COMPONENT
   ====================================================== */
const KitchenDetail = () => {
  const { id } = useParams();
  const { openModal } = useModal();
  const galleryRef = useRef(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [specsOpen, setSpecsOpen] = useState(true);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);

  const kitchen = kitchensData[id] || kitchensData[1];
  const images = kitchen.images;
  const otherKitchens = Object.entries(kitchensData).filter(([key]) => key !== id);

  /* sticky bar visibility */
  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* gallery scroll */
  const scrollGallery = useCallback((dir) => {
    if (!galleryRef.current) return;
    const step = 530;
    galleryRef.current.scrollBy({ left: dir === 'next' ? step : -step, behavior: 'smooth' });
    setGalleryIdx(prev => {
      const next = prev + (dir === 'next' ? 1 : -1);
      return Math.max(0, Math.min(next, images.length - 1));
    });
  }, [images.length]);

  /* lightbox nav */
  const lbPrev = useCallback(() => setLightboxIndex(i => (i - 1 + images.length) % images.length), [images.length]);
  const lbNext = useCallback(() => setLightboxIndex(i => (i + 1) % images.length), [images.length]);

  /* keyboard nav for lightbox */
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') lbPrev();
      if (e.key === 'ArrowRight') lbNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxOpen, lbPrev, lbNext]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const scrollToGallery = () => {
    const el = document.getElementById('gallery');
    if (el) el.scrollIntoView({ behavior: 'auto' });
  };

  const reasons = [
    'Изготовим кухню за 30 рабочих дней на собственном производстве.',
    'Гарантия на кухни и мебель — 5 лет.',
    'Доставка и монтаж по Саратову и области.',
    'Покрасим в любой цвет без наценки. Более 200 вариантов.',
    'Бесшовное кромление корпуса — 100% защита от влаги.',
    'Клееный корпус — идеальная геометрия и долговечность.',
  ];

  return (
    <PageWrapper>
      {/* ========== HERO ========== */}
      <HeroSection>
        <HeroImage
          $src={images[0]}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <HeroOverlay />
        <HeroContent>
          <Breadcrumb>
            <Link to="/">Главная</Link>
            <BreadcrumbSep>/</BreadcrumbSep>
            <Link to="/catalog">Каталог</Link>
            <BreadcrumbSep>/</BreadcrumbSep>
            <span style={{ color: 'rgba(255,255,255,0.85)' }}>{kitchen.title}</span>
          </Breadcrumb>

          <HeroBottom>
            <HeroTitleBlock
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {kitchen.tag && <HeroTag>{kitchen.tag}</HeroTag>}
              <HeroTitle>{kitchen.title}</HeroTitle>
              <HeroSubtitle>{kitchen.composition}</HeroSubtitle>
            </HeroTitleBlock>

            <HeroActions>
              <PriceButton onClick={() => openModal('callback')}>Узнать цену</PriceButton>
              <ScrollHint onClick={scrollToGallery}>
                Смотреть фото <FiChevronDown size={14} />
              </ScrollHint>
            </HeroActions>
          </HeroBottom>
        </HeroContent>
      </HeroSection>

      {/* ========== GALLERY ========== */}
      <GallerySection id="gallery">
        <GalleryHeader>
          <GalleryNavButtons>
            <GalleryNavBtn onClick={() => scrollGallery('prev')} disabled={galleryIdx === 0}>
              <FiChevronLeft size={18} />
            </GalleryNavBtn>
          </GalleryNavButtons>
          <GalleryProgress>
            <GalleryCounter>{galleryIdx + 1}</GalleryCounter>
            <GalleryLine>
              <GalleryLineFill $progress={((galleryIdx + 1) / images.length) * 100} />
            </GalleryLine>
            <GalleryCounter>{images.length}</GalleryCounter>
          </GalleryProgress>
          <GalleryNavButtons>
            <GalleryNavBtn onClick={() => scrollGallery('next')} disabled={galleryIdx >= images.length - 1}>
              <FiChevronRight size={18} />
            </GalleryNavBtn>
          </GalleryNavButtons>
        </GalleryHeader>

        <GalleryTrack ref={galleryRef}>
          {images.map((src, i) => (
            <GalleryImage key={i} $src={src} onClick={() => openLightbox(i)}>
              {i === 0 && (
                <OpenGalleryBtn onClick={(e) => { e.stopPropagation(); openLightbox(0); }}>
                  Открыть галерею
                </OpenGalleryBtn>
              )}
            </GalleryImage>
          ))}
        </GalleryTrack>
      </GallerySection>

      {/* ========== LIGHTBOX ========== */}
      <AnimatePresence>
        {lightboxOpen && (
          <LightboxOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            <LightboxClose onClick={() => setLightboxOpen(false)}>
              <FiX size={20} />
            </LightboxClose>
            <LightboxImage
              key={lightboxIndex}
              src={images[lightboxIndex]}
              alt=""
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />
            <LightboxControls onClick={(e) => e.stopPropagation()}>
              <LightboxNav onClick={lbPrev}>
                <FiChevronLeft size={22} />
              </LightboxNav>
              <LightboxCounter>
                <span>{lightboxIndex + 1}</span>
                <LightboxLine>
                  <LightboxLineFill $progress={((lightboxIndex + 1) / images.length) * 100} />
                </LightboxLine>
                <span>{images.length}</span>
              </LightboxCounter>
              <LightboxNav onClick={lbNext}>
                <FiChevronRight size={22} />
              </LightboxNav>
            </LightboxControls>
          </LightboxOverlay>
        )}
      </AnimatePresence>

      {/* ========== SPECS ========== */}
      <SpecsSection>
        <SpecsToggle $open={specsOpen} onClick={() => setSpecsOpen(v => !v)}>
          {specsOpen ? 'Скрыть характеристики' : 'Развернуть характеристики'}
          <FiChevronDown size={14} />
        </SpecsToggle>

        <AnimatePresence initial={false}>
          {specsOpen && (
            <SpecsContent
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SpecsInner>
                <SpecsLeft>
                  <SpecsSubtitle>Характеристики образца</SpecsSubtitle>
                  <SpecsNote>Образец — это наше видение модели, то что вы видите на фото</SpecsNote>

                  <SpecsTable>
                    <SpecRow><SpecLabel>Стиль:</SpecLabel><SpecValue>{kitchen.style}</SpecValue></SpecRow>
                    <SpecRow><SpecLabel>Материал корпуса:</SpecLabel><SpecValue>{kitchen.materialBody}</SpecValue></SpecRow>
                    <SpecRow><SpecLabel>Материал фасада:</SpecLabel><SpecValue>{kitchen.materialFacade}</SpecValue></SpecRow>
                    <SpecRow><SpecLabel>Отделка:</SpecLabel><SpecValue>{kitchen.finish}</SpecValue></SpecRow>
                    <SpecRow><SpecLabel>Обработка:</SpecLabel><SpecValue>{kitchen.processing}</SpecValue></SpecRow>
                    <SpecRow><SpecLabel>Варианты цвета:</SpecLabel><SpecValue>{kitchen.colorOptions}</SpecValue></SpecRow>
                    <SpecRow><SpecLabel>Фурнитура:</SpecLabel><SpecValue>{kitchen.hardware}</SpecValue></SpecRow>
                  </SpecsTable>
                </SpecsLeft>

                <SpecsRight>
                  <BulletList>
                    <BulletItem>
                      <BulletIcon><FiCheck size={11} /></BulletIcon>
                      Соединяем передовые технологии и неповторимый дизайн. Каждая деталь — результат соавторства с вами.
                    </BulletItem>
                    <BulletItem>
                      <BulletIcon><FiCheck size={11} /></BulletIcon>
                      Цвета и материалы без ограничений каталогов — ассортимент, которого нет на рынке.
                    </BulletItem>
                    <BulletItem>
                      <BulletIcon><FiCheck size={11} /></BulletIcon>
                      Разработка и доставка образца фасада для примерки в реальном интерьере.
                    </BulletItem>
                    <BulletItem>
                      <BulletIcon><FiCheck size={11} /></BulletIcon>
                      Более 500 отзывов со средним рейтингом 4.9
                    </BulletItem>
                  </BulletList>

                  <SpecsCTA onClick={() => openModal('callback')}>
                    Узнайте стоимость вашей кухни
                  </SpecsCTA>
                </SpecsRight>
              </SpecsInner>
            </SpecsContent>
          )}
        </AnimatePresence>
      </SpecsSection>

      {/* ========== OTHER KITCHENS ========== */}
      {otherKitchens.length > 0 && (
        <OtherSection>
          <OtherContainer>
            <OtherHeader>
              <OtherTitle>Другие модели из каталога</OtherTitle>
              <OtherCatalogLink to="/catalog">Все кухни</OtherCatalogLink>
            </OtherHeader>
            <OtherGrid>
              {otherKitchens.map(([otherId, other], i) => (
                <OtherCard
                  key={otherId}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/kitchen/${otherId}`}>
                    <OtherCardImage $src={other.images[0]}>
                      <OtherCardOverlay />
                      {other.tag && <OtherCardTag>{other.tag}</OtherCardTag>}
                      <OtherCardInfo>
                        <OtherCardTitle>{other.title}</OtherCardTitle>
                        <OtherCardComposition>{other.composition}</OtherCardComposition>
                        <OtherCardPrice>от {other.price} ₽</OtherCardPrice>
                      </OtherCardInfo>
                    </OtherCardImage>
                  </Link>
                </OtherCard>
              ))}
            </OtherGrid>
          </OtherContainer>
        </OtherSection>
      )}

      {/* ========== DESCRIPTION ========== */}
      <DescSection>
        <DescGrid>
          <DescTitle>{kitchen.title}</DescTitle>
          <div>
            <DescText>
              {showFullDesc ? kitchen.fullDescription : kitchen.description}
            </DescText>
            {kitchen.fullDescription && kitchen.fullDescription !== kitchen.description && (
              <ShowMoreBtn onClick={() => setShowFullDesc(v => !v)}>
                {showFullDesc ? 'Скрыть' : 'Показать всё описание'}
                <FiChevronDown
                  size={12}
                  style={{
                    transform: showFullDesc ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.3s',
                  }}
                />
              </ShowMoreBtn>
            )}
          </div>
        </DescGrid>
      </DescSection>

      {/* ========== REASONS ========== */}
      <ReasonsOuter>
        <ReasonsSection>
          <ReasonsContainer>
            <ReasonsTitle>Всего одна причина, чтобы выбрать нас</ReasonsTitle>
            <ReasonsGrid>
              {reasons.map((text, i) => (
                <ReasonCard
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  viewport={{ once: true }}
                >
                  <ReasonNumber>{String(i + 1).padStart(2, '0')}</ReasonNumber>
                  <ReasonText>{text}</ReasonText>
                </ReasonCard>
              ))}
            </ReasonsGrid>
          </ReasonsContainer>
        </ReasonsSection>
      </ReasonsOuter>

      {/* ========== BOTTOM CTA ========== */}
      <BottomCTA>
        <CTAHeading>Сделайте кухню вашим личным шедевром</CTAHeading>
        <CTASubtext>
          Соединяем передовые технологии и неповторимый дизайн. Свяжитесь с нами, чтобы обсудить ваш проект.
        </CTASubtext>
        <CTAButtons>
          <CTAPrimary onClick={() => openModal('callback')}>Узнать стоимость</CTAPrimary>
          <CTASecondary onClick={() => openModal('callback')}>Оставить заявку</CTASecondary>
        </CTAButtons>
      </BottomCTA>

      {/* ========== STICKY BAR ========== */}
      <StickyBar $visible={stickyVisible}>
        <StickyInner>
          <StickyLeft>
            <StickyName>{kitchen.composition}</StickyName>
            <StickyPrice>от {kitchen.price} ₽</StickyPrice>
          </StickyLeft>
          <StickyButton onClick={() => openModal('callback')}>Узнать цену</StickyButton>
        </StickyInner>
      </StickyBar>
    </PageWrapper>
  );
};

export default KitchenDetail;
