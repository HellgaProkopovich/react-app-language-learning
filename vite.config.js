import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  base: "./", // Определяет базовый URL для всех ресурсов
  // server: {
  //   // Для того, чтобы запрашивать данные с другого домена, нужно добавить параметр proxy в package.json
  //   proxy: {
  //     "/api": {
  //       target: "http://itgirlschool.justmakeit.ru",
  //       changeOrigin: true,
  //     },
  //   },
  // },
})

// base: "./", 
// Определяет базовый URL для всех ресурсов (CSS, JS, изображения). "./" означает, что все пути будут относительными. Это полезно, если приложение будет размещено в подпапке (например, https://example.com/my-app/).
//Без этого ссылки могут быть абсолютными (/assets/main.css), и приложение может сломаться при деплое.

// server.proxy — Проксирование API-запросов
// 💡 Что это значит?
// Это настройка прокси-сервера для разработки (локального сервера Vite).
// 🔹 Как это работает?
// Если в коде выполняется API-запрос на /api, например:
// fetch("/api/data")
// Vite автоматически перенаправляет этот запрос на http://itgirlschool.justmakeit.ru/api/data
// Это помогает избежать проблем с CORS (когда браузер блокирует запросы на другой домен).
// 🔹 Разбор параметров:
// target: "http://itgirlschool.justmakeit.ru" → Куда перенаправлять запросы.
// changeOrigin: true → Меняет заголовок Origin, чтобы сервер думал, что запросы идут прямо от него (а не с localhost).
// 📌 Зачем это нужно?
// Упрощает работу с API во время разработки.
// Избегает проблем с CORS (браузер не блокирует запросы).
// Позволяет писать fetch("/api/..."), а не указывать полный URL (fetch("http://itgirlschool.justmakeit.ru/api/...")).