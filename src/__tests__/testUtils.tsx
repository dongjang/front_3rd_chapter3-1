import { ChakraProvider } from '@chakra-ui/react';
import { render, screen, waitFor } from '@testing-library/react';
import { UserEvent, userEvent } from '@testing-library/user-event';

import App from '../App';

export const renderApp = () => {
  render(
    <ChakraProvider>
      <App />
    </ChakraProvider>
  );
  return userEvent.setup();
};

//넘어온 배열의 문자열이 화면에 있는지 확인
export const verifyEventListContent = async (expectedContent: string[]) => {
  const eventList = screen.getByTestId('event-list');
  await waitFor(() => {
    expectedContent.forEach((content) => {
      expect(eventList).toHaveTextContent(content);
    });
  });
};

//입력 받은 키의 요소가 value의 값이 있는지 확인
export async function checkFormValues(fieldNames: {
  [key: string]: string | number;
}): Promise<void> {
  for (const [fieldName, expectedValue] of Object.entries(fieldNames)) {
    const field = screen.getByTestId(fieldName);
    expect(field).toHaveValue(expectedValue);
  }
}

type FormValues = {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  location: string;
  category: string;
};

//입력한 요소를 넘겨 받은 값으로 변경
export const fillForm = async ({
  title,
  date,
  startTime,
  endTime,
  description,
  location,
  category,
}: FormValues) => {
  const user: UserEvent = userEvent.setup();
  const titleField = screen.getByTestId('title');
  const dateField = screen.getByTestId('date');
  const startTimeField = screen.getByTestId('startTime');
  const endTimeField = screen.getByTestId('endTime');
  const descriptionField = screen.getByTestId('description');
  const locationField = screen.getByTestId('location');
  const categoryField = screen.getByTestId('category');

  await user.type(titleField, title);
  await user.type(dateField, date);
  await user.type(startTimeField, startTime);
  await user.type(endTimeField, endTime);
  await user.type(descriptionField, description);
  await user.type(locationField, location);
  await user.selectOptions(categoryField, category);
};

//입력한 문자열의 요소의 값 초기화
export const clearFieldsByTestIds = async (testIds: string[]) => {
  for (const testId of testIds) {
    const field = screen.getByTestId(testId);
    await userEvent.clear(field);
  }
};
