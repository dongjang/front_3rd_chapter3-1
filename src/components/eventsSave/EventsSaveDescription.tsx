import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';

interface EventsSaveDescriptionProps {
  description: string;
  setDescription: (value: React.SetStateAction<string>) => void;
}

const EventsSaveDescription = ({ description, setDescription }: EventsSaveDescriptionProps) => {
  function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }
  return (
    <>
      <FormControl>
        <FormLabel>설명</FormLabel>
        <Input value={description} onChange={handleDescriptionChange} />
      </FormControl>
    </>
  );
};

export default EventsSaveDescription;
