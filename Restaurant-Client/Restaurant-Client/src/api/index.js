import axios from "axios";

const base_url = "http://localhost:1234";

export const register = async (body) => {
  try {
    const response = await axios.post(`${base_url}/api/register`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response);
    return response.data;
  } catch (error) {
    console.error("lỗi ko tạo được ", error);
  }
};

export const Logins = async (body) => {
  try {
    const response = await axios.post(`${base_url}/api/login`, body);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("lỗi ko tạo được ", error);
  }
};

export const addtoCart = async (pId, quantity = 1, action = "add") => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${base_url}/api/cart/handle-cart?quantity=${quantity}&action=${action}`,
      { productId: pId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("lỗi ko tạo được ", error);
  }
};

export const getProducts = async (limit = 4) => {
  try {
    const response = await axios.get(
      `${base_url}/api/product/all-products?page=1&limit=${limit}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
  }
};

export const getProductsAdmin = async (page = 1, limit = 5) => {
  try {
    const response = await axios.get(
      `${base_url}/api/product/all-products?page=${page}&limit=${limit}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
  }
};

export const getOrdersAdmin = async (page = 1, limit = 5) => {
  try {
    const response = await axios.get(
      `${base_url}/api/order/all-order?page=${page}&limit=${limit}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
  }
};

export const getPosts = async (page = 1, limit = 4) => {
  try {
    const response = await axios.get(
      `${base_url}/api/post/all-posts?page=${page}&limit=${limit}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
  }
};
export const getUsers = async (page = 1, limit = 5) => {
  try {
    const response = await axios.get(
      `${base_url}/api/user/all-user?page=${page}&limit=${limit}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
  }
};

export const getChefs = async (page = 1, limit = 5) => {
  try {
    const response = await axios.get(
      `${base_url}/api/chef/all-chef?page=${page}&limit=${limit}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
  }
};

export const getCart = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${base_url}/api/cart/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
  }
};

export const getCategory = async () => {
  try {
    const response = await axios.get(`${base_url}/api/category/all-categies`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
  }
};

export const getTimeOpens = async () => {
  try {
    const response = await axios.get(`${base_url}/api/get-time-open`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
  }
};

export const bookingTable = async (body) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Bạn cần đăng nhập");
    }
    const response = await axios.post(`${base_url}/api/booking-table`, body, {
      headers: {
        Authorization: `Beaere ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const Order = async (body) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Bạn cần đăng nhập");
    }
    const response = await axios.post(`${base_url}/api/order`, body, {
      headers: {
        Authorization: `Beaere ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getVouchers = async () => {
  try {
    const response = await axios.get(`${base_url}/api/vouchers`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const paymentt = async (id) => {
  try {
    const response = await axios.post(`${base_url}/api/payment`, {
      orderId: id,
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getDetailProduct = async (id) => {
  try {
    const response = await axios.get(`${base_url}/api/product/detail/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteProductById = async (pId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `${base_url}/api/product/delete-product/${pId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("lỗi ko tạo được ", error);
  }
};

export const deletePostById = async (pId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `${base_url}/api/post/delete-post/${pId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("lỗi ko tạo được ", error);
  }
};

export const createProduct = async (body) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${base_url}/api/product/create-product`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("lỗi ko tạo được ", error);
  }
};

export const createPost = async (body) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${base_url}/api/post/create-post`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("lỗi ko tạo được ", error);
  }
};

export const createCategory = async (body) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${base_url}/api/category/create-category`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("lỗi ko tạo được ", error);
  }
};

export const confirmOrder = async (id) => {
  try {
    const response = await axios.post(`${base_url}/api/order/confirm`, {
      orderId: id,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("lỗi ko tạo được ", error);
  }
};
