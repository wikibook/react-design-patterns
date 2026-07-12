import { Button, Icon, usePasswordToggle } from './4';
import { TextInput } from './7';

function PasswordToggle({
  children,
}: {
  children: (props: { type: string; toggle: () => void }) => React.ReactNode;
}) {
  const [type, toggle] = usePasswordToggle();
  return <>{children({ type, toggle })}</>;
}

export function SignUpForm() {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <PasswordToggle>
        {({ type, toggle }) => (
          <TextInput label="비밀번호" type={type}>
            <Button onClick={toggle}>
              <Icon variant={type === 'password' ? 'eye' : 'eye-slash'} />
            </Button>
          </TextInput>
        )}
      </PasswordToggle>

      <PasswordToggle>
        {({ type, toggle }) => (
          <TextInput label="비밀번호 확인" type={type}>
            <Button onClick={toggle}>
              <Icon variant={type === 'password' ? 'eye' : 'eye-slash'} />
            </Button>
          </TextInput>
        )}
      </PasswordToggle>
    </form>
  );
}
