'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  PageWrapper,
  SectionInner,
  HeroSection,
  HeroGrid,
  HeroContent,
  Eyebrow,
  HeroHeading,
  HeroSub,
  HeroNote,
  HeroTrustText,
  CtaLinkBtn,
  FormCard,
  FormTitle,
  FieldRow,
  FieldGroup,
  Label,
  Input,
  SelectInput,
  TextareaInput,
  CheckRow,
  SubmitBtn,
  FormLegal,
  FormErrorMsg,
  ContentSection,
  SectionEyebrow,
  SectionHeading,
  SectionLead,
  IncludedGrid,
  IncludedCard,
  GreenCheck,
  FitGrid,
  FitColumn,
  FitHeading,
  FitList,
  FitItem,
  PlansGrid,
  PlanCard,
  PlanName,
  PlanPrice,
  PlanPriceNote,
  PlanDesc,
  PlanFeatureList,
  PlanScopeNote,
  WhyGrid,
  WhyCard,
  FaqAccordion,
  FaqItem,
  FaqQuestion,
  FaqAnswer,
  BottomCtaSection,
  BottomCtaHeading,
  BottomCtaSub,
} from './styles';

const ChevronDown = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const includedItems = [
  { title: 'Custom Design', desc: 'A unique layout built around your business, not a template.' },
  { title: 'Development', desc: 'Clean, performant code. No page builders.' },
  { title: 'Hosting', desc: 'Covered in your monthly plan. No separate bill.' },
  { title: 'Maintenance', desc: 'We keep your site running and up to date.' },
  { title: 'Unlimited Edits', desc: 'Text, images, and content updates included.' },
  { title: 'Mobile-Friendly', desc: 'Fully responsive on all screen sizes.' },
  { title: 'Ongoing Support', desc: 'Direct access to your design team when you need it.' },
];

const goodFitItems = [
  'Small businesses that need a professional online presence',
  'Businesses that want predictable monthly pricing',
  'Founders who want design, hosting, and support handled together',
  "Teams that don't want a large upfront website bill",
  'Businesses ready to commit to a $199/mo minimum plan',
];

const notFitItems = [
  'People looking for a free or very cheap website',
  'DIY website builder users',
  'One-off template edits or quick fixes',
  'Businesses not ready for a 12-month minimum commitment',
];

const standardFeatures = [
  'Up to 3 pages',
  'Best for landings & brochure sites',
  'Custom design + mobile responsive',
  'Contact form + basic SEO setup',
  'Hosting & maintenance included',
  'Unlimited edits & support',
];

const advancedFeatures = [
  'Up to 10 pages',
  'Ideal for larger business websites',
  'Everything in Standard included',
  'Blog, portfolio, or CMS-ready sections',
  'Advanced forms & third-party integrations',
  'Priority support with scalable structure',
];

const whyItems = [
  {
    title: '$0 upfront',
    desc: 'Spread your investment over monthly payments instead of paying thousands at once to get started.',
  },
  {
    title: 'Website stays maintained',
    desc: "Your site doesn't go stale. We handle updates, fixes, and improvements on an ongoing basis.",
  },
  {
    title: 'Easier ongoing edits',
    desc: 'Need to update your hours, pricing, or team page? Send us a message — edits are included.',
  },
  {
    title: 'Hosting & support included',
    desc: 'No separate hosting bill, no tech surprises. One simple monthly price covers everything.',
  },
  {
    title: 'Predictable expenses',
    desc: 'Know exactly what your website costs every month. No hidden fees, no surprise invoices.',
  },
  {
    title: 'Built for small businesses',
    desc: 'A monthly model is easier to budget than a $4,000+ one-time payment most agencies charge.',
  },
];

const faqItems = [
  {
    q: 'What is Moonlight Web Designs?',
    a: 'Moonlight is a web design studio that builds custom websites for small businesses on a monthly subscription model. You get a professionally designed and developed website — with hosting, maintenance, edits, and support all included — for one monthly rate with no large upfront cost.',
  },
  {
    q: 'Why monthly instead of one upfront payment?',
    a: "Most agencies charge $3,000–$10,000+ upfront, then walk away. The monthly model means you pay less to get started, and your website stays actively maintained, updated, and supported as long as you're on a plan. It works better for small businesses that want a professional site without a large capital expense.",
  },
  {
    q: "What's included in the plan?",
    a: 'Custom website design and development, hosting, maintenance, unlimited content edits, mobile-responsive build, and ongoing support. The Standard plan covers up to 3 pages; the Advanced plan covers up to 10 pages with additional integrations and features.',
  },
  {
    q: 'Is there a minimum contract?',
    a: 'Yes — all plans require a 12-month minimum commitment. The monthly price reflects ongoing work (hosting, support, edits) in addition to the initial build. The minimum contract is clearly stated before you sign up, so there are no surprises.',
  },
  {
    q: 'How soon can we start?',
    a: "After you submit the intro call request, we'll review your details and follow up within 1–2 business days. If it looks like a fit, we'll schedule a 30-minute call to talk through your website goals, scope, and timeline.",
  },
  {
    q: 'What happens after I submit the form?',
    a: "We'll review your project details and follow up by email. If the scope and budget are a match, we'll schedule a free 30-minute intro call. From there, we handle design, development, and launch — keeping you updated throughout the process.",
  },
];

export default function LandingClient() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [currentWebsite, setCurrentWebsite] = useState('');
  const [need, setNeed] = useState('');
  const [budgetConfirmed, setBudgetConfirmed] = useState(false);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim() || !email.trim() || !businessName.trim() || !need) {
      setFormError('Please fill in all required fields.');
      return;
    }
    if (!budgetConfirmed) {
      setFormError('Please confirm you understand the $199/mo minimum plan requirement.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/contact-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          businessName: businessName.trim(),
          currentWebsite: currentWebsite.trim() || undefined,
          need,
          budgetConfirmed,
          message: message.trim() || undefined,
        }),
      });

      if (!res.ok) throw new Error('Request failed');

      router.push('/thank-you?source=ads');
    } catch {
      setFormError(
        'Something went wrong. Please try again or email us at contact.eterlab@gmail.com.',
      );
      setSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      {/* ── Hero + Form ── */}
      <HeroSection>
        <SectionInner>
          <HeroGrid>
            {/* Left: headline + copy */}
            <HeroContent>
              <Eyebrow>Monthly Web Design For Small Businesses</Eyebrow>
              <HeroHeading>Custom Business Websites From $199/mo</HeroHeading>
              <HeroSub>
                $0 upfront. Hosting, maintenance, support, and edits included in one simple
                monthly plan.
              </HeroSub>
              <HeroNote>
                Built for small businesses ready to invest in a professional website without a
                large upfront payment.
              </HeroNote>
              <CtaLinkBtn href="#contact-form">
                <span>Get My Website Plan</span>
              </CtaLinkBtn>
              <HeroTrustText>12-month minimum contract. Plans start at $199/mo.</HeroTrustText>
            </HeroContent>

            {/* Right: lead form */}
            <div id="contact-form">
              <FormCard>
                <FormTitle>Request A Free Intro Call</FormTitle>

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
                >
                  <FieldRow>
                    <FieldGroup>
                      <Label htmlFor="ld-name">Name *</Label>
                      <Input
                        id="ld-name"
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <Label htmlFor="ld-email">Email *</Label>
                      <Input
                        id="ld-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                      />
                    </FieldGroup>
                  </FieldRow>

                  <FieldGroup>
                    <Label htmlFor="ld-business">Business name *</Label>
                    <Input
                      id="ld-business"
                      type="text"
                      placeholder="Your business name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </FieldGroup>

                  <FieldGroup>
                    <Label htmlFor="ld-website">Current website URL (optional)</Label>
                    <Input
                      id="ld-website"
                      type="url"
                      placeholder="https://yoursite.com"
                      value={currentWebsite}
                      onChange={(e) => setCurrentWebsite(e.target.value)}
                    />
                  </FieldGroup>

                  <FieldGroup>
                    <Label htmlFor="ld-need">What do you need? *</Label>
                    <SelectInput
                      id="ld-need"
                      value={need}
                      onChange={(e) => setNeed(e.target.value)}
                      $isEmpty={need === ''}
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="New website">New website</option>
                      <option value="Website redesign">Website redesign</option>
                      <option value="Landing page">Landing page</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </SelectInput>
                  </FieldGroup>

                  <CheckRow htmlFor="ld-budget">
                    <input
                      type="checkbox"
                      id="ld-budget"
                      checked={budgetConfirmed}
                      onChange={(e) => setBudgetConfirmed(e.target.checked)}
                    />
                    I understand plans start at $199/mo with a 12-month minimum contract.
                  </CheckRow>

                  <FieldGroup>
                    <Label htmlFor="ld-message">Message (optional)</Label>
                    <TextareaInput
                      id="ld-message"
                      placeholder="Tell us a bit about your project or goals…"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </FieldGroup>

                  {formError && <FormErrorMsg role="alert">{formError}</FormErrorMsg>}

                  <SubmitBtn type="submit" disabled={submitting}>
                    <span>{submitting ? 'Sending…' : 'Request A Free Intro Call'}</span>
                  </SubmitBtn>

                  <FormLegal>
                    12-month minimum contract. Plans start at $199/mo. By submitting, you agree to
                    our <a href="/terms">Terms of Service</a>.
                  </FormLegal>
                </form>
              </FormCard>
            </div>
          </HeroGrid>
        </SectionInner>
      </HeroSection>

      {/* ── What's Included ── */}
      <ContentSection id="whats-included">
        <SectionInner>
          <SectionEyebrow>What&apos;s Included</SectionEyebrow>
          <SectionHeading>Everything You Need — One Monthly Price.</SectionHeading>
          <SectionLead>
            Hosting, maintenance, edits, and support are all part of the plan. No add-ons, no
            hidden fees, no surprises.
          </SectionLead>
          <IncludedGrid>
            {includedItems.map((item) => (
              <IncludedCard key={item.title}>
                <GreenCheck aria-hidden="true">✓</GreenCheck>
                <strong>{item.title}</strong>
                <p>{item.desc}</p>
              </IncludedCard>
            ))}
          </IncludedGrid>
        </SectionInner>
      </ContentSection>

      {/* ── Who This Is For ── */}
      <ContentSection id="who-its-for">
        <SectionInner>
          <SectionEyebrow>Is This Right For You?</SectionEyebrow>
          <SectionHeading>Built For Small Businesses. Not Everyone.</SectionHeading>
          <SectionLead>
            The monthly model is designed for businesses that want a professional site without a
            large upfront cost — and are ready to commit to an ongoing plan.
          </SectionLead>
          <FitGrid>
            <FitColumn>
              <FitHeading>A good fit if you&apos;re a…</FitHeading>
              <FitList>
                {goodFitItems.map((item) => (
                  <FitItem key={item} $positive>
                    {item}
                  </FitItem>
                ))}
              </FitList>
            </FitColumn>
            <FitColumn>
              <FitHeading>Not a fit if you&apos;re looking for…</FitHeading>
              <FitList>
                {notFitItems.map((item) => (
                  <FitItem key={item} $positive={false}>
                    {item}
                  </FitItem>
                ))}
              </FitList>
            </FitColumn>
          </FitGrid>
        </SectionInner>
      </ContentSection>

      {/* ── Plans Preview ── */}
      <ContentSection id="plans">
        <SectionInner>
          <SectionEyebrow>Pricing</SectionEyebrow>
          <SectionHeading>Simple, Transparent Pricing.</SectionHeading>
          <SectionLead>
            Two plans built for different scopes. Both include the same core services — hosting,
            maintenance, support, and unlimited edits included.
          </SectionLead>
          <PlansGrid>
            <PlanCard $featured>
              <PlanName>Standard</PlanName>
              <PlanPrice>$199</PlanPrice>
              <PlanPriceNote>Per month · 12-month minimum contract</PlanPriceNote>
              <PlanDesc>
                Best for landing pages and smaller brochure websites that need a polished online
                presence.
              </PlanDesc>
              <PlanFeatureList>
                {standardFeatures.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </PlanFeatureList>
            </PlanCard>
            <PlanCard>
              <PlanName>Advanced</PlanName>
              <PlanPrice>$349</PlanPrice>
              <PlanPriceNote>Per month · 12-month minimum contract</PlanPriceNote>
              <PlanDesc>
                Designed for more complex websites that need extra pages, structure, and custom
                functionality.
              </PlanDesc>
              <PlanFeatureList>
                {advancedFeatures.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </PlanFeatureList>
            </PlanCard>
          </PlansGrid>
          <PlanScopeNote>
            Final plan recommendation depends on scope. We&apos;ll confirm the right fit during
            your free intro call.
          </PlanScopeNote>
        </SectionInner>
      </ContentSection>

      {/* ── Why Monthly ── */}
      <ContentSection id="why-monthly">
        <SectionInner>
          <SectionEyebrow>Why Monthly</SectionEyebrow>
          <SectionHeading>A Better Way To Get A Professional Website.</SectionHeading>
          <SectionLead>
            Most agencies charge thousands upfront and disappear after launch. The monthly model
            means your site stays actively maintained, supported, and improved — without a large
            capital expense.
          </SectionLead>
          <WhyGrid>
            {whyItems.map((item) => (
              <WhyCard key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.desc}</p>
              </WhyCard>
            ))}
          </WhyGrid>
        </SectionInner>
      </ContentSection>

      {/* ── FAQ ── */}
      <ContentSection id="faq-landing">
        <SectionInner>
          <SectionEyebrow>FAQ</SectionEyebrow>
          <SectionHeading>Common Questions.</SectionHeading>
          <FaqAccordion role="list">
            {faqItems.map((item, idx) => (
              <FaqItem key={item.q} role="listitem">
                <FaqQuestion
                  type="button"
                  $open={openFaq === idx}
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                  aria-controls={`faq-ans-${idx}`}
                >
                  <span>{item.q}</span>
                  <ChevronDown />
                </FaqQuestion>
                <FaqAnswer
                  id={`faq-ans-${idx}`}
                  $open={openFaq === idx}
                  aria-hidden={openFaq !== idx}
                >
                  {item.a}
                </FaqAnswer>
              </FaqItem>
            ))}
          </FaqAccordion>
        </SectionInner>
      </ContentSection>

      {/* ── Bottom CTA ── */}
      <BottomCtaSection>
        <SectionInner>
          <BottomCtaHeading>Ready To Get Your Website?</BottomCtaHeading>
          <BottomCtaSub>
            Fill out the form above to request a free 30-minute intro call. We&apos;ll review your
            details and follow up within 1–2 business days.
          </BottomCtaSub>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CtaLinkBtn href="#contact-form">
              <span>Get My Website Plan</span>
            </CtaLinkBtn>
          </div>
        </SectionInner>
      </BottomCtaSection>
    </PageWrapper>
  );
}
