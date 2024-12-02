'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface TabsProps {
  tabs: {
    id: string;
    label: string;
  }[];
  activeTab: string;
  onChange: (id: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex space-x-1 rounded-lg bg-neutral-100 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'w-full rounded-md px-3 py-2 text-sm font-medium transition-colors',
            activeTab === tab.id
              ? 'bg-white text-neutral-900 shadow'
              : 'text-neutral-600 hover:text-neutral-900'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
} 