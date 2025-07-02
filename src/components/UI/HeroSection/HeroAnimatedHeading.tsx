'use client';
import { TypeAnimation } from 'react-type-animation';
import styled from 'styled-components';

const AnimatedWrapper = styled.h1`
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 900;
  line-height: 1.2;
`;

const HeroAnimatedHeading = ({
  staticText,
  dynamicPhrases,
}: {
  staticText: string;
  dynamicPhrases: string[];
}) => {
  // Build sequence for TypeAnimation
  const sequence = dynamicPhrases.flatMap((phrase) => [
    1000,
    `${phrase}`,
    2000,
    '',
  ]);

  return (
    <AnimatedWrapper>
      {staticText}
      <TypeAnimation
        sequence={sequence}
        speed={50}
        deletionSpeed={40}
        repeat={Infinity}
        wrapper="h1"
      />
    </AnimatedWrapper>
  );
};

export default HeroAnimatedHeading;
