// pnpm exec tsx src/pages/4/48.tsx

import { BaseMessage } from "./46";
import { LoggingDecorator } from "./47";

const message = new LoggingDecorator(new BaseMessage());
message.getText();
