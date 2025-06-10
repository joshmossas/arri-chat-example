import { a } from "@arrirpc/schema";

export const Message = a.object("Message", {
    id: a.string(),
    text: a.string(),
});
export type Message = a.infer<typeof Message>;

export type MessageCreatedListener = (msg: Message) => void;

export class MessageService {
    private listeners: MessageCreatedListener[] = [];

    private publishEvent(msg: Message) {
        for (const l of this.listeners) {
            l(msg);
        }
    }

    createMessage(msg: Message) {
        // TODO: store in db somehow

        // notify listeners that a message was created
        this.publishEvent(msg);
    }

    addOnCreatedListener(l: MessageCreatedListener) {
        this.listeners.push(l);
    }

    removeOnCreatedListener(l: MessageCreatedListener) {
        const index = this.listeners.indexOf(l);
        if (index < 0) return;
        this.listeners.splice(index, 1);
    }
}

export const messageServiceInstance = new MessageService();
