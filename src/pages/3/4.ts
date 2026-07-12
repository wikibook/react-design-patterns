interface Command {
  execute(): void;
}

export class Light {
  turnOn() {
    console.log("Light is ON");
  }
  turnOff() {
    console.log("Light is OFF");
  }
}

export class TurnOnCommand implements Command {
  constructor(private light: Light) {}
  execute() {
    this.light.turnOn();
  }
}

export class TurnOffCommand implements Command {
  constructor(private light: Light) {}
  execute() {
    this.light.turnOff();
  }
}
