'use client';
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

const PricingSection = () => {
  const isMobile = useIsMobile();

  return (
    <Wrapper id="pricing">
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
            <Card key={info.title} style={planStyles[info.appearance]} data-appearance={info.appearance}>
              <CardBody>
                <TextCtn>
                  <MaskText className="title" phrases={[info.title]} tag="span" />
                  <MaskText className="price" phrases={[info.price]} tag="h2" />
                  <MaskText className="note" phrases={[info.contractNote]} tag="span" />
                  <MaskText className="desc" phrases={[info.description]} tag="p" />
                  <hr />
                </TextCtn>

                <FeatureList>
                  {info.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </FeatureList>
              </CardBody>

              <Footer>
                <GetStartedButton
                  text="Start Now"
                  href="/checkout"
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

export default PricingSection;
