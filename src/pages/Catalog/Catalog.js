import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiSearch, FiArrowRight, FiChevronDown, FiArrowUpRight } from 'react-icons/fi';
import { useCatalog } from '../../context/CatalogContext';
import { useModal } from '../../hooks/useModal';
import { resolveCatalogImageSrc } from '../../utils/imageUrl';
import Seo from '../../components/Seo';

const Page = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  background: ${p => p.theme.colors.white};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding-top: 64px;
  }
`;

const HeroOuter = styled.div`
  padding: 0 ${p => p.theme.spacing.xl};
  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 0 8px;
  }
`;

const HeroBanner = styled.section`
  background: ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.white};
  border-radius: 24px;
  overflow: hidden;
  padding: ${p => p.theme.spacing['4xl']} ${p => p.theme.spacing.xl};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    border-radius: 16px;
    padding: ${p => p.theme.spacing['2xl']} ${p => p.theme.spacing.lg};
  }
`;

const HeroOverline = styled(motion.div)`
  font-size: ${p => p.theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: ${p => p.theme.spacing.md};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 10px;
    letter-spacing: 0.16em;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['5xl']};
  font-weight: 400;
  letter-spacing: -0.03em;
  margin-bottom: ${p => p.theme.spacing.md};
  max-width: 880px;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes['2xl']};
    margin-bottom: ${p => p.theme.spacing.sm};
  }
`;

const HeroText = styled(motion.p)`
  font-size: ${p => p.theme.fontSizes.lg};
  color: rgba(255, 255, 255, 0.7);
  max-width: 760px;
  line-height: 1.6;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes.sm};
    line-height: 1.5;
  }
`;

const AwardsRow = styled.div`
  margin-top: ${p => p.theme.spacing.xl};
  display: flex;
  flex-wrap: wrap;
  gap: ${p => p.theme.spacing.sm};
`;

const AwardChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 10px 14px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  font-size: ${p => p.theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.08em;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 8px 12px;
    font-size: 10px;
  }
`;

const ContentWrap = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${p => p.theme.spacing['2xl']} ${p => p.theme.spacing.xl} ${p => p.theme.spacing['4xl']};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: ${p => p.theme.spacing.xl} 8px ${p => p.theme.spacing['2xl']};
  }
`;

const TabsRow = styled.div`
  display: flex;
  gap: ${p => p.theme.spacing.sm};
  overflow-x: auto;
  scrollbar-width: none;
  margin-bottom: ${p => p.theme.spacing.xl};
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    gap: 6px;
    margin-bottom: ${p => p.theme.spacing.lg};
  }
`;

const Tab = styled.button`
  border: 1px solid ${p => (p.$active ? p.theme.colors.primary : p.theme.colors.border)};
  background: ${p => (p.$active ? p.theme.colors.primary : p.theme.colors.white)};
  color: ${p => (p.$active ? p.theme.colors.white : p.theme.colors.primary)};
  padding: ${p => p.theme.spacing.sm} ${p => p.theme.spacing.lg};
  font-size: ${p => p.theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;
  cursor: pointer;
  transition: ${p => p.theme.transitions.fast};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: ${p => p.theme.spacing.sm} ${p => p.theme.spacing.md};
    font-size: 10px;
  }
`;

const ToolBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${p => p.theme.spacing.md};
  border-bottom: 1px solid ${p => p.theme.colors.border};
  padding-bottom: ${p => p.theme.spacing.lg};
  margin-bottom: ${p => p.theme.spacing['2xl']};
  flex-wrap: wrap;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    gap: ${p => p.theme.spacing.sm};
    padding-bottom: ${p => p.theme.spacing.md};
    margin-bottom: ${p => p.theme.spacing.xl};
  }
`;

const SearchBox = styled.label`
  position: relative;
  flex: 1;
  min-width: 260px;
  max-width: 420px;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    min-width: 100%;
    max-width: 100%;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: ${p => p.theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${p => p.theme.colors.gray};
  display: flex;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${p => p.theme.spacing.md} ${p => p.theme.spacing.md} ${p => p.theme.spacing.md} 42px;
  border: 1px solid ${p => p.theme.colors.border};
  font-size: ${p => p.theme.fontSizes.sm};
  transition: ${p => p.theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${p => p.theme.colors.primary};
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 13px;
    padding: ${p => p.theme.spacing.sm} ${p => p.theme.spacing.sm} ${p => p.theme.spacing.sm} 38px;
  }
`;

const Count = styled.div`
  margin-left: auto;
  font-size: ${p => p.theme.fontSizes.sm};
  color: ${p => p.theme.colors.gray};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 12px;
    width: 100%;
    margin-left: 0;
  }
`;

const MosaicGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: ${p => p.theme.spacing.md};
  margin-bottom: ${p => p.theme.spacing['3xl']};

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${p => p.theme.spacing.sm};
  }
`;

const MosaicCard = styled(motion.button)`
  position: relative;
  border: none;
  cursor: pointer;
  overflow: hidden;
  border-radius: 18px;
  min-height: ${p => (p.$large ? '420px' : '260px')};
  text-align: left;
  padding: 0;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    min-height: 240px;
    border-radius: 14px;
  }
`;

const MosaicImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;

  ${MosaicCard}:hover & {
    transform: scale(1.05);
  }
`;

const MosaicOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.15) 55%, transparent 100%);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: ${p => p.theme.spacing.lg};
  color: #fff;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: ${p => p.theme.spacing.md};
  }
`;

const MosaicTitle = styled.span`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['2xl']};
  line-height: 1.1;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes.lg};
  }
`;

const BrandSection = styled.section`
  margin-bottom: ${p => p.theme.spacing['3xl']};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 18px;
  padding: ${p => p.theme.spacing.xl};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    border-radius: 14px;
    padding: ${p => p.theme.spacing.lg};
    margin-bottom: ${p => p.theme.spacing.xl};
  }
`;

const CategoryHeading = styled.h2`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['3xl']};
  font-weight: 400;
  margin: 0 0 ${p => p.theme.spacing.lg};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes.xl};
    margin-bottom: ${p => p.theme.spacing.md};
  }
`;

const BrandHeader = styled.button`
  width: 100%;
  background: transparent;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0 0 ${p => p.theme.spacing.lg};
  color: ${p => p.theme.colors.primary};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 0 0 ${p => p.theme.spacing.md};
  }
`;

const BrandName = styled.h3`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['2xl']};
  font-weight: 400;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes.lg};
  }
`;

const ChevronIcon = styled(motion.span)`
  color: ${p => p.theme.colors.gray};
  display: flex;
`;

const SubName = styled.div`
  font-size: ${p => p.theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${p => p.theme.colors.gray};
  margin-bottom: ${p => p.theme.spacing.md};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 10px;
    margin-bottom: ${p => p.theme.spacing.sm};
  }
`;

// Use multiple mosaic combinations:
// - 2 large + 4 small
// - 1 large left + 2 small
// - 2 small + 1 large right
const MOSAIC_SPANS = [6, 6, 3, 3, 3, 3, 6, 3, 3, 3, 3, 6, 6, 3, 3, 3, 3, 6];
const getMosaicSpan = (index) => MOSAIC_SPANS[index % MOSAIC_SPANS.length];

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: ${p => p.theme.spacing.md};
  margin-bottom: ${p => p.theme.spacing.lg};

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.article)`
  ${p => {
    const span = getMosaicSpan(p.$mosaicIndex);
    return `grid-column: span ${span};`;
  }}
  cursor: pointer;
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid ${p => p.theme.colors.border};
  background: ${p => p.theme.colors.white};
  transition: ${p => p.theme.transitions.normal};

  &:hover {
    border-color: ${p => p.theme.colors.primary};
    transform: translateY(-2px);
  }

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    ${p => {
      const span = getMosaicSpan(p.$mosaicIndex);
      return `grid-column: span ${span};`;
    }}
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    grid-column: span 1;
  }
`;

const CardMedia = styled.div`
  position: relative;
  aspect-ratio: ${p => (p.$isLarge ? '16 / 10' : '4 / 3')};
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;

  ${Card}:hover & {
    transform: scale(1.04);
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: ${p => p.theme.spacing.md};
  background: linear-gradient(to top, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.08) 45%, transparent 100%);
  opacity: 0;
  transition: ${p => p.theme.transitions.fast};

  ${Card}:hover & {
    opacity: 1;
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    opacity: 1;
  }
`;

const CircleArrow = styled.span`
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.95);
  color: ${p => p.theme.colors.primary};
  display: inline-flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    width: 32px;
    height: 32px;
  }
`;

const CardBody = styled.div`
  padding: ${p => p.theme.spacing.md};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: ${p => p.theme.spacing.sm};
  }
`;

const CardLabel = styled.div`
  font-size: ${p => p.theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${p => p.theme.colors.gray};
  margin-bottom: 6px;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 10px;
    margin-bottom: 4px;
  }
`;

const CardTitle = styled.h4`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes.xl};
  font-weight: 400;
  margin-bottom: 6px;
  color: ${p => p.theme.colors.primary};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes.md};
    margin-bottom: 4px;
  }
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardPrice = styled.div`
  font-size: ${p => p.theme.fontSizes.sm};
  font-weight: 500;
  color: ${p => p.theme.colors.grayDark};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 13px;
  }
`;

const CardSource = styled.div`
  font-size: ${p => p.theme.fontSizes.xs};
  color: ${p => p.theme.colors.gray};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 10px;
  }
`;

const DarkCta = styled.section`
  margin-top: ${p => p.theme.spacing['3xl']};
  background: ${p => p.theme.colors.primary};
  color: #fff;
  border-radius: 22px;
  padding: ${p => p.theme.spacing['2xl']};
  display: flex;
  gap: ${p => p.theme.spacing.lg};
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    border-radius: 16px;
    padding: ${p => p.theme.spacing.xl};
    margin-top: ${p => p.theme.spacing.xl};
    text-align: center;
    flex-direction: column;
  }
`;

const CtaTextWrap = styled.div``;
const CtaTitle = styled.h3`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['2xl']};
  font-weight: 400;
  margin-bottom: 8px;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes.lg};
    margin-bottom: 6px;
  }
`;
const CtaText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: ${p => p.theme.fontSizes.sm};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 13px;
  }
`;

const CtaButton = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: ${p => p.theme.spacing.md} ${p => p.theme.spacing.lg};
  display: inline-flex;
  align-items: center;
  gap: ${p => p.theme.spacing.sm};
  font-size: ${p => p.theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  cursor: pointer;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: center;
    font-size: 11px;
    padding: ${p => p.theme.spacing.lg};
  }
`;

const Empty = styled.div`
  text-align: center;
  color: ${p => p.theme.colors.gray};
  font-size: ${p => p.theme.fontSizes.md};
  padding: ${p => p.theme.spacing['3xl']} 0;
`;

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${p => p.theme.spacing.sm};
  margin-bottom: ${p => p.theme.spacing.xl};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    margin-bottom: ${p => p.theme.spacing.lg};
  }
`;

const FilterLabel = styled.span`
  font-size: ${p => p.theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${p => p.theme.colors.gray};
  width: 100%;
  margin-bottom: 4px;

  @media (min-width: ${p => p.theme.breakpoints.mobile}) {
    width: auto;
    margin-bottom: 0;
    margin-right: ${p => p.theme.spacing.sm};
  }
`;

const FilterChip = styled.button`
  border: 1px solid ${p => (p.$active ? p.theme.colors.primary : p.theme.colors.border)};
  background: ${p => (p.$active ? p.theme.colors.primary : p.theme.colors.white)};
  color: ${p => (p.$active ? p.theme.colors.white : p.theme.colors.primary)};
  padding: 8px 14px;
  font-size: ${p => p.theme.fontSizes.xs};
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: ${p => p.theme.transitions.fast};
  white-space: nowrap;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 7px 12px;
    font-size: 11px;
  }
`;

const SeeAllRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${p => p.theme.spacing.md};
  padding-bottom: ${p => p.theme.spacing.sm};
`;

const SeeAllButton = styled.button`
  border: 1px solid ${p => p.theme.colors.primary};
  background: transparent;
  color: ${p => p.theme.colors.primary};
  padding: ${p => p.theme.spacing.sm} ${p => p.theme.spacing.xl};
  font-size: ${p => p.theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: ${p => p.theme.transitions.fast};
  display: inline-flex;
  align-items: center;
  gap: ${p => p.theme.spacing.sm};

  &:hover {
    background: ${p => p.theme.colors.primary};
    color: ${p => p.theme.colors.white};
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: center;
    padding: ${p => p.theme.spacing.md};
  }
`;

/** Сколько карточек показывать в превью бренда до «Смотреть все». */
const BRAND_PREVIEW_LIMIT = 6;

function brandKey(catId, brandId) {
  return `${catId}::${brandId}`;
}

function collectBrandEntries(brand, filterProducts, catId, subFilterKeys = []) {
  const entries = [];
  brand.subcategories.forEach(sub => {
    const subKey = `${catId}::${brand.id}::${sub.id}`;
    if (subFilterKeys.length > 0 && !subFilterKeys.includes(subKey)) return;
    filterProducts(sub.products).forEach(product => {
      entries.push({ product, sub });
    });
  });
  return entries;
}

/** Упорядоченные куски превью с заголовками подкатегорий при необходимости. */
function previewChunks(entries, limit, brand) {
  const slice = entries.slice(0, limit);
  if (brand.subcategories.length <= 1) {
    return [{ sub: null, products: slice.map(e => e.product) }];
  }
  const chunks = [];
  slice.forEach(e => {
    const last = chunks[chunks.length - 1];
    if (!last || last.sub.id !== e.sub.id) {
      chunks.push({ sub: e.sub, products: [e.product] });
    } else {
      last.products.push(e.product);
    }
  });
  return chunks;
}

const Catalog = () => {
  const navigate = useNavigate();
  const { categories } = useCatalog();
  const { openModal } = useModal();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [search, setSearch] = useState('');
  const [openBrands, setOpenBrands] = useState({});
  /** Развёрнут полный список товаров бренда (иначе — превью). */
  const [brandShowAll, setBrandShowAll] = useState({});
  /** Пустой массив — все бренды; иначе только выбранные ключи `catId::brandId`. */
  const [brandFilterKeys, setBrandFilterKeys] = useState([]);
  /** Пустой массив — все разделы; ключи `catId::brandId::subId`. */
  const [subFilterKeys, setSubFilterKeys] = useState([]);

  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'all');
  }, [searchParams]);

  useEffect(() => {
    setBrandFilterKeys([]);
    setSubFilterKeys([]);
  }, [activeCategory]);

  const handleTabClick = (categoryId) => {
    if (categoryId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: categoryId });
    }
  };

  const visibleCategories = useMemo(() => {
    if (activeCategory === 'all') return categories;
    return categories.filter(cat => cat.id === activeCategory);
  }, [activeCategory, categories]);

  const filterProducts = (products) => {
    const query = search.trim().toLowerCase();
    if (!query) return products;
    return products.filter(product => (
      product.name.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query))
    ));
  };

  const toggleBrandFilter = (key) => {
    setBrandFilterKeys(prev => (prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]));
  };

  const toggleSubFilter = (key) => {
    setSubFilterKeys(prev => (prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]));
  };

  const brandFilterOptions = useMemo(() => {
    const opts = [];
    visibleCategories.forEach(cat => {
      cat.brands.forEach(brand => {
        const entries = collectBrandEntries(brand, filterProducts, cat.id, subFilterKeys);
        if (entries.length === 0) return;
        opts.push({
          key: brandKey(cat.id, brand.id),
          label: activeCategory === 'all' ? `${brand.name} · ${cat.name}` : brand.name,
          count: entries.length,
        });
      });
    });
    return opts;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleCategories, search, activeCategory, subFilterKeys]);

  const subFilterOptions = useMemo(() => {
    if (activeCategory === 'all') return [];
    const opts = [];
    visibleCategories.forEach(cat => {
      const brandsInCat = cat.brands.filter(b =>
        collectBrandEntries(b, filterProducts, cat.id, []).length > 0
      );
      const singleBrand = brandsInCat.length <= 1;
      cat.brands.forEach(brand => {
        const bk = brandKey(cat.id, brand.id);
        if (brandFilterKeys.length > 0 && !brandFilterKeys.includes(bk)) return;
        brand.subcategories.forEach(sub => {
          const n = filterProducts(sub.products).length;
          if (n === 0) return;
          const key = `${cat.id}::${brand.id}::${sub.id}`;
          opts.push({
            key,
            label: singleBrand ? sub.name : `${brand.name} — ${sub.name}`,
            count: n,
          });
        });
      });
    });
    return opts;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleCategories, search, activeCategory, brandFilterKeys]);

  const totalCount = useMemo(() => {
    let count = 0;
    visibleCategories.forEach(cat => {
      cat.brands.forEach(brand => {
        const k = brandKey(cat.id, brand.id);
        if (brandFilterKeys.length > 0 && !brandFilterKeys.includes(k)) return;
        count += collectBrandEntries(brand, filterProducts, cat.id, subFilterKeys).length;
      });
    });
    return count;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleCategories, search, brandFilterKeys, subFilterKeys]);

  const activeCategoryName = activeCategory === 'all'
    ? 'Каталог мебели'
    : categories.find(cat => cat.id === activeCategory)?.name || 'Каталог мебели';

  const shouldShowMosaic = activeCategory === 'all' && !search.trim();

  const getCountWord = (n) => {
    if (n % 10 === 1 && n % 100 !== 11) return 'товар';
    if (n % 10 >= 2 && n % 10 <= 4 && !(n % 100 >= 12 && n % 100 <= 14)) return 'товара';
    return 'товаров';
  };

  return (
    <Page>
      <Seo
        title="Каталог"
        description={`${activeCategoryName}: кухни и мебель премиум-класса. Подбор по категориям и брендам, индивидуальные проекты в Саратове.`}
        path="/catalog"
      />
      <HeroOuter>
        <HeroBanner>
          <HeroOverline
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            Коллекция
          </HeroOverline>
          <HeroTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            {activeCategoryName}
          </HeroTitle>
          <HeroText
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            Премиальные интерьеры: кухни, гардеробные, шкафы, комоды, столы и стулья.
          </HeroText>
          <AwardsRow>
            <AwardChip>Сделано в России</AwardChip>
            <AwardChip>Индивидуальные проекты</AwardChip>
            <AwardChip>Премиум материалы</AwardChip>
          </AwardsRow>
        </HeroBanner>
      </HeroOuter>

      <ContentWrap>
        <TabsRow>
          <Tab $active={activeCategory === 'all'} onClick={() => handleTabClick('all')}>
            Все
          </Tab>
          {categories.map(cat => (
            <Tab key={cat.id} $active={activeCategory === cat.id} onClick={() => handleTabClick(cat.id)}>
              {cat.name}
            </Tab>
          ))}
        </TabsRow>

        <ToolBar>
          <SearchBox>
            <SearchIcon><FiSearch size={16} /></SearchIcon>
            <SearchInput
              placeholder="Поиск по каталогу..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchBox>
          <Count>{totalCount} {getCountWord(totalCount)}</Count>
        </ToolBar>

        {!shouldShowMosaic && brandFilterOptions.length > 1 && (
          <FilterRow>
            <FilterLabel>Бренды</FilterLabel>
            <FilterChip
              type="button"
              $active={brandFilterKeys.length === 0}
              onClick={() => setBrandFilterKeys([])}
            >
              Все
            </FilterChip>
            {brandFilterOptions.map(opt => (
              <FilterChip
                key={opt.key}
                type="button"
                $active={brandFilterKeys.includes(opt.key)}
                onClick={() => toggleBrandFilter(opt.key)}
              >
                {opt.label}
                <span style={{ opacity: 0.65 }}> ({opt.count})</span>
              </FilterChip>
            ))}
          </FilterRow>
        )}

        {!shouldShowMosaic && subFilterOptions.length > 1 && (
          <FilterRow>
            <FilterLabel>Разделы</FilterLabel>
            <FilterChip
              type="button"
              $active={subFilterKeys.length === 0}
              onClick={() => setSubFilterKeys([])}
            >
              Все
            </FilterChip>
            {subFilterOptions.map(opt => (
              <FilterChip
                key={opt.key}
                type="button"
                $active={subFilterKeys.includes(opt.key)}
                onClick={() => toggleSubFilter(opt.key)}
              >
                {opt.label}
                <span style={{ opacity: 0.65 }}> ({opt.count})</span>
              </FilterChip>
            ))}
          </FilterRow>
        )}

        {shouldShowMosaic && (
          <MosaicGrid>
            {categories.map((cat, idx) => (
              <MosaicCard
                key={cat.id}
                $large={idx === 0}
                onClick={() => handleTabClick(cat.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <MosaicImage src={resolveCatalogImageSrc(cat.image)} alt={cat.name} />
                <MosaicOverlay>
                  <MosaicTitle>{cat.name}</MosaicTitle>
                  <FiArrowUpRight size={24} />
                </MosaicOverlay>
              </MosaicCard>
            ))}
          </MosaicGrid>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${search}-${brandFilterKeys.slice().sort().join(',')}-${subFilterKeys.slice().sort().join(',')}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {visibleCategories.map(cat => (
              <div key={cat.id}>
                {activeCategory === 'all' && <CategoryHeading>{cat.name}</CategoryHeading>}

                {cat.brands.map(brand => {
                  const sectionKey = `${cat.id}-${brand.id}`;
                  const filterK = brandKey(cat.id, brand.id);
                  if (brandFilterKeys.length > 0 && !brandFilterKeys.includes(filterK)) return null;

                  const entries = collectBrandEntries(brand, filterProducts, cat.id, subFilterKeys);
                  if (entries.length === 0) return null;

                  const isOpen = openBrands[sectionKey] !== false;
                  const showFullList = brandShowAll[sectionKey] === true;
                  const hasMoreThanPreview = entries.length > BRAND_PREVIEW_LIMIT;
                  const previewLimit = showFullList ? entries.length : Math.min(BRAND_PREVIEW_LIMIT, entries.length);
                  const chunks = previewChunks(entries, previewLimit, brand);

                  return (
                    <BrandSection key={sectionKey}>
                      <BrandHeader type="button" onClick={() => setOpenBrands(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }))}>
                        <BrandName>{brand.name}</BrandName>
                        <ChevronIcon animate={{ rotate: isOpen ? 180 : 0 }}>
                          <FiChevronDown size={20} />
                        </ChevronIcon>
                      </BrandHeader>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ overflow: 'hidden' }}
                          >
                            {(() => {
                              let mosaicIdx = 0;
                              return chunks.map(chunk => (
                                <div key={chunk.sub?.id || 'single'}>
                                  {chunk.sub && brand.subcategories.length > 1 && <SubName>{chunk.sub.name}</SubName>}
                                  <Grid>
                                    {chunk.products.map(product => {
                                      const idx = mosaicIdx++;
                                      return (
                                        <Card
                                          key={product.id}
                                          $mosaicIndex={idx}
                                          onClick={() => navigate(`/product/${product.id}`)}
                                          initial={{ opacity: 0, y: 14 }}
                                          whileInView={{ opacity: 1, y: 0 }}
                                          transition={{ duration: 0.35, delay: Math.min(idx * 0.03, 0.2) }}
                                          viewport={{ once: true }}
                                        >
                                          <CardMedia $isLarge={getMosaicSpan(idx) === 6}>
                                            <CardImage src={resolveCatalogImageSrc(product.image)} alt={product.name} loading="lazy" />
                                            <CardOverlay>
                                              <CircleArrow><FiArrowRight size={16} /></CircleArrow>
                                            </CardOverlay>
                                          </CardMedia>
                                          <CardBody>
                                            <CardLabel>{brand.name}</CardLabel>
                                            <CardTitle>{product.name}</CardTitle>
                                            <CardMeta>
                                              <CardPrice>{product.price}</CardPrice>
                                              <CardSource>{product.source}</CardSource>
                                            </CardMeta>
                                          </CardBody>
                                        </Card>
                                      );
                                    })}
                                  </Grid>
                                </div>
                              ));
                            })()}
                            {hasMoreThanPreview && (
                              <SeeAllRow>
                                <SeeAllButton
                                  type="button"
                                  onClick={() => setBrandShowAll(prev => ({ ...prev, [sectionKey]: !showFullList }))}
                                >
                                  {showFullList ? (
                                    <>Свернуть</>
                                  ) : (
                                    <>
                                      Смотреть все
                                      <FiArrowRight size={14} />
                                    </>
                                  )}
                                </SeeAllButton>
                              </SeeAllRow>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </BrandSection>
                  );
                })}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {!totalCount && <Empty>Ничего не найдено. Попробуйте изменить поисковый запрос.</Empty>}

        <DarkCta>
          <CtaTextWrap>
            <CtaTitle>Запросите расчет стоимости мебели</CtaTitle>
            <CtaText>Подберем материалы, стилистику и комплектацию под ваш интерьер.</CtaText>
          </CtaTextWrap>
          <CtaButton type="button" onClick={() => openModal('callback')}>
            Узнать стоимость <FiArrowRight size={14} />
          </CtaButton>
        </DarkCta>
      </ContentWrap>
    </Page>
  );
};

export default Catalog;
