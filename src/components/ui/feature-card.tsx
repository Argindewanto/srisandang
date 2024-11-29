'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function FeatureCard({ icon: Icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-lg hover:shadow-md transition-shadow"
    >
      <Icon className="h-8 w-8 text-brand-primary mb-4" />
      <h3 className="text-h3 text-neutral-900 mb-2">{title}</h3>
      <p className="text-body-sm text-neutral-600">{description}</p>
    </motion.div>
  );
} 