import { ErrorNoticeText, Input, Label, RoundBorderContainer } from './4';

export function TextInput({
  label,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & {
  label: string;
  errorText?: string;
}) {
  return (
    <>
      <Label htmlFor={props.id}>{label}</Label>

      <RoundBorderContainer errorText={props.errorText}>
        <Input {...props} />
        {children}
      </RoundBorderContainer>

      <ErrorNoticeText errorText={props.errorText} />
    </>
  );
}
