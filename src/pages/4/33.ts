const controller = new AbortController();
const { signal } = controller;

signal.addEventListener('abort', () => {
  console.log('aborted');
});

controller.abort();
