import { notification } from 'antd';

const openNotification = (props: {
  type?: 'success' | 'info' | 'warning' | 'error' | 'open';
  message: string;
  description?: string;
}) => {
  notification[props.type || 'open']({
    message: props.message,
    description: props.description,
  });
};

export default openNotification;
