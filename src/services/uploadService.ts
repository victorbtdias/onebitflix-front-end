import api from "./api";

const uploadService = {
  uploadDocument: async (image: any) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const formData = new FormData();
    formData.append("image", image);

    const res = await api
      .post("/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res.data;
  },

  deleteDocument: async (id: number | string, key: string) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .delete(`/images/remove/${id}?document=${key}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res.data;
  },
};

export default uploadService;
