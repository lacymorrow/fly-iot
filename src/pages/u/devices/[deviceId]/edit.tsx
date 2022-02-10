import { useRouter } from 'next/router';

import Meta from '../../../../components/Meta';
import Layout from '../../../../templates/MainLayout';
import config from '../../../../utils/config';

const Device = () => {
  const router = useRouter();
  const { deviceId } = router.query;
  return (
    <Layout
      meta={
        <Meta
          title={`View Device | ${config.title}: ${config.tagline}`}
          description={config.description}
        />
      }
    >
      <h1>Edit {deviceId}</h1>
    </Layout>
  );
};

export default Device;
