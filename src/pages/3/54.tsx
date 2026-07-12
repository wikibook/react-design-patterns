export type FileUploadEvent =
  | { type: "DRAG_ENTER" }
  | { type: "DRAG_LEAVE" }
  | { type: "DROP"; file: File }
  | { type: "UPLOAD_SUCCESS" }
  | { type: "UPLOAD_FAILURE"; error: string }
  | { type: "RETRY" }
  | { type: "RESET" };
