import api from "../axios";

const tests = {
  all: async () => {
    const res = await api.get("subject");
    return res.data;
  },
  filter: async (id: string) => {
    const res = await api.get(`tests/all`);
    return res.data;
  },
};

export default tests;
