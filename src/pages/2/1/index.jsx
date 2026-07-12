import SignInput from './SignInput';
import useInputController from './useInputController';

const errorText = {
  email: {
    null: '이메일을 입력해주세요.',
    wrong: '올바른 이메일 형식이 아닙니다.',
  },
};

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const signinEmail = (values, setErrorText) => {
  if (values === '') {
    setErrorText(errorText['email']['null']);
  } else if (!isEmail(values)) {
    setErrorText(errorText['email']['wrong']);
  } else {
    setErrorText('');
  }
};

export default function Page() {
  const {
    values: emailValues,
    errorText: emailErrorText,
    setErrorText: setEmailErrorText,
    handleChange: handleEmailChange,
    handleBlur: handleEmailBlur,
    handleFocus: handleEmailFocus,
  } = useInputController(signinEmail);

  const handleSubmit = (e) => {
    e.preventDefault();
    signinEmail(emailValues, setEmailErrorText);
  };

  return (
    <form onSubmit={handleSubmit}>
      <SignInput
        idFor="signinEmail"
        name="email"
        value={emailValues}
        errorText={emailErrorText}
        onChange={handleEmailChange}
        onBlur={handleEmailBlur}
        onFocus={handleEmailFocus}
        eyes={false}
        type="email"
      >
        이메일
      </SignInput>
    </form>
  );
}
