import Meta from '../components/Meta';
import Layout from '../templates/MainLayout';
import config from '../utils/config';

const About = () => (
  <Layout
    meta={
      <Meta
        title={`About | ${config.title}: ${config.tagline}`}
        description={config.description}
      />
    }
  >
    <p></p>
  </Layout>
);

export default About;
