import { Text } from '@chakra-ui/react';

import FilteredEventIem from './FilteredEventIem';
import { Event } from '../../types';

interface FilteredEventProps {
  filteredEvents: Event[];
  notifiedEvents: string[];
  editEvent: (event: Event) => void;
  deleteEvent: (id: string) => Promise<void>;
}
const FilteredEvent = ({
  filteredEvents,
  notifiedEvents,
  editEvent,
  deleteEvent,
}: FilteredEventProps) => {
  return (
    <>
      {filteredEvents.length === 0 ? (
        <Text>검색 결과가 없습니다.</Text>
      ) : (
        filteredEvents.map((event) => (
          <FilteredEventIem
            key={event.id}
            event={event}
            notifiedEvents={notifiedEvents}
            editEvent={editEvent}
            deleteEvent={deleteEvent}
          />
        ))
      )}
    </>
  );
};

export default FilteredEvent;
