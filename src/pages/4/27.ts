// pnpm exec tsx src/pages/4/27.ts

const delayed = {
  then(resolve: (v: string) => void) {
    console.log('then called');
    setTimeout(() => resolve('done'), 1000);
  },
};

async function main() {
  console.log('before await');
  const result = await delayed;
  console.log(result);
}

void main();
