import { useMemo } from 'react';
import CustomSelect from './CustomSelect';

// TimePicker 컴포넌트 props 타입 정의
interface TimePickerProps {
  value: string; // 24시간 형식의 시간 (예: "13:30")
  onChange: (event: { target: { value: string } }) => void; // 변경된 시간을 전달하는 핸들러
}

// TimePicker 컴포넌트 정의
const TimePicker = ({ value, onChange }: TimePickerProps) => {
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

  // 드롭다운 옵션 정의
  const hourOptions = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, '0'),
  ); // 01 ~ 12
  const minuteOptions = ['00', '10', '20', '30', '40', '50']; // 10분 단위
  const periodOptions = ['오전', '오후']; // 오전/오후

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
