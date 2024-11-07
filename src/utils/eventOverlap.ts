import { Event, EventForm } from '../types';

export const parseDateTime = (date: string, time: string) => {
  const parsedDate = new Date(`${date}T${time}`);

  if (isNaN(parsedDate.getTime()) || !time.match(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/)) {
    return 'Invalid Date';
  }

  return new Date(`${date}T${time}`);
};

//convertEventToDateRange, isOverlapping, findOverlappingEvents 변경

export const convertEventToDateRange = ({ date, startTime, endTime }: Event | EventForm) => {
  const start = parseDateTime(date, startTime);
  const end = parseDateTime(date, endTime);

  if (start === 'Invalid Date' || end === 'Invalid Date') {
    return 'Invalid Date';
  }
  return {
    start: start as Date,
    end: end as Date,
  };
};

export const isOverlapping = (event1: Event | EventForm, event2: Event | EventForm) => {
  const dateRange1 = convertEventToDateRange(event1);
  const dateRange2 = convertEventToDateRange(event2);

  if (dateRange1 === 'Invalid Date' || dateRange2 === 'Invalid Date') {
    return false;
  }

  const { start: start1, end: end1 } = dateRange1;
  const { start: start2, end: end2 } = dateRange2;

  return start1 < end2 && start2 < end1;
};

export const findOverlappingEvents = (newEvent: Event | EventForm, events: Event[]) => {
  return events.filter((event) => event.id === (newEvent as Event).id);
};
