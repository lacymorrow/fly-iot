/* eslint-disable @typescript-eslint/naming-convention */
import { ObjectId } from 'mongodb';

import { generateRandom } from '../utils/utils';
import clientPromise from './mongodb';

export const addPost = async (props: any) => {
  let thumbnail: string = '';
  const client = await clientPromise;
  if (props.videoUrl) {
    const response = await fetch(
      `http://noembed.com/embed?url=${props.videoUrl}`
    );
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { thumbnail_url } = await response.json();
    thumbnail = thumbnail_url.replace('hqdefault', 'mqdefault');
    // Todo: check for existence
  }

  const post = await client
    .db(process.env.MONGODB_DB)
    .collection('posts')
    .insertOne({
      createdByUser: '61e8717cd38d770f67357134',
      timeDate: String(new Date()),
      timeCreated: Date.now(),
      timeUpdated: Date.now(),
      thumbnail,
      ...props,
    });

  return post;
};

export const getAllPostsPaginated = async ({
  limit,
  skip,
}: {
  limit: number;
  skip: number;
}) => {
  const client = await clientPromise;

  let posts = await client
    .db(process.env.MONGODB_DB)
    .collection('posts')
    .find({})
    .sort({ $natural: -1 })
    .skip(skip > 0 ? (skip - 1) * limit : 0)
    .limit(limit)
    .toArray();

  // Convert `new ObjectId('...')` to string '...'
  posts = posts.map((post: any) => {
    const { _id, ...rest } = post;

    return { _id: _id.toString(), ...rest };
  });

  return posts;
};

export const getAllPosts = () => getAllPostsPaginated({ limit: 0, skip: 0 });

export const getFirstPost = async () => {
  const client = await clientPromise;

  const post = await client
    .db(process.env.MONGODB_DB)
    .collection('posts')
    .findOne({}, { sort: { $natural: -1 } });

  // Convert `new ObjectId('...')` to string '...'
  const { _id, ...rest } = post;

  return { _id: _id.toString(), ...rest };
};

export const getPost = async (postId: string | string[]) => {
  // Return a single document with a given postId
  let id;
  const client = await clientPromise;

  try {
    if (!postId) {
      throw new Error('Invalid postId');
    }

    if (typeof postId === 'object') {
      [id] = postId;
    } else {
      id = postId;
    }

    const oId = new ObjectId(id);

    const post = await client
      .db(process.env.MONGODB_DB)
      .collection('posts')
      .findOne({ _id: oId });

    // Convert `new ObjectId('...')` to string '...'
    const { _id, ...rest } = post;

    return { _id: _id.toString(), ...rest };
  } catch (error) {
    return null;
  }
};

export const getAllPostIds = async () => {
  const posts = await getAllPosts();
  const paths = posts.map((post: any) => {
    // eslint-disable-next-line no-underscore-dangle
    return post._id.toString();
  });

  return paths;
};

export const getRandomPostId = async () => {
  const ids = await getAllPostIds();

  return ids[generateRandom(ids.length)];
};

export const deletePost = async (postId: string | string[]) => {
  // Return a single document with a given postId
  let id;
  const client = await clientPromise;

  try {
    if (!postId) {
      throw new Error('Invalid postId');
    }

    if (typeof postId === 'object') {
      [id] = postId;
    } else {
      id = postId;
    }

    const oId = new ObjectId(id);

    await client
      .db(process.env.MONGODB_DB)
      .collection('posts')
      .remove({ _id: oId });

    return true;
  } catch (error) {
    return false;
  }
};

export const DeletePost = async (postId: string | string[]) => {
  // Return a single document with a given postId
  let id;
  const client = await clientPromise;

  try {
    if (!postId) {
      throw new Error('Invalid postId');
    }

    if (typeof postId === 'object') {
      [id] = postId;
    } else {
      id = postId;
    }

    const oId = new ObjectId(id);

    await client
      .db(process.env.MONGODB_DB)
      .collection('posts')
      .remove({ _id: oId });

    return true;
  } catch (error) {
    return false;
  }
};

export const deleteAllPosts = async () => {
  const client = await clientPromise;

  try {
    await client.db(process.env.MONGODB_DB).collection('posts').remove({});

    return true;
  } catch (error) {
    return false;
  }
};
