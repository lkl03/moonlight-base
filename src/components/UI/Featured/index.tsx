'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import site_banner from '../../../../public/images/featured_site_banner.png';
import green_divider from '../../../../public/svgs/green_divider.svg';

import { 
  Wrapper, 
  Inner, 
  ImageContainer, 
  Div, 
  Content, 
  TextColumn, 
  ImageColumn, 
  Label, 
  Headline, 
  Paragraph,
  ButtonContainer
} from './styles';

import RevealCover from '@/components/Common/RevealCover';
import { GetStartedButton } from '@/components';
import { useIsMobile } from '../../../../libs/useIsMobile';

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
  const isMobile = useIsMobile();

  return (
    <Wrapper>
      <ImageContainer>
        <RevealCover />
        <Div
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.25, once: true }}
        >
          <Image
            src={green_divider}
            alt="green divider"
            fill
          />
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
              From concept to launch, we craft websites that captivate and convert. Experience the power of a stunning, custom-built website that showcases your business and engages your audience.
            </Paragraph>
            <ButtonContainer>
              <GetStartedButton text="Learn More" variant='black filled' />
            </ButtonContainer>
          </TextColumn>

  <ImageColumn>
    <Image
      src={site_banner}
      alt="Devices showing website"
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
