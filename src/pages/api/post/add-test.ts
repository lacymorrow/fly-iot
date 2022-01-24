// Validate that post is not duplicate
import { addPost } from '../../../lib/posts';

const add = async (_: any, res: any) => {
  const post = await addPost({
    sources: [],
    videoUrl: 'https://youtube.com/watch?v=7Ooa7wOKHhg',
    entity: 'Philip Brailsford',
    victim: 'Daniel Shaver',
    description:
      'Newly released bodycam footage shows former Mesa police officer Philip Brailsford shoot and kill unarmed Daniel Shaver at a hotel in Arizona. Brailsford says he shot Shaver after he reached for his waistband and was acquitted of murder charges.',
    location: 'Mesa, Arizona',
  });
  res.json(post);
};

export default add;
