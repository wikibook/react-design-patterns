export interface ApiClient {
  fetchFruits(): Promise<Array<string>>;
}

// 실제 API 호출 구현체
export class RealFruitApiClient implements ApiClient {
  async fetchFruits(): Promise<Array<string>> {
    const response = await fetch('/api/fruits');
    if (!response.ok) throw new Error('API 요청 실패');
    return response.json();
  }
}

// 테스트용 목 구현체
export class MockFruitApiClient implements ApiClient {
  async fetchFruits(): Promise<Array<string>> {
    return ['mock-apple', 'mock-banana'];
  }
}
