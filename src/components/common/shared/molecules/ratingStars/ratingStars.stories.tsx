import { Meta, StoryObj } from '@storybook/react';
import RatingStars from '.';
import { useState } from 'react';
import { RatingStarsCodeSnippet } from './codeExample';

export default {
  title: 'Common/Shared/Molecules/RatingStars',
  component: RatingStars,
  tags: ['autodocs'],
} satisfies Meta<typeof RatingStars>;

export const RatingExample: StoryObj<typeof RatingStars> = {
  render: () => {
    const [rating, setRating] = useState(0);
    return (
      <RatingStars
        rating={rating}
        onClick={setRating}
      />
    );
  },
  parameters: {
    codeExample: RatingStarsCodeSnippet(),
  },
};
