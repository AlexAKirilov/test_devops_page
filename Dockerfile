# Используем официальный Nginx образ
FROM nginx:alpine

# Копируем файлы из папки dist (Webpack сборка) в стандартную директорию Nginx
COPY dist/ /usr/share/nginx/html/

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx в фоновом режиме
CMD ["nginx", "-g", "daemon off;"]