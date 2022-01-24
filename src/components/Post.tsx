import { PostWrapper } from '../styles/post';
import VideoPlayer from './VideoPlayer';

interface PostProps {
  title: string;
  timeDate: string;
  isOfficer?: boolean;
  entity?: string;
  victim?: string;
  description: string;
  location?: string;
  source?: string | string[];
  videoUrl?: string;
}

const Post = (post: PostProps) => {
  const {
    title,
    isOfficer,
    victim,
    description,
    location,
    timeDate,
    // source,
    videoUrl,
  } = post;
  return (
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

      {description && <p className="app-text-regular">{description}</p>}
      {location && <p className="app-text-meta">{location}</p>}
      {timeDate && <p className="app-text-unimportant">{timeDate}</p>}

      {JSON.stringify(post)}
    </PostWrapper>
  );
};

export default Post;
