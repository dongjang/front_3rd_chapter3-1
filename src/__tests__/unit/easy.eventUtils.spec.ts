import { Event } from '../../types';
import { getFilteredEvents } from '../../utils/eventUtils';

describe('getFilteredEvents', () => {
  it("검색어 '이벤트 2'에 맞는 이벤트만 반환한다", () => {
    const events: Event[] = [
      {
        id: '1',
        title: '이벤트 1',
        date: '2024-07-01',
        startTime: '10:00',
        endTime: '12:00',
        description: '',
        location: '',
        category: '',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 30,
      },
      {
        id: '2',
        title: '이벤트 2',
        date: '2024-07-02',
        startTime: '13:00',
        endTime: '14:00',
        description: '',
        location: '',
        category: '',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 30,
      },
    ];
    const searchTerm = '이벤트 2';
    const currentDate = new Date('2024-07-01');

    const result = getFilteredEvents(events, searchTerm, currentDate, 'month');

    expect(result).toEqual([events[1]]);
  });

  it('주간 뷰에서 2024-07-01 주의 이벤트만 반환한다', () => {
    const events: Event[] = [
      {
        id: '1',
        title: '이벤트 1',
        date: '2024-07-01',
        startTime: '10:00',
        endTime: '12:00',
        description: '',
        location: '',
        category: '',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 30,
      },
      {
        id: '2',
        title: '이벤트 2',
        date: '2024-07-10',
        startTime: '13:00',
        endTime: '14:00',
        description: '',
        location: '',
        category: '',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 30,
      },
    ];
    const currentDate = new Date('2024-07-01');

    const result = getFilteredEvents(events, '', currentDate, 'week');

    expect(result).toEqual([events[0]]);
  });

  it('월간 뷰에서 2024년 7월의 모든 이벤트를 반환한다', () => {
    const events: Event[] = [
      {
        id: '1',
        title: '이벤트 1',
        date: '2024-07-01',
        startTime: '10:00',
        endTime: '12:00',
        description: '',
        location: '',
        category: '',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 30,
      },
      {
        id: '2',
        title: '이벤트 2',
        date: '2024-07-10',
        startTime: '13:00',
        endTime: '14:00',
        description: '',
        location: '',
        category: '',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 30,
      },
      {
        id: '3',
        title: '이벤트 3',
        date: '2024-08-01',
        startTime: '09:00',
        endTime: '11:00',
        description: '',
        location: '',
        category: '',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 30,
      },
    ];
    const currentDate = new Date('2024-07-01');

    const result = getFilteredEvents(events, '', currentDate, 'month');

    expect(result).toContain(events[0]);
    expect(result).toContain(events[1]);

    expect(result).not.toContain(events[2]);
  });

  it("검색어 '이벤트'와 주간 뷰 필터링을 동시에 적용한다", () => {
    const events: Event[] = [
      {
        id: '1',
        title: '이벤트 1',
        date: '2024-07-01',
        startTime: '10:00',
        endTime: '12:00',
        description: '',
        location: '',
        category: '',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 30,
      },
      {
        id: '2',
        title: '이벤트 2',
        date: '2024-07-05',
        startTime: '13:00',
        endTime: '14:00',
        description: '',
        location: '',
        category: '',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 30,
      },
      {
        id: '3',
        title: '이벤트 3',
        date: '2024-07-10',
        startTime: '09:00',
        endTime: '11:00',
        description: '',
        location: '',
        category: '',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 30,
      },
    ];
    const searchTerm = '이벤트';
    const currentDate = new Date('2024-07-01');

    const result = getFilteredEvents(events, searchTerm, currentDate, 'week');

    expect(result).toContain(events[0]);
    expect(result).toContain(events[1]);

    expect(result).not.toContain(events[2]);
  });

  it('검색어가 없을 때 모든 이벤트를 반환한다', () => {
    const events: Event[] = [
      {
        id: '1',
        title: '이벤트 1',
        date: '2024-07-01',
        startTime: '10:00',
        endTime: '12:00',
        description: '',
        location: '',
        category: '',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 30,
      },
      {
        id: '2',
        title: '이벤트 2',
        date: '2024-07-05',
        startTime: '13:00',
        endTime: '14:00',
        description: '',
        location: '',
        category: '',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 30,
      },
    ];

    const result = getFilteredEvents(events, '', new Date('2024-07-01'), 'month');

    expect(result).toEqual(events);
  });

  it('검색어가 대소문자를 구분하지 않고 작동한다', () => {
    const events: Event[] = [
      {
        id: '1',
        title: '이벤트',
        date: '2024-07-01',
        startTime: '10:00',
        endTime: '12:00',
        description: '',
        location: '',
        category: '',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 30,
      },
    ];
    const searchTerm = '이벤트'.toUpperCase();

    const result = getFilteredEvents(events, searchTerm, new Date('2024-07-01'), 'month');

    expect(result).toEqual([events[0]]);
  });

  it('월의 경계에 있는 이벤트를 올바르게 필터링한다', () => {
    const events: Event[] = [
      {
        id: '1',
        title: '경계 이벤트',
        date: '2024-06-30',
        startTime: '10:00',
        endTime: '12:00',
        description: '',
        location: '',
        category: '',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 30,
      },
      {
        id: '2',
        title: '7월 이벤트',
        date: '2024-07-01',
        startTime: '10:00',
        endTime: '12:00',
        description: '',
        location: '',
        category: '',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 30,
      },
    ];
    const currentDate = new Date('2024-07-01');

    const result = getFilteredEvents(events, '', currentDate, 'month');

    expect(result).toEqual([events[1]]);
  });

  it('빈 이벤트 리스트에 대해 빈 배열을 반환한다', () => {
    const events: Event[] = [];

    const result = getFilteredEvents(events, '', new Date('2024-07-01'), 'month');

    expect(result).toEqual([]);
  });
});
