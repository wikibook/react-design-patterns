import { ComponentPropsWithoutRef } from 'react';
import {
  Button,
  ErrorNoticeText,
  Icon,
  Input,
  Label,
  RoundBorderContainer,
} from './4';
import { usePasswordToggle } from './4/usePasswordToggle';

export function PasswordInput({
  label,
  errorText,
  ...props
}: ComponentPropsWithoutRef<'input'> & { label: string; errorText?: string }) {
  const [inputType, toggle] = usePasswordToggle();

  return (
    <>
      <Label htmlFor={props.id}>{label}</Label>

      <RoundBorderContainer errorText={errorText}>
        <Input {...props} type={inputType} />
        <Button onClick={toggle}>
          <Icon variant={inputType === 'password' ? 'eye' : 'eye-slash'} />
        </Button>
      </RoundBorderContainer>

      <ErrorNoticeText errorText={errorText} />
    </>
  );
}
