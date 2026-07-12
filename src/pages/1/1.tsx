import { useState } from 'react';

export default function Page() {
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return <input type="text" value={text} onChange={handleChange} />;
}
