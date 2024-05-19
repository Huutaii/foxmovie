import React, { createContext, useContext } from 'react';
import { message } from 'antd';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [messageApi, messageContextHolder] = message.useMessage();

  const success = (content) => {
    messageApi.open({
      type: 'success',
      content: content,
    });
  };

  const info = (content) => {
    messageApi.open({
      type: 'info',
      content: content,
    });
  };

  const error = (content) => {
    messageApi.open({
      type: 'error',
      content: content,
    });
  };
  
  return (
    <NotificationContext.Provider value={{ success, info, error }}>
      {messageContextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
