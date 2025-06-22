import React, { useState, useEffect } from 'react';
import { Heart, Star, Sparkles, Calendar, Camera, ArrowUp, Play, Clock, Gift, Music } from 'lucide-react';

// Type definitions
interface PhotoCaptions {
  [key: number]: string;
}

const HomeTest = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [heartBgLoaded, setHeartBgLoaded] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const anniversaryDate = new Date('2024-08-24');
  const today = new Date();
  const years = today.getFullYear() - anniversaryDate.getFullYear();

  // Calculate time together
  const timeDiff = today.getTime() - anniversaryDate.getTime();
  const daysTogether = Math.floor(timeDiff / (1000 * 3600 * 24));

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Extended photo collection for slideshow
  const photoGrid = Array.from({ length: 7 }, (_, i) => i + 1);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Enhanced photo captions with romantic descriptions
  const photoCaptions: PhotoCaptions = {
    1: "The Beginning of Forever",
    2: "Adventures in Love", 
    3: "Moments of Pure Joy",
    4: "Under Starlit Skies",
    5: "Golden Memories",
    6: "Heart to Heart",
    7: "Together Always"
  };

  const photoDescriptions: { [key: number]: string } = {
    1: "Where our beautiful story began, with nervous smiles and endless possibilities ahead",
    2: "Every adventure is better when shared with you, my beloved companion",
    3: "Your laughter is the melody that fills my heart with pure happiness",
    4: "In quiet moments together, I found my home in your embrace",
    5: "Time may pass, but these precious memories remain golden forever",
    6: "Two hearts beating as one, in perfect harmony and understanding",
    7: "Through all seasons of life, my love for you only grows stronger"
  };

  // Function to get image source
  const getImageSrc = (photoNum: number): string => {
    if (photoNum === 5) return 'date5.png';
    if (photoNum === 6) return 'date6.JPG';
    if (photoNum === 7) return 'date7.JPG';
    
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % photoGrid.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + photoGrid.length) % photoGrid.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval);
  }, []);

  // Enhanced PhotoCard component
  const PhotoCard = ({ photoNum, isSlideshow = false }: { photoNum: number; isSlideshow?: boolean }) => {
    const [currentSrc, setCurrentSrc] = useState<string>(getImageSrc(photoNum));
    const [attempts, setAttempts] = useState<number>(0);
    const [hasError, setHasError] = useState<boolean>(false);

    const formats = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'];

    const handleError = () => {
      if (photoNum === 5 || photoNum === 6 || photoNum === 7) {
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
              className="absolute inset-0 opacity-10 bg-no-repeat bg-center animate-pulse"
              style={{
                backgroundImage: 'url(heart.png)',
                backgroundSize: '400px 400px'
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
          
          {/* Enhanced caption overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white z-30">
            <div className="max-w-4xl">
              <h3 className="text-3xl md:text-5xl font-serif font-bold mb-4 leading-tight">
                {photoCaptions[photoNum]}
              </h3>
              <p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-2xl">
                {photoDescriptions[photoNum]}
              </p>
              <div className="mt-6 flex items-center space-x-4 text-sm md:text-base opacity-75">
                <div className="flex items-center">
                  <Heart className="mr-2" size={16} />
                  Memory #{photoNum}
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2" size={16} />
                  A moment in time
                </div>
              </div>
            </div>
          </div>

          {/* Loading state with elegant animation */}
          {!loadedImages.has(photoNum) && !hasError && (
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center z-40">
              <div className="text-center">
                <div className="relative">
                  <div className="animate-spin rounded-full h-20 w-20 border-4 border-pink-200"></div>
                  <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-pink-500 absolute inset-0"></div>
                </div>
                <p className="text-pink-600 font-medium text-xl mt-6">Loading Beautiful Memory...</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-700 transform hover:scale-105 cursor-pointer backdrop-blur-sm"
        style={{
          aspectRatio: photoNum % 3 === 0 ? '3/4' : photoNum % 4 === 0 ? '4/3' : '1/1'
        }}
        onClick={() => setSelectedPhoto(photoNum)}
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-rose-500/20 opacity-0 group-hover:opacity-100 transition-all duration-700 z-10"></div>
        
        {/* Heart background behind the card */}
        {heartBgLoaded && (
          <div 
            className="absolute inset-0 opacity-15 group-hover:opacity-30 transition-all duration-700 bg-no-repeat bg-center z-0"
            style={{
              backgroundImage: 'url(heart.png)',
              backgroundSize: '150px 150px'
            }}
          />
        )}
        
        <img
          src={currentSrc}
          alt={`Memory ${photoNum}`}
          className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 relative z-20 ${
            loadedImages.has(photoNum) || hasError ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
        />

        {/* Enhanced photo overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 z-30" />
        
        {/* Enhanced photo caption */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-40 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
          <h3 className="text-xl font-serif font-bold mb-2">{photoCaptions[photoNum]}</h3>
          <p className="text-sm opacity-90 leading-relaxed">{photoDescriptions[photoNum].substring(0, 60)}...</p>
          <div className="mt-3 flex items-center text-xs opacity-75">
            <Heart className="mr-1" size={12} />
            Memory #{photoNum}
          </div>
        </div>

        {/* Enhanced play icon */}
        <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-md rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-500 z-40 hover:bg-white/40">
          <Play className="text-white" size={18} />
        </div>

        {/* Enhanced loading placeholder */}
        {!loadedImages.has(photoNum) && !hasError && (
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center z-50">
            <div className="text-center">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-200"></div>
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-500 absolute inset-0"></div>
              </div>
              <p className="text-pink-600 font-medium mt-4">Loading...</p>
            </div>
          </div>
        )}

        {/* Error indicator */}
        {hasError && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full z-50 shadow-lg">
            <Sparkles className="inline mr-1" size={10} />
            Generated
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Enhanced Background Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-60 h-60 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-48 h-48 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Animated heart background pattern */}
        {heartBgLoaded && (
          <div 
            className="absolute inset-0 opacity-5 bg-no-repeat bg-center animate-pulse"
            style={{
              backgroundImage: 'url(heart.png)',
              backgroundSize: '1000px 1000px'
            }}
          />
        )}
      </div>

      {/* EXTENDED FLOATING ANIMATIONS - COVERING ENTIRE PAGE */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-5">
        {/* Floating Hearts - Extended and Enhanced */}
        {[...Array(30)].map((_, i) => (
          <Heart
            key={`heart-${i}`}
            className="absolute text-pink-400 opacity-30 animate-bounce"
            size={Math.random() * 32 + 16}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${3 + Math.random() * 6}s`,
              filter: `hue-rotate(${Math.random() * 60}deg)`,
            }}
          />
        ))}
        
        {/* Floating Sparkles - Extended and Enhanced */}
        {[...Array(25)].map((_, i) => (
          <Sparkles
            key={`sparkle-${i}`}
            className="absolute text-purple-400 opacity-40 animate-pulse"
            size={Math.random() * 28 + 12}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
              filter: `hue-rotate(${Math.random() * 120}deg)`,
            }}
          />
        ))}

        {/* Twinkling Stars - NEW! */}
        {[...Array(20)].map((_, i) => (
          <Star
            key={`star-${i}`}
            className="absolute text-yellow-400 opacity-50 animate-ping"
            size={Math.random() * 20 + 8}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${1 + Math.random() * 3}s`,
              filter: `brightness(${1 + Math.random() * 0.5})`,
            }}
          />
        ))}

        {/* Additional Floating Hearts with Different Colors */}
        {[...Array(15)].map((_, i) => (
          <Heart
            key={`heart-color-${i}`}
            className="absolute text-rose-300 opacity-25 animate-pulse"
            size={Math.random() * 24 + 12}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 12}s`,
              animationDuration: `${4 + Math.random() * 8}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}

        {/* Dancing Sparkles with Rotation */}
        {[...Array(18)].map((_, i) => (
          <Sparkles
            key={`sparkle-dance-${i}`}
            className="absolute text-pink-300 opacity-35 animate-spin"
            size={Math.random() * 22 + 10}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              filter: `saturate(${1 + Math.random() * 0.8})`,
            }}
          />
        ))}

        {/* Glowing Hearts */}
        {[...Array(12)].map((_, i) => (
          <Heart
            key={`heart-glow-${i}`}
            className="absolute text-red-400 opacity-20 animate-pulse"
            size={Math.random() * 36 + 20}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${3 + Math.random() * 5}s`,
              filter: `drop-shadow(0 0 10px rgba(244, 114, 182, 0.8))`,
            }}
          />
        ))}
      </div>

      {/* Enhanced Hero Section */}
      <div 
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      >
        {/* Enhanced Main Content */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-16">
            <Sparkles className="text-pink-500 mr-8 animate-pulse" size={48} />
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 font-bold tracking-tight animate-pulse">
              Happy Anniversary
            </h1>
            <Sparkles className="text-pink-500 ml-8 animate-pulse" size={48} />
          </div>

          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 md:p-20 shadow-2xl border border-pink-200/50 relative overflow-hidden">
            {/* Enhanced decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-pink-300/50 to-transparent rounded-br-3xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-300/50 to-transparent rounded-tl-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
            
            {/* Heart background in main card */}
            {heartBgLoaded && (
              <div 
                className="absolute inset-0 opacity-10 bg-no-repeat bg-center animate-pulse"
                style={{
                  backgroundImage: 'url(heart.png)',
                  backgroundSize: '500px 500px'
                }}
              />
            )}

            <div className="relative z-10">
              {/* Dear Ara text positioned at top left */}
              <div className="mb-8">
                <p className="text-2xl md:text-3xl text-rose-600 font-light italic text-left">
                  Dear Ara,
                </p>
              </div>

              <div className="space-y-10 text-gray-700">
                <p className="text-xl md:text-3xl leading-relaxed font-light text-center">
                  Every year with you is a precious gift, and I cherish every moment we've shared.
                  Through laughter and tears, adventures and quiet moments, you've been my constant companion.
                </p>
                <p className="text-xl md:text-3xl leading-relaxed font-light text-center">
                  Here's to many more years of love, growth, and beautiful memories.
                  Thank you for being the most amazing partner I could ask for.
                </p>
              </div>
          
<div className="mt-16 pt-10 border-t border-pink-300/50 text-center">
  <div className="flex items-center justify-center mb-6">
    <Heart className="text-pink-500 mr-4" size={32} />
    <p className="text-2xl md:text-3xl text-gray-600 italic font-light">
      From the depths of my heart – Edwin
    </p>
  </div>
</div>
            </div>
          </div>

          <div className="mt-16 flex items-center justify-center text-gray-600 bg-white/80 backdrop-blur-sm rounded-3xl px-8 py-4 shadow-lg">
            <Heart className="mr-4 text-pink-500 animate-pulse" size={28} />
            <span className="text-xl font-medium">
              August 24, 2025 - Forever and Always
            </span>
            <Heart className="ml-4 text-pink-500 animate-pulse" size={28} />
          </div>
        </div>
      </div>

      {/* Enhanced Photo Gallery Section */}
      <div className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <div className="flex items-center justify-center mb-8">
              <Camera className="text-pink-500 mr-6 animate-pwulse" size={44} />
              <h2 className="text-5xl md:text-7xl font-serif text-gray-800 font-bold">
                Our Beautiful Journey
              </h2>
              <Camera className="text-pink-500 ml-6 animate-pulse" size={44} />
            </div>
            <p className="text-2xl md:text-3xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
              A collection of precious memories that tell the story of our love, captured in time forever
            </p>
          </div>

          {/* Enhanced Photo Slideshow */}
          <div className="relative max-w-6xl mx-auto">
            {/* Main Slideshow Container */}
            <div className="relative h-[500px] md:h-[700px] rounded-3xl overflow-hidden shadow-2xl ring-4 ring-pink-200/50">
              {photoGrid.map((photoNum, index) => (
                <div
                  key={photoNum}
                  className={`absolute inset-0 transition-all duration-1500 ease-in-out ${
                    index === currentSlide 
                      ? 'opacity-100 transform scale-100' 
                      : 'opacity-0 transform scale-105'
                  }`}
                >
                  <PhotoCard photoNum={photoNum} isSlideshow={true} />
                </div>
              ))}

              {/* Enhanced Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-4 rounded-full transition-all duration-300 z-30 backdrop-blur-md hover:scale-110 shadow-lg"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-4 rounded-full transition-all duration-300 z-30 backdrop-blur-md hover:scale-110 shadow-lg"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Enhanced Slide Indicators */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-30">
                {photoGrid.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-500 backdrop-blur-md ${
                      index === currentSlide 
                        ? 'bg-white scale-150 shadow-lg ring-2 ring-white/50' 
                        : 'bg-white/60 hover:bg-white/80 hover:scale-125'
                    }`}
                  />
                ))}
              </div>

              {/* Enhanced Current Slide Info */}
              <div className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md text-white px-6 py-3 rounded-full text-lg z-30 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Camera size={16} />
                  <span>{currentSlide + 1} / {photoGrid.length}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-black/20 z-30">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${((currentSlide + 1) / photoGrid.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Enhanced Slide Title and Description */}
            <div className="text-center mt-12">
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
                {photoCaptions[photoGrid[currentSlide] as keyof PhotoCaptions]}
              </h3>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {photoDescriptions[photoGrid[currentSlide]]}
              </p>
              <div className="mt-6 flex items-center justify-center space-x-6 text-gray-500">
                <div className="flex items-center">
                  <Heart className="mr-2 text-pink-500" size={20} />
                  <span>Memory #{photoGrid[currentSlide]}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 text-purple-500" size={20} />
                  <span>Timeless Moment</span>
                </div>
                <div className="flex items-center">
                  <Star className="mr-2 text-yellow-500" size={20} />
                  <span>Forever Cherished</span>
                </div>
              </div>
            </div>

            {/* Enhanced Thumbnail Navigation */}
            <div className="flex justify-center space-x-3 md:space-x-6 mt-12 overflow-x-auto pb-6">
              {photoGrid.map((photoNum, index) => (
                <button
                  key={photoNum}
                  onClick={() => goToSlide(index)}
                  className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden transition-all duration-500 flex-shrink-0 ${
                    index === currentSlide 
                      ? 'ring-4 ring-pink-500 scale-110 shadow-2xl' 
                      : 'ring-2 ring-gray-300 hover:ring-pink-300 opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  {/* Heart background for thumbnails */}
                  {heartBgLoaded && (
                    <div 
                      className="absolute inset-0 opacity-30 bg-no-repeat bg-center"
                      style={{
                        backgroundImage: 'url(heart.png)',
                        backgroundSize: '48px 48px'
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
                    <Play className="text-white" size={16} />
                  </div>

                  {/* Active indicator */}
                  {index === currentSlide && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>



        </div>
      </div>

      {/* Enhanced Photo Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl">
            {/* Heart background for modal */}
            {heartBgLoaded && (
              <div 
                className="absolute inset-0 opacity-5 bg-no-repeat bg-center"
                style={{
                  backgroundImage: 'url(heart.png)',
                  backgroundSize: '400px 400px'
                }}
              />
            )}
            
            <img 
              src={imageErrors.has(selectedPhoto) ? generateFallbackImage(selectedPhoto) : getImageSrc(selectedPhoto)}
              alt={`Memory ${selectedPhoto}`}
              className="w-full h-full object-contain relative z-10"
            />
            
            {/* Enhanced close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 cursor-pointer transition-all duration-300 z-20 backdrop-blur-md hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Enhanced modal caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white p-8 z-20">
              <div className="max-w-3xl">
                <h3 className="text-3xl font-serif font-bold mb-4">{photoCaptions[selectedPhoto]}</h3>
                <p className="text-lg opacity-90 leading-relaxed mb-4">{photoDescriptions[selectedPhoto]}</p>
                <div className="flex items-center space-x-6 text-sm opacity-75">
                  <div className="flex items-center">
                    <Heart className="mr-2" size={16} />
                    Memory #{selectedPhoto}
                  </div>
                  <div className="flex items-center">
                    <Star className="mr-2" size={16} />
                    Forever Cherished
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2" size={16} />
                    Timeless Moment
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation in modal */}
            <div className="absolute top-1/2 left-6 transform -translate-y-1/2 z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = photoGrid.indexOf(selectedPhoto);
                  const prevIndex = currentIndex > 0 ? currentIndex - 1 : photoGrid.length - 1;
                  setSelectedPhoto(photoGrid[prevIndex]);
                }}
                className="bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-all duration-300 backdrop-blur-md"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            
            <div className="absolute top-1/2 right-6 transform -translate-y-1/2 z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = photoGrid.indexOf(selectedPhoto);
                  const nextIndex = currentIndex < photoGrid.length - 1 ? currentIndex + 1 : 0;
                  setSelectedPhoto(photoGrid[nextIndex]);
                }}
                className="bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-all duration-300 backdrop-blur-md"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white p-4 rounded-full shadow-2xl z-40 transition-all duration-300 hover:scale-110 backdrop-blur-md"
        >
          <ArrowUp size={24} />
        </button>
      )}

      {/* Floating Action Button - Send Love Message */}
      <div className="fixed bottom-8 left-8 z-40">
        <button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 backdrop-blur-md group">
          <Heart size={24} className="group-hover:animate-pulse" />
        </button>
      </div>


    </div>
  );
};

export default HomeTest;