// pnpm exec tsx src/pages/4/24.ts

function modifyObject(obj: { prop: string }) {
  obj.prop = "changed"; // 객체 내부 수정 (Mutation)
  obj = { prop: "new object" }; // 변수 재할당
}

const myObj = { prop: "initial" };
modifyObject(myObj);
console.log(myObj.prop); // 'changed'
