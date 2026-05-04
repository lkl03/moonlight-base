'use client';
import Image from 'next/image';
import green_divider from '../../../../public/svgs/green_divider.svg';

import {
  Wrapper,
  ImageContainer,
  Div,
  Content,
  TextColumn,
  Headline,
  Paragraph,
  ButtonContainer,
} from './styles';

import RevealCover from '@/components/Common/RevealCover';
import { GetStartedButton } from '@/components';


const FirstCTA = () => {
  return (
    <Wrapper id="first-cta">
      <ImageContainer>
        <RevealCover />
        <Div>
          <Image src={green_divider} alt="green divider" fill />
        </Div>

        <Content>
          <TextColumn>
            <Headline>
              Doubts? <br />
              Let’s Talk!
            </Headline>
            <Paragraph>
              Reach out to us to learn more about how we work and how we can help you.
            </Paragraph>
            <ButtonContainer>
              <GetStartedButton text="Get in Touch" href="#contact" variant="white-on-green" />
            </ButtonContainer>
          </TextColumn>
        </Content>
      </ImageContainer>
    </Wrapper>
  );
};

export default FirstCTA;
