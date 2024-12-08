import React, { useEffect, useState } from "react";
import { createPost, deletePostById, getPosts } from "../../api";
import Pagination from "../../UI/Pagination";
import { toast } from "react-toastify";
import Modal from "react-modal";

const PostAdmin = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [chefs, setChefs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [chefId, setChefId] = useState("");
  const [image, setImage] = useState(null);
  const fetchData = async () => {
    const res = await getPosts(currentPage);
    console.log(res);
    setPosts(res.posts);
    setTotalPages(res.totalPages);
  };

  const openModal = () => setIsModalOpen(true);

  // Đóng modal
  const closeModal = () => setIsModalOpen(false);

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

  useEffect(() => {
    fetchData();
    fetchChefs();
  }, [currentPage]);
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  const deletePost = async (id) => {
    try {
      const res = await deletePostById(id);
      toast.success("Xóa bài viết thành công");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("title", productName);
      formData.append("content", price);
      formData.append("topic", quantity);
      formData.append("chefId", chefId);
      if (!image) {
        alert("Bạn cần chọn file ảnh");
        return;
      }
      formData.append("image", image);
      const res = await createPost(formData);
      if (res) {
        alert("Thêm bài viết thành công");
        fetchData();
      }
    } catch (error) {
      alert("Thêm bài viết bị lối");
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

  return (
    <div className='px-10 mt-7'>
      <button
        onClick={openModal}
        className='px-3 py-[12px] mb-4 rounded-md bg-blue-600 text-white'>
        Thêm bài viết
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
                Tiêu đề
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
                Nội dung
              </label>
              <input
                type='text'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className='mt-1 text-black px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none'
                required
              />
            </div>

            {/* Số lượng */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Thể loại
              </label>
              <input
                type='text'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className='mt-1 text-black px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none'
                required
              />
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
                Thêm bài viết
              </button>
            </div>
          </form>
        </div>
      </Modal>
      {posts?.length > 0 ? (
        <>
          <div className='relative h-[90vh] overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='text-sm w-full text-left rtl:text-right text-gray-500'>
              <thead className='text-xs w-full uppercase bg-gray-700 text-white'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Tiêu đề
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    <div className='flex items-center'>Nội dung</div>
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    <div className='flex items-center'>Thể loại</div>
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
                {posts.map((item, index) => {
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
                          alt={item?.title}
                        />
                        <span className='text-lg font-semibold'>
                          {item.title}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-lg text-gray-800'>
                        {item?.content}
                      </td>
                      <td className='px-6 py-4 text-lg text-gray-800'>
                        {item?.topic}
                      </td>
                      <td className='px-6 py-4 text-right'>
                        <button
                          onClick={() => {
                            deletePost(item?._id);
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
            <Pagination
              handlePageClick={handlePageClick}
              pageCount={totalPages}
            />
          </div>
        </>
      ) : (
        <p className='text-center text-white'>Không có bài viết nào</p>
      )}
    </div>
  );
};

export default PostAdmin;
