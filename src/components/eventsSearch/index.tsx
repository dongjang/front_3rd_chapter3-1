import { VStack } from '@chakra-ui/react';
import React from 'react';

import { Event } from '../../types';
import FilteredEvent from '../filteredEvent';
import EventsSearchInput from './EventsSearchInput';

interface EventsSearchProps {
  searchTerm: string;
  setSearchTerm: (value: React.SetStateAction<string>) => void;
  filteredEvents: Event[];
  notifiedEvents: string[];
  editEvent: (event: Event) => void;
  deleteEvent: (id: string) => Promise<void>;
}

const EventSearch = ({
  searchTerm,
  setSearchTerm,
  filteredEvents,
  notifiedEvents,
  editEvent,
  deleteEvent,
}: EventsSearchProps) => {
  return (
    <>
      <VStack data-testid="event-list" w="500px" h="full" overflowY="auto">
        <EventsSearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <FilteredEvent
          filteredEvents={filteredEvents}
          notifiedEvents={notifiedEvents}
          editEvent={editEvent}
          deleteEvent={deleteEvent}
        />
      </VStack>
    </>
  );
};

export default EventSearch;
