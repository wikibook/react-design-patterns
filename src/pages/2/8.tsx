import { Button, Icon, usePasswordToggle } from './4';
import { TextInput } from './7';

export function SignUpForm() {
  const [passwordType, passwordToggle] = usePasswordToggle();
  const [passwordCheckType, passwordCheckToggle] = usePasswordToggle();

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <TextInput label="이메일" type="email" />

      <TextInput label="닉네임" type="text" />

      <TextInput label="비밀번호" type={passwordType}>
        <Button onClick={passwordToggle}>
          <Icon variant={passwordType === 'password' ? 'eye' : 'eye-slash'} />
        </Button>
      </TextInput>

      <TextInput label="비밀번호 확인" type={passwordCheckType}>
        <Button onClick={passwordCheckToggle}>
          <Icon
            variant={passwordCheckType === 'password' ? 'eye' : 'eye-slash'}
          />
        </Button>
      </TextInput>
    </form>
  );
}
