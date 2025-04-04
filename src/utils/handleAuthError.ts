const handleAuthError = (
  userType: 'user' | 'mover',
  authType: 'sign-in' | 'sign-up',
  error: any,
) => {
  let errorMessage = '';

  if (authType === 'sign-in') {
    switch (error?.status) {
      case 401:
        errorMessage = 'signInPassword';
        break;
      case 404:
        errorMessage = 'signInEmail';
        break;
      case 409:
        errorMessage = 'signInUserType';
        break;
      default:
        errorMessage = 'signInDefault';
    }
  }

  if (authType === 'sign-up') {
    switch (error.response?.data?.message) {
      case '중복된 이메일이 존재합니다.':
        errorMessage = 'signUpEmail';
        break;
      case '중복된 전화번호가 존재합니다.':
        errorMessage = 'signUpPhoneNumber';
        break;
      default:
        errorMessage = 'signUpDefault';
    }
  }
  const wariningUrl = `/${userType}/${authType}?warn=${errorMessage}`;
  return wariningUrl;
};

export default handleAuthError;
