import { addMessage, getInquiry, isMessageInquiry } from "./handleMessages";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const BOT_NAME = "CHATBOT";
const BOT_ANSWERS =
    ["QUACK", "Interesting", "I don't follow", "Why are we talking about this?"];

export const chatbotInput = async (text: string) => {
    if (isMessageInquiry(text)) {
        handleInquiry(text);
    } else {
        handleStatement(text);
    }
};

const handleStatement = async (text: string) => {
    const request = admin.firestore()
        .collection("questions")
        .orderBy("createdMillis", "desc")
        .limit(1);

    const lastQuestion = (await request.get()).docs[0];

    if (lastQuestion && !lastQuestion.data().answer) {
        admin.firestore()
            .collection("questions")
            .doc(lastQuestion.id)
            .set({ ...lastQuestion.data(), answer: text });

        addMessage("Great Answer!", BOT_NAME, true);
    } else {
        const willBotAnswer = Math.floor(Math.random() * 10) + 1 > 6;
        if (willBotAnswer) {
            const chosenAnswerIndex = Math.floor(Math.random() * BOT_ANSWERS.length);
            addMessage(BOT_ANSWERS[chosenAnswerIndex], BOT_NAME, true);
        }
        else {
            functions.logger.info(
                `Bot will not answer`
            );
        }
    }
}

const handleInquiry = async (text: string) => {
    const inquiryDoc = await getInquiry(text);
    if (inquiryDoc?.exists && inquiryDoc.data().answer) {
        // Return Inquiry
        await addMessage("I know this one!", BOT_NAME, true);
        await addMessage(inquiryDoc.data().answer, BOT_NAME, true);
    } else {
        // Save Inquiry
        admin.firestore()
            .collection("questions")
            .add({
                text: text,
                answer: "",
                createdMillis: admin.firestore.Timestamp.now().toMillis(),
            });
    }
}