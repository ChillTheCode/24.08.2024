import React, { useState, useEffect, useCallback } from 'react';
import { Heart, Star, Camera, Play, Clock, ChevronRight, ChevronLeft } from 'lucide-react';

// Type definitions
interface PhotoCaptions {
  [key: number]: string;
}

const HomeTest = () => {
  const [currentMainSlide, setCurrentMainSlide] = useState<number>(0); // 0 = letter, 1 = photos
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [heartBgLoaded, setHeartBgLoaded] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentPhotoSlide, setCurrentPhotoSlide] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
   
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Page load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Preload heart background
  useEffect(() => {
    const img = new Image();
    img.onload = () => setHeartBgLoaded(true);
    img.onerror = () => setHeartBgLoaded(false);
    img.src = 'heart.png';
  }, []);

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set([...prev, index]));
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set([...prev, index]));
  };

  // Navigate to photo section
  const goToPhotoSlide = () => {
    setCurrentMainSlide(1);
  };

  // Go back to letter
  const goToLetter = () => {
    setCurrentMainSlide(0);
  };

  // Updated photo collection for slideshow
  const photoGrid = Array.from({ length: 8 }, (_, i) => i + 1);

  // Enhanced photo captions with romantic descriptions
  const photoCaptions: PhotoCaptions = {
    1: "Universitas Indonesia",
    2: "Cibis Park",
    3: "BCBD",
    4: "Universitas Indonesia",
    5: "Museum Macan",
    6: "Blok M PLaza",
    7: "XXI Blok M",
    8: "Jakarta AQuarium Safari",
  };

  // Function to get image source
  const getImageSrc = (photoNum: number): string => {
    if (photoNum === 5) return 'date5.png';
    if (photoNum === 6) return 'date6.JPG';
    if (photoNum === 7) return 'date7.jpg';
    if (photoNum === 8) return '10.png';
   
    const formats = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'];
    return `${photoNum}.${formats[0]}`;
  };

  // Enhanced fallback image generator
  const generateFallbackImage = (photoNum: number): string => {
    const colors = ['#fdf2f8', '#fce7f3', '#f3e8ff', '#fff7ed', '#f0fdf4'];
    const gradientColor = colors[photoNum % colors.length];
   
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad${photoNum}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${gradientColor};stop-opacity:1" />
            <stop offset="50%" style="stop-color:#fce7f3;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#f3e8ff;stop-opacity:1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="600" height="400" fill="url(#grad${photoNum})"/>
       
        <!-- Floating hearts -->
        <g filter="url(#glow)">
          <path d="M200 180 C200 170, 190 160, 180 160 C170 160, 160 170, 160 180 C160 190, 180 210, 200 220 C220 210, 240 190, 240 180 C240 170, 230 160, 220 160 C210 160, 200 170, 200 180 Z" fill="#f472b6" opacity="0.6"/>
          <path d="M350 160 C350 152, 343 145, 335 145 C327 145, 320 152, 320 160 C320 168, 335 185, 350 195 C365 185, 380 168, 380 160 C380 152, 373 145, 365 145 C357 145, 350 152, 350 160 Z" fill="#ec4899" opacity="0.5"/>
          <path d="M450 200 C450 194, 445 189, 439 189 C433 189, 428 194, 428 200 C428 206, 439 218, 450 225 C461 218, 472 206, 472 200 C472 194, 467 189, 461 189 C455 189, 450 194, 450 200 Z" fill="#a855f7" opacity="0.4"/>
        </g>
       
        <!-- Main content area -->
        <rect x="50" y="280" width="500" height="100" rx="20" fill="#ffffff" fill-opacity="0.9"/>
        <text x="300" y="310" text-anchor="middle" fill="#be185d" font-family="serif" font-size="24" font-weight="bold">${photoCaptions[photoNum]}</text>
        <text x="300" y="335" text-anchor="middle" fill="#9d174d" font-family="serif" font-size="16">Memory ${photoNum}</text>
        <text x="300" y="355" text-anchor="middle" fill="#7c2d12" font-family="serif" font-size="12" opacity="0.8">A precious moment in time</text>
       
        <!-- Decorative elements -->
        <circle cx="100" cy="320" r="8" fill="#f472b6" opacity="0.6"/>
        <circle cx="500" cy="320" r="8" fill="#f472b6" opacity="0.6"/>
        <path d="M300 365 L305 360 L310 365 L305 370 Z" fill="#f472b6" opacity="0.7"/>
      </svg>
    `)}`;
  };

  // Enhanced slideshow navigation with useCallback
  const nextPhotoSlide = useCallback(() => {
    setCurrentPhotoSlide((prev) => (prev + 1) % photoGrid.length);
  }, [photoGrid.length]);

  const prevPhotoSlide = useCallback(() => {
    setCurrentPhotoSlide((prev) => (prev - 1 + photoGrid.length) % photoGrid.length);
  }, [photoGrid.length]);

  const goToPhotoIndex = (index: number) => {
    setCurrentPhotoSlide(index);
  };

  // Touch handlers for swipe navigation
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
   
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentMainSlide === 1) {
      nextPhotoSlide();
    }
    if (isRightSwipe && currentMainSlide === 1) {
      prevPhotoSlide();
    }
  };

  // Auto-advance slideshow
  useEffect(() => {
    if (currentMainSlide === 1 && !isMobile) { // Only auto-advance on desktop
      const interval = setInterval(() => {
        nextPhotoSlide();
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [currentMainSlide, nextPhotoSlide, isMobile]);

  // Enhanced PhotoCard component
  const PhotoCard = ({ photoNum, isSlideshow = false }: { photoNum: number; isSlideshow?: boolean }) => {
    const [currentSrc, setCurrentSrc] = useState<string>(getImageSrc(photoNum));
    const [attempts, setAttempts] = useState<number>(0);
    const [hasError, setHasError] = useState<boolean>(false);

    const formats = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'];

    const handleError = () => {
      if (photoNum === 5 || photoNum === 6 ) {
        setHasError(true);
        setCurrentSrc(generateFallbackImage(photoNum));
        handleImageError(photoNum);
        return;
      }

      if (attempts < formats.length - 1) {
        const nextAttempt = attempts + 1;
        setAttempts(nextAttempt);
        setCurrentSrc(`${photoNum}.${formats[nextAttempt]}`);
      } else {
        setHasError(true);
        setCurrentSrc(generateFallbackImage(photoNum));
        handleImageError(photoNum);
      }
    };

    const handleLoad = () => {
      if (!hasError) {
        handleImageLoad(photoNum);
      }
    };

    if (isSlideshow) {
      return (
        <div className="relative w-full h-full">
          {/* Dynamic background overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-rose-900/20 z-5"></div>
         
          {/* Heart background for slideshow */}
          {heartBgLoaded && (
            <div
              className="absolute inset-0 opacity-10 bg-no-repeat bg-center"
              style={{
                backgroundImage: 'url(heart.png)',
                backgroundSize: isMobile ? '150px 150px' : '400px 400px',
                animation: 'slowPulse 8s ease-in-out infinite'
              }}
            />
          )}
         
          <img
            src={currentSrc}
            alt={`Memory ${photoNum}`}
            className="w-full h-full object-cover relative z-10 transition-transform duration-1000"
            onLoad={handleLoad}
            onError={handleError}
          />
         
          {/* Enhanced overlay with animated gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20
                         before:absolute before:inset-0 before:bg-gradient-to-r before:from-pink-500/10 before:to-purple-500/10"></div>
         
          {/* Enhanced caption overlay - mobile responsive */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 lg:p-8 text-white z-30">
            <div className="max-w-4xl">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-serif font-bold mb-1 sm:mb-2 md:mb-3 leading-tight">
        
              </h3>
            </div>
          </div>

          {/* Loading state with elegant animation */}
          {!loadedImages.has(photoNum) && !hasError && (
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center z-40">
              <div className="text-center">
                <div className="relative">
                  <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 border-2 sm:border-4 border-pink-200"></div>
                  <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 border-t-2 sm:border-t-4 border-pink-500 absolute inset-0"></div>
                </div>
                <p className="text-pink-600 font-medium text-sm sm:text-base md:text-lg mt-2 sm:mt-4">Loading Memory...</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* CSS for animations */}
      <style>{`
        @keyframes slowPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.1); }
        }
       
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* Enhanced Background Decorative Elements */}
      <div className="fixed inset-0 opacity-20 pointer-events-none z-0">
        <div className="absolute top-5 sm:top-10 md:top-20 left-2 sm:left-5 md:left-10 w-16 h-16 sm:w-20 sm:h-20 md:w-40 md:h-40 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full blur-xl sm:blur-2xl md:blur-3xl animate-pulse"></div>
        <div className="absolute top-10 sm:top-20 md:top-40 right-5 sm:right-10 md:right-20 w-20 h-20 sm:w-30 sm:h-30 md:w-60 md:h-60 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-xl sm:blur-2xl md:blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-10 sm:bottom-20 md:bottom-40 left-1/4 w-18 h-18 sm:w-24 sm:h-24 md:w-48 md:h-48 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full blur-xl sm:blur-2xl md:blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
       
        {/* Animated heart background pattern */}
        {heartBgLoaded && (
          <div
            className="absolute inset-0 opacity-5 bg-no-repeat bg-center"
            style={{
              backgroundImage: 'url(heart.png)',
              backgroundSize: isMobile ? '300px 300px' : '1000px 1000px',
              animation: 'slowPulse 12s ease-in-out infinite'
            }}
          />
        )}
      </div>

      {/* Main Content Container - Fixed positioning removed */}
      <div className="relative z-10">
       
        {/* SLIDE 1: Letter Section */}
        <div
          className={`${currentMainSlide === 0 ? 'block' : 'hidden'} min-h-screen flex flex-col items-center justify-center text-center px-3 sm:px-4 md:px-6 lg:px-8 py-8`}
        >
          <div className="relative z-10 max-w-6xl mx-auto w-full">
            <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-24 xl:mb-32 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-serif text-pink-500 drop-shadow-2xl leading-tight pb-2 sm:pb-4 md:pb-6 lg:pb-8">
                Happy Anniversary
              </h1>
              <div className="mt-3 sm:mt-4 md:mt-6 lg:mt-8 xl:mt-12 flex justify-center">
                <div className="w-12 sm:w-16 md:w-24 lg:w-32 h-0.5 sm:h-1 bg-pink-400 rounded-full"></div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-20 shadow-2xl border border-pink-200/50 relative overflow-hidden mx-1 sm:mx-2 md:mx-4 lg:mx-0">
              {/* Enhanced decorative elements */}
              <div className="absolute top-0 left-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 xl:w-32 xl:h-32 bg-gradient-to-br from-pink-300/50 to-transparent rounded-br-xl sm:rounded-br-2xl md:rounded-br-3xl"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 xl:w-32 xl:h-32 bg-gradient-to-tl from-purple-300/50 to-transparent rounded-tl-xl sm:rounded-tl-2xl md:rounded-tl-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-gradient-to-r from-pink-200/20 to-purple-200/20 rounded-full blur-xl sm:blur-2xl md:blur-3xl animate-pulse"></div>
             
              {/* Heart background in main card */}
              {heartBgLoaded && (
                <div
                  className="absolute inset-0 opacity-10 bg-no-repeat bg-center"
                  style={{
                    backgroundImage: 'url(heart.png)',
                    backgroundSize: isMobile ? '150px 150px' : '500px 500px',
                    animation: 'slowPulse 10s ease-in-out infinite'
                  }}
                />
              )}

              <div className="relative z-10">
                {/* Dear Ara text positioned at top left */}
                <div className="mb-3 sm:mb-4 md:mb-6 lg:mb-8">
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-rose-600 font-light italic text-left">
                    Dear Ara,
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 text-gray-700">
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl leading-relaxed font-light text-center">
                   Gak kerasa, tepat 1 tahun yang lalu kita jadian. Jadi inget deg-degan banget dan seneng banget aku waktu kita first date. Pokoknya aku selalu suka ngelakuin apapun asalkan bareng kamu, kamu selalu bisa bikin hal-hal kecil yang kita lakuin terasa memorable. Di satu tahun ini, kita udah jadi pasangan yang berkembang banget. Kita udah saling ngertiin, sabar, dan saling dukung satu sama lain.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl leading-relaxed font-light text-center">
                 Makasih yaa udah mau jadi pacar aku hehehe. Tiap ngedate sama kamu aku selalu seneenng banget. I can’t imagine a single day in my life without you in it. Selamat Anniversary yang ke-1 tahun yaaa tutu ku. 
                  
                  </p>
                </div>
           
                <div className="mt-6 sm:mt-8 md:mt-12 lg:mt-16 pt-4 sm:pt-6 md:pt-8 lg:pt-10 border-t border-pink-300/50 text-center">
                  <div className="flex items-center justify-center mb-3 sm:mb-4 md:mb-6">
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-gray-600 italic font-light px-2">
                      – Edwin Daniel Toliansa
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-12 xl:mt-16 flex items-center justify-center text-gray-600 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 shadow-lg mx-1 sm:mx-2 md:mx-4 lg:mx-0">
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                August 24, 2025
              </span>
            </div>

            {/* Continue Button */}
            <div className="mt-6 sm:mt-8 md:mt-12 lg:mt-16 flex justify-center">
              <button
                onClick={goToPhotoSlide}
                className="group bg-pink-500 hover:bg-pink-600 text-white px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-6 rounded-full text-base sm:text-lg md:text-xl lg:text-2xl font-medium shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 sm:space-x-3"
              >
                <span>Ubi & Tutu</span>
                <ChevronRight
                  className="group-hover:translate-x-1 transition-transform duration-300"
                  size={isMobile ? 16 : 24}
                />
              </button>
            </div>

          </div>
        </div>

        {/* SLIDE 2: Photo Slideshow Section */}
        <div
          className={`${currentMainSlide === 1 ? 'block' : 'hidden'} min-h-screen`}
        >
          <div className="pt-6 sm:pt-8 md:pt-12 lg:pt-24 pb-8 sm:pb-12 md:pb-16 lg:pb-32 xl:pb-40 px-2 sm:px-4 md:px-6 lg:px-8 relative min-h-screen flex flex-col">
            <div className="max-w-7xl mx-auto relative z-10 flex-1 flex flex-col">
             
              {/* Back to Letter Button */}
              <div className="mb-4 sm:mb-6 md:mb-8">
                <button
                  onClick={goToLetter}
                  className="group bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-700 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                >
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span>Back</span>
                </button>
              </div>

              <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-20">
                <div className="flex flex-col items-center justify-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-serif text-gray-800 font-bold px-2 sm:px-4 text-center">
                    A glimpse of our journey
                  </h2>
                </div>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed px-3 sm:px-4 md:px-6">
                  You′re all that's on my mind today
                </p>
              </div>

              {/* Enhanced Photo Slideshow - mobile responsive */}
              <div className="relative max-w-6xl mx-auto flex-1 flex flex-col">
                {/* Main Slideshow Container */}
                <div className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl md:shadow-2xl ring-1 sm:ring-2 md:ring-4 ring-pink-200/50 mx-1 sm:mx-2 md:mx-0">
                  {photoGrid.map((photoNum, index) => (
                    <div
                      key={photoNum}
                      className={`absolute inset-0 transition-all duration-1500 ease-in-out ${
                        index === currentPhotoSlide
                          ? 'opacity-100 transform scale-100'
                          : 'opacity-0 transform scale-105'
                      }`}
                    >
                      <PhotoCard photoNum={photoNum} isSlideshow={true} />
                    </div>
                  ))}

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevPhotoSlide}
                    className="absolute left-1 sm:left-2 md:left-4 lg:left-6 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-1.5 sm:p-2 md:p-3 lg:p-4 rounded-full transition-all duration-300 z-30 backdrop-blur-md hover:scale-110 shadow-lg"
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" strokeWidth={3} />
                  </button>

                  <button
                    onClick={nextPhotoSlide}
                    className="absolute right-1 sm:right-2 md:right-4 lg:right-6 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-1.5 sm:p-2 md:p-3 lg:p-4 rounded-full transition-all duration-300 z-30 backdrop-blur-md hover:scale-110 shadow-lg"
                  >
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" strokeWidth={3} />
                  </button>

                  {/* Enhanced Slide Indicators - mobile responsive */}
                  <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-6 xl:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4 z-30">
                    {photoGrid.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToPhotoIndex(index)}
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 rounded-full transition-all duration-500 backdrop-blur-md ${
                          index === currentPhotoSlide
                            ? 'bg-white scale-125 sm:scale-150 shadow-lg ring-1 sm:ring-2 ring-white/50'
                            : 'bg-white/60 hover:bg-white/80 hover:scale-110 sm:hover:scale-125'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Enhanced Current Slide Info - mobile responsive */}
                  <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-6 xl:bottom-8 right-2 sm:right-3 md:right-4 lg:right-6 xl:right-8 bg-black/60 backdrop-blur-md text-white px-2 sm:px-3 md:px-4 lg:px-6 py-1 sm:py-1.5 md:py-2 lg:py-3 rounded-full text-xs sm:text-sm md:text-base lg:text-lg z-30 shadow-lg">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Camera size={isMobile ? 10 : 16} />
                      <span>{currentPhotoSlide + 1} / {photoGrid.length}</span>
                    </div>
                  </div>

                  {/* Progress bar */}

                    <div className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 bg-black/20 z-30">
                      <div
                        className="h-full bg-pink-500 transition-all duration-300"
                        style={{ width: `${((currentPhotoSlide + 1) / photoGrid.length) * 100}%` }}
                      />
                    </div>

                  {/* Swipe indicator for mobile */}
                  {isMobile && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs z-30 animate-pulse">
                      Swipe to navigate
                    </div>
                  )}
                </div>

                {/* Enhanced Slide Title and Description - mobile responsive */}
                <div className="text-center mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 px-2 sm:px-4 md:px-0">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4 lg:mb-6">
                    {photoCaptions[photoGrid[currentPhotoSlide] as keyof PhotoCaptions]}
                  </h3>
                </div>

                {/* Enhanced Thumbnail Navigation - mobile responsive */}
                <div className="flex justify-center space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-6 mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 overflow-x-auto pb-2 sm:pb-4 md:pb-6 px-2 sm:px-4 md:px-0">
                  {photoGrid.map((photoNum, index) => (
                    <button
                      key={photoNum}
                      onClick={() => goToPhotoIndex(index)}
                      className={`relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500 flex-shrink-0 ${
                        index === currentPhotoSlide
                          ? 'ring-1 sm:ring-2 md:ring-4 ring-pink-500 scale-105 sm:scale-110 shadow-lg sm:shadow-xl md:shadow-2xl'
                          : 'ring-1 sm:ring-2 ring-gray-300 hover:ring-pink-300 opacity-70 hover:opacity-100 hover:scale-105'
                      }`}
                    >
                      {/* Heart background for thumbnails */}
                      {heartBgLoaded && (
                        <div
                          className="absolute inset-0 opacity-30 bg-no-repeat bg-center"
                          style={{
                            backgroundImage: 'url(heart.png)',
                            backgroundSize: isMobile ? '16px 16px' : '48px 48px'
                          }}
                        />
                      )}
                     
                      <img
                        src={getImageSrc(photoNum)}
                        alt={`Thumbnail ${photoNum}`}
                        className="w-full h-full object-cover relative z-10 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = generateFallbackImage(photoNum);
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 z-20"></div>
                     
                      {/* Thumbnail overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 z-30">
                        <Play className="text-white" size={isMobile ? 8 : 16} />
                      </div>

                      {/* Active indicator */}
                      {index === currentPhotoSlide && (
                        <div className="absolute -bottom-0.5 sm:-bottom-1 md:-bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-pink-500 rounded-full animate-pulse"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Photo Modal - mobile responsive */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4 md:p-6"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-5xl max-h-[95vh] sm:max-h-[90vh] bg-white rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl w-full">
            {/* Heart background for modal */}
            {heartBgLoaded && (
              <div
                className="absolute inset-0 opacity-5 bg-no-repeat bg-center"
                style={{
                  backgroundImage: 'url(heart.png)',
                  backgroundSize: isMobile ? '150px 150px' : '400px 400px'
                }}
              />
            )}
           
            <img
              src={imageErrors.has(selectedPhoto) ? generateFallbackImage(selectedPhoto) : getImageSrc(selectedPhoto)}
              alt={`Memory ${selectedPhoto}`}
              className="w-full h-full object-contain relative z-10 max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh]"
            />
           
            {/* Enhanced close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-2 sm:top-3 md:top-4 lg:top-6 right-2 sm:right-3 md:right-4 lg:right-6 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 sm:p-2 md:p-3 cursor-pointer transition-all duration-300 z-20 backdrop-blur-md hover:scale-110"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
           
            {/* Enhanced modal caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white p-3 sm:p-4 md:p-6 lg:p-8 z-20">
              <div className="max-w-3xl">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold mb-1 sm:mb-2 md:mb-3 lg:mb-4">{photoCaptions[selectedPhoto]}</h3>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 text-xs sm:text-sm opacity-75">
                  <div className="flex items-center">
                    <Heart className="mr-1 sm:mr-2" size={isMobile ? 10 : 16} />
                    Memory #{selectedPhoto}
                  </div>
                  <div className="flex items-center">
                    <Star className="mr-1 sm:mr-2" size={isMobile ? 10 : 16} />
                    Forever Cherished
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 sm:mr-2" size={isMobile ? 10 : 16} />
                    Timeless Moment
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation in modal */}
            <div className="absolute top-1/2 left-1 sm:left-2 md:left-4 lg:left-6 transform -translate-y-1/2 z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = photoGrid.indexOf(selectedPhoto);
                  const prevIndex = currentIndex > 0 ? currentIndex - 1 : photoGrid.length - 1;
                  setSelectedPhoto(photoGrid[prevIndex]);
                }}
                className="bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 sm:p-2 md:p-3 transition-all duration-300 backdrop-blur-md hover:scale-110"
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" strokeWidth={2} />
              </button>
            </div>
           
            <div className="absolute top-1/2 right-1 sm:right-2 md:right-4 lg:right-6 transform -translate-y-1/2 z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = photoGrid.indexOf(selectedPhoto);
                  const nextIndex = currentIndex < photoGrid.length - 1 ? currentIndex + 1 : 0;
                  setSelectedPhoto(photoGrid[nextIndex]);
                }}
                className="bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 sm:p-2 md:p-3 transition-all duration-300 backdrop-blur-md hover:scale-110"
              >
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeTest;