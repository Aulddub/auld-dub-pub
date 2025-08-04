# EmailJS Setup Instructions

Этот проект использует EmailJS для отправки сообщений из контактной формы на email ресторана.

## Шаги настройки:

### 1. Создание аккаунта EmailJS
1. Перейдите на https://www.emailjs.com/
2. Создайте бесплатный аккаунт
3. Подтвердите email адрес

### 2. Настройка Email Service
1. В панели управления EmailJS перейдите в "Email Services"
2. Нажмите "Add New Service"
3. Выберите ваш email провайдер (Gmail, Outlook, Yahoo и т.д.)
4. Следуйте инструкциям для подключения вашего email аккаунта
5. Скопируйте **Service ID**

### 3. Создание Email Template
1. Перейдите в "Email Templates"
2. Нажмите "Create New Template"
3. Используйте следующий шаблон:

**Subject:** Новое сообщение с сайта: {{subject}}

**Content:**
```
Вы получили новое сообщение с сайта The Auld Dub:

Имя: {{from_name}}
Email: {{from_email}}
Тема: {{subject}}

Сообщение:
{{message}}

---
Это сообщение отправлено автоматически с контактной формы сайта.
```

4. Сохраните шаблон и скопируйте **Template ID**

### 4. Получение Public Key
1. Перейдите в "Account" > "General"
2. Найдите раздел "API Keys"
3. Скопируйте **Public Key**

### 5. Обновление конфигурации
Откройте файл `src/config/emailjs.ts` и замените:
- `YOUR_PUBLIC_KEY` на ваш Public Key
- `YOUR_SERVICE_ID` на ваш Service ID  
- `YOUR_TEMPLATE_ID` на ваш Template ID

### 6. Тестирование
1. Запустите проект: `npm start`
2. Перейдите на страницу контактов
3. Заполните и отправьте форму
4. Проверьте email info@theaulddub.se

## Важные замечания:

- EmailJS имеет лимит 200 бесплатных email в месяц
- Убедитесь, что email info@theaulddub.se существует и доступен
- Все настройки хранятся в файле `src/config/emailjs.ts`
- Не коммитьте реальные API ключи в публичный репозиторий

## Troubleshooting:

Если email не отправляются:
1. Проверьте правильность всех ID и ключей
2. Убедитесь, что email service правильно настроен
3. Проверьте консоль браузера на наличие ошибок
4. Убедитесь, что шаблон использует правильные переменные