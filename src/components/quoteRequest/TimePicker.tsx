import { useMemo } from 'react';
import CustomSelect from './CustomSelect';

// TimePicker 컴포넌트 props 타입 정의
interface TimePickerProps {
  value: string; // 24시간 형식의 시간 (예: "13:30")
  onChange: (event: { target: { value: string } }) => void; // 변경된 시간을 전달하는 핸들러
  date: Date;
}

interface OptionItem {
  label: string;
  value: string;
  disabled: boolean;
}

// TimePicker 컴포넌트 정의
const TimePicker = ({ value, onChange, date }: TimePickerProps) => {
  // 오늘 날짜인지 확인
  const isToday = useMemo(() => {
    if (!date) return true; // date가 없으면 기본값으로 오늘로 간주

    const today = new Date();
    const selectedDate = new Date(date); // registerData.moveDate로 Date 객체 생성

    return (
      today.getFullYear() === selectedDate.getFullYear() &&
      today.getMonth() === selectedDate.getMonth() &&
      today.getDate() === selectedDate.getDate()
    );
  }, [date]);

  // 현재 시간 정보
  const currentTime = useMemo(() => {
    const now = new Date();
    return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      period: now.getHours() >= 12 ? '오후' : '오전',
      hour12: (now.getHours() % 12 || 12).toString().padStart(2, '0'),
    };
  }, []);

  // 24시간 형식을 12시간 형식으로 변환
  const [hour, minute, period] = useMemo(() => {
    if (!value) return ['12', '00', '오전']; // 기본값: 12:00 오전
    const [h, m] = value.split(':');
    const hourNum = parseInt(h, 10);
    const period = hourNum >= 12 ? '오후' : '오전'; // 12시 이상이면 오후
    const displayHour = hourNum % 12 || 12; // 0 -> 12, 13 -> 1
    return [displayHour.toString().padStart(2, '0'), m, period];
  }, [value]);

  // 시간, 분, 오전/오후 변경 시 24시간 형식으로 변환
  const handleChange = (
    newHour: string,
    newMinute: string,
    newPeriod: string,
  ) => {
    const hourNum = parseInt(newHour, 10);
    const adjustedHour =
      newPeriod === '오후' ? (hourNum % 12) + 12 : hourNum % 12;
    const updatedTime = `${adjustedHour.toString().padStart(2, '0')}:${newMinute}`;
    onChange({ target: { value: updatedTime } });
  };

  // 특정 시간이 현재 시간보다 이전인지 확인하는 함수
  const isPastTime = (
    checkPeriod: string,
    checkHour: string,
    checkMinute: string,
  ): boolean => {
    if (!isToday) return false; // 오늘이 아니면 모든 시간 선택 가능

    const hour24 =
      checkPeriod === '오후' && parseInt(checkHour, 10) !== 12
        ? parseInt(checkHour, 10) + 12
        : checkPeriod === '오전' && parseInt(checkHour, 10) === 12
          ? 0
          : parseInt(checkHour, 10);

    const mins = parseInt(checkMinute, 10);

    // 현재 시간보다 이전인지 확인
    if (hour24 < currentTime.hours) return true;
    if (hour24 === currentTime.hours && mins < currentTime.minutes) return true;

    return false;
  };

  // 드롭다운 옵션 정의
  const periodOptions: OptionItem[] = [
    {
      label: '오전',
      value: '오전',
      disabled: isToday && currentTime.period === '오후',
    },
    {
      label: '오후',
      value: '오후',
      disabled: false, // 오후는 항상 선택 가능
    },
  ];

  const hourOptions: OptionItem[] = Array.from({ length: 12 }, (_, i) => {
    const hourValue = (i + 1).toString().padStart(2, '0');
    return {
      label: hourValue,
      value: hourValue,
      disabled: isPastTime(
        period,
        hourValue,
        period === currentTime.period && hourValue === currentTime.hour12
          ? currentTime.minutes.toString()
          : '00',
      ),
    };
  });

  const minuteOptions: OptionItem[] = ['00', '10', '20', '30', '40', '50'].map(
    (min) => ({
      label: min,
      value: min,
      disabled: isPastTime(period, hour, min),
    }),
  );

  return (
    <div className='flex space-x-4'>
      {/* 오전/오후 선택 드롭다운 */}
      <CustomSelect
        options={periodOptions}
        value={period}
        onChange={(newPeriod) => handleChange(hour, minute, newPeriod)}
      />
      {/* 시간 선택 드롭다운 */}
      <CustomSelect
        options={hourOptions}
        value={hour}
        onChange={(newHour) => handleChange(newHour, minute, period)}
      />
      {/* 분 선택 드롭다운 */}
      <CustomSelect
        options={minuteOptions}
        value={minute}
        onChange={(newMinute) => handleChange(hour, newMinute, period)}
      />
    </div>
  );
};

export default TimePicker;
