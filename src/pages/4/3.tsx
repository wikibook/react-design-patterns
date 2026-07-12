import { SearchInputWithPropsGetter } from './2';

export default function Page() {
  return (
    <SearchInputWithPropsGetter
      onChange={(e) => console.log('입력값:', e.target.value)}
      onKeyDown={(e) => console.log('키 입력:', e.key)}
      style={{ border: '2px solid blue', padding: '8px' }}
      placeholder="검색어를 입력하세요"
    />
  );
}
