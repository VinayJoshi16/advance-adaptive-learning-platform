const redis = require("redis");

// Use 127.0.0.1 (not localhost) on Windows — localhost often resolves to ::1 first and Redis may only listen on IPv4.
const client = redis.createClient({
  url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
});

client.on("error", (err) => console.error("Redis Client Error", err));

client.connect().catch(console.error);

module.exports = client;