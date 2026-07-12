type ResourcePendingStatus = {
  status: 'pending';
  promise: Promise<void>;
  data?: never;
  error?: never;
};
type ResourceSuccessStatus<T> = {
  status: 'success';
  data: T;
  promise?: never;
  error?: never;
};
type ResourceErrorStatus = {
  status: 'error';
  error: unknown;
  promise?: never;
  data?: never;
};

export type Resource<T> =
  | ResourcePendingStatus
  | ResourceSuccessStatus<T>
  | ResourceErrorStatus;
