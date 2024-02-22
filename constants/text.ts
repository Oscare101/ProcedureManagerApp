import rules from './rules'

export default {
  loginTitle: 'Login',
  loginButton: 'Log in',
  emailPlaceHolder: 'email',
  passwordPlaceHolder: 'password',
  emailError: 'Invalid email',
  passwordError: `Password min length is ${rules.passwordMinLengh}`,
  logoutButton: 'Log out',
  calendarTitle: 'Calendar',
  customersTitle: 'Customers',
  weekDaysShort: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'],
  months: [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень',
  ],
}
