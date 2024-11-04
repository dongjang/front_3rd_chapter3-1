import { useMemo, useState } from 'react';

import { Event } from '../types';
import { getFilteredEvents } from '../utils/eventUtils';

export const useSearch = (events: Event[], currentDate: Date, view: 'week' | 'month') => {
  console.log('events', events);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = useMemo(() => {
    return getFilteredEvents(events, searchTerm, currentDate, view);
  }, [events, searchTerm, currentDate, view]);

  console.log(filteredEvents);
  return {
    searchTerm,
    setSearchTerm,
    filteredEvents,
  };
};
