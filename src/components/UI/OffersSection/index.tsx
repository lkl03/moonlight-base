'use client';
import Image from 'next/image';
import {
  Wrapper,
  Inner,
  Header,
  Offers,
  OfferCard,
  ImageCtn,
  TextCtn,
  HeaderMainText
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
        <Offers>
          {offers.slice(0, 2).map((offer, i) => (
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
        <Offers>
          {offers.slice(2, 4).map((offer, i) => (
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
      </Inner>
    </Wrapper>
  );
};

export default OffersSection;
