import { createContext, useState } from "react";

const AlertContext = createContext(null);

export const AlertProvider = ({ children }) => {
  const [alerted, setAlerted] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertStatus, setAlertStatus] = useState('');

  const showAlert = (message, status) => {
    setAlerted(true);
    setAlertMessage(message);
    setAlertStatus(status);

    setTimeout(setAlerted, 2000, false);
  }

  const closeAlert = () => {
    setAlerted(false);
    setAlertMessage('');
  }

  return (
    <AlertContext.Provider value={{
      showAlert, closeAlert,
      alerted, alertMessage, alertStatus
    }}>
      { children }
    </AlertContext.Provider>
  );
}

export default AlertContext;