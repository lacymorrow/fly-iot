import Form from '../../components/forms/AddPost';
import Meta from '../../components/Meta';
import Layout from '../../templates/AltLayout';
import config from '../../utils/config';

const Add = () => {
  return (
    <Layout
      meta={
        <Meta
          title={`Shame an entity | ${config.title}: ${config.tagline}`}
          description={config.description}
        />
      }
    >
      <div className="sm:table-cell w-full p-12 text-white font-bold mb-9">
        <h2 className="text-2xl mb-4">Add a new entry in the ShameDB</h2>
        <Form />
      </div>
    </Layout>
  );
};

export default Add;
