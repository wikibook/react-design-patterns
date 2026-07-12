// pnpm exec tsx src/pages/4/31.ts

const thenable = {
  then(resolve: (value: string) => void) {
    resolve('thenable value');
  },
};

async function demo() {
  const result = await thenable;
  console.log(result);
}

demo();
