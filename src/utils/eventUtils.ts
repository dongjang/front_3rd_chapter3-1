import { Event } from '../types';
import { getWeekDates, isDateInRange } from './dateUtils';

const filterEventsByDateRange = (events: Event[], start: Date, end: Date): Event[] => {
  return events.filter((event) => {
    const eventDate = new Date(event.date);
    return isDateInRange(eventDate, start, end);
  });
};

const containsTerm = (target: string, term: string) => {
  return target.toLowerCase().includes(term.toLowerCase());
};

const searchEvents = (events: Event[], term: string) => {
  return events.filter(
    ({ title, description, location }) =>
      containsTerm(title, term) || containsTerm(description, term) || containsTerm(location, term)
  );
};

const filterEventsByDateRangeAtWeek = (events: Event[], currentDate: Date) => {
  const weekDates = getWeekDates(currentDate);
  return filterEventsByDateRange(events, weekDates[0], weekDates[6]);
};

const filterEventsByDateRangeAtMonth = (events: Event[], currentDate: Date) => {
  const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  return filterEventsByDateRange(events, monthStart, monthEnd);
};

export const getFilteredEvents = (
  events: Event[],
  searchTerm: string,
  currentDate: Date,
  view: 'week' | 'month'
): Event[] => {
  const searchedEvents = searchEvents(events, searchTerm);

  if (view === 'week') {
    return filterEventsByDateRangeAtWeek(searchedEvents, currentDate);
  }

  if (view === 'month') {
    return filterEventsByDateRangeAtMonth(searchedEvents, currentDate);
  }

  return searchedEvents;
};
