import type { DragEvent } from "react";
import { FileUploadEvent } from "./54";
import { useFileUploadMachine } from "./58";
import styles from "./59.module.css";

export type FileUploadValue =
  | "idle"
  | "dragging"
  | "uploading"
  | "success"
  | "failure";

export type FileUploadViewState = {
  value: FileUploadValue;
  context: {
    file: File | null;
    error: string | null;
  };
};

export type FileUploadSend = (event: FileUploadEvent) => void;

export type UseUploadMachine = () => readonly [
  FileUploadViewState,
  FileUploadSend,
];

const createHandlers = (send: FileUploadSend) => ({
  onDragOver: (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    send({ type: "DRAG_ENTER" });
  },

  onDragLeave: (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    send({ type: "DRAG_LEAVE" });
  },

  onDrop: (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    send(file ? { type: "DROP", file } : { type: "DRAG_LEAVE" });
  },

  onReset: () => send({ type: "RESET" }),
  onRetry: () => send({ type: "RETRY" }),
});

const createViewMap = (
  state: FileUploadViewState,
  handlers: ReturnType<typeof createHandlers>,
) => ({
  idle: <IdleView />,
  dragging: <DraggingView />,
  uploading: <UploadingView file={state.context.file} />,
  success: <SuccessView file={state.context.file} onReset={handlers.onReset} />,
  failure: (
    <FailureView
      error={state.context.error}
      onRetry={handlers.onRetry}
      onReset={handlers.onReset}
    />
  ),
});

export function DndUploader() {
  const [state, send] = useFileUploadMachine();
  const handlers = createHandlers(send);
  const viewMap = createViewMap(state, handlers);

  return (
    <div
      className={styles["dnd-zone"]}
      data-state={state.value}
      onDragOver={handlers.onDragOver}
      onDragLeave={handlers.onDragLeave}
      onDrop={handlers.onDrop}
    >
      {viewMap[state.value]}
    </div>
  );
}

function IdleView() {
  return (
    <div className={styles.card}>
      <div className={styles.title}>파일 업로드</div>
      <div className={styles.description}>
        파일을 드래그해서 여기에 놓으세요.
      </div>
    </div>
  );
}

function DraggingView() {
  return (
    <div className={styles.card}>
      <div className={styles.title}>드롭 준비</div>
      <div className={styles.description}>
        마우스를 놓으면 업로드를 시작합니다.
      </div>
    </div>
  );
}

function UploadingView({ file }: { file: File | null }) {
  return (
    <div className={styles.card}>
      <div className={styles.title}>업로드 중</div>
      <div className={styles.description}>
        {file ? file.name : "파일 정보 없음"}
      </div>
    </div>
  );
}

function SuccessView({
  file,
  onReset,
}: {
  file: File | null;
  onReset: () => void;
}) {
  return (
    <div className={styles.card}>
      <div className={styles.title}>업로드 완료</div>
      <div className={styles.description}>
        {file ? file.name : "파일 정보 없음"}
      </div>
      <button className={styles.button} type="button" onClick={onReset}>
        다시 업로드
      </button>
    </div>
  );
}

function FailureView({
  error,
  onRetry,
  onReset,
}: {
  error: string | null;
  onRetry: () => void;
  onReset: () => void;
}) {
  return (
    <div className={styles.card}>
      <div className={styles.title}>업로드 실패</div>
      <div className={styles.error}>{error ?? "알 수 없는 오류"}</div>
      <div className={styles.actions}>
        <button className={styles.button} type="button" onClick={onRetry}>
          재시도
        </button>
        <button
          className={styles.buttonSecondary}
          type="button"
          onClick={onReset}
        >
          초기화
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div style={{ padding: 24 }}>
      <DndUploader />
    </div>
  );
}
