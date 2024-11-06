import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';

interface EventsSaveLocationProps {
  location: string;
  setLocation: (value: React.SetStateAction<string>) => void;
}

const EventsSaveLocation = ({ location, setLocation }: EventsSaveLocationProps) => {
  function handleLocationChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLocation(event.target.value);
  }
  return (
    <>
      <FormControl>
        <FormLabel>위치</FormLabel>
        <Input value={location} onChange={handleLocationChange} />
      </FormControl>
    </>
  );
};

export default EventsSaveLocation;
