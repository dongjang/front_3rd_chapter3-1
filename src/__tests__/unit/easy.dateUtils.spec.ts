import { Event } from '../../types';
import {
  fillZero,
  formatDate,
  formatMonth,
  formatWeek,
  getDateOfCurrentWeek,
  getDaysInMonth,
  getEventsForDay,
  getWeekDates,
  getWeeksAtMonth,
  isDateInRange,
} from '../../utils/dateUtils';

describe('getDaysInMonth', () => {
  it('1월은 31일 일수를 반환한다', () => {
    const days = getDaysInMonth(2024, 1);
    expect(days).toBe(31);
  });

  it('4월은 30일 일수를 반환한다', () => {
    const days = getDaysInMonth(2024, 4);
    expect(days).toBe(30);
  });

  it('윤년의 2월에 대해 29일을 반환한다', () => {
    const days = getDaysInMonth(2024, 2);
    expect(days).toBe(29);
  });

  it('평년의 2월에 대해 28일을 반환한다', () => {
    const days = getDaysInMonth(2023, 2);
    expect(days).toBe(28);
  });

  it('유효하지 않은 월에 대해 적절히 처리한다', () => {
    const days = getDaysInMonth(2023, 13);
    expect(days).toBe(0);
  });
});

describe('getWeekDates', () => {
  it('주중의 날짜(수요일)에 대해 올바른 주의 날짜들을 반환한다', () => {
    const days = getWeekDates(getDateOfCurrentWeek('Wednesday'));

    const expectedDates = [
      '2024-09-30T00:00:00.000Z',
      '2024-10-01T00:00:00.000Z',
      '2024-10-02T00:00:00.000Z',
      '2024-10-03T00:00:00.000Z',
      '2024-10-04T00:00:00.000Z',
      '2024-10-05T00:00:00.000Z',
      '2024-10-06T00:00:00.000Z',
    ];

    const daysISOStrings = days.map((day) => day.toISOString());

    expect(daysISOStrings).toEqual(expectedDates);
  });

  it('주의 시작(월요일)에 대해 올바른 주의 날짜들을 반환한다', () => {
    const days = getWeekDates(getDateOfCurrentWeek('Monday'));

    const expectedDates = [
      '2024-09-30T00:00:00.000Z',
      '2024-10-01T00:00:00.000Z',
      '2024-10-02T00:00:00.000Z',
      '2024-10-03T00:00:00.000Z',
      '2024-10-04T00:00:00.000Z',
      '2024-10-05T00:00:00.000Z',
      '2024-10-06T00:00:00.000Z',
    ];

    const daysISOStrings = days.map((day) => day.toISOString());

    expect(daysISOStrings).toEqual(expectedDates);
  });

  it('주의 끝(일요일)에 대해 올바른 주의 날짜들을 반환한다', () => {
    const days = getWeekDates(getDateOfCurrentWeek('Sunday'));
    const expectedDates = [
      '2024-09-30T00:00:00.000Z',
      '2024-10-01T00:00:00.000Z',
      '2024-10-02T00:00:00.000Z',
      '2024-10-03T00:00:00.000Z',
      '2024-10-04T00:00:00.000Z',
      '2024-10-05T00:00:00.000Z',
      '2024-10-06T00:00:00.000Z',
    ];

    const daysISOStrings = days.map((day) => day.toISOString());

    expect(daysISOStrings).toEqual(expectedDates);
  });

  it('연도를 넘어가는 주의 날짜를 정확히 처리한다 (연말)', () => {
    const days = getWeekDates(new Date('2024-12-31'));
    const expectedDates = [
      '2024-12-30T00:00:00.000Z',
      '2024-12-31T00:00:00.000Z',
      '2025-01-01T00:00:00.000Z',
      '2025-01-02T00:00:00.000Z',
      '2025-01-03T00:00:00.000Z',
      '2025-01-04T00:00:00.000Z',
      '2025-01-05T00:00:00.000Z',
    ];

    const daysISOStrings = days.map((day) => day.toISOString());

    expect(daysISOStrings).toEqual(expectedDates);
  });

  it('연도를 넘어가는 주의 날짜를 정확히 처리한다 (연초)', () => {
    const days = getWeekDates(new Date('2025-01-01'));
    const expectedDates = [
      '2024-12-30T00:00:00.000Z',
      '2024-12-31T00:00:00.000Z',
      '2025-01-01T00:00:00.000Z',
      '2025-01-02T00:00:00.000Z',
      '2025-01-03T00:00:00.000Z',
      '2025-01-04T00:00:00.000Z',
      '2025-01-05T00:00:00.000Z',
    ];

    const daysISOStrings = days.map((day) => day.toISOString());

    expect(daysISOStrings).toEqual(expectedDates);
  });

  it('윤년의 2월 29일을 포함한 주를 올바르게 처리한다', () => {
    const days = getWeekDates(new Date('2024-02-29'));

    const expectedDates = [
      '2024-02-26T00:00:00.000Z',
      '2024-02-27T00:00:00.000Z',
      '2024-02-28T00:00:00.000Z',
      '2024-02-29T00:00:00.000Z',
      '2024-03-01T00:00:00.000Z',
      '2024-03-02T00:00:00.000Z',
      '2024-03-03T00:00:00.000Z',
    ];

    const daysISOStrings = days.map((day) => day.toISOString());

    expect(daysISOStrings).toEqual(expectedDates);
  });

  it('월의 마지막 날짜를 포함한 주를 올바르게 처리한다', () => {
    const days = getWeekDates(new Date('2024-01-31'));

    const expectedDates = [
      '2024-01-29T00:00:00.000Z',
      '2024-01-30T00:00:00.000Z',
      '2024-01-31T00:00:00.000Z',
      '2024-02-01T00:00:00.000Z',
      '2024-02-02T00:00:00.000Z',
      '2024-02-03T00:00:00.000Z',
      '2024-02-04T00:00:00.000Z',
    ];

    const daysISOStrings = days.map((day) => day.toISOString());

    expect(daysISOStrings).toEqual(expectedDates);
  });
});

describe('getWeeksAtMonth', () => {
  it('2024년 7월 1일의 올바른 주 정보를 반환해야 한다', () => {
    const expectedArray = [
      [null, 1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12, 13],
      [14, 15, 16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25, 26, 27],
      [28, 29, 30, 31, null, null, null],
    ];
    const result = getWeeksAtMonth(new Date('2024-07-01'));

    expect(result).toEqual(expectedArray);
  });
});

describe('getEventsForDay', () => {
  it('특정 날짜(1일)에 해당하는 이벤트만 정확히 반환한다', () => {
    const events: Event[] = [
      {
        id: '80d85368-b4a4-47b3-b959-25171d49371f',
        title: '운동',
        date: '2024-11-22',
        startTime: '18:00',
        endTime: '19:00',
        description: '주간 운동',
        location: '헬스장',
        category: '개인',
        repeat: {
          type: 'none',
          interval: 0,
        },
        notificationTime: 1,
      },
      {
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
      },
    ];

    const day1 = [
      {
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
      },
    ];

    const eventsResult = getEventsForDay(events, 1);
    expect(eventsResult).toEqual(day1);
  });

  it('해당 날짜에 이벤트가 없을 경우 빈 배열을 반환한다', () => {
    const events: Event[] = [
      {
        id: '80d85368-b4a4-47b3-b959-25171d49371f',
        title: '운동',
        date: '2024-11-22',
        startTime: '18:00',
        endTime: '19:00',
        description: '주간 운동',
        location: '헬스장',
        category: '개인',
        repeat: {
          type: 'none',
          interval: 0,
        },
        notificationTime: 1,
      },
      {
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
      },
    ];

    const eventsResult = getEventsForDay(events, 5);
    expect(eventsResult).toEqual([]);
  });

  it('날짜가 0일 경우 빈 배열을 반환한다', () => {
    const events: Event[] = [
      {
        id: '80d85368-b4a4-47b3-b959-25171d49371f',
        title: '운동',
        date: '2024-11-22',
        startTime: '18:00',
        endTime: '19:00',
        description: '주간 운동',
        location: '헬스장',
        category: '개인',
        repeat: {
          type: 'none',
          interval: 0,
        },
        notificationTime: 1,
      },
      {
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
      },
    ];

    const eventsResult = getEventsForDay(events, 0);
    expect(eventsResult).toEqual([]);
  });

  it('날짜가 32일 이상인 경우 빈 배열을 반환한다', () => {
    const events: Event[] = [
      {
        id: '80d85368-b4a4-47b3-b959-25171d49371f',
        title: '운동',
        date: '2024-11-22',
        startTime: '18:00',
        endTime: '19:00',
        description: '주간 운동',
        location: '헬스장',
        category: '개인',
        repeat: {
          type: 'none',
          interval: 0,
        },
        notificationTime: 1,
      },
      {
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
      },
    ];

    const eventsResult = getEventsForDay(events, 0);
    expect(eventsResult).toEqual([]);
  });
});

describe('formatWeek', () => {
  it('월의 중간 날짜에 대해 올바른 주 정보를 반환한다', () => {
    const resulstDate = formatWeek(new Date('2024-11-15'));

    expect(resulstDate).toBe('2024년 11월 2주');
  });

  it('월의 첫 주에 대해 올바른 주 정보를 반환한다', () => {
    const resulstDate = formatWeek(new Date('2024-11-04'));

    expect(resulstDate).toBe('2024년 11월 1주');
  });

  it('월의 마지막 주에 대해 올바른 주 정보를 반환한다', () => {
    const resulstDate = formatWeek(new Date('2024-11-30'));

    expect(resulstDate).toBe('2024년 11월 4주');
  });

  it('연도가 바뀌는 주에 대해 올바른 주 정보를 반환한다', () => {
    const resulstDate = formatWeek(new Date('2025-01-01'));

    expect(resulstDate).toBe('2025년 1월 1주');
  });

  it('윤년 2월의 마지막 주에 대해 올바른 주 정보를 반환한다', () => {
    const resulstDate = formatWeek(new Date('2024-02-29'));

    expect(resulstDate).toBe('2024년 2월 5주');
  });

  it('평년 2월의 마지막 주에 대해 올바른 주 정보를 반환한다', () => {
    const resulstDate = formatWeek(new Date('2023-02-29'));

    expect(resulstDate).toBe('2023년 3월 1주');
  });
});

describe('formatMonth', () => {
  it("2024년 7월 10일을 '2024년 7월'로 반환한다", () => {
    const result = formatMonth(new Date('2024-07-10'));
    expect(result).toBe('2024년 7월');
  });
});

describe('isDateInRange', () => {
  const rangeStart = new Date('2024-07-01');
  const rangeEnd = new Date('2024-07-31');

  it('범위 내의 날짜 2024-07-10에 대해 true를 반환한다', () => {
    const result = isDateInRange(new Date('2024-07-10'), rangeStart, rangeEnd);

    expect(result).toBe(true);
  });

  it('범위의 시작일 2024-07-01에 대해 true를 반환한다', () => {
    const result = isDateInRange(new Date('2024-07-01'), rangeStart, rangeEnd);

    expect(result).toBe(true);
  });

  it('범위의 종료일 2024-07-31에 대해 true를 반환한다', () => {
    const result = isDateInRange(new Date('2024-07-31'), rangeStart, rangeEnd);

    expect(result).toBe(true);
  });

  it('범위 이전의 날짜 2024-06-30에 대해 false를 반환한다', () => {
    const result = isDateInRange(new Date('2024-06-30'), rangeStart, rangeEnd);

    expect(result).toBe(false);
  });

  it('범위 이후의 날짜 2024-08-01에 대해 false를 반환한다', () => {
    const result = isDateInRange(new Date('2024-08-01'), rangeStart, rangeEnd);

    expect(result).toBe(false);
  });

  it('시작일이 종료일보다 늦은 경우 모든 날짜에 대해 false를 반환한다', () => {
    const result = isDateInRange(new Date('2024-07-01'), rangeEnd, rangeStart);

    expect(result).toBe(false);
  });
});

describe('fillZero', () => {
  test("5를 2자리로 변환하면 '05'를 반환한다", () => {
    const result = fillZero(5, 2);

    expect(result).toBe('05');
  });

  test("10을 2자리로 변환하면 '10'을 반환한다", () => {
    const result = fillZero(10, 2);

    expect(result).toBe('10');
  });

  test("3을 3자리로 변환하면 '003'을 반환한다", () => {
    const result = fillZero(3, 3);

    expect(result).toBe('003');
  });

  test("100을 2자리로 변환하면 '100'을 반환한다", () => {
    const result = fillZero(100, 2);

    expect(result).toBe('100');
  });

  test("0을 2자리로 변환하면 '00'을 반환한다", () => {
    const result = fillZero(0, 2);

    expect(result).toBe('00');
  });

  test("1을 5자리로 변환하면 '00001'을 반환한다", () => {
    const result = fillZero(1, 5);

    expect(result).toBe('00001');
  });

  test("소수점이 있는 3.14를 5자리로 변환하면 '03.14'를 반환한다", () => {
    const result = fillZero(3.14, 5);

    expect(result).toBe('03.14');
  });

  test('size 파라미터를 생략하면 기본값 2를 사용한다', () => {
    const result = fillZero(0);
    expect(result).toBe('00');
  });

  test('value가 지정된 size보다 큰 자릿수를 가지면 원래 값을 그대로 반환한다', () => {
    const result = fillZero(100, 2);

    expect(result).toBe('100');
  });
});

describe('formatDate', () => {
  it('날짜를 YYYY-MM-DD 형식으로 포맷팅한다', () => {
    const dateResult = formatDate(new Date('2024-11-05'));

    expect(dateResult).toBe('2024-11-05');
  });

  it('day 파라미터가 제공되면 해당 일자로 포맷팅한다', () => {
    const dateResult = formatDate(new Date('2024-11-05'), 10);

    expect(dateResult).toBe('2024-11-10');
  });

  it('월이 한 자리 수일 때 앞에 0을 붙여 포맷팅한다', () => {
    const dateResult = formatDate(new Date('2024-1-05'));

    expect(dateResult).toBe('2024-01-05');
  });

  it('일이 한 자리 수일 때 앞에 0을 붙여 포맷팅한다', () => {
    const dateResult = formatDate(new Date('2024-01-5'));

    expect(dateResult).toBe('2024-01-05');
  });
});
