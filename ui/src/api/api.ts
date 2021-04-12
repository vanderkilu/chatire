import { Chat, Conversation, User } from "../types";

export const baseUrl = "http://localhost:8080/v1/api";
const usersUrl = `${baseUrl}/users`;
const chatsUrl = `${baseUrl}/chats`;

type MutateData = {
  method: "POST" | "PUT" | "DELETE" | "GET";
  body?: string;
};

async function mutate<T>(
  url: string,
  option: MutateData,
  id?: string
): Promise<T> {
  let newUrl = id ? `${url}${id}` : url;
  const response = await fetch(newUrl, option);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json() as Promise<T>;
}

export async function createUserLocally(username: string, token: string) {
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username }),
  } as MutateData;
  return mutate<User>(usersUrl, option);
}

export async function createConversation(toUserId: string, token: string) {
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ toUserId }),
  } as MutateData;
  const url = `${chatsUrl}/conversation`;
  return mutate<Conversation>(url, option);
}

export async function getChats(toUserId: string, token: string) {
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  } as MutateData;
  const url = `${chatsUrl}/${toUserId}`;
  return mutate<Chat[]>(url, option);
}

type ChatPayload = {
  message: string;
  toUser: string;
};

export async function createChat(payload: ChatPayload, token: string) {
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  } as MutateData;
  return mutate<Chat>(chatsUrl, option);
}
