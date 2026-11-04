# KixCleen - Smart Shoe Cleaning Vendo Kiosk App

KixCleen is an automated shoe cleaning kiosk touch-screen application built with **React Native** and **Expo (SDK 58)**, featuring **Expo Router**, dynamic step-by-step progress tracking, interactive service selection, and **Xendit QR Ph e-Wallet payments (GCash / Maya)**.

---

## 🚀 Teammate Setup Guide

### 1. Prerequisites
Ensure you have the following installed on your PC:
- **Node.js** (v18, v20, or v22 recommended): [Download Node.js](https://nodejs.org/)
- **Git** (optional, for version control)
- **Expo Go App** (on your Android or iOS tablet/phone): Available on Google Play Store & Apple App Store.

---

### 2. Installation Steps

1. **Open your terminal / command prompt** and navigate to the project directory:
   ```bash
   cd shoeclean
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the example environment file to `.env`:
   - **Windows (Command Prompt / PowerShell)**:
     ```powershell
     copy .env.example .env
     ```
   - **macOS / Linux**:
     ```bash
     cp .env.example .env
     ```
   *(If you have a live or shared test Xendit Sandbox API key, make sure it is pasted inside `.env`)*

---

### 3. Running the App

Start the Expo development server:
```bash
npx expo start
```

### 📱 Viewing the App:
- **On Android Tablet / Phone (Same Wi-Fi)**:
  Open the **Expo Go** app and scan the QR code displayed in your terminal.
- **Across Different Wi-Fi / Hotspots**:
  ```bash
  npx expo start --tunnel
  ```
- **In Web Browser**:
  Press <kbd>w</kbd> in the terminal or run `npm run web`.
- **In Android Studio Emulator**:
  Press <kbd>a</kbd> in the terminal.

---

### 🛠️ Useful Commands

| Command | Description |
| :--- | :--- |
| `npm run start` | Start the Expo dev server |
| `npm run typecheck` | Run TypeScript type checks (`tsc --noEmit`) |
| `npm run lint` | Run ESLint check (`expo lint`) |
| `npx expo-doctor` | Validate dependency and configuration health |

