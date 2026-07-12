import { createContext } from 'react';
import { Position, usePopoverPosition } from './usePopoverPosition';

type AnchorProps = ReturnType<typeof usePopoverPosition>['anchor'];
type FloaterProps = ReturnType<typeof usePopoverPosition>['floater'];
type HelperProps = ReturnType<typeof usePopoverPosition>['helper'];

export const AnchorContext = createContext<AnchorProps | null>(null);
export const FloaterContext = createContext<FloaterProps | null>(null);
export const HelperContext = createContext<HelperProps | null>(null);

export function Popover({
  anchor: AnchorElement,
  floater: FloaterElement,
  position,
}: {
  anchor: React.ReactElement;
  floater: React.ReactElement;
  position?: Position;
}) {
  const { anchor, floater, helper } = usePopoverPosition({ position });

  return (
    <HelperContext.Provider value={helper}>
      <AnchorContext.Provider value={anchor}>
        {AnchorElement}
      </AnchorContext.Provider>

      <helper.FloatingFocusManager
        key="floating-element"
        context={helper.context}
        modal={false}
      >
        <FloaterContext.Provider value={floater}>
          {FloaterElement}
        </FloaterContext.Provider>
      </helper.FloatingFocusManager>
    </HelperContext.Provider>
  );
}
