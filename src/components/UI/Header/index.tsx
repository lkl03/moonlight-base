'use client';

import Image from 'next/image';
import {
  Wrapper,
  Inner,
  LogoContainer,
  Nav,
  CallToActions,
  AbsoluteLinks,
  BurgerMenu,
} from './styles';
import moonlight_logo from '../../../../public/pngs/logo-moonlight.png';
import moonlight_logo_white from '../../../../public/pngs/logo-moonlight_white.png';
import ic_bars from '../../../../public/svgs/ic_bars.svg';
import { GetStartedButton } from '@/components';
import AnimatedLink from '@/components/Common/AnimatedLink';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { links, menu } from './constants';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Wrapper>
      <Inner>
        <LogoContainer>
          {/* White logo — shown in dark mode, hidden in light mode */}
          <Image src={moonlight_logo_white} alt="Moonlight Web Designs" className="site-logo--white" priority width={200} />
          {/* Dark logo — hidden in dark mode, shown in light mode */}
          <Image src={moonlight_logo} alt="Moonlight Web Designs" className="site-logo--dark" priority width={200} />
          {/*<BurgerMenu onClick={() => setIsOpen(!isOpen)}>
            <motion.div
              variants={menu}
              animate={isOpen ? 'open' : 'closed'}
              initial="closed"
            ></motion.div>
            <Image src={ic_bars} alt="bars" />
          </BurgerMenu>*/}
        </LogoContainer>
        {/*<Nav className={isOpen ? 'active' : ''}>
          {links.map((link, i) => (
            <AnimatedLink key={i} title={link.linkTo} />
          ))}
        </Nav>*/}
        {/*<CallToActions className={isOpen ? 'active' : ''}>
          <AnimatedLink title="Login" />
          <GetStartedButton padding="0.5rem 0.75rem" />
        </CallToActions>*/}
      </Inner>
    </Wrapper>
  );
};

export default Header;
