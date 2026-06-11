import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CoffeeProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  variety: string;
}

const coffeeProducts: CoffeeProduct[] = [
  {
    id: 1,
    name: 'Café de Especialidad Arábica',
    description: 'Variedad Catuaí Amarillo - Chocolate, Miel y Caramelo',
    image: '/robusta-blanco.jpg',
    price: '$15.990',
    variety: 'Arábica',
  },
  {
    id: 2,
    name: 'Café de Especialidad Colombia Huila',
    description: 'Castillo Catoria, Arábico - Alquilé, Chocolate y Almendra',
    image: '/robusta-blanco.jpg',
    price: '$16.990',
    variety: 'Colombia Huila',
  },
  {
    id: 3,
    name: 'Café de Especialidad Robusta',
    description: 'Robusta Vietnamita - Chocolate, Avellana y Frutos Secos',
    image: '/robusta-blanco.jpg',
    price: '$12.990',
    variety: 'Robusta',
  },
  {
    id: 4,
    name: 'Café de Especialidad Blend',
    description: 'Arábica 70% / Robusta 30% - Chocolate, Miel, Avellana y Caramelo',
    image: '/robusta-blanco.jpg',
    price: '$14.990',
    variety: 'Blend Premium',
  },
];

export default function CoffeeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % coffeeProducts.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [autoPlay]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + coffeeProducts.length) % coffeeProducts.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const currentProduct = coffeeProducts[currentIndex];

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
            Nuestros Cafés Premium
          </h2>
          <p className="text-lg text-amber-700">
            Selección exclusiva de cafés de especialidad de origen único
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative h-96 md:h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
              }}
              className="absolute inset-0 w-full h-full flex items-center justify-center p-6 md:p-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
                {/* Image */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center"
                >
                  <div className="relative w-full max-w-xs">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-amber-100 rounded-lg blur-2xl opacity-40"></div>
                    <img
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      className="relative w-full h-64 md:h-80 object-contain drop-shadow-lg"
                    />
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <div className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {currentProduct.variety}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-amber-900">
                    {currentProduct.name}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {currentProduct.description}
                  </p>
                  <div className="flex items-center gap-4 pt-4">
                    <span className="text-3xl font-bold text-amber-600">
                      {currentProduct.price}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
                    >
                      Agregar al Carrito
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-amber-900 p-2 rounded-full shadow-lg transition-all"
            aria-label="Previous coffee"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => paginate(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-amber-900 p-2 rounded-full shadow-lg transition-all"
            aria-label="Next coffee"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {coffeeProducts.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                  setAutoPlay(false);
                  setTimeout(() => setAutoPlay(true), 10000);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-amber-600 w-8'
                    : 'bg-amber-300 hover:bg-amber-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-amber-600">
            <h4 className="font-bold text-amber-900 mb-2">🌍 Origen Premium</h4>
            <p className="text-gray-600 text-sm">Selección exclusiva de las mejores regiones cafetaleras del mundo</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-amber-600">
            <h4 className="font-bold text-amber-900 mb-2">🔥 Tostión Artesanal</h4>
            <p className="text-gray-600 text-sm">Tueste cuidado que resalta las notas únicas de cada variedad</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-amber-600">
            <h4 className="font-bold text-amber-900 mb-2">📦 250gr Fresco</h4>
            <p className="text-gray-600 text-sm">Empaque especial para mantener la frescura y aroma del café</p>
          </div>
        </div>
      </div>
    </section>
  );
}
