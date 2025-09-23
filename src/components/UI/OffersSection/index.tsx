'use client';
import Image from 'next/image';
import user_offers from '../../../../public/svgs/user_offers.svg';
import {
  Wrapper,
  Inner,
  Header,
  Offers,
  OfferCard,
  ImageCtn,
  TextCtn,
  HeaderMainText,
  CardsContainer,
  LeftImage,
  MiddleImage,
  RightImage,
  PerksContainer,
  ButtonContainer,
} from './styles';
import MaskText from '@/components/Common/MaskText';
import { useIsMobile } from '../../../../libs/useIsMobile';
import {
  desktopHeaderPhrase,
  desktopParagraphPhrase,
  mobileHeaderPhrase,
  mobileParagraphPhrase,
  offers,
} from './constants';
import { GetStartedButton } from '@/components';

const OffersSection = () => {
  const isMobile = useIsMobile();
  return (
    <Wrapper>
      <Inner>
        <Header>
          <span>Our Offering</span>
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
        <PerksContainer>
          <Offers>
            {offers.slice(0, 3).map((offer, i) => (
              <OfferCard key={i}>
                <ImageCtn>
                  <Image src={offer.illustration} alt="illustration" />
                </ImageCtn>
                <TextCtn>
                  <MaskText phrases={new Array(offer.title)} tag="h3" />
                  <p>{offer.details}</p>
                </TextCtn>
              </OfferCard>
            ))}
          </Offers>
          <CardsContainer>
            <MiddleImage
              src={user_offers}
              alt="blue card"
            />
          </CardsContainer>
          <Offers>
            {offers.slice(3, 6).map((offer, i) => (
              <OfferCard key={i}>
                <ImageCtn>
                  <Image src={offer.illustration} alt="illustration" />
                </ImageCtn>
                <TextCtn>
                  <MaskText phrases={new Array(offer.title)} tag="h3" />
                  <p>{offer.details}</p>
                </TextCtn>
              </OfferCard>
            ))}
          </Offers>
        </PerksContainer>
        <ButtonContainer>
          <GetStartedButton text="View Plans" />
        </ButtonContainer>
      </Inner>
    </Wrapper>
  );
};

export default OffersSection;
