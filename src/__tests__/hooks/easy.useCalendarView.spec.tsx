import { act, render, renderHook, screen, fireEvent, waitFor } from '@testing-library/react';

import App from '../../App.tsx';
import { useCalendarView } from '../../hooks/useCalendarView.ts';
import { assertDate } from '../utils.ts';

describe('초기 상태', () => {
  it('view는 "month"이어야 한다', () => {
    const { result } = renderHook(() => useCalendarView());
    expect(result.current.view).toBe('month');
  });

  it('currentDate는 오늘 날짜인 "2024-10-01"이어야 한다', () => {
    const { result } = renderHook(() => useCalendarView());
    const today = new Date('2024-10-01');
    expect(result.current.currentDate).toEqual(today);
  });

  it('holidays는 10월 휴일인 개천절, 한글날이 지정되어 있어야 한다', () => {
    const { result } = renderHook(() => useCalendarView());
    expect(result.current.holidays).toHaveProperty('2024-10-03', '개천절');
    expect(result.current.holidays).toHaveProperty('2024-10-09', '한글날');
    expect(Object.keys(result.current.holidays)).toHaveLength(2);
  });
});

describe('날짜를 적절하게 지정할 수 있다.', () => {
  render(<App />);
  it("view를 'week'으로 변경 시 적절하게 반영된다", async () => {
    console.log(5555555);
    expect(screen.getByLabelText('view')).toHaveValue('month');

    fireEvent.change(screen.getByLabelText('view'), { target: { value: 'week' } });

    await waitFor(() => {
      expect(screen.getByLabelText('view')).toHaveValue('week');

      const weekViewElement = screen.getByTestId('week-view');
      expect(weekViewElement).toBeInTheDocument();
    });
  });

  it("주간 뷰에서 다음으로 navigate시 7일 후 '2024-10-08' 날짜로 지정이 된다", () => {
    const { result } = renderHook(() => useCalendarView());
    act(() => {
      result.current.setCurrentDate(new Date('2024-10-01'));
    });

    const nextButton = screen.getByLabelText(/Next/i);

    fireEvent.click(nextButton);
    expect(result.current.currentDate).toEqual(new Date('2024-10-08'));
  });

  it("주간 뷰에서 이전으로 navigate시 7일 후 '2024-09-24' 날짜로 지정이 된다", () => {
    const { result } = renderHook(() => useCalendarView());
    act(() => {
      result.current.setCurrentDate(new Date('2024-10-01'));
    });

    const previousButton = screen.getByLabelText(/Previous/i);

    fireEvent.click(previousButton);
    expect(result.current.currentDate).toEqual(new Date('2024-09-24'));
  });

  it("월간 뷰에서 다음으로 navigate시 한 달 후 '2024-11-01' 날짜여야 한다", () => {
    const { result } = renderHook(() => useCalendarView());
    act(() => {
      result.current.setCurrentDate(new Date('2024-10-01'));
    });

    fireEvent.change(screen.getByLabelText('view'), { target: { value: 'month' } });
    const nextButton = screen.getByLabelText(/Next/i);
    fireEvent.click(nextButton);
    expect(result.current.currentDate).toEqual(new Date('2024-11-01'));
  });

  it("월간 뷰에서 이전으로 navigate시 한 달 전 '2024-09-01' 날짜여야 한다", () => {
    const { result } = renderHook(() => useCalendarView());
    act(() => {
      result.current.setCurrentDate(new Date('2024-10-01'));
    });

    const previousButton = screen.getByLabelText(/Previous/i);
    fireEvent.click(previousButton);
    expect(result.current.currentDate).toEqual(new Date('2024-09-01'));
  });

  it("currentDate가 '2024-01-01' 변경되면 1월 휴일 '신정'으로 업데이트되어야 한다", async () => {
    const { result } = renderHook(() => useCalendarView());
    act(() => {
      result.current.setCurrentDate(new Date('2024-01-01'));
    });
    expect(result.current.holidays).toHaveProperty('2024-01-01', '신정');
    expect(Object.keys(result.current.holidays)).toHaveLength(1);
  });
});
