import { BASE_URL } from "./constants";

export const handleResponse = async <U>(response: Response) => {
  if (response.ok) {
    if (response.status !== 204) {
      return (await response.json()) as U;
    } else {
      return {} as U;
    }
  } else {
    const error = {
      status: response.status,
      error: await response.json(),
    };
    throw error;
  }
};

const handleReqWithBody =
  (method: "POST" | "PUT" | "PATCH") =>
  <T, U>(path: string, token?: string) =>
  async (bodyData: T, extraHeaders?: HeadersInit) =>
    await fetch(`${BASE_URL}${path}`, {
      method,
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token !== undefined
          ? { Authorization: `Bearer ${token}`, "X-AUTH-TOKEN": token }
          : {}),
        ...extraHeaders,
      },
      body: JSON.stringify(bodyData),
    }).then((r) => handleResponse<U>(r));

export const GET = async <U>(path: string, token?: string) =>
  await fetch(`${BASE_URL}${path}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // ...(token !== undefined
      //   ? { Authorization: `Bearer ${token}`, "X-AUTH-TOKEN": token }
      //   : {}),
    },
    next: {
      revalidate: 0,
    },
  }).then((r) => handleResponse<U>(r));

export const DELETE = async <U>(path: string) =>
  await fetch(`${BASE_URL}${path}`, {
    method: "DELETE",
    next: {
      revalidate: 0,
    },
  }).then((r) => handleResponse<U>(r));

export const POST = handleReqWithBody("POST");
export const PUT = handleReqWithBody("PUT");
export const PATCH = handleReqWithBody("PATCH");
