import { Button, Icon } from './4';
import { TextInput } from './7';
import { PasswordToggle } from './9';

export function SignUpForm() {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <TextInput label="이메일" type="email" />

      <TextInput label="닉네임" type="text" />

      <PasswordToggle
        render={({ inputType, toggle }) => (
          <TextInput label="비밀번호" type={inputType}>
            <Button onClick={toggle}>
              <Icon variant={inputType === 'password' ? 'eye' : 'eye-slash'} />
            </Button>
          </TextInput>
        )}
      />

      <PasswordToggle
        render={({ inputType, toggle }) => (
          <TextInput label="비밀번호 확인" type={inputType}>
            <Button onClick={toggle}>
              <Icon variant={inputType === 'password' ? 'eye' : 'eye-slash'} />
            </Button>
          </TextInput>
        )}
      />
    </form>
  );
}
