# CHERRFY JSX Components

This folder contains React JSX versions of your PHP pages with TailwindCSS. You can drop them into any React app (Vite/CRA/Next) that has Tailwind configured.

## Components
- SharedLayout.jsx – Sidebar layout used by account pages
- Login.jsx – Manual sign-in on the left, provider sign-in (Google/Facebook) on the right
- Register.jsx – Register form with social options at the bottom; keeps "Why join CHERRFY?" panel
- ForgotPassword.jsx – Reset flow with email/phone/username identifier and success state

## Usage
Install Tailwind and React (example with Vite):

```bash
# create app
npm create vite@latest myapp -- --template react
cd myapp

# add tailwind (follow official steps)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
# configure tailwind.config.js to scan your jsx/**/* files too
# and include Tailwind base in src/index.css

# copy jsx folder into src/ or import with relative path
```

Example:
```jsx
import { Login, Register, ForgotPassword, SharedLayout } from './jsx';

function App(){
  return <Login />;
}
```

## Notes
- Icons: original PHP used Lucide via data-lucide; in React you can bring `lucide-react` or inline SVGs.
- Links (href to .php) are placeholders; wire them to your router (react-router-dom) as needed.
- All forms include client-side validation only; implement backend endpoints for real auth flows.
