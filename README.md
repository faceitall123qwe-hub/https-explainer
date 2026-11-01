# Как работает HTTPS

Короткий ролик (около 1:40) о том, что значит замочек в браузере: симметричное и
асимметричное шифрование, рукопожатие TLS, сертификаты и что HTTPS всё-таки не скрывает.

## Как собрать

```bash
npm install
npm run dev      # превью в браузере
npm run render   # рендер в MP4
```

Озвучка через Edge TTS (`scripts/tts.mjs`), музыка генерируется скриптом (`scripts/music.mjs`).
Готовых MP4 в репо нет, слишком большие.

Сделано на [HyperFrames](https://github.com/heygen-com/hyperframes) (HTML + GSAP, рендер в видео).
