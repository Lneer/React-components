export const validateConditions = (
  checkingRef: React.RefObject<HTMLInputElement | HTMLSelectElement>
): boolean => {
  if (!checkingRef.current) {
    return false;
  }

  if (checkingRef.current instanceof HTMLSelectElement) {
    return checkingRef.current.value === 'default' ? false : true;
  } else {
    if (checkingRef.current.type) {
      switch (checkingRef.current.type) {
        case 'text':
          return checkingRef.current.value.length > 3 ? true : false;

        case 'date': {
          const date = new Date(checkingRef.current.value).getFullYear();
          const now = new Date().getFullYear();
          return Number(now) - Number(date) > 5 && Number(now) - Number(date) < 100 ? true : false;
        }

        case 'email': {
          const emailRegx = /^[a-zA-Z0-9._-]{2,16}@[a-zA-Z0-9.-]{2,16}\.[a-zA-Z]{2,6}$/;
          return emailRegx.test(checkingRef.current.value) ? true : false;
        }

        case 'file': {
          return checkingRef.current.files?.length ? true : false;
        }

        case 'checkbox': {
          return checkingRef.current.checked ? true : false;
        }

        default:
          return false;
      }
    }
  }

  return false;
};
