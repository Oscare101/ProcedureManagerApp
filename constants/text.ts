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
  editProcedure: 'Редагувати запис',
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
  alreadyUsedLink: 'Це посилання вже використовується',
  cantOpenLink: 'Неможливо відкрити посилання',
  comment: 'коментарій',
  choose: 'обрати',
  rechoose: 'змінити',
  noLink: 'без посилання',
  noPhone: 'без номеру',
  master: 'майстер',
  chosen: 'Обрано',
  procedure: 'процедура',
  procedures: 'Процедури',
  cleaning: 'Чистки',
  peeling: 'Пілінги',
  care: 'Доглядові',
  additional: 'Додаткові',
  'rf-lifting': 'RF ліфтінг',
  meso: 'Мезотерапія',
  other: 'Інші',
  duration: 'тривальість',
  minutesShort: 'хв',
  UAHshort: 'грн',
  cantCreateAgendaBeacauseOfTime:
    'Неможливо створити процедуру, так як вона перетинається з іншими процедурами',
  check: 'перевірити',
  agenda: 'Запис',
  prepayment: 'передплата',
  delete: 'Видалити',
  deleteAgenda: 'Видалити запис',
  date: 'дата',
  time: 'час',
  absent: 'відсутня',
  canceledAgendaWillBeSaved:
    'буде збережено в історії скасованих записів клієнта(-ки)',
  Cancel: 'Скасувати',
  historyAgendas: 'Історія записів',
  canceled: 'скасовано',
  confirmationAgenda:
    'Доброго дня, нагадую що завтра Ви записані до косметолога на #, Ви будете?',
  Settings: 'Налаштування',
  textCopied: 'Текст підтвердження скопійовано',
  noHistoryYet: 'Поки немає історії записів',
  reOpen: 'Відновити',
  planned: 'заплановано',
  today: 'сьогодні',
  getSchedule: 'Отримати розклад',
  noScheduleYet: 'Немає записів',
  save: 'Зберегти',
  Confirmed: 'Підтвердженно',
  Statistics: 'Статистика',
  AgendasAmount: 'Кількість записів',
  SwipeEnable: 'Дозволити жести',
}
