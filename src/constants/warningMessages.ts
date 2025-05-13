// key에 쿼리가 될 값을 입력하고 value에 표시할 메시지를 입력해주세요.
export const WARNING_MESSAGES = {
  customerAccountExist: '일반 유저 계정이 이미 존재합니다.',
  moverAccountExist: '기사님 계정이 이미 존재합니다.',
  noAccess: '접근할 수 없는 페이지 입니다.',
  profileRegister: '프로필 등록이 필요합니다.',
  login: '로그인이 필요합니다.',
  // Auth Error Message
  signInEmail: '존재하지 않는 이메일입니다.', // error code 404
  signInPassword: '비밀번호가 일치하지 않습니다.', // error code 401
  signInUserType: '고객/기사님 유형을 확인해주세요.', // error code 409
  signInDefault: '이메일과 비밀번호를 확인해주세요.', // 그 외 error code
  signUpEmail: '중복된 이메일이 존재합니다.', // error message
  signUpPhoneNumber: '중복된 전화번호가 존재합니다.', // error message
  signUpDefault: '고객/기사님 유형을 확인해주세요.', // default error message
  invalidRequest: '잘못된 요청입니다.',
} as const;
