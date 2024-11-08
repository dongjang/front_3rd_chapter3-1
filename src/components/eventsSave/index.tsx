import { Heading, VStack } from '@chakra-ui/react';
import React from 'react';

import { Event, EventForm, RepeatType } from '../../types';
import Repeating from '../repeating';
import EventsSaveButton from './EventsSaveButton';
import EventsSaveCategories from './EventsSaveCategories';
import EventsSaveDate from './EventsSaveDate';
import EventsSaveDescription from './EventsSaveDescription';
import EventsSaveLocation from './EventsSaveLocation';
import EventsSaveRepeatingSettings from './EventsSaveRepeatingSettings';
import EventsSaveSettings from './EventsSaveSettings';
import EventsSaveTimeSettings from './EventsSaveTimeSettings';
import EventsSaveTitle from './EventsSaveTitle';

interface EventsSaveProps {
  editingEvent: Event | null;
  title: string;
  setTitle: (value: React.SetStateAction<string>) => void;
  date: string;
  setDate: (value: React.SetStateAction<string>) => void;
  description: string;
  setDescription: (value: React.SetStateAction<string>) => void;
  location: string;
  setLocation: (value: React.SetStateAction<string>) => void;
  category: string;
  setCategory: (value: React.SetStateAction<string>) => void;
  isRepeating: boolean;
  setIsRepeating: (value: React.SetStateAction<boolean>) => void;
  notificationTime: number;
  setNotificationTime: (value: React.SetStateAction<number>) => void;
  startTimeError: string | null;
  startTime: string;
  handleStartTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  endTimeError: string | null;
  endTime: string;
  handleEndTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  repeatType: RepeatType;
  setRepeatType: (value: React.SetStateAction<RepeatType>) => void;
  repeatInterval: number;
  setRepeatInterval: React.Dispatch<React.SetStateAction<number>>;
  repeatEndDate: string;
  setRepeatEndDate: (value: React.SetStateAction<string>) => void;
  addOrUpdateEvent: () => Promise<void>;
}

const EventSave = ({
  editingEvent,
  title,
  setTitle,
  date,
  setDate,
  description,
  setDescription,
  location,
  setLocation,
  category,
  setCategory,
  isRepeating,
  setIsRepeating,
  notificationTime,
  setNotificationTime,
  startTimeError,
  startTime,
  handleStartTimeChange,
  endTimeError,
  endTime,
  handleEndTimeChange,
  repeatType,
  setRepeatType,
  repeatInterval,
  setRepeatInterval,
  repeatEndDate,
  setRepeatEndDate,

  addOrUpdateEvent,
}: EventsSaveProps) => {
  return (
    <>
      <VStack w="400px" spacing={5} align="stretch">
        <Heading>{editingEvent ? '일정 수정' : '일정 추가'}</Heading>
        <EventsSaveTitle title={title} setTitle={setTitle} />

        <EventsSaveDate date={date} setDate={setDate} />

        <EventsSaveTimeSettings
          startTimeError={startTimeError}
          startTime={startTime}
          handleStartTimeChange={handleStartTimeChange}
          endTimeError={endTimeError}
          endTime={endTime}
          handleEndTimeChange={handleEndTimeChange}
        />

        <EventsSaveDescription description={description} setDescription={setDescription} />

        <EventsSaveLocation location={location} setLocation={setLocation} />

        <EventsSaveCategories category={category} setCategory={setCategory} />

        <EventsSaveRepeatingSettings isRepeating={isRepeating} setIsRepeating={setIsRepeating} />

        <EventsSaveSettings
          notificationTime={notificationTime}
          setNotificationTime={setNotificationTime}
        />
        {isRepeating && (
          <Repeating
            repeatType={repeatType}
            setRepeatType={setRepeatType}
            repeatInterval={repeatInterval}
            setRepeatInterval={setRepeatInterval}
            repeatEndDate={repeatEndDate}
            setRepeatEndDate={setRepeatEndDate}
          />
        )}

        <EventsSaveButton editingEvent={editingEvent} addOrUpdateEvent={addOrUpdateEvent} />
      </VStack>
    </>
  );
};

export default EventSave;
