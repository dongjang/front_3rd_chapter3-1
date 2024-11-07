import { Event } from '../types.ts';

/**
 * 주어진 년도와 월의 일수를 반환합니다.
 * 변경한 순수 함수
 */
export const getDaysInMonth = (year: number, month: number): number => {
  // 1 ~ 12월이 아니면 0 return
  if (month < 1 || month > 12) {
    return 0;
  }
  // 2월인 경우 윤년 여부 확인
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }

  // 2월이 아닌 경우 기존 로직
  return new Date(year, month, 0).getDate();
};

/**
 * 주어진 날짜가 속한 주의 모든 날짜를 반환합니다.
 */
export const getWeekDates = (date: Date): Date[] => {
  const day = date.getDay();

  // 주의 첫 날 기준을 월요일로 변경
  const diff = date.getDate() - (day === 0 ? 6 : day - 1);
  const monday = new Date(date.setDate(diff));
  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(monday);
    nextDate.setDate(monday.getDate() + i);
    weekDates.push(nextDate);
  }

  return weekDates;
};

export const getWeeksAtMonth = (currentDate: Date) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month + 1);
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weeks = [];

  const initWeek = () => Array(7).fill(null);

  let week: Array<number | null> = initWeek();

  for (let i = 0; i < firstDayOfMonth; i++) {
    week[i] = null;
  }

  for (const day of days) {
    const dayIndex = (firstDayOfMonth + day - 1) % 7;
    week[dayIndex] = day;
    if (dayIndex === 6 || day === daysInMonth) {
      weeks.push(week);
      week = initWeek();
    }
  }

  return weeks;
};

export const getEventsForDay = (events: Event[], date: number): Event[] => {
  return events.filter((event) => new Date(event.date).getDate() === date);
};

export const formatWeek = (targetDate: Date) => {
  const dayOfWeek = targetDate.getDay();
  const diffToThursday = 4 - dayOfWeek;
  const thursday = new Date(targetDate);
  thursday.setDate(targetDate.getDate() + diffToThursday);

  const year = thursday.getFullYear();
  const month = thursday.getMonth() + 1;

  const firstDayOfMonth = new Date(thursday.getFullYear(), thursday.getMonth(), 1);

  const firstThursday = new Date(firstDayOfMonth);
  firstThursday.setDate(1 + ((4 - firstDayOfMonth.getDay() + 7) % 7));

  const weekNumber: number =
    Math.floor((thursday.getTime() - firstThursday.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;

  return `${year}년 ${month}월 ${weekNumber}주`;
};

/**
 * 주어진 날짜의 월 정보를 "YYYY년 M월" 형식으로 반환합니다.
 */
export const formatMonth = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}년 ${month}월`;
};

/**
 * 주어진 날짜가 특정 범위 내에 있는지 확인합니다.
 */
export const isDateInRange = (date: Date, rangeStart: Date, rangeEnd: Date): boolean => {
  return date >= rangeStart && date <= rangeEnd;
};

export const fillZero = (value: number, size = 2) => {
  return String(value).padStart(size, '0');
};

export const formatDate = (currentDate: Date, day?: number) => {
  return [
    currentDate.getFullYear(),
    fillZero(currentDate.getMonth() + 1),
    fillZero(day ?? currentDate.getDate()),
  ].join('-');
};

//추가한 순수 함수

/**
 * 주어진 년도가 윤년인지 확인합니다.
 */
export const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

// 요일을 입력 하면 해당 주의 날짜 반환
export const getDateOfCurrentWeek = (dayName: string) => {
  const today = new Date();
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const targetDayIndex = dayNames.indexOf(
    dayName.charAt(0).toUpperCase() + dayName.slice(1).toLowerCase()
  );

  if (targetDayIndex === -1) {
    return '정확한 요일을 입력해 주세요.';
  }

  const todayDayIndex = today.getDay();
  const mondayIndex = (todayDayIndex + 6) % 7;
  const diff = targetDayIndex - mondayIndex;

  const targetDate = new Date(today.setDate(today.getDate() + diff));

  return targetDate;
};
