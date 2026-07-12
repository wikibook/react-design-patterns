import { ComponentPropsWithoutRef } from 'react';
import { ErrorNoticeText, Input, Label, RoundBorderContainer } from './4';

export function EmailInput({
  label,
  errorText,
  ...props
}: ComponentPropsWithoutRef<'input'> & { label: string; errorText?: string }) {
  return (
    <>
      <Label htmlFor={props.id}>{label}</Label>

      <RoundBorderContainer errorText={errorText}>
        <Input {...props} type="email" />
      </RoundBorderContainer>

      <ErrorNoticeText errorText={errorText} />
    </>
  );
}
