import { GetStaticProps } from 'next';

import Meta from '../../components/Meta';
import VideoPlayer from '../../components/VideoPlayer';
import { getAllPostIds, getPost } from '../../lib/posts';
import { PostWrapper } from '../../styles/post';
import MainLayout from '../../templates/MainLayout';
import config from '../../utils/config';

const Post = ({ post }: any) => {
  const {
    isOfficer,
    entity,
    victim,
    description,
    location,
    timeDate,
    // source,
    videoUrl,
  } = post;
  const title = entity;
  return (
    <MainLayout
      meta={
        <Meta
          title={`${title} | ${config.title}: ${config.tagline}`}
          description={post.description}
        />
      }
    >
      <PostWrapper className="border-8 py-2 px-4">
        <h1>
          {isOfficer && <b>Officer </b>}
          {title ||
            (victim && (
              <span>
                <b>Victim:</b> {victim}
              </span>
            ))}
        </h1>
        {title && victim && (
          <h2>
            <b>Victim:</b> {victim}
          </h2>
        )}

        {videoUrl && (
          <div className="max-w-xl md:max-w-3xl border-8  mx-auto">
            <VideoPlayer src={videoUrl} />
          </div>
        )}

        {description && <p className="app-text-regular mb-6">{description}</p>}
        {location && <p className="app-text-meta mb-6">{location}</p>}
        {timeDate && <p className="app-text-unimportant">{timeDate}</p>}

        {JSON.stringify(post)}
      </PostWrapper>
    </MainLayout>
  );
};

export async function getStaticPaths() {
  const ids = await getAllPostIds();
  const paths = ids.map((postId: string) => {
    return { params: { postId: [postId] } };
  });
  return { paths, fallback: 'blocking' };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Invalid or missing postId
  if (!params?.postId) {
    return {
      redirect: { destination: '/post/random', permanent: false },
    };
  }
  const post = await getPost(params.postId);

  // No post found
  if (!post) {
    return {
      redirect: { destination: '/post/random', permanent: false }, // Redirect to random
      // notFound: true, // 404
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 10, // in seconds
  };
};
export default Post;
