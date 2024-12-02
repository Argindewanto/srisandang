'use client';

import React, { useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { TestimonialCard } from './testimonial-card';
import { WhatsAppButton, CatalogueButton } from './buttons';
import type { Testimonial } from '@/lib/firebase/testimonials';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const translation = useMotionValue(0);
  const cardWidth = 300; // Width of each card + gap
  const duration = 40; // Duration for one complete cycle in seconds

  useEffect(() => {
    const contentWidth = cardWidth * testimonials.length;
    const controls = animate(translation, [-contentWidth, 0], {
      ease: 'linear',
      duration: duration,
      repeat: Infinity,
      repeatType: 'loop',
      repeatDelay: 0,
    });

    return controls.stop;
  }, [testimonials.length]);

  return (
    <section className="py-20">
      {/* Infinite Slider */}
      <div className="relative w-full overflow-hidden mb-12">
        <div className="container">
          <motion.div 
            className="flex gap-6"
            style={{ x: translation }}
          >
            {/* First set of testimonials */}
            {testimonials.map((testimonial, index) => (
              <div 
                key={`first-${testimonial.id}`} 
                className="flex-none w-[300px]"
              >
                <TestimonialCard
                  clientName={testimonial.clientName}
                  content={testimonial.content}
                  image={testimonial.image}
                  index={index}
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {testimonials.map((testimonial, index) => (
              <div 
                key={`second-${testimonial.id}`} 
                className="flex-none w-[300px]"
              >
                <TestimonialCard
                  clientName={testimonial.clientName}
                  content={testimonial.content}
                  image={testimonial.image}
                  index={index}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="container">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <WhatsAppButton className="w-full sm:w-auto" />
          <CatalogueButton className="w-full sm:w-auto" />
        </div>
      </div>
    </section>
  );
} 