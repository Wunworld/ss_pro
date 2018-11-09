import fetch from '@/utils/fetch'

// 登录：
// export const login = data => fetch('/admin/login', data, 'POST');
export const login = data => fetch('/login/login', data, 'GET');
export const testPhoneNum = (phoneNum) => fetch('/validation/mobilephone/' + phoneNum);
