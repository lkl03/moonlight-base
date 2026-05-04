import Image from 'next/image';
import moonlight_logo_white from '../../../../public/pngs/logo-moonlight_white.png';
import moonlight_logo from '../../../../public/pngs/logo-moonlight.png';
import {
  Wrapper,
  Inner,
  Content,
  BrandBlock,
  LogoLink,
  BrandCopy,
  BrandCopyLine,
  BrandSecondaryRow,
  BrandAccentLink,
  LegalMeta,
  LegalMetaItem,
  UtilityGrid,
  Column,
  ColumnTitle,
  NavList,
  FooterLink,
  ContactList,
  ContactLink,
} from './styles';

const sitemapLinks = [
  { label: 'What We Do', href: '#what-we-do' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Wrapper>
      <Inner>
        <Content>
          <BrandBlock>
            <LogoLink href="/" aria-label="Moonlight Web Designs home">
              {/* White logo — dark mode; dark logo — light mode */}
              <Image src={moonlight_logo_white} alt="Moonlight Web Designs logo" className="site-logo--white" width={220} priority />
              <Image src={moonlight_logo} alt="Moonlight Web Designs logo" className="site-logo--dark" width={220} priority />
            </LogoLink>

            <BrandCopy>
              <BrandCopyLine>
                Copyright © {currentYear} | Moonlight Web Designs
              </BrandCopyLine>
              <BrandSecondaryRow>
                <span>All Rights Reserved</span>
                <span>•</span>
                <span>
                  Part of{' '}
                  <BrandAccentLink
                    href="https://www.eterlab.co"
                    target="_blank"
                    rel="noreferrer"
                  >
                    eterlab.
                  </BrandAccentLink>
                </span>
              </BrandSecondaryRow>
              <LegalMeta>
                <LegalMetaItem>Terms of Service</LegalMetaItem>
                <LegalMetaItem>Privacy Policy</LegalMetaItem>
              </LegalMeta>
            </BrandCopy>
          </BrandBlock>

          <UtilityGrid>
            <Column>
              <ColumnTitle>Sitemap</ColumnTitle>
              <NavList>
                {sitemapLinks.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </NavList>
            </Column>

            <Column id="footer-contact">
              <ColumnTitle>Contact Info</ColumnTitle>
              <ContactList>
                <li>
                  <ContactLink href="tel:+11234567890">+1(123) 456 7890</ContactLink>
                </li>
                <li>
                  <ContactLink href="mailto:info@codestitch.com">
                    info@codestitch.com
                  </ContactLink>
                </li>
              </ContactList>
            </Column>
          </UtilityGrid>
        </Content>
      </Inner>
    </Wrapper>
  );
};

export default Footer;
