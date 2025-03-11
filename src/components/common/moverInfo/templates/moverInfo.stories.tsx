import { Meta, StoryFn } from '@storybook/react';
import MoverInfo from './moverInfo';
import { MoverInfoTemplateProps } from './template.types';
import { MoverInfoCodeSnippet } from './codeExample';

export default {
  title: 'common/MoverInfo/Templates/MoverInfo',
  component: MoverInfo,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='w-full md:w-full xl:w-1/2'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MoverInfo>;

const Template: StoryFn<typeof MoverInfo> = (args) => <MoverInfo {...args} />;

export const MoverStatInfo = Template.bind({});

const MoverStatInfoProps: MoverInfoTemplateProps = {
  variant: 'quote',
  subVariant: 'pending',
  moverName: '김코드',
  imageUrl: null,
  movingType: 'small',
  isCustomQuote: true,
  quoteState: 'confirmedQuote',
  rating: 5,
  ratingCount: 500,
  experienceYears: 3,
  isFavorite: true,
  quoteCount: 500,
  favoriteCount: 500,
  price: 50000,
  movingDate: new Date(),
  departure: '서울 중구',
  arrival: '경기도 김포시',
  onConfirmClick: () => alert(''),
  onDetailClick: () => alert(''),
};

MoverStatInfo.args = MoverStatInfoProps;
MoverStatInfo.parameters = {
  codeExample: MoverInfoCodeSnippet(MoverStatInfoProps),
};

export const CompletedQuoteInfo = Template.bind({});

const CompletedQuoteInfoProps: MoverInfoTemplateProps = {
  variant: 'quote',
  subVariant: 'completed',
  moverName: '김코드',
  imageUrl: null,
  movingType: 'small',
  isCustomQuote: true,
  quoteState: 'confirmedQuote',
  rating: 5,
  ratingCount: 500,
  isFavoriteMoverList: false,
  experienceYears: 3,
  isFavorite: true,
  quoteCount: 500,
  favoriteCount: 500,
  price: 50000,
  description: '최선을 다해 모시겠습니다.',
};

CompletedQuoteInfo.args = CompletedQuoteInfoProps;
CompletedQuoteInfo.parameters = {
  codeExample: MoverInfoCodeSnippet(CompletedQuoteInfoProps),
};

export const CompletedWithoutDescriptionAndPrice = Template.bind({});

const CompletedWithoutDescriptionAndPriceProps: MoverInfoTemplateProps = {
  variant: 'quote',
  subVariant: 'completed',
  moverName: '김코드',
  imageUrl: null,
  movingType: 'small',
  isCustomQuote: true,
  quoteState: 'confirmedQuote',
  rating: 5,
  ratingCount: 500,
  isFavoriteMoverList: false,
  experienceYears: 3,
  isFavorite: true,
  quoteCount: 500,
  favoriteCount: 500,
};

CompletedWithoutDescriptionAndPrice.args =
  CompletedWithoutDescriptionAndPriceProps;

CompletedWithoutDescriptionAndPrice.parameters = {
  codeExample: MoverInfoCodeSnippet(CompletedWithoutDescriptionAndPriceProps),
};

export const PendingReviewInfo = Template.bind({});

const PendingReviewInfoProps: MoverInfoTemplateProps = {
  imageUrl: null,
  variant: 'review',
  subVariant: 'pending',
  moverName: '김코드',
  movingType: 'small',
  isCustomQuote: true,
  movingDate: new Date(),
  price: 50000,
  onClickReviewButton: () => alert(''),
};

PendingReviewInfo.args = PendingReviewInfoProps;
PendingReviewInfo.parameters = {
  codeExample: MoverInfoCodeSnippet(PendingReviewInfoProps),
};

export const WrittenReviewInfo = Template.bind({});

const WrittenReviewInfoProps: MoverInfoTemplateProps = {
  imageUrl: null,
  variant: 'review',
  subVariant: 'written',
  moverName: '김코드',
  movingType: 'small',
  isCustomQuote: true,
  movingDate: new Date(),
  price: 50000,
  reviewContent: '친절하고 좋아요 다음에도 요청드릴게요.',
  rating: 5,
  writtenAt: new Date(),
};

WrittenReviewInfo.args = WrittenReviewInfoProps;
WrittenReviewInfo.parameters = {
  codeExample: MoverInfoCodeSnippet(WrittenReviewInfoProps),
};
