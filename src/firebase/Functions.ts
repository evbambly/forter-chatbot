import { getFunctions, httpsCallable } from "firebase/functions";
import { collection, DocumentData, getFirestore, onSnapshot } from "firebase/firestore";


export const sendMessage = () => httpsCallable(getFunctions(), "sendMessage");

export const getMessages = () => httpsCallable(getFunctions(), "getMessages");


export function listenToNewMessages(
    onNewMessage: (update: DocumentData | undefined) => void
    ) {
    const firestore = getFirestore();
    return onSnapshot(collection(firestore, "messages"), (queryData) => {
        const data = queryData.docs.map(doc => doc.data())
        onNewMessage(data);
    });
}