import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import React from 'react';

import { Event } from '../../types';
import AlertDialogBody from './AlertDialogBody';
import AlertDialogFooter from './AlertDialogFooter';

interface AlertDialogProps {
  isOverlapDialogOpen: boolean;
  setIsOverlapDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cancelRef: React.RefObject<HTMLButtonElement>;
  overlappingEvents: Event[];
}

const AlertDialogIndex = ({
  isOverlapDialogOpen,
  setIsOverlapDialogOpen,
  cancelRef,
  overlappingEvents,
}: AlertDialogProps) => {
  return (
    <>
      <AlertDialog
        isOpen={isOverlapDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOverlapDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              일정 겹침 경고
            </AlertDialogHeader>

            {/* <AlertDialogBody/>  */}
            <AlertDialogBody overlappingEvents={overlappingEvents} />
            {/* <AlertDialogFooter > */}
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default AlertDialogIndex;
