import { FilesModule } from "@/modules/files";
import { useMutation } from "@tanstack/react-query";
import { useMachine } from "@xstate/react";
import { fileUploadMachine } from "./57";

export function useFileUploadMachine() {
  const mutation = useMutation(FilesModule.postFile());

  const [state, send] = useMachine(
    fileUploadMachine.provide({
      actions: {
        triggerUpload: ({ context, self }) => {
          if (!context.file) return;

          mutation.mutate(context.file, {
            onSuccess: () => self.send({ type: "UPLOAD_SUCCESS" }),
            onError: (error) =>
              self.send({
                type: "UPLOAD_FAILURE",
                error: error instanceof Error ? error.message : "업로드 실패",
              }),
          });
        },
      },
    }),
  );

  return [state, send] as const;
}
