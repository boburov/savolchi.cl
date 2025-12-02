import api from "../axios";
import { API_ENDPOINT } from "../endpoin";

const channel = {
  getAll: async () => {
    const res = await api.get(API_ENDPOINT.ALL);
    return res.data;
  },
  getChanelById: async (id: string) => {
    const res = await api.get(API_ENDPOINT.GET_CHANEL_BY_ID(id));
    return res.data;
  },
};

export default channel;
