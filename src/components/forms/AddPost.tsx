import { Reducer, useReducer } from 'react';

import { FormStyled, InputGroup } from '../../styles/components/forms/AddPost';

interface StateType {
  entity: string;
  victim?: string;
  description: string;
  location?: string;
  source?: string | string[];
  videoUrl?: string;
}

const AddPost = () => {
  const [state, setState] = useReducer<Reducer<StateType, Partial<StateType>>>(
    (currentState, newState) => ({ ...currentState, ...newState }),
    {
      entity: '',
      victim: undefined,
      description: '',
      location: undefined,
      source: undefined,
      videoUrl: undefined,
    }
  );

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setState({ [name]: value });

    // setState((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
  };

  const postForm = async (event: any) => {
    event.preventDefault();

    await fetch('/api/post/add', {
      body: JSON.stringify(state),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((response) => {
        // If success or validation error
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw Error(response.statusText);
      })
      .catch((error) => {
        // Server error
        console.error('[CreatePost] Error creating post: ', error);
      });
  };
  return (
    <FormStyled onSubmit={(event) => postForm(event)}>
      {/* <Status
        active={active}
        error={status.error}
        className="absolute top-0 left-0 right-0 font-bold text-black bg-white p-4 text-center"
        dangerouslySetInnerHTML={{
          __html: status.message,
        }}
      /> */}
      <InputGroup>
        {/* <label htmlFor="entity">Who to shame</label> */}
        <input
          type="text"
          id="entity"
          name="entity"
          placeholder="Offending person or company"
          onChange={handleChange}
          required
        />
      </InputGroup>
      <InputGroup>
        {/* <label htmlFor="description">Tell us what&apos;s up</label> */}
        <textarea
          id="description"
          name="description"
          placeholder="What did they do to deserve shame?"
          rows={4}
          className="w-full"
          onChange={handleChange}
        />
      </InputGroup>
      <button
        type="submit"
        className="mt-12 py-6 bg-white text-black font-bold text-xl"
      >
        Send
      </button>
    </FormStyled>
  );
};

export default AddPost;
