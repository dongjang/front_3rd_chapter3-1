import { AlertDialogFooter, Button } from '@chakra-ui/react';
import React from 'react';

const AlertDialogFooter = () => {
  return (
    <>
      <Button ref={cancelRef} onClick={() => setIsOverlapDialogOpen(false)}>
        취소
      </Button>
      <Button
        colorScheme="red"
        onClick={() => {
          setIsOverlapDialogOpen(false);
          saveEvent({
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
          });
        }}
        ml={3}
      >
        계속 진행
      </Button>
    </>
  );
};

export default AlertDialogFooter;
