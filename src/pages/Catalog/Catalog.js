import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiGrid, FiList, FiSearch, FiEye } from 'react-icons/fi';

const CatalogContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  background: ${props => props.theme.colors.light};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing['2xl']} ${props => props.theme.spacing.md};
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['3xl']};
`;

const PageTitle = styled(motion.h1)`
  font-size: ${props => props.theme.fontSizes['4xl']};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const PageSubtitle = styled(motion.p)`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.gray};
  max-width: 600px;
  margin: 0 auto;
`;

const FiltersSection = styled.div`
  background: white;
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.xl};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  box-shadow: ${props => props.theme.shadows.md};
`;

const FiltersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.lg};
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.md};
`;

const SearchBox = styled.div`
  position: relative;
  flex: 1;
  min-width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.md} ${props => props.theme.spacing.md} 50px;
  border: 2px solid ${props => props.theme.colors.light};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.md};
  transition: ${props => props.theme.transitions.fast};

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${props => props.theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.gray};
  font-size: ${props => props.theme.fontSizes.lg};
`;

const ViewControls = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const ViewButton = styled.button`
  padding: ${props => props.theme.spacing.sm};
  border: 2px solid ${props => props.theme.colors.light};
  background: ${props => props.active ? props.theme.colors.primary : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.gray};
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

const FilterControls = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  flex-wrap: wrap;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const FilterLabel = styled.label`
  font-weight: 500;
  color: ${props => props.theme.colors.dark};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const FilterSelect = styled.select`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.light};
  border-radius: ${props => props.theme.borderRadius.md};
  background: white;
  font-size: ${props => props.theme.fontSizes.sm};
  min-width: 150px;

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: none;
  }
`;

const CatalogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing['2xl']};
`;

const CatalogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const CatalogItem = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.md};
  transition: ${props => props.theme.transitions.normal};
  display: ${props => props.view === 'list' ? 'flex' : 'block'};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const ItemImage = styled.div`
  position: relative;
  height: ${props => props.view === 'list' ? '200px' : '250px'};
  width: ${props => props.view === 'list' ? '300px' : '100%'};
  overflow: hidden;
  flex-shrink: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: ${props => props.theme.transitions.normal};
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: ${props => props.theme.transitions.normal};

  ${CatalogItem}:hover & {
    opacity: 1;
  }
`;

const ViewButtonOverlay = styled.button`
  background: white;
  color: ${props => props.theme.colors.primary};
  border: none;
  padding: ${props => props.theme.spacing.md};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSizes.lg};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    transform: scale(1.1);
  }
`;

const ItemContent = styled.div`
  padding: ${props => props.theme.spacing.xl};
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemTopContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ItemBottomContent = styled.div`
  margin-top: auto;
`;

const ItemTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ItemDescription = styled.p`
  color: ${props => props.theme.colors.gray};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.md};
  flex: 1;
`;

const ItemMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ItemPrice = styled.div`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: 600;
  color: ${props => props.theme.colors.secondary};
`;

const ItemStyle = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.gray};
  background: ${props => props.theme.colors.light};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
`;

const ItemButton = styled.button`
  width: 100%;
  background: ${props => props.theme.colors.gradient};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const Catalog = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    style: '',
    material: '',
    priceRange: ''
  });

  const catalogItems = [
    {
      id: 1,
      title: 'Современная кухня "Минимализм"',
      description: 'Чистые линии, функциональность и стиль. Идеально подходит для современных интерьеров.',
      price: 'от 120 000 ₽',
      style: 'Современный',
      material: 'МДФ',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 2,
      title: 'Классическая кухня "Элегант"',
      description: 'Традиционный стиль с элементами роскоши. Резные фасады и благородные материалы.',
      price: 'от 180 000 ₽',
      style: 'Классический',
      material: 'Массив',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 3,
      title: 'Скандинавская кухня "Север"',
      description: 'Светлые тона, натуральное дерево и максимум света. Создает ощущение простора.',
      price: 'от 100 000 ₽',
      style: 'Скандинавский',
      material: 'МДФ',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 4,
      title: 'Лофт кухня "Индустриал"',
      description: 'Индустриальный стиль с металлическими элементами и грубыми текстурами.',
      price: 'от 150 000 ₽',
      style: 'Лофт',
      material: 'Металл',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 5,
      title: 'Прованс кухня "Франция"',
      description: 'Романтичный стиль с пастельными тонами и винтажными элементами.',
      price: 'от 140 000 ₽',
      style: 'Прованс',
      material: 'МДФ',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 6,
      title: 'Хай-тек кухня "Будущее"',
      description: 'Современные технологии, глянцевые поверхности и встроенная техника.',
      price: 'от 200 000 ₽',
      style: 'Хай-тек',
      material: 'Пластик',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ];

  const filteredItems = catalogItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStyle = !filters.style || item.style === filters.style;
    const matchesMaterial = !filters.material || item.material === filters.material;
    
    return matchesSearch && matchesStyle && matchesMaterial;
  });

  const handleViewKitchen = (kitchen) => {
    navigate(`/kitchen/${kitchen.id}`);
  };

  return (
    <CatalogContainer>
      <Container>
        <PageHeader>
          <PageTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Каталог кухонь
          </PageTitle>
          <PageSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Выберите кухню своей мечты из нашей коллекции
          </PageSubtitle>
        </PageHeader>

        <FiltersSection>
          <FiltersHeader>
            <SearchBox>
              <SearchIcon>
                <FiSearch />
              </SearchIcon>
              <SearchInput
                type="text"
                placeholder="Поиск по каталогу..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBox>
            
            <ViewControls>
              <ViewButton
                active={view === 'grid'}
                onClick={() => setView('grid')}
              >
                <FiGrid />
              </ViewButton>
              <ViewButton
                active={view === 'list'}
                onClick={() => setView('list')}
              >
                <FiList />
              </ViewButton>
            </ViewControls>
          </FiltersHeader>

          <FilterControls>
            <FilterGroup>
              <FilterLabel>Стиль</FilterLabel>
              <FilterSelect
                value={filters.style}
                onChange={(e) => setFilters(prev => ({ ...prev, style: e.target.value }))}
              >
                <option value="">Все стили</option>
                <option value="Современный">Современный</option>
                <option value="Классический">Классический</option>
                <option value="Скандинавский">Скандинавский</option>
                <option value="Лофт">Лофт</option>
                <option value="Прованс">Прованс</option>
                <option value="Хай-тек">Хай-тек</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Материал</FilterLabel>
              <FilterSelect
                value={filters.material}
                onChange={(e) => setFilters(prev => ({ ...prev, material: e.target.value }))}
              >
                <option value="">Все материалы</option>
                <option value="МДФ">МДФ</option>
                <option value="Массив">Массив дерева</option>
                <option value="Металл">Металл</option>
                <option value="Пластик">Пластик</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Цена</FilterLabel>
              <FilterSelect
                value={filters.priceRange}
                onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
              >
                <option value="">Любая цена</option>
                <option value="0-100000">До 100 000 ₽</option>
                <option value="100000-150000">100 000 - 150 000 ₽</option>
                <option value="150000-200000">150 000 - 200 000 ₽</option>
                <option value="200000+">От 200 000 ₽</option>
              </FilterSelect>
            </FilterGroup>
          </FilterControls>
        </FiltersSection>

        {view === 'grid' ? (
          <CatalogGrid>
            {filteredItems.map((item, index) => (
              <CatalogItem
                key={item.id}
                view={view}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ItemImage view={view}>
                  <Image src={item.image} alt={item.title} />
                  <ImageOverlay>
                    <ViewButtonOverlay onClick={() => handleViewKitchen(item)}>
                      <FiEye />
                    </ViewButtonOverlay>
                  </ImageOverlay>
                </ItemImage>
                
                <ItemContent>
                  <ItemTopContent>
                    <ItemTitle>{item.title}</ItemTitle>
                    <ItemDescription>{item.description}</ItemDescription>
                    <ItemMeta>
                      <ItemPrice>{item.price}</ItemPrice>
                      <ItemStyle>{item.style}</ItemStyle>
                    </ItemMeta>
                  </ItemTopContent>
                  <ItemBottomContent>
                    <ItemButton onClick={() => handleViewKitchen(item)}>
                      Подробнее
                    </ItemButton>
                  </ItemBottomContent>
                </ItemContent>
              </CatalogItem>
            ))}
          </CatalogGrid>
        ) : (
          <CatalogList>
            {filteredItems.map((item, index) => (
              <CatalogItem
                key={item.id}
                view={view}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ItemImage view={view}>
                  <Image src={item.image} alt={item.title} />
                  <ImageOverlay>
                    <ViewButtonOverlay onClick={() => handleViewKitchen(item)}>
                      <FiEye />
                    </ViewButtonOverlay>
                  </ImageOverlay>
                </ItemImage>
                
                <ItemContent>
                  <ItemTopContent>
                    <ItemTitle>{item.title}</ItemTitle>
                    <ItemDescription>{item.description}</ItemDescription>
                    <ItemMeta>
                      <ItemPrice>{item.price}</ItemPrice>
                      <ItemStyle>{item.style}</ItemStyle>
                    </ItemMeta>
                  </ItemTopContent>
                  <ItemBottomContent>
                    <ItemButton onClick={() => handleViewKitchen(item)}>
                      Подробнее
                    </ItemButton>
                  </ItemBottomContent>
                </ItemContent>
              </CatalogItem>
            ))}
          </CatalogList>
        )}
      </Container>
    </CatalogContainer>
  );
};

export default Catalog;
