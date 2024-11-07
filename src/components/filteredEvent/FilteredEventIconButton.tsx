import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { HStack, IconButton } from '@chakra-ui/react';

import { Event } from '../../types';

interface FilteredEventIconButtonProps {
  event: Event;
  editEvent: (event: Event) => void;
  deleteEvent: (id: string) => Promise<void>;
  index: number;
}
const FilteredEventIconButton = ({
  event,
  editEvent,
  deleteEvent,
  index,
}: FilteredEventIconButtonProps) => {
  return (
    <>
      <HStack>
        <IconButton
          data-testid={`update_${index}`}
          aria-label="Edit event"
          icon={<EditIcon />}
          onClick={() => editEvent(event)}
        />
        <IconButton
          data-testid={`delete_${index}`}
          aria-label="Delete event"
          icon={<DeleteIcon />}
          onClick={() => deleteEvent(event.id)}
        />
      </HStack>
    </>
  );
};

export default FilteredEventIconButton;
