import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { mkdirSync, renameSync, rmSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const VOICE = "ru-RU-DmitryNeural";
const RATE = "+8%";

// Spoken text; tech terms spelled phonetically so the voice reads them naturally.
const lines = [
  "Ты вводишь пароль на сайте. По дороге он проходит через десяток чужих устройств. Почему его никто не может прочитать?",
  "Обычный эйч-ти-ти-пи передаёт данные открытым текстом. Любой посредник, вай-фай в кафе или провайдер, видит всё, что ты отправляешь.",
  "Решение: шифрование. Самое быстрое, симметричное: один ключ и шифрует, и расшифровывает. Но как передать этот ключ, чтобы его не перехватили?",
  "Тут помогает асимметричное шифрование. У сервера два ключа: публичный, который видят все, и приватный, который он хранит в секрете.",
  "Публичный ключ похож на открытый замок. Защёлкнуть его может каждый, а открыть только владелец ключа.",
  "Во время рукопожатия ти-эл-эс браузер и сервер договариваются об общем секретном ключе. Подслушивающий видит весь обмен, но сам ключ не узнает.",
  "А откуда браузер знает, что это настоящий сервер? Сервер показывает сертификат, подписанный центром сертификации, которому доверяет браузер.",
  "После рукопожатия всё идёт быстрым симметричным шифрованием. Пароль, куки, содержимое страницы: посредник видит только шум.",
  "Но эйч-ти-ти-пи-эс скрывает не всё. Провайдер всё равно видит, к какому сайту ты подключаешься и сколько данных передаёшь.",
  "Симметричный ключ, пара ключей, рукопожатие и сертификат. Так работает эйч-ти-ти-пи-эс. Проверь сам: нажми на замок в адресной строке и открой сертификат.",
];

const only = process.argv[2] ? Number(process.argv[2]) : null;
const outRoot = "assets/audio";
mkdirSync(outRoot, { recursive: true });

for (let i = 0; i < lines.length; i++) {
  const n = String(i + 1).padStart(2, "0");
  if (only && only !== i + 1) continue;
  const tmp = join(outRoot, `tmp-${n}`);
  rmSync(tmp, { recursive: true, force: true });
  mkdirSync(tmp, { recursive: true });
  const tts = new MsEdgeTTS();
  await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3, {
    wordBoundaryEnabled: true,
  });
  await tts.toFile(tmp, lines[i], { rate: RATE });
  tts.close();
  for (const f of readdirSync(tmp)) {
    const ext = f.endsWith(".mp3") ? "mp3" : "json";
    renameSync(join(tmp, f), join(outRoot, `vo-${n}.${ext}`));
  }
  rmSync(tmp, { recursive: true, force: true });
  console.log(`vo-${n} ok`, existsSync(join(outRoot, `vo-${n}.mp3`)));
}
