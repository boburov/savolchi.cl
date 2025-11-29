export const API_ENDPOINT = {
  BASE_URL: "https://api.savolchi.uz/",
  REGISTER: "/auth/register/user/",
  LOGIN: "/auth/login/user",
  VERIFY: "/auth/validate/code",
  VERIFY_TOKEN: "/auth/verify/admin/token",
  
  ALL: "/chanel",
  QUESTIONS: "/questions",
  ASK_QUESTION: "/questions/ask",
  ANSWER_QUESTION: (questionId: string) => `/questions/${questionId}/answer`,
  USER_PROFILE: (userId: string) => `/users/${userId}`,
};