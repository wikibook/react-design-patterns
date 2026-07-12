// pnpm exec tsx src/pages/3/5.ts

import { Light, TurnOffCommand, TurnOnCommand } from './4';

const light = new Light();
const onCommand = new TurnOnCommand(light);
const offCommand = new TurnOffCommand(light);

onCommand.execute(); // Light is ON
offCommand.execute(); // Light is OFF
