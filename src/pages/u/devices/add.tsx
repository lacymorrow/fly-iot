import { useState } from 'react';

import { Button, Input, Space } from 'antd';

import Meta from '../../../components/Meta';
import Layout from '../../../templates/MainLayout';
import config from '../../../utils/config';
import openNotification from '../../../utils/notification';

const AddDevice = () => {
  const [deviceId, setDeviceId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event: any) => {
    const { value } = event.target;
    setDeviceId(value);
  };

  const handleAddDevice = async () => {
    setIsLoading(true);
    const response = await fetch('/api/devices/add/', {
      body: JSON.stringify({ deviceId }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    console.log(response);
    console.log(await response.json());

    if (!response) {
      openNotification({
        type: 'error',
        message: `Error adding device`,
        description: `Server did not respond.`,
      });
    }

    if (response.status === 404) {
      openNotification({
        type: 'error',
        message: `Error adding device`,
        description: `Device does not exist. Please contact Support for provisioning.`,
      });
    }

    if (response.status === 302) {
      openNotification({
        type: 'warning',
        message: `Could not add device`,
        description: `Device is already registered. Device ID: `,
      });
    }

    if (response.status === 200) {
      openNotification({
        type: 'success',
        message: `Successfully added device`,
        description: `Device ID: `,
      });
    } else {
      openNotification({
        type: 'error',
        message: `Error adding device`,
      });
    }
    setIsLoading(false);
  };

  return (
    <Layout
      meta={
        <Meta
          title={`Add Device | ${config.title}: ${config.tagline}`}
          description={config.description}
        />
      }
    >
      <Space direction="vertical">
        <h1>Add Device</h1>
        <Input
          placeholder="Device ID..."
          value={deviceId}
          onChange={handleChange}
        />
        <Button type="primary" loading={isLoading} onClick={handleAddDevice}>
          Add device
        </Button>
      </Space>
    </Layout>
  );
};

export default AddDevice;
