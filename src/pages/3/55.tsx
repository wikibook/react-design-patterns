import { FileUploadEvent } from "./54";

export type FileUploadContext = {
  file: File | null;
  error: string | null;
};

export interface State {
  onEvent(event: FileUploadEvent, context: FileUploadContext): State;
  render(): void;
}

export class IdleState implements State {
  onEvent(event: FileUploadEvent, context: FileUploadContext): State {
    void context;
    if (event.type === "DRAG_ENTER") return new DraggingState();
    return this;
  }
  render() {
    console.log("업로드 대기 중입니다.");
  }
}

export class DraggingState implements State {
  onEvent(event: FileUploadEvent, context: FileUploadContext): State {
    if (event.type === "DRAG_LEAVE") return new IdleState();

    if (event.type === "DROP") {
      context.file = event.file;
      context.error = null;
      return new UploadingState();
    }

    return this;
  }

  render() {
    console.log("파일을 드롭할 수 있습니다.");
  }
}

export class UploadingState implements State {
  onEvent(event: FileUploadEvent, context: FileUploadContext): State {
    if (event.type === "UPLOAD_SUCCESS") {
      context.error = null;
      return new SuccessState();
    }

    if (event.type === "UPLOAD_FAILURE") {
      context.error = event.error;
      return new FailureState();
    }

    return this;
  }

  render() {
    console.log("업로드 중입니다.");
  }
}

export class SuccessState implements State {
  onEvent(event: FileUploadEvent, context: FileUploadContext): State {
    if (event.type === "RESET") {
      context.file = null;
      context.error = null;
      return new IdleState();
    }

    return this;
  }

  render() {
    console.log("업로드가 완료되었습니다.");
  }
}

export class FailureState implements State {
  onEvent(event: FileUploadEvent, context: FileUploadContext): State {
    if (event.type === "RETRY") {
      context.error = null;
      return new UploadingState();
    }

    if (event.type === "RESET") {
      context.file = null;
      context.error = null;
      return new IdleState();
    }

    return this;
  }

  render() {
    console.log("업로드에 실패했습니다.");
  }
}
