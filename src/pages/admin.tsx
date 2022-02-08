import React, { useState } from 'react';

import { Button, Space } from 'antd';

import Meta from '../components/Meta';
import Layout from '../templates/MainLayout';
import config from '../utils/config';
import openNotification from '../utils/notification';

interface StateType {
  deleteAll?: boolean;
  // deleteProvisioned?: boolean;
  provision?: boolean;
}

const Admin = () => {
  const [loading, setLoading] = useState({
    deleteAll: false,
    // deleteProvisioned: false,
    provision: false,
  });

  const setLoadingState = (state: StateType) => {
    setLoading({ ...loading, ...state });
  };

  const handleProvisionDevice = async () => {
    setLoadingState({ provision: true });
    const result = await (await fetch('/api/admin/devices/provision')).json();

    if (result.insertedId) {
      openNotification({
        type: 'success',
        message: `Successfully provisioned device`,
        description: `Device ID: ${result.insertedId}`,
      });
    } else {
      openNotification({
        type: 'error',
        message: `Error provisioning new device`,
      });
    }
    setLoadingState({ provision: false });
  };

  const handleDeleteDatabase = async () => {
    setLoadingState({ deleteAll: true });
    const result = await (await fetch('/api/admin/devices/delete/all')).json();

    if (result) {
      openNotification({
        type: 'success',
        message: `Successfully deleted all devices`,
      });
    } else {
      openNotification({
        type: 'error',
        message: `Error deleting all devices`,
      });
    }

    setLoadingState({ deleteAll: false });
  };

  return (
    <Layout
      meta={
        <Meta
          title={`Admin | ${config.title}: ${config.tagline}`}
          description={config.description}
        />
      }
    >
      <Space direction="vertical">
        <Button
          type="primary"
          loading={loading.provision}
          onClick={handleProvisionDevice}
        >
          Provision Device
        </Button>
        <Button
          type="primary"
          danger={true}
          loading={loading.deleteAll}
          onClick={handleDeleteDatabase}
        >
          Delete All Devices
        </Button>
      </Space>
    </Layout>
  );
};

export function getServerSideProps() {
  // const provisioned
  return {
    props: {
      // returns the default 404 page with a status code of 404 in production
      notFound: process.env.NODE_ENV === 'production',
    },
  };
}

export default Admin;
