import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { ToastProvider } from "./context/useToast";
import AppProvider from "./context/useApp";

createRoot(document.getElementById("root")).render(
  <ToastProvider>
    <AppProvider>
      <App />
    </AppProvider>
  </ToastProvider>
);
