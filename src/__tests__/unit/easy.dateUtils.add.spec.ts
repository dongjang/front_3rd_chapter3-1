import { getDateOfCurrentWeek, isLeapYear } from '../../utils/dateUtils';

describe('isLeapYear', () => {
  it('입력한 연도가 윤년이 아닌지 확인할 수 있다.', () => {
    const notLeapYear = isLeapYear(2023);
    expect(notLeapYear).toBe(false);
  });

  it('입력한 연도가 윤년인지 확인할 수 있다.', () => {
    const leapYear = isLeapYear(2024);
    expect(leapYear).toBe(true);
  });
});

describe('getDateOfCurrentWeek', () => {
  it('입력한 요일의 이번 주 날짜를 정확히 가져올 수 있다.', () => {
    const date = getDateOfCurrentWeek('Thursday');

    const expectedDate = new Date('2024-10-03T00:00:00.000Z');

    expect(date).toEqual(expectedDate);
  });

  it('입력한 요일이 잘못 입력됐는지 확인할 수 있다.', () => {
    expect(() => {
      getDateOfCurrentWeek('MonMonday');
    }).toThrow('정확한 요일을 입력해 주세요.');
  });
});
