import Meta from '../../../components/Meta';
import Layout from '../../../templates/MainLayout';
import config from '../../../utils/config';

const Device = () => {
  return (
    <Layout
      meta={
        <Meta
          title={`View Device | ${config.title}: ${config.tagline}`}
          description={config.description}
        />
      }
    >
      <h1>Viewing all devices</h1>
    </Layout>
  );
};

export default Device;
