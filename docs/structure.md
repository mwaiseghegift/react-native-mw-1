# Project Structure

This project follows a modular and scalable structure for React Native development with Expo and TypeScript.

## Root Files

- `app.json`, `package.json`, `tsconfig.json`, `babel.config.js`, `metro.config.js`, `tailwind.config.js`: Configuration files for Expo, TypeScript, Babel, Metro bundler, and Tailwind CSS.
- `README.md`: Project overview and instructions.

## Main Folders

- `src/`: Source code for the application.
  - `app/`: Contains all screens, layouts, and navigation logic.
    - `_layout.tsx`: Main layout for navigation.
    - `global.css`: Global styles.
    - `(tabs)/`: Tab navigation screens and layout.
      - `_layout.tsx`: Tab navigator setup.
      - `home.tsx`, `profile.tsx`, `search.tsx`: Individual tab screens.
    - `movies/`: Feature-specific screens (e.g., movies).
  - `components/`: Reusable UI components.
  - `utils/`: Helper functions.
  - `services/`: API calls and business logic.
  - `types/`: TypeScript type definitions and interfaces.
  - `hooks/`: Custom React hooks for shared logic.
  - `constants/`: Application constants and configuration values.
- `assets/`: Static assets like images.
  - `images/`: Image files used in the app.
- `docs/`: Documentation files.
  - `structure.md`: Project structure documentation.
  - `packages_used.md`: List of packages used.
