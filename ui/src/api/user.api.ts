import { User } from "../types";

export const baseUrl = "http://localhost:8080/v1/api/users";

type MutateData = {
  method: "POST" | "PUT" | "DELETE";
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
  return mutate<User>(baseUrl, option);
}
