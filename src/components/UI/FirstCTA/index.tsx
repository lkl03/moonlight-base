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

const FirstCTA = () => {
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
            <Headline>
              Doubts? <br />
              Let's Talk!
            </Headline>
            <Paragraph>
              Reach out to us to learn more about how we work and how we can help you.
            </Paragraph>
            <ButtonContainer>
              <GetStartedButton text="Get in Touch" variant='black filled' />
            </ButtonContainer>
          </TextColumn>
        </Content>
      </ImageContainer>
    </Wrapper>
  );
};

export default FirstCTA;
