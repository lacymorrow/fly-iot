import { useState } from 'react';

import { Button, Form, Input, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';

import notify from '../../utils/notify';

const Info = ({
  deviceId,
  userId,
  onComplete,
}: {
  deviceId?: string;
  userId: string;
  onComplete: Function;
}) => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  const onSkip = () => {
    form.setFieldsValue({ name: `Device ${deviceId}` });
    form.submit();
  };

  const onFinish = async (values: any) => {
    const { name } = values;
    if (!name || !deviceId) {
      return;
    }

    setLoading(true);

    const response = await fetch('/api/devices/edit/name', {
      body: JSON.stringify({ deviceId, userId, name }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    setLoading(false);

    const result = await response.json();
    if (response.status === 200) {
      // Redirect on success
      notify({
        type: 'success',
        message: `Renamed Device`,
        description: result?.data?.message,
      });

      onComplete();
      return;
    }

    // Error
    notify({
      type: 'error',
      message: `Error renaming device`,
      description: result?.error?.message,
    });
  };

  return (
    <Space>
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        name="device"
        autoComplete="off"
      >
        <Form.Item
          label="Device Name"
          name="name"
          rules={[{ required: true, message: 'Please enter a device name.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="button" onClick={onSkip}>
            Skip
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default Info;
