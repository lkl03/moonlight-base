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
          <MaskText className="title" phrases={[info.title]} tag="span" />
          <MaskText className="price" phrases={[info.price]} tag="h2" />
          <MaskText className="note" phrases={[info.contractNote]} tag="span" />
          <MaskText className="desc" phrases={[info.description]} tag="p" />
          <hr />
        </TextCtn>

        <FeatureList>
          {info.features.map((f) => <li key={f}>{f}</li>)}
        </FeatureList>
      </CardBody>

      <Footer>
        <GetStartedButton
          text="Start Now"
          variant={info.appearance === 'outline' ? 'green-to-black' : 'black filled'}
        />
      </Footer>
    </Card>
  ))}
</CardContainer>
      </Inner>
    </Wrapper>
  );
};

export default IntroSection;
