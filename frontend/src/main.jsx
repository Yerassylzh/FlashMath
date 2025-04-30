import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/App/App";
import { ToastProvider } from "./context/useToast";
import AppProvider from "./context/useApp";
import { Route, Routes, Router, BrowserRouter } from "react-router-dom";
import Wallpaper from "./components/ui/Wallpaper";
import Http404 from "./pages/Http404/Http404";

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
