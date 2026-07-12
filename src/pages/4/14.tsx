import { QueryClient } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";

export type SSContext = {
  ctx: GetServerSidePropsContext;
  cookies: Record<string, string>;
  queryClient: QueryClient;
  accessTokenExist: boolean;
};
