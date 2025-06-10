import { defineEventStreamRpc } from "@arrirpc/server";
import { Message, messageServiceInstance } from "./common";

export default defineEventStreamRpc({
    method: "get",
    params: undefined,
    response: Message,
    async handler({ stream }) {
        stream.send();
        const onCreated = (msg: Message) => {
            stream.push(msg);
        };
        messageServiceInstance.addOnCreatedListener(onCreated);
        stream.onClosed(() => {
            messageServiceInstance.removeOnCreatedListener(onCreated);
        });
    },
});
