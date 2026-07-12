export default function ImperativeDomExample() {
  const appendItem = () => {
    const list = document.getElementById('imperative-list');

    if (!list) {
      return;
    }

    const li = document.createElement('li');
    li.textContent = '새 항목';
    list.appendChild(li);
  };

  return (
    <div>
      <h1>DOM을 직접 조작하는 명령형 UI 갱신</h1>
      <button type="button" onClick={appendItem}>
        항목 추가
      </button>
      <ul id="imperative-list">
        <li>기존 항목</li>
      </ul>
    </div>
  );
}
