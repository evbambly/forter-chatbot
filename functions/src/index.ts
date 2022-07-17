import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {chatbotInput} from "./chatbot";
import {addMessage} from "./handleMessages";

admin.initializeApp(functions.config().firebase);

export const getMessages = functions.https.onCall(async (startTime: number) => {
  let messages;
  try {
    const request = admin.firestore()
        .collection("messages")
        .where("sentAtMillis", ">", startTime);
    const docs = (await request.get()).docs;
    messages = docs.map((doc) => doc.data());
  } catch (e) {
    functions.logger.error(
        `Error handling get messages request, from ${new Date(startTime)}`,
        e
    );
  }
  return messages;
});

type sendMessageRequest = { text: string, name: string }

export const sendMessage = functions.https
    .onCall(async ({text, name}: sendMessageRequest) => {
      try {
        await addMessage(text, name, false);
        chatbotInput(text);
      } catch (e) {
        functions.logger.error(
            `Error handling send message request: ${text}, from ${name}`,
            e
        );
      }
    });
