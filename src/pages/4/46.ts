export interface Message {
  getText(): string;
}

export class BaseMessage implements Message {
  getText() {
    return "Hello";
  }
}
