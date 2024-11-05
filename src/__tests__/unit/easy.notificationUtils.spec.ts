import { Event } from '../../types';
import { createNotificationMessage, getUpcomingEvents } from '../../utils/notificationUtils';

describe('getUpcomingEvents', () => {
  const events: Event[] = [
    {
      id: '1',
      title: '회의',
      date: '2024-11-01',
      startTime: '10:00',
      endTime: '11:00',
      description: '프로젝트 회의',
      location: '사무실',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 30,
    },
    {
      id: '2',
      title: '운동',
      date: '2024-11-01',
      startTime: '18:00',
      endTime: '19:00',
      description: '헬스장 운동',
      location: '헬스장',
      category: '개인',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 60,
    },
  ];

  const now = new Date('2024-11-01T09:45');
  const notifiedEvents = ['1'];

  it('알림 시간이 정확히 도래한 이벤트를 반환한다', () => {
    const result = getUpcomingEvents(events, new Date('2024-11-01T09:45'), []);
    expect(result).toEqual([events[0]]);
  });

  it('이미 알림이 간 이벤트는 제외한다', () => {
    const result = getUpcomingEvents(events, now, notifiedEvents);
    expect(result).toEqual([]);
  });

  it('알림 시간이 아직 도래하지 않은 이벤트는 반환하지 않는다', () => {
    const result = getUpcomingEvents(events, new Date('2024-11-01T08:00'), []);
    expect(result).toEqual([]);
  });

  it('알림 시간이 지난 이벤트는 반환하지 않는다', () => {
    const result = getUpcomingEvents(events, new Date('2024-11-01T10:30'), []);
    expect(result).toEqual([]);
  });
});

describe('createNotificationMessage', () => {
  it('올바른 알림 메시지를 생성해야 한다', () => {
    const event: Event = {
      id: '034ef95e-dc46-4a4c-b8ff-eb432ab78007',
      title: '회의',
      date: '2024-11-01',
      startTime: '10:00',
      endTime: '11:00',
      description: '홍길동',
      location: '사무실',
      category: '업무',
      repeat: {
        type: 'none',
        interval: 1,
        endDate: '2024-11-01',
      },
      notificationTime: 10,
    };

    const notificationMessage = createNotificationMessage(event);

    expect(notificationMessage).toBe('10분 후 회의 일정이 시작됩니다.');
  });
});
