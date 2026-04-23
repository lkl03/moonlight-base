'use client';

import Image from 'next/image';
import featured_showcase from '../../../../public/svgs/featured-devices-showcase.svg';
import green_divider from '../../../../public/svgs/green_divider.svg';

import {
  Wrapper,
  ImageContainer,
  Div,
  Content,
  TextColumn,
  ImageColumn,
  Label,
  Headline,
  Paragraph,
  ButtonContainer,
} from './styles';

import RevealCover from '@/components/Common/RevealCover';
import { GetStartedButton } from '@/components';

export const imageVariants = {
  hidden: {
    scale: 1.6,
  },
  visible: {
    scale: 1,
    transition: {
      duration: 1.4,
      ease: [0.6, 0.05, -0.01, 0.9],
      delay: 0.2,
    },
  },
};

const Featured = () => {
  return (
    <Wrapper id="what-we-do">
      <ImageContainer>
        <RevealCover />
        <Div
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.25, once: true }}
        >
          <Image src={green_divider} alt="green divider" fill />
        </Div>

        <Content>
          <TextColumn>
            <Label>WHAT WE DO</Label>
            <Headline>
              We Just Build <br />
              Websites, <br />
              From 0 To 100
            </Headline>
            <Paragraph>
              From concept to launch, we craft websites that captivate and convert. Experience
              the power of a stunning, custom-built website that showcases your business and
              engages your audience.
            </Paragraph>
            <ButtonContainer>
              <GetStartedButton text="Learn More" href="#how-it-works" variant="black filled" />
            </ButtonContainer>
          </TextColumn>

          <ImageColumn>
            <Image
              src={featured_showcase}
              alt="Desktop monitor and tablet showing a custom website interface"
              fill
              priority
            />
          </ImageColumn>
        </Content>
      </ImageContainer>
    </Wrapper>
  );
};

export default Featured;
