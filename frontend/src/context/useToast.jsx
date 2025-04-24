import {
  createContext,
  useState,
  useCallback,
  useContext,
  useMemo,
} from "react";
import Toast from "../components/Toast";

export const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

let toastId = 0;

export const ToastProvider = ({ children }) => {
  let [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message, type) => {
    const id = toastId++;
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center space-y-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
