# List of Packages Used

This document lists the packages used in this project, along with their purposes and any relevant details.

## Tailwind CSS

- **Purpose**: Tailwind CSS is a utility-first CSS framework that provides a set of predefined classes for styling web applications. It allows developers to rapidly build custom designs without writing custom CSS.
- **Usage**: We use Tailwind CSS to style our web components, enabling us to quickly apply styles and maintain a consistent design across our web application. It helps in creating responsive layouts and ensures that our design is cohesive.
- **Installation**: To install Tailwind CSS, you can use the following command:

  ```bash
  npm install tailwindcss
  npx tailwindcss init
  ```

## Nativewind

- **Purpose**: Nativewind is a utility-first CSS framework for React Native, inspired by Tailwind CSS. It allows developers to style their components using a set of predefined classes, making it easier to create responsive and consistent designs.
- **Usage**: We use Nativewind to style our React Native components, enabling us to quickly apply styles without writing custom CSS for each component. This helps in maintaining a clean and efficient codebase.
- **Installation**: To install Nativewind, you can use the following command:

  ```bash
  npm install nativewind
  ```

## react-native-reanimated

- **Purpose**: react-native-reanimated is a powerful animation library for React Native that provides a more performant and flexible way to create animations. It allows developers to create complex animations with better performance compared to the built-in Animated API.
- **Usage**: We use react-native-reanimated to create smooth and performant animations in our React Native application. It helps us enhance the user experience by providing visually appealing transitions and interactions.
- **Installation**: To install react-native-reanimated, you can use the following command:

  ```bash
  npm install react-native-reanimated
  ```

## react-native-safe-area-context

- **Purpose**: react-native-safe-area-context is a library that provides a way to handle safe area insets in React Native applications. It helps developers ensure that their content is not obscured by device notches, status bars, or other screen elements.
- **Usage**: We use react-native-safe-area-context to ensure that our application's content is displayed correctly on devices with notches or other screen elements that may interfere with the layout. It allows us to create a better user experience by ensuring that our content is always visible and accessible.
- **Installation**: To install react-native-safe-area-context, you can use the following command:

  ```bash
  npm install react-native-safe-area-context
  ```

## @react-native-async-storage/async-storage

- **Purpose**: Provides persistent, asynchronous, key-value storage for React Native apps. Useful for storing user data, settings, and caching.
- **Usage**: Used to save and retrieve data locally on the device, such as user preferences or app state.
- **Installation**: To install @react-native-async-storage/async-storage, you can use the following command:

  ```bash
  npm install @react-native-async-storage/async-storage
  ```

## @react-navigation/bottom-tabs

- **Purpose**: Implements a bottom tab navigator for React Native apps, allowing easy navigation between screens using a tab bar.
- **Usage**: Used to create a tab-based navigation UI at the bottom of the app, commonly seen in mobile apps.
- **Installation**: To install @react-navigation/bottom-tabs, you can use the following command:

  ```bash
  npm install @react-navigation/bottom-tabs
  ```

## @react-navigation/elements

- **Purpose**: Provides UI components and helpers for React Navigation, such as headers, backgrounds, and other navigation-related elements.
- **Usage**: Used to customize navigation UI components and enhance the look and feel of navigation elements.
- **Installation**: Already installed. To install manually:

  ```bash
  npm install @react-navigation/elements
  ```

## @react-navigation/native

- **Purpose**: Core package for React Navigation, enabling navigation between screens and handling navigation state in React Native apps.
- **Usage**: Used as the foundation for navigation, required for all navigation setups (stack, tabs, drawer, etc.).
- **Installation**: Already installed. To install manually:

  ```bash
  npm install @react-navigation/native
  ```
