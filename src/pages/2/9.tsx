import { usePasswordToggle } from './4';

export function PasswordToggle({
  render,
}: {
  render: (props: { inputType: string; toggle: () => void }) => React.ReactNode;
}) {
  const [inputType, toggle] = usePasswordToggle();

  return render({ inputType, toggle });
}
