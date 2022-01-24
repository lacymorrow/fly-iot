// https://cookpete.com/react-player/ demo
// Plays videos from Youtube, Facebook, Streamable,Twitch, Vidyard, Vimeo, Wistia

import { useCallback } from 'react';

// Lazy load the YouTube player
import styled from '@emotion/styled';
import ReactPlayer from 'react-player/lazy';

interface VideoPlayerProps {
  src: string;
}

const Wrapper = styled.div`
  position: relative;
  padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
`;

const VideoPlayer = (props: VideoPlayerProps) => {
  let src = new URL(props.src);
  const handleContextMenu = useCallback((event) => {
    event.preventDefault();
  }, []);

  // Use youtube-nocookie instead
  if (src.hostname === 'youtube.com') {
    src = new URL(
      `${src.protocol}//youtube-nocookie.com${src.pathname}${src.search}`
    );
  }

  return (
    <Wrapper>
      <ReactPlayer
        className="absolute top-0 left-0"
        width="100%"
        height="100%"
        url={src.href}
        volume={0.8}
        onContextMenu={handleContextMenu}
        config={{
          youtube: {
            playerVars: { modestbranding: 1, rel: 0 },
          },
        }}
        // light
        controls
      />
    </Wrapper>
  );
};

export default VideoPlayer;
