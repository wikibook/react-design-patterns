import { useState } from 'react';
import { SearchInputProps } from './1';

// 커스텀 훅으로 상태와 프롭스 게터 분리
function useSearchInput(initialValue: string = '') {
  const [value, setValue] = useState(initialValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const getInputProps = ({
    onChange: userOnChange,
    onKeyDown: userOnKeyDown,
    ...restUserProps
  }: SearchInputProps) => ({
    type: 'text',
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e.target.value);
      if (userOnChange) userOnChange(e); // 사용자의 onChange 이벤트도 안전하게 호출
    },
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        setValue('');
      }
      if (userOnKeyDown) userOnKeyDown(e); // 사용자의 onKeyDown 이벤트도 안전하게 호출
    },
    ...restUserProps, // 사용자가 전달한 다른 props 병합
  });

  return { getInputProps };
}

// UI 컴포넌트에서는 커스텀 훅만 호출
function SearchInput({ initialValue = '', ...inputProps }: SearchInputProps) {
  const { getInputProps } = useSearchInput(initialValue);

  return <input {...getInputProps(inputProps)} />;
}

export default function Page() {
  return (
    <SearchInput
      onChange={(e) => console.log('입력값:', e.target.value)}
      onKeyDown={(e) => console.log('키 입력:', e.key)}
      style={{ border: '2px solid blue', padding: '8px' }}
      placeholder="검색어를 입력하세요"
    />
  );
}
