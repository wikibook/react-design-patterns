import { modalStore } from "./40";

export default function Page() {
  return (
    <button
      onClick={() => {
        modalStore.add(
          <div>
            <button onClick={() => modalStore.add(<div>두 번째 모달</div>)}>
              첫 번째 모달
            </button>
          </div>,
        );
      }}
    >
      Open Modal
    </button>
  );
}
