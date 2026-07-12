type User = {
  id: number;
  name: string;
  age: number;
};

const users: Array<User> = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 22 },
];

export function UserList() {
  return (
    <div>
      <h2>사용자 목록</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.age}세
          </li>
        ))}
      </ul>
    </div>
  );
}
