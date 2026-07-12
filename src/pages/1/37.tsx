import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ApiClient, MockFruitApiClient, RealFruitApiClient } from './36';

const ApiContext = createContext<ApiClient | undefined>(undefined);

function ItemList() {
  const apiClient = useContext(ApiContext);
  if (!apiClient) throw new Error('ApiContext가 제공되지 않았습니다.');

  const [items, setItems] = useState<Array<string>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    apiClient
      .fetchFruits()
      .then((data) => {
        if (!mounted) return;
        setItems(data);
        setError(null);
      })
      .catch((error) => {
        if (!mounted) return;
        console.error('과일 목록 요청 실패', error);
        setError('과일 목록을 불러오지 못했습니다.');
      });

    return () => {
      mounted = false;
    };
  }, [apiClient]);

  return (
    <>
      {error ? <p role="alert">{error}</p> : null}
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}

// 실제로는 환경 변수 등을 통해 실제 API 또는 테스트용 목(Mock) 객체 선택
export default function Page() {
  const [isMock, setIsMock] = useState(false);

  const apiClient = useMemo(
    () => (isMock ? new MockFruitApiClient() : new RealFruitApiClient()),
    [isMock],
  );

  return (
    <ApiContext.Provider value={apiClient}>
      {isMock
        ? '목(Mock) API를 사용한 과일 목록'
        : '실제 API를 사용한 과일 목록'}

      <button onClick={() => setIsMock((prev) => !prev)}>
        {isMock ? '실제 API 사용하기' : '목(Mock) API 사용하기'}
      </button>

      <ItemList />
    </ApiContext.Provider>
  );
}
