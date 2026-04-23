'use client';

import Image from 'next/image';
import {
  Wrapper,
  Inner,
  Header,
  HeaderMainText,
  ProcessGrid,
  StepCard,
  StepIllustration,
  StepContent,
  StepTitle,
  StepDescription,
  ButtonContainer,
} from './styles';
import { MaskText } from '@/components';
import { useIsMobile } from '../../../../libs/useIsMobile';
import {
  desktopHeaderPhrase,
  desktopParagraphPhrase,
  edges,
  mobileHeaderPhrase,
  mobileParagraphPhrase,
} from './constants';
import { GetStartedButton } from '@/components';

const IntroSection = () => {
  const isMobile = useIsMobile();

  return (
    <Wrapper id="how-it-works">
      <Inner>
        <Header>
          <span>Our Process</span>
          <HeaderMainText>
            {isMobile ? (
              <>
                <MaskText phrases={mobileHeaderPhrase} tag="h2" />
                <MaskText phrases={mobileParagraphPhrase} tag="p" />
              </>
            ) : (
              <>
                <MaskText phrases={desktopHeaderPhrase} tag="h2" />
                <MaskText phrases={desktopParagraphPhrase} tag="p" />
              </>
            )}
          </HeaderMainText>
        </Header>

        <ProcessGrid>
          {edges.map((edge) => (
            <StepCard key={edge.point}>
              <StepIllustration>
                <Image src={edge.art} alt={edge.artAlt} fill sizes="(max-width: 900px) 100vw, 33vw" />
              </StepIllustration>
              <StepContent>
                <StepTitle>
                  <Image src={edge.icon} alt="" aria-hidden="true" />
                  <MaskText phrases={[edge.point]} tag="h3" />
                </StepTitle>
                <StepDescription>
                  <MaskText phrases={[edge.details]} tag="p" />
                </StepDescription>
              </StepContent>
            </StepCard>
          ))}
        </ProcessGrid>

        <ButtonContainer>
          <GetStartedButton text="Get Started" href="#pricing" />
        </ButtonContainer>
      </Inner>
    </Wrapper>
  );
};

export default IntroSection;
