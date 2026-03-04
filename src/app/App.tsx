import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'; // motion/react 대신 표준 framer-motion 사용 (호환성 목적)
import { useState, useEffect, useRef } from 'react';
import { Eye, ArrowRight, X, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const portfolioItems = [
  {
    id: 1,
    title: '회사 브랜드 홈페이지 제작',
    category: 'Web & Publishing',
    description: `
<b>• 브랜드 가치 최우선</b><br />
<span style="font-size: 0.85rem;">복잡함을 덜어내고 기업의 신뢰도와 전문성 시각화에 집중<br />
<br />
<b>• 풀페이지 스토리텔링</b><br />
<span style="font-size: 0.85rem;">[슬로건-제품-인증] 순의 몰입감 있는 스크롤 동선 설계<br />
<br />
<b>• 하이테크 비주얼</b><br />
<span style="font-size: 0.85rem;">와이드 이미지와 볼드 타이포로 선도적 기술 기업 이미지 강조<br />
<br />
<b>• 사용자 중심 레이아웃</b><br />
<span style="font-size: 0.85rem;">여백의 미를 활용한 가독성 확보 및 직관적인 UI 구현
`,
    image: './img/Gemini_Generated_Image_lazkm6lazkm6lazk.png',
    projectUrl: 'https://hellocharger.kr/',
  },
  {
    id: 2,
    title: '회사 홈페이지 리뉴얼',
    category: 'Web & Publishing',
    description: `
<b>• 디자인-개발 일체화</b><br />
<span style="font-size: 0.85rem;">직접 퍼블리싱을 통해 기획 의도를 100% 구현한 완결성 있는 결과물<br />
<br />
<b>• 몰입형 AI 비주얼</b><br />
<span style="font-size: 0.85rem;">AI 제작 영상 배치로 브랜드의 미래지향적 가치와 신뢰도 시각화<br />
<br />
<b>• 사용자 중심 UX 개선</b><br />
<span style="font-size: 0.85rem;">복잡한 모달과 UI 제거를 통한 직관적이고 끊김 없는 흐름 설계<br />
<br />
<b>• 최적화된 시각 경험</b><br />
<span style="font-size: 0.85rem;">코드와의 간극을 좁히는 역량으로 브라우저 환경에 최적화된 UI 유지
`,
    image: './img/Gemini_Generated_Image_d1mdhud1mdhud1md.png',
    projectUrl: 'https://castpro.kr/',
  },
  {
    id: 3,
    title: '브랜드 카탈로그 디자인',
    category: 'Brand & Print',
    image: './img/cover.jpg',
    images: [
      './img/concept.jpg',
      './img/cover.jpg'
    ],
    description: `
<b>• 영업력을 높이는 기술 시각화</b><br />
<span style="font-size: 0.85rem;">복잡한 서버 구조와 기능을 직관적인 아이콘과 단계별 레이아웃으로 재구성하여 기술적 설득력 강화<br />
<br />
<b>• 관리 효율성을 높이는 클린 UI</b><br />
<span style="font-size: 0.85rem;">화이트 중심의 미니멀한 스타일을 적용하여 방대한 데이터 관리의 시각적 피로도를 낮추고 효율성 증대<br />
<br />
<b>• 일관된 브랜드 경험(BX) 설계</b><br />
<span style="font-size: 0.85rem;">하드웨어(충전기)와 소프트웨어(시스템) 간의 디자인 통일성을 구축하여 브랜드의 완성도와 전문성 표출
`,
  },
  {
    id: 4,
    title: '제품 리플렛 디자인',
    category: 'Brand & Print',
    description: `
<b>• 신뢰와 혁신의 시각화</b><br />
<span style="font-size: 0.85rem;">'Trust'와 'Innovation'을 핵심 키워드로 설정하여 하이테크 산업군에 걸맞은 견고하고 세련된 비주얼 아이덴티티 구축<br />
<br />
<b>• 공신력 있는 브랜드 이미지 강화</b><br />
<span style="font-size: 0.85rem;">조달청 혁신제품 및 시범구매 마크를 전면에 강조하여 공공기관 및 B2B 타겟에게 전문성과 브랜드 공신력을 즉각적으로 전달<br />
<br />
<b>• 오프라인 비즈니스 성과 기여</b><br />
<span style="font-size: 0.85rem;">실제 전시회 배포 시 사용자 동선을 고려한 레이아웃 설계로 브랜드 인지도 상승 및 전문적인 기업 이미지 구축에 기여
`,
    image: './img/print1.png',
    images: [
      './img/print2.png',
      './img/print1.png'
    ]
  },
  {
    id: 5,
    title: '전시회 브랜드 부스 그래픽',
    category: 'Brand & Print',
    description: `
<b>• 기술 매커니즘 시각화</b><br />
<span style="font-size: 0.85rem;">난해한 기술 스펙을 직관적인 인포그래픽으로 변환하여 전시 관람객의 이해도 극대화<br />
<br />
<b>• 가독성 기반의 공간 설계</b><br />
<span style="font-size: 0.85rem;">대형 벽면부터 소형 홍보물까지, 실제 현장의 시선 흐름을 고려한 최적의 매체 레이아웃 설계<br />
<br />
<b>• 전략적 부서 협업</b><br />
<span style="font-size: 0.85rem;">마케팅·영업팀의 요구사항을 즉각 반영하여 비즈니스 목적에 부합하는 솔루션 제공 및 성공적인 전시 지원
`,
    image: './img/print3.jpg',
  },
  {
    id: 6,
    title: '상세페이지 디자인',
    category: 'Digital Contents',
    description: `
<b>• 고객 맞춤형 스토리텔링 & 시각화</b><br />
고객의 페인포인트(Pain Point)를 분석하고 해결책을 직관적인 인포그래픽으로 제시하여 구매 전환율 상승 유도<br />
<br />
<b>• 가독성 50% 이상 개선 성과</b><br />
방대한 제품 정보의 위계를 재설계하고 레이아웃을 최적화하여, 기존 대비 압도적인 가독성 향상 달성<br />
<br />

`,
    image: './img/detail_thum.png',
    images: [
      './img/detail_1.jpg',
      './img/detail_2.jpg'
    ],
    isScrollable: true
  },
  {
    id: 7,
    title: '생성형 AI 활용',
    category: 'AI & Visual Art',
    description: `
<b>• 감각과 기술의 완벽한 시너지</b><br />
디자이너의 직관적인 감각에 AI의 압도적인 효율성을 결합하여 최상의 결과물 도출<br />
<br />
<b>• 한계를 뛰어넘는 디자인 시야</b><br />
기술적 장벽에 갇히지 않고 표현의 범위를 확장하는 유연하고 능동적인 작업 태도<br />
<br />
<b>• 고효율 부가가치 창출</b><br />
더 짧은 시간 안에 최고의 퀄리티를 구현하며 비즈니스적 가치를 높이는 스마트 디자인 지향
`,
    image: './img/ai1.jpg',
    images: [
      './img/ai2.jpg',
      './img/ai1.jpg'
    ]
  },
  {
    id: 8,
    title: '비쥬얼 디자인',
    category: 'AI & Visual Art',
    description: `
<b>• 감각적인 소스 발굴 및 브랜드 통합</b><br />
주제에 부합하는 최적의 소스를 선별하는 심미적 안목 발휘<br />
<br />
<b>• 톤앤매너(Tone & Manner) 일치화</b><br />
각기 다른 환경에서 촬영/제작된 소스들을 하나의 브랜드 감성으로 자연스럽게 묶어내는 시각적 조율<br />
<br />
<b>• 이질감 없는 디테일 합성</b><br />
정밀한 누끼 작업과 색채 보정을 통해 제품과 배경을 완벽하게 융합하여 최상의 비주얼 퀄리티 도출
`,
    image: './img/visual1.jpg',
    images: [
      './img/visual2.jpg',
      './img/visual3.jpg',
      './img/visual4.jpg',
      './img/visual1.jpg'
    ]
  },
  {
    id: 9,
    title: '카드 콘텐츠 디자인_1',
    category: 'Digital Contents',
description: `
<b>• 주도적인 시즌 타겟팅 콘텐츠 기획</b><br />
가이드에 의존하는 수동적 작업에서 벗어나, 여름 휴가나 장마철 등 시즌 이슈와 제품의 강점을 결합한 스토리텔링 직접 기획<br />
<br />
<b>• 매체 최적화 및 레이아웃 베리에이션(Variation)</b><br />
인스타그램, 웹 배너 등 각 플랫폼의 특성과 이미지 규격에 맞춰 디자인을 유연하게 변주하는 다매체 대응 역량 발휘<br />
<br />
<b>• 메시지 전달력과 가독성 극대화</b><br />
사용자의 시선 흐름을 돕는 타이포그래피와 직관적인 정보 배치를 통해 브랜드가 전하고자 하는 핵심 메시지를 명확하게 각인
`,
    image: './img/card1 (1).jpg',
    images: [
      './img/card1 (1).jpg',
      './img/card1 (2).jpg',
      './img/card1 (3).jpg',
      './img/card1 (4).jpg',
      './img/card1 (5).jpg',
      './img/card1 (6).jpg',
      './img/card1 (7).jpg',
      './img/card1 (8).jpg',
      './img/card1 (9).jpg'
    ]
  },
  {
    id: 10,
    title: '카드 콘텐츠 디자인_2',
    category: 'Digital Contents',
description: `
<b>• 주도적인 시즌 타겟팅 콘텐츠 기획</b><br />
가이드에 의존하는 수동적 작업에서 벗어나, 여름 휴가나 장마철 등 시즌 이슈와 제품의 강점을 결합한 스토리텔링 직접 기획<br />
<br />
<b>• 매체 최적화 및 레이아웃 베리에이션(Variation)</b><br />
인스타그램, 웹 배너 등 각 플랫폼의 특성과 이미지 규격에 맞춰 디자인을 유연하게 변주하는 다매체 대응 역량 발휘<br />
<br />
<b>• 메시지 전달력과 가독성 극대화</b><br />
사용자의 시선 흐름을 돕는 타이포그래피와 직관적인 정보 배치를 통해 브랜드가 전하고자 하는 핵심 메시지를 명확하게 각인
`,
    image: './img/card2 (1).jpg',
    images: [
      './img/card2 (1).jpg',
      './img/card2 (2).jpg',
      './img/card2 (3).jpg',
      './img/card2 (4).jpg',
      './img/card2 (5).jpg',
      './img/card2 (6).jpg'
    ]
    },
  {
    id: 11,
    title: '카드 콘텐츠 디자인_3',
    category: 'Digital Contents',
description: `
<b>• 주도적인 시즌 타겟팅 콘텐츠 기획</b><br />
가이드에 의존하는 수동적 작업에서 벗어나, 여름 휴가나 장마철 등 시즌 이슈와 제품의 강점을 결합한 스토리텔링 직접 기획<br />
<br />
<b>• 매체 최적화 및 레이아웃 베리에이션(Variation)</b><br />
인스타그램, 웹 배너 등 각 플랫폼의 특성과 이미지 규격에 맞춰 디자인을 유연하게 변주하는 다매체 대응 역량 발휘<br />
<br />
<b>• 메시지 전달력과 가독성 극대화</b><br />
사용자의 시선 흐름을 돕는 타이포그래피와 직관적인 정보 배치를 통해 브랜드가 전하고자 하는 핵심 메시지를 명확하게 각인
`,
    image: './img/card3 (1).jpg',
    images: [
      './img/card3 (1).jpg',
      './img/card3 (2).jpg',
      './img/card3 (3).jpg',
      './img/card3 (4).jpg',
      './img/card3 (5).jpg',
      './img/card3 (6).jpg'
    ]
    },
];

const categories = [
  'All',
  'Web & Publishing',
  'Brand & Print',
  'Digital Contents',
  'AI & Visual Art'
];

function App() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 300], [0, -50]);
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  const filteredItems = selectedCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  const displayedItems = showAll ? filteredItems : filteredItems.slice(0, 6);
  const hasMore = filteredItems.length > 6;

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedItem]);

  const handleOpenModal = (item: typeof portfolioItems[0]) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  // 슬라이드 화살표 기능 (다음)
  const nextImg = (e: React.MouseEvent, images: string[]) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  // 슬라이드 화살표 기능 (이전)
  const prevImg = (e: React.MouseEvent, images: string[]) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with Parallax */}
      <motion.header
        ref={headerRef}
        style={{ y: headerY, opacity: headerOpacity }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-12"
      >
        <motion.h1
          className="text-center mb-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Creative Portfolio
        </motion.h1>
        <motion.p
          className="text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          mill 작업물 컬렉션
        </motion.p>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mt-8"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setShowAll(false);
              }}
              className={`px-5 py-2 rounded-full text-sm transition-all ${selectedCategory === category
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </motion.header>

      {/* Portfolio Grid */}
      <main className="container mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleOpenModal(item)}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>

              {/* Overlay (개선된 버전) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === item.id ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col justify-center items-center p-6 text-center"
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{
                    y: hoveredId === item.id ? 0 : 20,
                    opacity: hoveredId === item.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="flex flex-col items-center gap-3"
                >
                  <span className="px-3 py-1 bg-blue-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-white text-xl font-bold leading-tight">
                    {item.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full font-bold text-sm shadow-xl transform transition-transform hover:scale-105">
                    <Eye className="w-4 h-4" />
                    <span>자세히 보기</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Border Animation */}
              <motion.div
                className="absolute inset-0 border-2 border-transparent rounded-2xl pointer-events-none"
                animate={{
                  borderColor:
                    hoveredId === item.id
                      ? 'rgba(59, 130, 246, 0.5)'
                      : 'transparent',
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Info Bar */}
              <div className="p-4 bg-white">
                <motion.p
                  className="text-sm text-gray-500"
                  animate={{
                    color: hoveredId === item.id ? '#3b82f6' : '#6b7280',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.category}
                </motion.p>
                <motion.h3
                  className="text-lg mt-1"
                  animate={{
                    x: hoveredId === item.id ? 4 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.title}
                </motion.h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && !showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mt-12"
          >
            <motion.button
              onClick={() => setShowAll(true)}
              className="group flex items-center gap-3 px-8 py-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-gray-700">더 많은 작업물 보기</span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown className="w-5 h-5 text-blue-500" />
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </main>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={() => setSelectedItem(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 z-30 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg cursor-pointer"
              >
                <X className="w-6 h-6 text-gray-700" />
              </motion.button>

              {/* Modal Content */}
              <div className="grid md:grid-cols-2 gap-0">

                {/* Image Section with Slider (세로 스크롤 허용 버전) */}
                <div className="relative aspect-square bg-gray-100 group overflow-hidden">
                  {(() => {
                    const images = selectedItem.images || [selectedItem.image];
                    return (
                      <>
                        {/* 스크롤이 생기는 실제 이미지 영역 */}
                        <div className="absolute inset-0 overflow-y-auto overflow-x-hidden custom-scrollbar">
                          <AnimatePresence mode="wait">
                            <motion.img
                              key={currentImageIndex}
                              src={images[currentImageIndex]}
                              alt={selectedItem.title}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              /* 핵심 포인트: h-auto와 object-top으로 긴 이미지가 위에서부터 자연스럽게 떨어지도록 설정 */
                              className="w-full h-auto min-h-full object-cover object-top"
                            />
                          </AnimatePresence>
                        </div>

                        {/* 스크롤하여 상세보기 안내 */}
                        {selectedItem.isScrollable && (
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 flex flex-col items-center justify-center bg-black/60 text-white px-4 py-2 rounded-full pointer-events-none z-30 transition-opacity duration-300 group-hover:opacity-0">
                            <span className="text-xs font-bold tracking-wide mb-1">스크롤하여 상세 보기</span>
                            <ChevronDown className="w-4 h-4 animate-bounce" />
                          </div>
                        )}

                        {/* 슬라이드 버튼 (스크롤해도 항상 가운데에 고정됨) */}
                        {images.length > 1 && (
                          <>
                            <button
                              onClick={(e) => prevImg(e, images)}
                              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 shadow-md rounded-full cursor-pointer z-20 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <ChevronLeft className="w-6 h-6 text-gray-700" />
                            </button>
                            <button
                              onClick={(e) => nextImg(e, images)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 shadow-md rounded-full cursor-pointer z-20 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <ChevronRight className="w-6 h-6 text-gray-700" />
                            </button>

                            {/* 하단 인디케이터 */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                              {images.map((_, idx) => (
                                <div
                                  key={idx}
                                  className={`w-1.5 h-1.5 rounded-full shadow-sm transition-all ${idx === currentImageIndex ? 'bg-blue-500 w-4' : 'bg-white/80'
                                    }`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </>
                    );
                  })()}
                </div>

                {/* Info */}
                <div className="p-8 flex flex-col justify-center">
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-bold mb-4">
                      {selectedItem.category}
                    </span>
                    <h2 className="text-3xl font-bold mb-4">{selectedItem.title}</h2>
                    <p
                      className="portfolio-description text-gray-600 leading-relaxed mb-6"
                      dangerouslySetInnerHTML={{ __html: selectedItem.description }}
                    />

                    {/* id가 1 또는 2일 때만 버튼을 보여줍니다 */}
                    {[1, 2].includes(selectedItem.id) && (
                      selectedItem.projectUrl ? (
                        <motion.a
                          href={selectedItem.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-block px-6 py-3 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition-colors cursor-pointer w-fit"
                        >
                          프로젝트 보기
                        </motion.a>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-block px-6 py-3 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition-colors cursor-pointer w-fit"
                        >
                          프로젝트 보기
                        </motion.button>
                      )
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Elements for Visual Interest */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-40 left-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, 60, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  );
}

export default App;
