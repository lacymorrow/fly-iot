import { ReactNode } from 'react';

import { notification } from 'antd';

const notify = ({
  type,
  message,
  description,
  btn,
}: {
  type?: 'success' | 'info' | 'warning' | 'error' | 'open';
  message: string;
  description?: string;
  btn?: ReactNode;
}) => {
  notification[type || 'open']({
    message,
    description,
    btn,
  });
};

export default notify;
