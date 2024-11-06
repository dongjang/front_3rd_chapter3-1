import { useState } from 'react';

import { useEventForm } from './useEventForm';
import { useEventOperations } from './useEventOperations';
import { Event, EventForm } from '../types';
import { findOverlappingEvents } from '../utils/eventOverlap';

export const useOverlap = (events: Event[]) => {
  const [isOverlapDialogOpen, setIsOverlapDialogOpen] = useState(false);
  const [overlappingEvents, setOverlappingEvents] = useState<Event[]>([]);

  const {
    editingEvent,
    setEditingEvent,
    title,
    date,
    startTime,
    endTime,
    description,
    location,
    category,
    isRepeating,
    repeatType,
    repeatInterval,
    repeatEndDate,
    notificationTime,
    resetForm,
  } = useEventForm();
  const { saveEvent } = useEventOperations(Boolean(editingEvent), () => setEditingEvent(null));

  const handleOverlapping = async () => {
    const eventData: Event | EventForm = {
      id: editingEvent ? editingEvent.id : undefined,
      title,
      date,
      startTime,
      endTime,
      description,
      location,
      category,
      repeat: {
        type: isRepeating ? repeatType : 'none',
        interval: repeatInterval,
        endDate: repeatEndDate || undefined,
      },
      notificationTime,
    };

    const overlapping = findOverlappingEvents(eventData, events);
    if (overlapping.length > 0) {
      setOverlappingEvents(overlapping);
      setIsOverlapDialogOpen(true);
    } else {
      await saveEvent(eventData);
      resetForm();
    }
  };
  return { isOverlapDialogOpen, overlappingEvents, handleOverlapping };
};
