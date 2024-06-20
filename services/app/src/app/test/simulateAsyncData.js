import crypto from "node:crypto";

// Returns a random unqiue identifier
export default async function simulateAsyncData() {
    return crypto.randomUUID();
}