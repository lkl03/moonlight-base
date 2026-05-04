import { LinkTo } from './styles';

interface GetStartedButtonProps {
  text: string;
  href?: string;
  variant?: 'green filled' | 'black filled' | 'green-to-black' | 'white-on-green' | 'white-to-green' | 'green-to-green';
}

const GetStartedButton = ({
  text,
  href = '#contact',
  variant = 'green filled',
}: GetStartedButtonProps) => {
  return (
    <LinkTo href={href} $variant={variant}>
      <span>{text}</span>
    </LinkTo>
  );
};

export default GetStartedButton;
