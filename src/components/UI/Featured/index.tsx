'use client';

import Image from 'next/image';
import featured_showcase from '../../../../public/svgs/featured-devices-showcase.svg';
import green_divider from '../../../../public/svgs/green_divider.svg';

import {
  Wrapper,
  ImageContainer,
  StaticDiv,
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


const Featured = () => {
  return (
    <Wrapper id="what-we-do">
      <ImageContainer>
        <RevealCover />
        <StaticDiv>
          <Image src={green_divider} alt="green divider" fill />
        </StaticDiv>

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
              <GetStartedButton text="Learn More" href="#how-it-works" variant="white-on-green" />
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
