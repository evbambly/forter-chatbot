import { v4 as uuidv4 } from 'uuid';
import { Message } from './Types';

export const getOrDefineName = () => {
   let name = localStorage.getItem("name")

   if (!name) {
      name = uuidv4()
      localStorage.setItem("name", name)
   }
   return name;
}

// get unique time && text
export const getUniqueMessages = (messages: Message[]) => {
   const existingTimesAndTexts: { [time: number]: string } = {}
   return messages.filter(message => {
      if (existingTimesAndTexts[message.sentAtMillis] === message.text) return false
      existingTimesAndTexts[message.sentAtMillis] = message.text
      return true
   })
}