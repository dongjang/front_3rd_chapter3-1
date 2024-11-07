import { fireEvent, screen, waitFor } from '@testing-library/react';
import { UserEvent, userEvent } from '@testing-library/user-event';

import {
  checkFormValues,
  clearFieldsByTestIds,
  fillForm,
  renderApp,
  verifyEventListContent,
} from './testUtils';
import {
  setupMockHandlerCreation,
  setupMockHandlerDeletion,
  setupMockHandlerUpdating,
} from '../__mocks__/handlersUtils';

describe('EventSave', () => {
  let user: UserEvent;
  beforeEach(() => {
    renderApp();
    user = userEvent.setup();
  });
  it('일정 추가의 초기값을 확인할 수 있다.', async () => {
    const isRepeating = screen.getByTestId('isRepeating');
    const isRepeatingCheck = isRepeating.querySelector('input[type="checkbox"]');
    expect(isRepeatingCheck).toBeChecked();

    await checkFormValues({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      description: '',
      location: '',
      category: '',
      notificationTime: '10',
      repeatType: 'daily',
      repeatInterval: 1,
      repeatEndDate: '',
    });
  });

  //hooks를 거의 여기 실행될 때만 나눴는데 hooks를 따로 테스트 하기가 애매해서 ui 테스트로 진행
  it('필수 값을 입력하지 않고 일정을 추가할 때는 알림이 나와야 한다.', async () => {
    const saveButton = screen.getByTestId('event-submit-button');
    user.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('필수 정보를 모두 입력해주세요.')).toBeInTheDocument();
    });
  });

  it('일정을 입력한 값으로 정확하게 등록할 수 있어야 한다.', async () => {
    setupMockHandlerCreation();

    await fillForm({
      title: '운동5',
      date: '2024-10-03',
      startTime: '10:00',
      endTime: '12:00',
      description: '웨이트 트레이닝',
      location: '헬스장',
      category: '개인',
    });

    const saveButton = screen.getByTestId('event-submit-button');
    await user.click(saveButton);

    await waitFor(() => {
      verifyEventListContent([
        '운동5',
        '2024-10-03',
        '10:00 - 12:00',
        '웨이트 트레이닝',
        '헬스장',
        '카테고리: 개인',
      ]);
    });
  });
});
describe('FilteredEvent', () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('수정할 정보가 정확하게 표시되고 수정한 데이터로 수정돼야 한다.', async () => {
    setupMockHandlerUpdating();
    renderApp();

    const updateButton = await screen.findByTestId('update_0');

    await user.click(updateButton);

    await verifyEventListContent([
      '기존 회의',
      '2024-10-15',
      '09:00',
      '10:00',
      '기존 팀 미팅',
      '회의실 B',
      '업무',
      '10',
    ]);

    await clearFieldsByTestIds([
      'title',
      'date',
      'startTime',
      'endTime',
      'description',
      'location',
    ]);

    await fillForm({
      title: '운동3',
      date: '2024-10-05',
      startTime: '13:00',
      endTime: '16:00',
      description: '웨이트 트레이닝34',
      location: '헬스장56',
      category: '기타',
    });

    const submitButton = screen.getByTestId('event-submit-button');
    await user.click(submitButton);

    const continueButton = screen.getByTestId('continueButton');
    await user.click(continueButton);

    await verifyEventListContent([
      '운동3',
      '2024-10-05',
      '13:00 - 16:00',
      '웨이트 트레이닝34',
      '헬스장56',
      '카테고리: 기타',
    ]);
  });

  it('삭제할 일정이 정상적으로 삭제돼야 한다.', async () => {
    setupMockHandlerDeletion();
    renderApp();
    const eventList = screen.getByTestId('event-list');
    await waitFor(async () => {
      await verifyEventListContent([
        '삭제할 이벤트',
        '2024-10-15',
        '09:00 - 10:00',
        '삭제할 이벤트입니다',
        '어딘가',
        '카테고리: 기타',
      ]);

      const deleteButton = await screen.findByTestId('delete_0');
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(eventList).toHaveTextContent('검색 결과가 없습니다.');
      });
    });
  });
});
