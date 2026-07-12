export default function Page() {
  let text = 'text';

  const onClick = () => {
    text = 'text changed!';
  };

  return (
    <>
      <div>{text}</div>
      <button onClick={onClick}>버튼</button>
    </>
  );
}
