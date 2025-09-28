import Link from 'next/link';
import { LinkTo } from './styles';

interface GetStartedButtonProps {
  text: string;
  variant?: 'green filled' | 'black filled' | 'green-to-black';
}

const GetStartedButton = ({ text, variant = 'green filled' }: GetStartedButtonProps) => {
  return (
    <LinkTo href="/" $variant={variant}>
      <span>{text}</span>
    </LinkTo>
  );
};

export default GetStartedButton;

