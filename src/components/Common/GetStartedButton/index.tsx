'use client';

import { LinkTo } from './styles';

interface GetStartedButtonProps {
  text: string;
  href?: string;
  variant?: 'green filled' | 'black filled' | 'green-to-black' | 'white-on-green' | 'white-to-green' | 'green-to-green';
  onClick?: () => void;
}

const GetStartedButton = ({
  text,
  href = '#contact',
  variant = 'green filled',
  onClick,
}: GetStartedButtonProps) => {
  return (
    <LinkTo href={href} $variant={variant} onClick={onClick}>
      <span>{text}</span>
    </LinkTo>
  );
};

export default GetStartedButton;
