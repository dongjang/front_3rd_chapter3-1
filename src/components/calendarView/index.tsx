import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Heading, HStack, IconButton, Select, VStack } from '@chakra-ui/react';
import React from 'react';

import CalendarMonthView from './CalendarMonthView';
import CalendarWeekView from './CalendarWeekView';
import { Event } from '../../types';

interface CalendarViewProps {
  events: Event[];
  navigate: (direction: 'prev' | 'next') => void;
  view: 'week' | 'month';
  setView: React.Dispatch<React.SetStateAction<'week' | 'month'>>;
  currentDate: Date;
  holidays: { [key: string]: string };
  notifiedEvents: string[];
  filteredEvents: Event[];
}

const CalendarView = ({
  events,
  navigate,
  view,
  setView,
  currentDate,
  notifiedEvents,
  filteredEvents,
  holidays,
}: CalendarViewProps) => {
  return (
    <>
      <VStack flex={1} spacing={5} align="stretch">
        <Heading>일정 보기</Heading>

        <HStack mx="auto" justifyContent="space-between">
          <IconButton
            aria-label="Previous"
            icon={<ChevronLeftIcon />}
            onClick={() => navigate('prev')}
          />
          <Select
            aria-label="view"
            value={view}
            onChange={(e) => setView(e.target.value as 'week' | 'month')}
          >
            <option value="week">Week</option>
            <option value="month">Month</option>
          </Select>
          <IconButton
            aria-label="Next"
            icon={<ChevronRightIcon />}
            onClick={() => navigate('next')}
          />
        </HStack>

        {view === 'week' && (
          <CalendarWeekView
            currentDate={currentDate}
            events={events}
            view={view}
            notifiedEvents={notifiedEvents}
          />
        )}
        {view === 'month' && (
          <CalendarMonthView
            currentDate={currentDate}
            filteredEvents={filteredEvents}
            notifiedEvents={notifiedEvents}
            holidays={holidays}
          />
        )}
      </VStack>
    </>
  );
};

export default CalendarView;
