import React, { useEffect, useState } from "react";
import { createProduct, deleteProductById, getProductsAdmin } from "../../api";
import Pagination from "../../UI/Pagination";
import { toast } from "react-toastify";
import Modal from "react-modal";

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const fetchData = async () => {
    const res = await getProductsAdmin(currentPage);
    setProducts(res.products);
    setTotalPages(res.totalPages);
  };

  const deleteProduct = async (id) => {
    try {
      const res = await deleteProductById(id);
      toast.success("Xóa sản phẩm thành công");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [chefId, setChefId] = useState("");
  const [image, setImage] = useState(null);

  const [categories, setCategories] = useState([]); // Dữ liệu danh mục
  const [chefs, setChefs] = useState([]); // Dữ liệu đầu bếp

  // Mở modal
  const openModal = () => setIsModalOpen(true);

  // Đóng modal
  const closeModal = () => setIsModalOpen(false);

  // Fetch danh mục và đầu bếp từ API

  const fetchCategories = async () => {
    // Thay thế API giả với API thực tế của bạn
    const response = await fetch(
      "https://server-resturent.onrender.com/api/category/all-categies"
    );
    const data = await response.json();
    console.log(data);

    setCategories(data?.categories);
  };

  const fetchChefs = async () => {
    // Thay thế API giả với API thực tế của bạn
    try {
      const response = await fetch(
        "https://server-resturent.onrender.com/api/chef/all-chef"
      );
      const data = await response.json();
      setChefs(data?.chefs);
    } catch (e) {
      console.log(e);
    }
    // setChefs(data);
  };

  // Xử lý khi submit form
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("description", description);
      formData.append("categoryId", categoryId);
      formData.append("chefId", chefId);
      if (!image) {
        alert("Bạn cần chọn file ảnh");
        return;
      }
      formData.append("image", image);
      const res = await createProduct(formData);
      if (res) {
        alert("Thêm sản phẩm thành công");
        fetchData();
      }
    } catch (error) {
      alert("Thêm sản phẩm bị lối");
    } finally {
      closeModal();
    }
  };

  // Xử lý thay đổi hình ảnh
  const handleImageChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
    fetchChefs();
  }, [currentPage]);
  return (
    <div className='px-10 mt-7'>
      <button
        onClick={openModal}
        className='px-3 py-[12px] mb-4 rounded-md bg-blue-600 text-white'>
        Thêm sản phẩm
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel='Thêm sản phẩm'
        className='fixed inset-0 flex justify-center items-center h-[90vh] overflow-y-auto z-50'
        overlayClassName='fixed inset-0 bg-black bg-opacity-50'>
        <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-lg'>
          <h2 className='text-2xl font-semibold mb-4'>Thêm sản phẩm mới</h2>
          <form onSubmit={handleSubmit}>
            {/* Tên sản phẩm */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Tên sản phẩm
              </label>
              <input
                type='text'
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className='mt-1 text-black px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none'
                required
              />
            </div>

            {/* Giá sản phẩm */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Giá
              </label>
              <input
                type='number'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className='mt-1 text-black px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none'
                required
              />
            </div>

            {/* Số lượng */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Số lượng
              </label>
              <input
                type='number'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className='mt-1 text-black px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none'
                required
              />
            </div>

            {/* Mô tả sản phẩm */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Mô tả
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='mt-1 text-black px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none'
                rows={4}
                required
              />
            </div>

            {/* Danh mục sản phẩm */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Danh mục
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className='mt-1 text-black px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none'
                required>
                <option value=''>Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category?.categoryName}
                  </option>
                ))}
              </select>
            </div>

            {/* Đầu bếp */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Đầu bếp
              </label>
              <select
                value={chefId}
                onChange={(e) => setChefId(e.target.value)}
                className='mt-1 text-black px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none'
                required>
                <option value=''>Chọn đầu bếp</option>
                {chefs.map((chef) => (
                  <option key={chef._id} value={chef._id}>
                    {chef?.nameChef}
                  </option>
                ))}
              </select>
            </div>

            {/* Ảnh sản phẩm */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Ảnh
              </label>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                className='mt-1 text-black px-4 py-2 border border-gray-300 rounded-md w-full'
              />
              {image && (
                <p className='mt-2 text-sm text-gray-500'>{image.name}</p>
              )}
            </div>

            {/* Nút submit */}
            <div className='flex justify-end space-x-2'>
              <button
                type='button'
                onClick={closeModal}
                className='px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition'>
                Hủy
              </button>
              <button
                type='submit'
                className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition'>
                Thêm sản phẩm
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <div className='relative h-[90vh] overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='text-sm w-full text-left rtl:text-right text-gray-500'>
          <thead className='text-xs w-full uppercase bg-gray-700 text-white'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Tên sản phẩm
              </th>
              <th scope='col' className='px-6 py-3'>
                <div className='flex items-center'>Giá</div>
              </th>
              <th scope='col' className='px-6 py-3'>
                <div className='flex items-center'>Số lượng</div>
              </th>
              <th scope='col' className='px-6 py-3'>
                <div className='flex items-center'>Thao tác</div>
              </th>
              <th scope='col' className='px-6 py-3'>
                <span className='sr-only'>Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className='w-full'>
            {products.map((item, index) => {
              return (
                <tr
                  key={index}
                  className='bg-white w-full border-b border-[2px] border-[#ccc] hover:bg-gray-50'>
                  <td
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap space-x-4'>
                    <img
                      className='w-[170px] h-[120px] object-contain rounded-md'
                      src={item?.image}
                      alt={item?.productName}
                    />
                    <span className='text-lg font-semibold'>
                      {item.productName}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-lg text-gray-800'>
                    {item?.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td className='px-6 py-4 text-lg text-gray-800'>
                    {item?.quantity}
                  </td>
                  <td className='px-6 py-4 text-right'>
                    <button
                      onClick={() => {
                        deleteProduct(item?._id);
                      }}
                      className='font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400 hover:underline transition-colors duration-200'>
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='items-center py-2 bg-white text-black flex justify-center'>
        <Pagination handlePageClick={handlePageClick} pageCount={totalPages} />
      </div>
    </div>
  );
};

export default ProductAdmin;
