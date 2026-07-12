import { useContext } from 'react';
import {
  AnchorContext,
  FloaterContext,
  HelperContext,
  Popover,
} from './Popover';

export default function Page() {
  return <Popover anchor={<Anchor />} floater={<Floater />} />;
}

function Anchor() {
  const context = useContext(AnchorContext);
  if (!context) throw new Error('Anchor must be used within a Popover');

  return (
    <button {...context} type="button">
      Anchor
    </button>
  );
}

function Floater() {
  const context = useContext(FloaterContext);
  const helper = useContext(HelperContext);

  if (!context || !helper) {
    throw new Error('Floater must be used within a Popover');
  }

  if (!helper.isOpen) return null;

  return <div {...context}>Floater</div>;
}
