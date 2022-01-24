import styled from '@emotion/styled';

export const BigTitle = styled.h1<any>`
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
  ${({ src }) => ({
    backgroundImage: `url("${src || '/assets/images/shots/8.jpg'}")`,
  })}
  transition: background 2s ease-in;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: black;
  font-weight: 900;
  /* display: inline-block; */
  text-align: center;
  background-size: cover;
  position: relative;
  &::before {
    text-shadow: 0px 0px #000;
    ${({ content }) => ({
      content: `"${content}"`,
    })};
    position: absolute;
    opacity: 1;
    transition: opacity 2.5s ease-in;
    ${(props) =>
      props.active && {
        // opacity: '0.1', to add a slight dark overlay
        opacity: '0',
      }}
  }
`;
