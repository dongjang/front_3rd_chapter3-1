import { Event } from '../../types';
import {
  convertEventToDateRange,
  findOverlappingEvents,
  isOverlapping,
  parseDateTime,
} from '../../utils/eventOverlap';

describe('parseDateTime', () => {
  it('2024-07-01 14:30을 정확한 Date 객체로 변환한다', () => {
    const dateResult = parseDateTime('2024-07-01', '14:30');

    if (typeof dateResult === 'string') {
      throw new Error(`Expected a valid Date, but got: ${dateResult}`);
    }
    expect(dateResult.toISOString()).toBe('2024-07-01T14:30:00.000Z');
  });

  it('잘못된 날짜 형식에 대해 Invalid Date를 반환한다', () => {
    const dateResult = parseDateTime('2024-07-35', '14:30');
    expect(dateResult).toBe('Invalid Date');
  });

  it('잘못된 시간 형식에 대해 Invalid Date를 반환한다', () => {
    const dateResult = parseDateTime('2024-07-35', '25:30');
    expect(dateResult).toBe('Invalid Date');
  });

  it('날짜 문자열이 비어있을 때 Invalid Date를 반환한다', () => {
    const dateResult = parseDateTime('', '25:30');
    expect(dateResult).toBe('Invalid Date');
  });
});

describe('convertEventToDateRange', () => {
  it('일반적인 이벤트를 올바른 시작 및 종료 시간을 가진 객체로 변환한다', () => {
    const event1: Event = {
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
    };

    const result = convertEventToDateRange(event1);

    if (result !== 'Invalid Date') {
      const { start, end } = result;
      expect(start.toISOString()).toBe('2024-11-01T10:00:00.000Z');
      expect(end.toISOString()).toBe('2024-11-01T11:00:00.000Z');
    } else {
      expect(result).toBe('Invalid Date');
    }
  });

  it('잘못된 날짜 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const event1: Event = {
      id: '1',
      title: '회의',
      date: '2024-11-35',
      startTime: '10:00',
      endTime: '11:00',
      description: '프로젝트 회의',
      location: '사무실',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 30,
    };

    const result = convertEventToDateRange(event1);

    if (result !== 'Invalid Date') {
      const { start, end } = result;
      expect(start.toISOString()).toBe('2024-11-01T10:00:00.000Z');
      expect(end.toISOString()).toBe('2024-11-01T11:00:00.000Z');
    } else {
      expect(result).toBe('Invalid Date');
    }
  });

  it('잘못된 시간 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const event1: Event = {
      id: '1',
      title: '회의',
      date: '2024-11-01',
      startTime: '32:00',
      endTime: '42:00',
      description: '프로젝트 회의',
      location: '사무실',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 30,
    };

    const result = convertEventToDateRange(event1);

    if (result !== 'Invalid Date') {
      const { start, end } = result;
      expect(start.toISOString()).toBe('2024-11-01T10:00:00.000Z');
      expect(end.toISOString()).toBe('2024-11-01T11:00:00.000Z');
    } else {
      expect(result).toBe('Invalid Date');
    }
  });
});

describe('isOverlapping', () => {
  const events1: Event = {
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
  };
  const events2: Event = {
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
  };

  it('두 이벤트가 겹치는 경우 true를 반환한다', () => {
    const result = isOverlapping(events1, events1);
    expect(result).toBe(true);
  });

  it('두 이벤트가 겹치지 않는 경우 false를 반환한다', () => {
    const result = isOverlapping(events1, events2);
    expect(result).toBe(false);
  });
});

describe('findOverlappingEvents', () => {
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

  const overLappingEvent: Event = {
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
  };

  const notOverLappingEvent: Event = {
    id: '3',
    title: '동호회',
    date: '2024-11-03',
    startTime: '12:00',
    endTime: '11:00',
    description: '회사 친목',
    location: '볼링장',
    category: '업무',
    repeat: { type: 'daily', interval: 0 },
    notificationTime: 20,
  };

  it('새 이벤트와 겹치는 모든 이벤트를 반환한다', () => {
    const result = findOverlappingEvents(overLappingEvent, events);

    expect(result).toEqual([overLappingEvent]);
  });

  it('겹치는 이벤트가 없으면 빈 배열을 반환한다', () => {
    const result = findOverlappingEvents(notOverLappingEvent, events);

    expect(result).toEqual([]);
  });
});
