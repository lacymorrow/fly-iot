import Meta from '../components/Meta';
import Layout from '../templates/MainLayout';
import config from '../utils/config';

const Admin = () => {
  const handleDeleteDatabase = async () => {
    await fetch('/api/posts/delete/all');
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
      <button onClick={handleDeleteDatabase}>Delete Database</button>
    </Layout>
  );
};

export function getServerSideProps() {
  return {
    props: {
      // returns the default 404 page with a status code of 404 in production
      notFound: process.env.NODE_ENV === 'production',
    },
  };
}

export default Admin;
