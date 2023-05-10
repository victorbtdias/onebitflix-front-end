import api from "./api";

export type DocumentType = {
  id: number;
  document: string;
  userId: string;
};

const documentService = {
  remove: async (id: number | string) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .delete(`/document/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });
    return res;
  },

  show: async () => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .get(`/documents`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });
    return res;
  },
};

export default documentService;
