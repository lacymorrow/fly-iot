// Add a provisioned device to the devices list (activate to a user)
import { useState } from 'react';

import { Button, Input } from 'antd';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Meta from '../../../components/Meta';
import Layout from '../../../templates/MainLayout';
import config from '../../../utils/config';
import notify from '../../../utils/notify';
import { sleep } from '../../../utils/utils';

const AddDevice = () => {
  const router = useRouter();
  const { data }: any = useSession();
  const [deviceId, setDeviceId] = useState('');
  const [loading, setLoading] = useState(false);
  const handleChange = (event: any) => {
    const { value } = event.target;
    setDeviceId(value);
  };

  const handleAddDevice = async () => {
    if (!(deviceId && data.userId)) {
      notify({
        type: 'info',
        message: `Please enter a device ID`,
      });
      return;
    }

    setLoading(true);

    const response = await fetch('/api/devices/add/', {
      body: JSON.stringify({ deviceId, userId: data.userId }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const result = await response.json();
    setLoading(false);

    if (!response.status) {
      notify({
        type: 'error',
        message: `Error adding device`,
        description: `Server did not respond.`,
      });
      return;
    }

    if (response.status === 302) {
      notify({
        type: 'info',
        message: `Device already registered`,
        description: result?.data?.message,
        btn: (
          <Button type="primary">
            <Link href={`/u/devices/${deviceId}`}>
              <a>View Device</a>
            </Link>
          </Button>
        ),
      });
      return;
    }
    if (
      response.status === 400 ||
      response.status === 404 ||
      response.status === 500
    ) {
      notify({
        type: 'error',
        message: `Error adding device`,
        description: result?.error?.message,
      });
      return;
    }
    if (response.status === 200) {
      // Redirect on success
      notify({
        type: 'success',
        message: `Added device`,
        description: result?.data?.message,
      });

      await sleep(2000);
      router.push(`/u/devices/${deviceId}`);
      return;
    }

    notify({
      type: 'error',
      message: `Error adding device`,
    });
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
      <h1>Add Device</h1>
      TODO: SCAN QR CODE
      <Input
        placeholder="Device ID..."
        value={deviceId}
        onChange={handleChange}
      />
      <Button type="primary" loading={loading} onClick={handleAddDevice}>
        Add device
      </Button>
    </Layout>
  );
};

export default AddDevice;
