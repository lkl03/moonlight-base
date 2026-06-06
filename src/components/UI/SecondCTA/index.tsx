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
import { trackBookCallConversion } from '@/lib/google-ads';


const SecondCTA = () => {
  return (
    <Wrapper id="second-cta">
      <ImageContainer>
        <RevealCover />
        <Div>
          <Image src={green_divider} alt="green divider alt" fill />
        </Div>

        <Content>
          <TextColumn>
            <Headline>Looking for Other Options?</Headline>
            <Paragraph>
              Looking for e-commerce capabilities or more pages? If our plans don’t quite fit your
              vision, let’s create a custom solution just for you. Reach out to discuss your
              specific needs, and we’ll provide a personalized quote based on the scope of work.
            </Paragraph>
            <ButtonContainer>
              <GetStartedButton text="Get in Touch" href="#contact" variant="white-on-green" onClick={trackBookCallConversion} />
            </ButtonContainer>
          </TextColumn>
        </Content>
      </ImageContainer>
    </Wrapper>
  );
};

export default SecondCTA;
