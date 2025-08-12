import { client } from "../utils/httpClient";

export const getPostsByUserId = (userId) => {
    return client.get(`/posts?userId=${userId}`);
}