// pnpm exec tsx src/pages/4/34.ts

const controller = new AbortController();

async function demo() {
  setTimeout(() => controller.abort(), 10);

  try {
    const res = await fetch('http://localhost:3000/health', {
      signal: controller.signal,
    });
    console.log(res);
  } catch (e) {
    const isAbortError =
      typeof e === 'object' &&
      e !== null &&
      'name' in e &&
      e.name === 'AbortError';

    const isAbortByReason =
      controller.signal.aborted && e === controller.signal.reason;

    if (isAbortError || isAbortByReason) {
      console.log('요청이 취소되었습니다');
      return;
    }

    console.error(e);
  }
}

void demo();
