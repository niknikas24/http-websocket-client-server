# HTTP WebSocket Client-Server

Этот проект представляет собой многопоточный HTTP-клиент и WebSocket-сервер, который позволяет загружать контент с указанных URL.

## Установка и запуск

0. Предварительно необходимо скачать с официального сайта (https://git-scm.com/download/win) и установить на компьютере "Git Bash".
   Для корректной работы желательно произвести предварительную настройку "Git Bash", согласно руководству с оф. сайта (https://git-scm.com/book/ru/v2/Введение-Первоначальная-настройка-Git).

1. Клонируйте репозиторий:
   Запустите "Командную строку".
   
    1.1. Введите в строке команду:

    git clone https://github.com/niknikas24/http-websocket-client-server.git


2. Установите зависимости:
   Запустите на компьютере "Командную строку". Убедитесь, что у Вас установлен Node.js и npm.
   
    2.1. Введите в строке команду:

    node -v

    2.2. Введите в строке команду:

    npm install npm@latest -g  

    2.3. Введите в строке команду:

    npm -v


3. Запустите сервер:
   Запустите на компьютере "Командную строку".

    3.1. Введите в строке команду:

    cd C:\Users\имя текущего пользователя\http-websocket-client-server

    3.2. Введите в строке команду:

    node server.js


4. Доступ к клиенту: Откройте браузер и перейдите по адресу `http://localhost:3000`, чтобы воспользоваться Вашим приложением.

## Функциональность

- **news**: Текстовые и PDF файлы.
- **sports**: PNG и JPG изображения.
- **music**: MP3 файлы.


## Примеры ключевых слов

- `news`
- `sports`
- `music`

   Чтобы проверить функциональность, введём одно из трёх ключевых слов, например, слово "sports", после чего нажимаем на «Get URLs». 
   На экране отобразятся ссылки на фото. Если нажать на "Download", то запустится процесс скачивания конкретного фото. 
   Процесс загрузки отображается на экране. 
   По окончанию загрузки файл появится у нас в папке "downloads" по адресу:
   C:\Users\имя текущего пользователя\http-websocket-client-server\downloads

## Публичный доступ

Для обеспечения публичного доступа к Вашему приложению, Вы можете использовать платформы, чтобы развернуть Ваш сервер, такие, например, как: 
[Heroku] (https://www.heroku.com/), 
[Vercel] (https://vercel.com/), 
[Glitch] (https://glitch.com/).


### Развертывание на примере Heroku

1. Установите Heroku CLI:

    curl https://cli-assets.heroku.com/install.sh | sh


2. Войдите в свою учетную запись Heroku:

    heroku login


3. Создайте новое приложение Heroku:

    heroku create


4. Отправьте код в Heroku:

    git push heroku master


5. Откройте ваше приложение в браузере:

    heroku open


Ваше приложение будет доступно по URL, предоставленному Heroku.
