import { createClient } from "@/utils/apiClient";



export const chat = async (token, message) => {
  const client = createClient(token);
  const res = await client.post("/chatbot/chat", {text : message});
  console.log(res)
  return res.data;
};

