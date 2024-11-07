import { useToast } from '@chakra-ui/react';
import React, { useState } from 'react';

import { Event, EventForm, RepeatType } from '../types';
import { useEventOperations } from './useEventOperations';
import { findOverlappingEvents } from '../utils/eventOverlap';

export const useOverlap = (
  editingEvent: Event | null,
  resetForm: () => void,
  title: string,
  date: string,
  startTime: string,
  endTime: string,
  startTimeError: string | null,
  endTimeError: string | null,
  description: string,
  location: string,
  category: string,
  isRepeating: boolean,
  repeatType: RepeatType,
  repeatInterval: number,
  repeatEndDate: string,
  notificationTime: number,
  saveEvent: (eventData: Event | EventForm) => Promise<void>,
  events: Event[]
) => {
  const [isOverlapDialogOpen, setIsOverlapDialogOpen] = useState(false);
  const [overlappingEvents, setOverlappingEvents] = useState<Event[]>([]);

  const toast = useToast();

  const addOrUpdateEvent = async () => {
    if (!title || !date || !startTime || !endTime) {
      toast({
        title: '필수 정보를 모두 입력해주세요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (startTimeError || endTimeError) {
      toast({
        title: '시간 설정을 확인해주세요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

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

    console.log(eventData);
    const overlapping = findOverlappingEvents(eventData, events);
    console.log(overlapping);
    if (overlapping.length > 0) {
      setOverlappingEvents(overlapping);
      setIsOverlapDialogOpen(true);
    } else {
      await saveEvent(eventData);
      resetForm();
    }
  };

  return { isOverlapDialogOpen, setIsOverlapDialogOpen, addOrUpdateEvent, overlappingEvents };
};
