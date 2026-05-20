'use client';
import { useState, useCallback } from 'react';
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
  PlanCta,
  PlanCtaLegal,
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
  PlanInfo,
} from './constants';
import PayPalModal, { PlanConfirmationData } from './PayPalModal';

const PricingSection = () => {
  const isMobile = useIsMobile();
  const [activePlan, setActivePlan] = useState<PlanConfirmationData | null>(null);

  const openModal = useCallback((info: PlanInfo) => {
    setActivePlan({
      planKey: info.planKey,
      title: info.title,
      priceMonthly: info.priceMonthly,
      confirmationBody: info.confirmationBody,
      paypalPlanId: info.paypalPlanId,
    });
  }, []);

  const closeModal = useCallback(() => setActivePlan(null), []);

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
            <Card
              key={info.title}
              style={planStyles[info.appearance]}
              data-appearance={info.appearance}
            >
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
                <PlanCta
                  onClick={() => openModal(info)}
                  $variant={info.appearance === 'outline' ? 'green-to-green' : 'white-on-green'}
                >
                  <span>{info.ctaText}</span>
                </PlanCta>
                <PlanCtaLegal $onDark={info.appearance === 'solid'}>
                  Monthly subscription billed through PayPal. 12-month minimum contract
                  applies. By subscribing, you agree to our{' '}
                  <a href="/terms">Terms of Service</a>.
                </PlanCtaLegal>
              </Footer>
            </Card>
          ))}
        </CardContainer>
      </Inner>

      <PayPalModal plan={activePlan} onClose={closeModal} />
    </Wrapper>
  );
};

export default PricingSection;
