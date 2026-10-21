// Every table drizzle-kit and the `db` client know about is re-exported here.
// Better Auth tables go in ./auth-schema.ts (`npm run auth:generate`); add
// `export * from "./auth-schema";` once that file exists.
export * from "./catalog-schema";
