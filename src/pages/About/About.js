import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCheck, FiX as FiCross, FiArrowRight } from 'react-icons/fi';
import { useModal } from '../../hooks/useModal';

/* ======================================================
   SHARED
   ====================================================== */
const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${p => p.theme.spacing.xl};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 0 ${p => p.theme.spacing.md};
  }
`;

/* ======================================================
   1. HERO
   ====================================================== */
const HeroOuter = styled.div`
  padding-top: 80px;
  background: ${p => p.theme.colors.white};
  padding-left: ${p => p.theme.spacing.xl};
  padding-right: ${p => p.theme.spacing.xl};
  padding-bottom: 0;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding-left: ${p => p.theme.spacing.md};
    padding-right: ${p => p.theme.spacing.md};
  }
`;

const HeroSection = styled.section`
  background: ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.white};
  padding-bottom: ${p => p.theme.spacing['3xl']};
  border-radius: 24px;
  overflow: hidden;
`;

const Breadcrumb = styled.nav`
  padding-top: ${p => p.theme.spacing['2xl']};
  margin-bottom: ${p => p.theme.spacing['3xl']};
  font-size: ${p => p.theme.fontSizes.xs};
  color: rgba(255, 255, 255, 0.4);

  a {
    color: rgba(255, 255, 255, 0.4);
    text-decoration: none;
    transition: color 0.2s;
    &:hover { color: rgba(255, 255, 255, 0.8); }
  }
`;

const BreadcrumbSep = styled.span`
  margin: 0 8px;
  color: rgba(255, 255, 255, 0.2);
`;

const HeroTitle = styled(motion.h1)`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: clamp(2.5rem, 5vw, ${p => p.theme.fontSizes['6xl']});
  font-weight: 400;
  color: ${p => p.theme.colors.white};
  margin-bottom: ${p => p.theme.spacing['2xl']};
  letter-spacing: -0.02em;
  line-height: 1.05;
`;

const HeroTabs = styled(motion.div)`
  display: flex;
  gap: ${p => p.theme.spacing.sm};
  flex-wrap: wrap;
`;

const HeroTab = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  padding: 10px 16px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: rgba(255, 255, 255, 0.82);
  font-size: ${p => p.theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.12em;
`;

/* ======================================================
   2. INTRO / STORY
   ====================================================== */
const IntroSection = styled.section`
  padding: ${p => p.theme.spacing['5xl']} 0;
  background: ${p => p.theme.colors.white};
`;

const IntroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${p => p.theme.spacing['4xl']};
  align-items: center;

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${p => p.theme.spacing['2xl']};
  }
`;

const IntroText = styled.div``;

const IntroHeading = styled(motion.h2)`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['3xl']};
  font-weight: 400;
  color: ${p => p.theme.colors.primary};
  margin-bottom: ${p => p.theme.spacing.xl};
  letter-spacing: -0.02em;
  line-height: 1.2;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes['2xl']};
  }
`;

const IntroParagraph = styled(motion.p)`
  font-size: ${p => p.theme.fontSizes.md};
  color: ${p => p.theme.colors.grayDark};
  line-height: 1.85;
  margin-bottom: ${p => p.theme.spacing.md};
`;

const IntroImage = styled(motion.div)`
  height: 520px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    height: 320px;
  }
`;

/* ======================================================
   3. UNIQUE APPROACH
   ====================================================== */
const ApproachSection = styled.section`
  padding: ${p => p.theme.spacing['4xl']} 0;
  background: ${p => p.theme.colors.light};
`;

const ApproachTitle = styled(motion.h2)`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['3xl']};
  font-weight: 400;
  color: ${p => p.theme.colors.primary};
  margin-bottom: ${p => p.theme.spacing['2xl']};
  letter-spacing: -0.02em;
  max-width: 700px;
  line-height: 1.2;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes['2xl']};
  }
`;

const ApproachGrid = styled.div`
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  grid-template-rows: repeat(2, minmax(170px, auto));
  gap: ${p => p.theme.spacing.md};

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;

const ApproachCard = styled(motion.div)`
  background: ${p => p.theme.colors.white};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 16px;
  overflow: hidden;

  /* Make composition less uniform: large first card + two compact cards */
  ${p => p.$variant === 'large' && `
    grid-row: 1 / span 2;
  `}

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    grid-row: auto;
  }
`;

const ApproachImage = styled.div`
  width: 100%;
  height: ${p => (p.$variant === 'large' ? '270px' : '170px')};
  background: url(${p => p.$src}) center/cover no-repeat;

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    height: 210px;
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    height: 190px;
  }
`;

const ApproachBody = styled.div`
  padding: ${p => p.theme.spacing.lg};
`;

const ApproachText = styled.p`
  font-size: ${p => p.theme.fontSizes.sm};
  color: ${p => p.theme.colors.grayDark};
  line-height: 1.6;
  margin: 0;
`;

/* ======================================================
   4. STATS
   ====================================================== */

const StatsHeader = styled(motion.h2)`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['2xl']};
  font-weight: 400;
  color: ${p => p.theme.colors.white};
  margin-bottom: ${p => p.theme.spacing['2xl']};
  letter-spacing: -0.01em;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(255, 255, 255, 0.08);

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

/* ======================================================
   4.5 EXCLUSIVE
   ====================================================== */
const ExclusiveWrap = styled.div`
  padding: ${p => p.theme.spacing['2xl']} ${p => p.theme.spacing.xl};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: ${p => p.theme.spacing.xl} ${p => p.theme.spacing.md};
  }
`;

const ExclusiveSection = styled.section`
  border-radius: 20px;
  background: ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.white};
  overflow: hidden;
  padding: ${p => p.theme.spacing.xl};
`;

const ShowcaseGrid = styled.div`
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: ${p => p.theme.spacing.lg};

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const LeftShowcase = styled.div`
  padding-right: ${p => p.theme.spacing.sm};
`;

const RightShowcase = styled.div`
  position: relative;
  min-height: 320px;
  border-radius: 16px;
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.62) 100%),
    url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80') center/cover no-repeat;
  padding: ${p => p.theme.spacing.xl};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const ExclusiveTitle = styled.h3`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['3xl']};
  font-weight: 400;
  letter-spacing: -0.01em;
  margin-bottom: 8px;
  text-transform: uppercase;
`;

const OutlineButton = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.06);
  color: ${p => p.theme.colors.white};
  padding: 14px 22px;
  font-size: ${p => p.theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const ExclusiveBadge = styled.div`
  margin-top: ${p => p.theme.spacing.md};
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: rgba(255,255,255,0.85);
  line-height: 1.4;
`;

const StatCard = styled(motion.div)`
  position: relative;
  min-height: 120px;
  overflow: hidden;
  border-radius: 12px;
  padding: ${p => p.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background:
    linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.62) 100%),
    url(${p => p.$src}) center/cover no-repeat;
`;

const StatNumber = styled.div`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['3xl']};
  font-weight: 400;
  color: ${p => p.theme.colors.white};
  margin-bottom: 4px;
  line-height: 1;
`;

const StatUnit = styled.div`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
  text-transform: none;
  letter-spacing: 0.03em;
  line-height: 1.4;
`;

/* ======================================================
   5. WHY CHOOSE US (numbered)
   ====================================================== */
const WhySection = styled.section`
  padding: ${p => p.theme.spacing['5xl']} 0;
  background: ${p => p.theme.colors.white};
`;

const MidCTAWrap = styled.div`
  padding: ${p => p.theme.spacing['2xl']} 0 ${p => p.theme.spacing['4xl']};
`;

const MidCTA = styled.section`
  background: ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.white};
  border-radius: 18px;
  padding: ${p => p.theme.spacing['2xl']};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${p => p.theme.spacing.lg};
  flex-wrap: wrap;
`;

const MidCTATitle = styled.h3`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['2xl']};
  font-weight: 400;
`;

const MidCTASubtext = styled.p`
  color: rgba(255, 255, 255, 0.55);
  font-size: ${p => p.theme.fontSizes.sm};
  margin-top: 6px;
`;

const WhyTitle = styled(motion.h2)`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['3xl']};
  font-weight: 400;
  color: ${p => p.theme.colors.primary};
  margin-bottom: ${p => p.theme.spacing['2xl']};
  letter-spacing: -0.02em;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes['2xl']};
  }
`;

const WhyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: ${p => p.theme.colors.border};
  border: 1px solid ${p => p.theme.colors.border};

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const WhyCard = styled(motion.div)`
  background: ${p => p.theme.colors.white};
  padding: ${p => p.theme.spacing['2xl']};
  transition: background 0.3s;

  &:hover {
    background: ${p => p.theme.colors.light};
  }
`;

const WhyNumber = styled.div`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['3xl']};
  font-weight: 400;
  color: ${p => p.theme.colors.border};
  margin-bottom: ${p => p.theme.spacing.lg};
  line-height: 1;
`;

const WhyCardTitle = styled.h3`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes.lg};
  font-weight: 400;
  color: ${p => p.theme.colors.primary};
  margin-bottom: ${p => p.theme.spacing.sm};
  line-height: 1.3;
`;

const WhyCardText = styled.p`
  font-size: ${p => p.theme.fontSizes.sm};
  color: ${p => p.theme.colors.gray};
  line-height: 1.65;
  margin: 0;
`;

/* ======================================================
   6. MATERIALS
   ====================================================== */
const MaterialsSection = styled.section`
  padding: ${p => p.theme.spacing['5xl']} 0;
  background: ${p => p.theme.colors.light};
`;

const MaterialsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${p => p.theme.spacing['3xl']};
  align-items: center;

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${p => p.theme.spacing['2xl']};
  }
`;

const MaterialsText = styled.div``;

const MaterialsTitle = styled(motion.h2)`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['3xl']};
  font-weight: 400;
  color: ${p => p.theme.colors.primary};
  margin-bottom: ${p => p.theme.spacing.xl};
  letter-spacing: -0.02em;
  line-height: 1.2;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes['2xl']};
  }
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const BulletItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  font-size: ${p => p.theme.fontSizes.md};
  color: ${p => p.theme.colors.grayDark};
  line-height: 1.65;
`;

const BulletIcon = styled.span`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  background: ${p => p.$negative ? 'transparent' : p.theme.colors.primary};
  color: ${p => p.$negative ? p.theme.colors.gray : p.theme.colors.white};
  border: 1px solid ${p => p.$negative ? p.theme.colors.grayLight : p.theme.colors.primary};
`;

const MaterialsImage = styled(motion.div)`
  height: 480px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    height: 300px;
  }
`;

/* ======================================================
   7. STEPS
   ====================================================== */
const StepsSection = styled.section`
  padding: ${p => p.theme.spacing['5xl']} 0;
  background: ${p => p.theme.colors.white};
`;

const StepsTitle = styled(motion.h2)`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['3xl']};
  font-weight: 400;
  color: ${p => p.theme.colors.primary};
  margin-bottom: ${p => p.theme.spacing['2xl']};
  letter-spacing: -0.02em;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes['2xl']};
  }
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1px;
  background: ${p => p.theme.colors.border};
  border: 1px solid ${p => p.theme.colors.border};

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled(motion.div)`
  background: ${p => p.theme.colors.white};
  padding: ${p => p.theme.spacing['2xl']};
  text-align: center;
`;

const StepNumber = styled.div`
  width: 48px;
  height: 48px;
  border: 1px solid ${p => p.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${p => p.theme.spacing.lg};
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes.xl};
  color: ${p => p.theme.colors.primary};
  font-weight: 400;
`;

const StepTitle = styled.h3`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes.md};
  font-weight: 400;
  color: ${p => p.theme.colors.primary};
  margin-bottom: ${p => p.theme.spacing.sm};
  line-height: 1.35;
`;

const StepText = styled.p`
  font-size: ${p => p.theme.fontSizes.sm};
  color: ${p => p.theme.colors.gray};
  line-height: 1.6;
  margin: 0;
`;

/* ======================================================
   8. BOTTOM CTA
   ====================================================== */
const CTAOuter = styled.div`
  padding: 0 ${p => p.theme.spacing.xl} ${p => p.theme.spacing['3xl']};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 0 ${p => p.theme.spacing.md} ${p => p.theme.spacing['2xl']};
  }
`;

const CTASection = styled.section`
  background: ${p => p.theme.colors.primary};
  padding: ${p => p.theme.spacing['4xl']} 0;
  border-radius: 24px;
  overflow: hidden;
`;

const CTAInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${p => p.theme.spacing['2xl']};

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    flex-direction: column;
    text-align: center;
  }
`;

const CTAText = styled.div``;

const CTAHeading = styled(motion.h2)`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['3xl']};
  font-weight: 400;
  color: ${p => p.theme.colors.white};
  margin-bottom: 8px;
  letter-spacing: -0.02em;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes['2xl']};
  }
`;

const CTASubtext = styled.p`
  font-size: ${p => p.theme.fontSizes.md};
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.6;
  margin: 0;
`;

const CTARight = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${p => p.theme.spacing.xl};
  flex-shrink: 0;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${p => p.theme.spacing.md};
  }
`;

const CTAStatBlock = styled.div`
  text-align: center;
`;

const CTAStatNum = styled.div`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['4xl']};
  font-weight: 400;
  color: ${p => p.theme.colors.white};
  line-height: 1;
`;

const CTAStatLabel = styled.div`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.3);
  margin-top: 4px;
  line-height: 1.4;
`;

const CTAButton = styled.button`
  padding: 18px 40px;
  background: ${p => p.theme.colors.white};
  color: ${p => p.theme.colors.primary};
  border: none;
  font-family: ${p => p.theme.fonts.primary};
  font-size: ${p => p.theme.fontSizes.xs};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  cursor: pointer;
  transition: all 0.25s;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }
`;

/* ======================================================
   COMPONENT
   ====================================================== */
const About = () => {
  const { openModal } = useModal();

  const approach = [
    {
      image: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
      text: 'Мы работаем по принципу ателье. И каждый предмет в нашей кухне всегда индивидуального размера и конструктива.',
    },
    {
      image: 'https://images.unsplash.com/photo-1564540583246-934409427776?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
      text: 'Мы используем только немецкую фурнитуру. Крепежные петли, выкатные ящики и сетки. Самая надежная в отличие от итальянской.',
    },
    {
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
      text: 'При этом у каждой нашей модели абсолютная итальянская эстетика, вдохновленная историческим предметом.',
    },
  ];

  const stats = [
    {
      number: '300',
      unit: 'Квадратных метров',
      image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    },
    {
      number: '9',
      unit: 'Опытных менеджеров',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    },
    {
      number: '8',
      unit: 'Образцов дизайнерских кухонь',
      image: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    },
    {
      number: '6',
      unit: 'Образцов дизайнерской мебели',
      image: 'https://images.unsplash.com/photo-1617104551722-3b2d513664c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    },
  ];

  const whyCards = [
    { title: 'Уникальность', text: 'Помогаем создавать авторскую мебель. Нас выбирают лучшие дизайнеры и архитекторы.' },
    { title: 'Профессиональный замер', text: 'Гарантируем предельную точность и профессионализм наших замерщиков.' },
    { title: 'Визуализация проекта', text: 'Менеджеры помогут продумать и решить самые сложные технологические задачи.' },
    { title: 'Актуальные материалы', text: 'Готовы экспериментировать с новыми материалами для ваших проектов.' },
    { title: 'Высокая квалификация', text: 'Конструкторы и технологи воплотят ваши идеи в реальность.' },
    { title: 'Монтаж', text: 'Наши монтажники — профессионалы с многолетним опытом.' },
    { title: 'Партнёрство', text: 'Особые условия сотрудничества для постоянных партнёров.' },
    { title: 'Качество', text: 'Доводим каждый проект до состояния, которым гордимся.' },
  ];

  const materials = [
    { text: 'Не используем плёнку и пластик — это вредно и выглядит дёшево.', negative: true },
    { text: 'Следим за тенденциями и ориентируемся на то, что надёжно и безопасно.', negative: false },
    { text: 'Используем шпон, натуральные металлы, краску под металл и бетон.', negative: false },
    { text: 'Приходите в наш салон и убедитесь, что качество не уступает аналогам из Европы.', negative: false },
  ];

  const steps = [
    { title: 'План помещения', text: 'Определяемся с моделью кухни и стилем' },
    { title: 'Материалы и 3D-проект', text: 'Выбираем материалы, формируем визуализацию' },
    { title: 'Индивидуальный фасад', text: 'Изготавливаем фасад для вашего проекта' },
    { title: 'Замер и изготовление', text: 'Замеряем помещение и изготавливаем мебель' },
    { title: 'Доставка и монтаж', text: 'Доставляем и монтируем в согласованное время' },
  ];

  return (
    <>
      {/* ========== 1. HERO ========== */}
      <HeroOuter>
        <HeroSection>
          <Container>
            <Breadcrumb>
              <Link to="/">Главная</Link>
              <BreadcrumbSep>/</BreadcrumbSep>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>О компании</span>
            </Breadcrumb>
            <HeroTitle
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              О компании
            </HeroTitle>
            <HeroTabs
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <HeroTab>О салоне</HeroTab>
              <HeroTab>О фабрике</HeroTab>
            </HeroTabs>
          </Container>
        </HeroSection>
      </HeroOuter>

      {/* ========== 2. INTRO ========== */}
      <IntroSection>
        <Container>
          <IntroGrid>
            <IntroText>
              <IntroHeading
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Проектная фабрика кухонь и мебели «Кухни Саратов» основана в 2014 году
              </IntroHeading>
              <IntroParagraph
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Мы начали с небольшого производства и мечты создавать не просто мебель, 
                а пространства, где семьи проводят самые важные моменты жизни. За годы 
                работы выросли в компанию с собственным производством и командой профессионалов.
              </IntroParagraph>
              <IntroParagraph
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Наши кухни выбирают ценители стиля и качества. Мы работаем с лучшими 
                дизайнерами и архитекторами, создавая интерьеры, которые вдохновляют 
                и служат десятилетиями.
              </IntroParagraph>
            </IntroText>
            <IntroImage
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
                alt="Наше производство"
              />
            </IntroImage>
          </IntroGrid>
        </Container>
      </IntroSection>

      {/* ========== 3. APPROACH ========== */}
      <ApproachSection>
        <Container>
          <ApproachTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Наш уникальный подход заключается в том, что:
          </ApproachTitle>
          <ApproachGrid>
            {approach.map((item, i) => (
              <ApproachCard
                key={i}
                $variant={i === 0 ? 'large' : 'default'}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <ApproachImage
                  $src={item.image}
                  $variant={i === 0 ? 'large' : 'default'}
                />
                <ApproachBody>
                  <ApproachText>{item.text}</ApproachText>
                </ApproachBody>
              </ApproachCard>
            ))}
          </ApproachGrid>
        </Container>
      </ApproachSection>

      {/* ========== 4. STATS + EXCLUSIVE ========== */}
      <ExclusiveWrap>
        <ExclusiveSection>
          <ShowcaseGrid>
            <LeftShowcase>
              <StatsHeader
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Принимаем, как в 5-звёздочном отеле
              </StatsHeader>
              <StatsGrid>
                {stats.map((s, i) => (
                  <StatCard
                    key={i}
                    $src={s.image}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    viewport={{ once: true }}
                  >
                    <StatNumber>{s.number}</StatNumber>
                    <StatUnit>{s.unit}</StatUnit>
                  </StatCard>
                ))}
              </StatsGrid>
            </LeftShowcase>

            <RightShowcase>
              <ExclusiveTitle>SILVER HOME - 100% ЭКСКЛЮЗИВ И ВСЕГДА ИНДИВИДУАЛЬНО</ExclusiveTitle>
              <ExclusiveBadge>
                Являемся членом Московской торгово-промышленной палаты
              </ExclusiveBadge>
              <div style={{ marginTop: '16px' }}>
                <OutlineButton onClick={() => openModal('callback')}>
                  Подробнее о фабрике <FiArrowRight size={14} />
                </OutlineButton>
              </div>
            </RightShowcase>
          </ShowcaseGrid>
        </ExclusiveSection>
      </ExclusiveWrap>

      {/* ========== 5. WHY CHOOSE US ========== */}
      <WhySection>
        <Container>
          <WhyTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Почему нас выбирают профессионалы?
          </WhyTitle>
          <WhyGrid>
            {whyCards.map((card, i) => (
              <WhyCard
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <WhyNumber>{i + 1}</WhyNumber>
                <WhyCardTitle>{card.title}</WhyCardTitle>
                <WhyCardText>{card.text}</WhyCardText>
              </WhyCard>
            ))}
          </WhyGrid>
          <MidCTAWrap>
            <MidCTA>
              <div>
                <MidCTATitle>Сделайте кухню вашим личным шедевром</MidCTATitle>
                <MidCTASubtext>Соединяем искусство ручной работы, передовые технологии и неповторимый дизайн.</MidCTASubtext>
              </div>
              <OutlineButton onClick={() => openModal('callback')}>
                Узнать условия сотрудничества <FiArrowRight size={14} />
              </OutlineButton>
            </MidCTA>
          </MidCTAWrap>
        </Container>
      </WhySection>

      {/* ========== 6. MATERIALS ========== */}
      <MaterialsSection>
        <Container>
          <MaterialsGrid>
            <MaterialsText>
              <MaterialsTitle
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Внимательно выбираем материалы для производства
              </MaterialsTitle>
              <BulletList>
                {materials.map((m, i) => (
                  <BulletItem
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <BulletIcon $negative={m.negative}>
                      {m.negative ? <FiCross size={11} /> : <FiCheck size={11} />}
                    </BulletIcon>
                    {m.text}
                  </BulletItem>
                ))}
              </BulletList>
            </MaterialsText>
            <MaterialsImage
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
                alt="Материалы"
              />
            </MaterialsImage>
          </MaterialsGrid>
        </Container>
      </MaterialsSection>

      {/* ========== 7. STEPS ========== */}
      <StepsSection>
        <Container>
          <StepsTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            5 шагов до вашей новой кухни
          </StepsTitle>
          <StepsGrid>
            {steps.map((step, i) => (
              <StepCard
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                viewport={{ once: true }}
              >
                <StepNumber>{i + 1}</StepNumber>
                <StepTitle>{step.title}</StepTitle>
                <StepText>{step.text}</StepText>
              </StepCard>
            ))}
          </StepsGrid>
        </Container>
      </StepsSection>

      {/* ========== 8. BOTTOM CTA ========== */}
      <CTAOuter>
        <CTASection>
          <Container>
            <CTAInner>
              <CTAText>
                <CTAHeading
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Сделайте кухню вашим личным шедевром
                </CTAHeading>
                <CTASubtext>
                  Соединяем передовые технологии и неповторимый дизайн
                </CTASubtext>
              </CTAText>
              <CTARight
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <CTAStatBlock>
                  <CTAStatNum>&infin;</CTAStatNum>
                  <CTAStatLabel>возможностей<br />воплощений</CTAStatLabel>
                </CTAStatBlock>
                <CTAStatBlock>
                  <CTAStatNum>30</CTAStatNum>
                  <CTAStatLabel>дней от заявки<br />до монтажа</CTAStatLabel>
                </CTAStatBlock>
                <CTAButton onClick={() => openModal('callback')}>
                  Обсудить проект
                </CTAButton>
              </CTARight>
            </CTAInner>
          </Container>
        </CTASection>
      </CTAOuter>
    </>
  );
};

export default About;
