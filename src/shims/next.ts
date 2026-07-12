export type GetServerSidePropsContext = {
  req: {
    headers: {
      cookie?: string;
    };
  };
};

export type GetServerSidePropsResult<Props> =
  | { props: Props | Promise<Props> }
  | { redirect: { destination: string; permanent: boolean } }
  | { notFound: true };
