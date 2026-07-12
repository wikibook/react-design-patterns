export default function Page() {
  const text = 'text';

  const handleClick = () => {
    const div = document.getElementById('message');

    if (div) div.innerText = 'text changed!';
  };

  return (
    <>
      <div id="message">{text}</div>
      <button onClick={handleClick}>버튼</button>
    </>
  );
}
