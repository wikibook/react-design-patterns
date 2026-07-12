declare module '@tanstack/react-query' {
  interface Register {
    defaultError: { error: { detail: string; status: number } };
  }
}
