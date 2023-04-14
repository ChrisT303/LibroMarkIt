context: ({ req }) => {
  if (!req.headers) {
    console.warn("Request has no headers, skipping context.");
    return {};
  }
  console.log("Request headers:", req.headers);
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ").pop()
    : "";
  console.log("Token:", token);
  const user = AuthService.verifyToken(token);
  console.log("User:", user);
  return { req, user }; // include req object in context
},


const authLink = setContext((_, { headers }) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("id_token") : null;
  const authorization = token ? `Bearer ${token}` : "";
  console.log("Authorization:", authorization); // log authorization
  return {
    headers: {
      ...(headers || {}),
      authorization,
    },
  };
});
