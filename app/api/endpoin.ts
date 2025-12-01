export const API_ENDPOINT = {
  BASE_URL: "http://localhost:5000/auth",
  
  // auth endpoint
  REGISTER: "/auth/register/user/",
  LOGIN: "/auth/login/user",
  VERIFY: "/auth/validate/code",
  VERIFY_TOKEN: "/auth/verify/admin/token",

  // channel endpoints
  ALL: "/chanel",

  // tests endpoint
  QUESTIONS: "/questions",
  ASK_QUESTION: "/questions/ask",
  ANSWER_QUESTION: (questionId: string) => `/questions/${questionId}/answer`,
  USER_PROFILE: (userId: string) => `/users/${userId}`,
};
