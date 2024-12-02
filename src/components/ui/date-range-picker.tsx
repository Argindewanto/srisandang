'use client';

import { useState, useRef, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import {
  startOfToday,
  endOfToday,
  startOfYesterday,
  endOfYesterday,
  startOfWeek,
  endOfWeek,
  subWeeks,
  startOfMonth,
  endOfMonth,
  subMonths,
} from 'date-fns';

interface DateRange {
  from: Date;
  to: Date;
  label: string;
}

interface DateRangePickerProps {
  onChange: (range: DateRange) => void;
}

export function DateRangePicker({ onChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    from: startOfToday(),
    to: endOfToday(),
    label: 'Hari Ini'
  });
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dateRanges: DateRange[] = [
    {
      label: 'Hari Ini',
      from: startOfToday(),
      to: endOfToday(),
    },
    {
      label: 'Kemarin',
      from: startOfYesterday(),
      to: endOfYesterday(),
    },
    {
      label: 'Minggu Ini',
      from: startOfWeek(new Date(), { weekStartsOn: 1 }),
      to: endOfWeek(new Date(), { weekStartsOn: 1 }),
    },
    {
      label: 'Minggu Lalu',
      from: startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
      to: endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
    },
    {
      label: 'Bulan Ini',
      from: startOfMonth(new Date()),
      to: endOfMonth(new Date()),
    },
    {
      label: 'Bulan Lalu',
      from: startOfMonth(subMonths(new Date(), 1)),
      to: endOfMonth(subMonths(new Date(), 1)),
    },
  ];

  const handleSelect = (range: DateRange) => {
    setSelectedRange(range);
    onChange(range);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selected Date Display */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg text-body-sm text-neutral-900 hover:bg-neutral-50 transition-colors"
      >
        <Calendar className="h-4 w-4 text-neutral-500" />
        <span>{selectedRange.label}</span>
        <span className="text-neutral-400">
          ({format(selectedRange.from, 'dd MMM', { locale: id })} - {format(selectedRange.to, 'dd MMM', { locale: id })})
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-50">
          {dateRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => handleSelect(range)}
              className={`w-full px-4 py-2 text-left text-body-sm hover:bg-neutral-50 transition-colors ${
                selectedRange.label === range.label ? 'text-brand-primary bg-neutral-50' : 'text-neutral-900'
              }`}
            >
              <div className="font-medium">{range.label}</div>
              <div className="text-neutral-500 text-xs">
                {format(range.from, 'dd MMM yyyy', { locale: id })} - {format(range.to, 'dd MMM yyyy', { locale: id })}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 