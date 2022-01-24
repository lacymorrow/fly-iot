import styled from '@emotion/styled';

export const StyledNav = styled.div`
  display: flex;
  justify-content: space-between;

  a,
  button {
    /* margin-left: 1.5rem; */
    color: rgb(113 128 150 / var(--tw-text-opacity));
    font-size: 0.9rem;
    font-weight: bold;
  }
`;

export const StyledDropdown = styled.div`
  position: absolute;
  top: 150%;
  right: 4px;
  min-width: max-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: white;
  text-align: left;
  border: 1px solid rgb(113 128 150 / var(--tw-text-opacity));
  visibility: hidden;
  &.visible {
    visibility: visible;
  }

  a,
  button {
    display: block;
    width: 100%;
    padding: 0.5rem;
    :hover {
      background-color: #e7e7e7;
    }
  }
`;
