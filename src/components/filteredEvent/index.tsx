import { Text } from '@chakra-ui/react';

import FilteredEventIem from './FilteredEventIem';
import { Event } from '../../types';

interface FilteredEventProps {
  filteredEvents: Event[];
  notifiedEvents: string[];
}
const FilteredEvent = ({ filteredEvents, notifiedEvents }: FilteredEventProps) => {
  return (
    <>
      {filteredEvents.length === 0 ? (
        <Text>검색 결과가 없습니다.</Text>
      ) : (
        filteredEvents.map((event) => (
          <FilteredEventIem event={event} notifiedEvents={notifiedEvents} />
        ))
      )}
    </>
  );
};

export default FilteredEvent;
