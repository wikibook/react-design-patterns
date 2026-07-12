import { Message } from "./46";

export class LoggingDecorator implements Message {
  constructor(private readonly message: Message) {}

  getText() {
    const text = this.message.getText();
    console.log("message accessed");
    console.log(text);
    return text;
  }
}
