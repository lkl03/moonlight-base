'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Edge, Edges, Title } from '../FinancialFreedom/styles';
import lola_card from '../../../../public/images/lola_card.png';
import orange_card from '../../../../public/images/orange_card.png';
import terry_card from '../../../../public/images/terry_card.png';
import {
  Wrapper,
  Inner,
  Header,
  HeaderMainText,
  CardContainer,
  Card,
  TextCtn,
  CardBody,
  FeatureList,
  Footer,
  StartBtn,
  
  SVGCtn,
  ButtonContainer
} from './styles';
import { MaskText } from '@/components';
import { useIsMobile } from '../../../../libs/useIsMobile';
import {
  desktopHeaderPhrase,
  desktopParagraphPhrase,
  mobileHeaderPhrase,
  mobileParagraphPhrase,
  cardsInfo,
  planStyles,
} from './constants';
import { GetStartedButton } from '@/components';

const IntroSection = () => {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <Wrapper>
      <Inner>
        <Header>
          <span>Pricing</span>
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
<CardContainer>
  {cardsInfo.map((info) => (
    <Card key={info.title} style={planStyles[info.appearance]}>
      <CardBody>
        <TextCtn>
          <MaskText phrases={[info.title]} tag="span"/>
          <MaskText phrases={[info.price]} tag="h3"/>
          <MaskText phrases={[info.contractNote]} tag="span"/>
          <MaskText phrases={[info.description]} tag="p"/>
          <hr />
        </TextCtn>

        <FeatureList>
          {info.features.map((f) => <li key={f}>{f}</li>)}
        </FeatureList>
      </CardBody>

      <Footer>
        <StartBtn>Start Now</StartBtn>
      </Footer>
    </Card>
  ))}
</CardContainer>
        <ButtonContainer>
          <GetStartedButton text="Get Started" />
        </ButtonContainer>
      </Inner>
    </Wrapper>
  );
};

export default IntroSection;
