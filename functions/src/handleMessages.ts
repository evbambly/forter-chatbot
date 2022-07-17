import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const addMessage =
    async (text: string, name: string, isBot: boolean) => {
        await admin.firestore()
            .collection("messages")
            .add(
                {
                    text,
                    sentAtMillis: admin.firestore.Timestamp.now().toMillis(),
                    name,
                    isBot,
                });

        functions.logger.info(
            `Message: ${text}, from ${name}`
        );
    };

export function isMessageInquiry(text: string) {
    return text.includes("?");
}

export async function getInquiry(text: string) {
    const request = admin.firestore()
        .collection("questions")
        .where("text", "==", text);
    const reply = (await request.get()).docs

    functions.logger.info(
        `Inquiry returned ${reply.length === 0 ? "nothing" : reply[0].id}`
    );

    return reply[0];
}
