import { assign, setup } from "xstate";
import { FileUploadEvent } from "./54";
import { FileUploadContext } from "./55";

export const fileUploadMachine = setup({
  types: {
    context: {} as FileUploadContext,
    events: {} as FileUploadEvent,
  },
  actions: {
    triggerUpload: assign({}),
  },
}).createMachine({
  id: "dndUploader",
  context: {
    file: null,
    error: null,
  },
  initial: "idle",
  states: {
    idle: {
      on: {
        DRAG_ENTER: {
          target: "dragging",
        },
      },
    },

    dragging: {
      on: {
        DRAG_LEAVE: {
          target: "idle",
        },
        DROP: {
          target: "uploading",
          actions: [
            assign({
              file: ({ event }) => event.file,
              error: null,
            }),
            { type: "triggerUpload" },
          ],
        },
      },
    },

    uploading: {
      on: {
        UPLOAD_SUCCESS: {
          target: "success",
          actions: assign({
            error: null,
          }),
        },
        UPLOAD_FAILURE: {
          target: "failure",
          actions: assign({
            error: ({ event }) => event.error,
          }),
        },
      },
    },

    success: {
      on: {
        RESET: {
          target: "idle",
          actions: assign({
            file: null,
            error: null,
          }),
        },
      },
    },

    failure: {
      on: {
        RETRY: {
          target: "uploading",
          actions: [
            assign({
              error: null,
            }),
            { type: "triggerUpload" },
          ],
        },
        RESET: {
          target: "idle",
          actions: assign({
            file: null,
            error: null,
          }),
        },
      },
    },
  },
});
