import { a } from "@arrirpc/schema";
import { defineRpc } from "@arrirpc/server";
import { messageServiceInstance } from "./common";

export default defineRpc({
    params: a.object("SayHelloParams", {
        text: a.string(),
    }),
    response: undefined,
    handler({ params }) {
        messageServiceInstance.createMessage({ id: "foo", text: params.text });
    },
});
