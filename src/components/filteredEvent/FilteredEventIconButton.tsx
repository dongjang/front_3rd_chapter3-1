import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { HStack, IconButton } from '@chakra-ui/react';

import { Event } from '../../types';

interface FilteredEventIconButtonProps {
  event: Event;
  editEvent: (event: Event) => void;
  deleteEvent: (id: string) => Promise<void>;
}
const FilteredEventIconButton = ({
  event,
  editEvent,
  deleteEvent,
}: FilteredEventIconButtonProps) => {
  return (
    <>
      <HStack>
        <IconButton aria-label="Edit event" icon={<EditIcon />} onClick={() => editEvent(event)} />
        <IconButton
          aria-label="Delete event"
          icon={<DeleteIcon />}
          onClick={() => deleteEvent(event.id)}
        />
      </HStack>
    </>
  );
};

export default FilteredEventIconButton;
