import rules from './rules'

export default {
  loginTitle: 'Login',
  loginButton: 'Увійти',
  emailPlaceHolder: 'пошта',
  passwordPlaceHolder: 'пароль',
  emailError: 'неправильна пошта',
  passwordError: `Пароль не може бути менше ніж ${rules.passwordMinLengh} символів`,
  logoutButton: 'Вийти',
  calendarTitle: 'Календар',
  customersTitle: 'Клієнти',
  customerInfo: 'Клієнт(-ка)',
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
  working: 'Працює',
  dayOff: 'Вихідний',
  createProcedure: 'Створити запис',
  searchClient: 'пошук клієнта(-ки)',
  customer: 'клієнт(-ка)',
  name: "ім'я",
  phone: 'телефон',
  messenger: 'месенджер',
  link: 'посилання',
  createCustomer: 'Створення користувача',
  editCustomer: 'Редагувати користувача',
  create: 'Створити',
  edit: 'Редагувати',
  alreadyUsedPhone: 'Цей номер телефону вже використовується',
  cantOpenLink: 'Неможливо відкрити посилання',
  comment: 'коментарій',
  choose: 'обрати',
  rechoose: 'змінити',
  noLink: 'без посилання',
  master: 'майстер',
  chosen: 'Обрано',
  procedure: 'процедура',
}
