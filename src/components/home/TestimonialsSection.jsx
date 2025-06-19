import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import testimonial images
import testimonial1 from '../../assets/testimonies/Artworks_Testimonies-1A-638x1024.webp';
import testimonial2 from '../../assets/testimonies/Artworks_Testimonies-2A-638x1024.webp';
import testimonial3 from '../../assets/testimonies/Artworks_Testimonies-3A-638x1024.webp';

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    { id: 1, image: testimonial1, alt: "Testimonial 1" },
    { id: 2, image: testimonial2, alt: "Testimonial 2" },
    { id: 3, image: testimonial3, alt: "Testimonial 3" }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Our Community Speaks
          </h2>
          <p className="text-lg text-gray-600">
            Discover how Conscious Humanity has transformed lives around the world
          </p>
        </div>

        {/* Desktop View: All 3 in a row */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="rounded-lg shadow-lg overflow-hidden">
              <img src={testimonial.image} alt={testimonial.alt} className="w-full h-auto" />
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden relative">
          <div className="overflow-hidden rounded-lg shadow-lg mx-auto max-w-sm">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <img src={testimonial.image} alt={testimonial.alt} className="w-full h-auto" />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-gray-800 hover:bg-gray-100 z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button 
            onClick={nextSlide}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-gray-800 hover:bg-gray-100 z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Indicator Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;