import { useState } from 'react';

// 문자열 input 전용 폼 훅
function useForm() {
  const [formState, setFormState] = useState<{ [key: string]: string }>({});

  // register가 프롭스 게터 역할
  const register = (
    name: string,
    userProps: React.InputHTMLAttributes<HTMLInputElement> = {},
  ) => {
    const handleChange = (value: string) => {
      setFormState((prev) => ({ ...prev, [name]: value }));
    };
    const {
      defaultValue,
      onChange: userOnChange,
      ...restUserProps
    } = userProps;
    const controlledValue = formState[name] ?? defaultValue ?? '';

    return {
      ...restUserProps,
      value: controlledValue,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e.target.value);
        if (userOnChange) userOnChange(e); // 사용자 onChange도 호출
      },
    };
  };

  return { register, formState };
}

// 사용 예시
function MyForm() {
  const { register, formState } = useForm();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(formState);
      }}
    >
      <input {...register('username', { placeholder: '이름 입력' })} />

      <input
        type="password"
        {...register('password', { placeholder: '비밀번호 입력' })}
      />

      <button type="submit">제출</button>
    </form>
  );
}

export default function Page() {
  return <MyForm />;
}
