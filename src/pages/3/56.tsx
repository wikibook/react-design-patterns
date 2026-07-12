import { FileUploadEvent } from "./54";
import { FileUploadContext, State } from "./55";

export class FileUploadFSM {
  private state: State;
  constructor(initialState: State) {
    this.state = initialState;
  }

  send(event: FileUploadEvent, context: FileUploadContext) {
    this.state = this.state.onEvent(event, context);
    this.state.render();
  }
}
