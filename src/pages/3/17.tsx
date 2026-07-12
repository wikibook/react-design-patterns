import { Button } from './15';

export function AnchorAsButton() {
  return (
    <Button asChild>
      <a href="/dashboard">Go to Dashboard</a>
    </Button>
  );
}
