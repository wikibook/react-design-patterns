import { Button } from './15';

export function AnchorAsButton() {
  return (
    <Button asChild>
      <a href="/login">Login</a>
    </Button>
  );
}
