import { fetchHolidays } from '../../apis/fetchHolidays';

describe('fetchHolidays', () => {
  it('주어진 월의 공휴일만 반환한다', () => {
    const result = fetchHolidays(new Date('2024-12-01'));

    const holidays = { '2024-12-25': '크리스마스' };
    expect(result).toEqual(holidays);
  });

  it('공휴일이 없는 월에 대해 빈 객체를 반환한다', () => {
    const result = fetchHolidays(new Date('2024-11-01'));

    const holidays = {};
    expect(result).toEqual(holidays);
  });

  it('여러 공휴일이 있는 월에 대해 모든 공휴일을 반환한다', () => {
    const result = fetchHolidays(new Date('2024-02-01'));

    const holidays = { '2024-02-09': '설날', '2024-02-10': '설날', '2024-02-11': '설날' };
    expect(result).toEqual(holidays);
  });
});
