import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { ToastProvider } from "./context/useToast";
import AppProvider from "./context/useApp";
import { Route, Routes, Router, BrowserRouter } from "react-router-dom";
import Wallpaper from "./components/Wallpaper";
import Http404 from "./components/Http404";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ToastProvider>
      <AppProvider>
        <Wallpaper />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="*" element={<Http404 />} />
        </Routes>
      </AppProvider>
    </ToastProvider>
  </BrowserRouter>
);
