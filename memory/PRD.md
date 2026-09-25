# PRD — App de gramática para niños (5 sentidos)

## Problema original
App educativa de gramática EN/ES/Mixto. El usuario pidió convertirla en la
**versión para niños** centrada en los 5 sentidos humanos.

## Decisiones del usuario
- Reemplazar la app por la versión para niños (se quitan M2.A, M2.B, M3.A, M4.A del home).
- Home muestra solo: M1.A, M1.B, Tita I, Tita II.
- M1.A y M1.B usan SOLO los 5 sentidos (see, touch, smell, taste, hear) con ícono.
- Sentidos también en español (ver, tocar, oler, saborear, oír) para modo ES/Mixto.
- Tita I y Tita II se dejan igual.

## Arquitectura
- Frontend: Expo Router (React Native). Backend: FastAPI + MongoDB.
- TTS vía `/api/tts` (OpenAI TTS con EMERGENT_LLM_KEY) reproducido con expo-audio.

## Implementado (2026-09-23)
- Home (`app/index.tsx`): array MODULES reducido a 4 tarjetas; íconos eye/flower.
- Contenido de sentidos (`src/data/modules.ts`): SENSES_EN / SENSES_ES + SENSE_ICONS,
  M1.A y M1.B ahora usan los 5 sentidos; default "see"/"ver".
- Selector de verbos (`src/components/PracticeScreen.tsx`): soporta `verbIcons`,
  muestra chips grandes de 2 columnas con ícono, oculta el buscador para los sentidos.
- Modo mixto (`src/data/bilingual.ts`): añadidas equivalencias taste↔saborear,
  hear↔oír, tocar/oler/saborear/oír → touch/smell/taste/hear.
- Títulos (`src/i18n.ts`): M1.A "Los 5 sentidos / The 5 senses", M1.B "Sentidos continuos".
- Restaurados `.env` de backend y frontend (se habían perdido al recargar entorno).

## Verificado
- M1.A EN: "I can see." / "I cannot see." / "Can I see?"
- M1.B EN: "I can be seeing." (continuo)
- ES: "Yo puedo ver." con sentidos en español.
- Home con 4 módulos y selector de 5 sentidos con íconos.

## Backlog / próximos
- P1: pronunciación automática al generar; imágenes/ilustración por sentido.
- P2: modo juego/quiz de sentidos; recompensas para niños.

## Actualización (2026-09-24) — English-only + Videos
- App bloqueada a Inglés: `LanguageContext` fuerza learn="en", mixed=false.
- Menú superior (home): solo "Inglés" (✓) + entrada "Videos". Quitados Español y modos Mixto.
- Nueva pantalla `app/videos.tsx`: 2 videos por separado (Lección 1 y 2) con expo-video.
- Dependencia añadida: expo-video (+ config plugin en app.json).
- Verificado por testing_agent (iteration_4): 6/6 checks OK.

## Actualización (2026-09-24) — Expo SDK 54 → 57
- Actualizado con el flujo oficial: `expo install expo@^57` + `expo install --fix`.
- Versiones clave: expo ^57.0.0, react-native 0.86.3, react 19.2.3, expo-router 57.0.22,
  react-native-reanimated 4.5.1, worklets 0.10.1, expo-video 57.0.4, expo-audio 57.0.5.
- app.json: removidas `newArchEnabled` y `android.edgeToEdgeEnabled` (inválidas en SDK 57).
- Regenerado yarn.lock (se restauró consistencia con yarn; eliminado package-lock.json).
- expo-doctor: 19/20 (único aviso restante = carpeta android/ prebuild ya existente, no bloquea).
- Verificado por testing_agent (iteration_5): sin errores de runtime, todas las pantallas OK.
- Ahora compatible con Expo Go SDK 57.

## Actualización (2026-09-25) — Pantalla de bienvenida (Tita)
- `app/index.tsx` ahora es una pantalla de bienvenida (splash) con la imagen de Tita
  ("Hola, Yo soy Tita") y animación fade+scale; tras 1.8s hace router.replace("/home").
- El menú principal se movió a `app/home.tsx` (mismo contenido).
- Imagen guardada en `assets/images/tita-welcome.png`; se removió el fondo cuadriculado
  quemado (se hizo transparente conservando la niña y el cartel).
- Verificado por testing_agent (iteration_6): splash + auto-redirect + regresión OK.
