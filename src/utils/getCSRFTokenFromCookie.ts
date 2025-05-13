export const getCSRFTokenFromCookie = () => {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(/csrfToken=([^;]+)/);
  return match ? match[1] : null;
};
