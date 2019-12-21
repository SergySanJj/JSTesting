export class Message {
  public sender: string;
  public messageType: MessageType;
  public messageText: string;

  constructor() {
  }
}

export enum MessageType {
  GLOBAL, GROUP, PRIVATE, CORP
}
