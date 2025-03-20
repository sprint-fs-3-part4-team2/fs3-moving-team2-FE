export const VALIDATION_MESSAGES = {
  // name
  REQUIRED_NAME: '성함을 입력해주세요.',
  MIN_LENGTH_NAME: '두 글자 이상 입력해주세요',
  // email
  REQUIRED_EMAIL: '이메일은 필수 입니다.',
  INVALID_EMAIL: '이메일 형식이 아닙니다.',
  // phone number
  REQUIRED_PHONE_NUMBER: '전화번호는 필수 입니다.',
  INVALID_PHONE_NUMBER: '올바른 핸드폰 번호를 입력해주세요.',
  // password
  REQUIRED_PASSWORD: '비밀번호를 입력해주세요.',
  INVALID_PASSWORD: '비밀번호는 영문과 특수문자를 포함해야 합니다.',
  MIN_LENGTH_PASSWORD: '비밀번호는 8자 이상이어야 합니다.',
  // check password
  REQUIRED_CHECK_PASSWORD: '비밀번호를 다시 한번 입력해주세요',
  INVALID_CHECK_PASSWORD: '비밀번호가 일치 하지 않습니다.',
};

export const VALIDATION_PATTERN = {
  EMAIL: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  PHONE_NUMBER: /^010\d{7,8}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*[!@#$%^&*])/,
};

export const BUTTON_BASIC_STYLES = 'font-semibold text-lg mt-[16px]';
export const BUTTON_DESCTOP_STYLES = 'xl:text-xl xl:mt-[24px]';
export const BUTTON_DISABLED_STYLES = 'bg-grayscale-100 border-none';
