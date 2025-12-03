import api from "../axios";

const tests = {
  all: async () => {
    const res = await api.get("subject");
    return res.data;
  },
};

export default tests