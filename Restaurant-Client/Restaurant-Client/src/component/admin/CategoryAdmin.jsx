import { useEffect, useState } from "react";
import { createCategory, createPost, getCategory } from "../../api";
import Pagination from "../../UI/Pagination";
import Modal from "react-modal";

const CategoryAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [categoryName, setCategoryName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const openModal = () => setIsModalOpen(true);

  // Đóng modal
  const closeModal = () => setIsModalOpen(false);
  const fetchData = async () => {
    const res = await getCategory(currentPage);
    console.log(res);
    setCategories(res.categories);
    setTotalPages(res.totalPages);
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("categoryName", categoryName);
      if (!image) {
        alert("Bạn cần chọn file ảnh");
        return;
      }
      formData.append("image", image);
      const res = await createCategory(formData);
      if (res) {
        alert("Thêm bài viết thành công");
        fetchData();
      }
    } catch (error) {
      alert("Thêm sản phẩm bị lối");
    } finally {
      closeModal();
    }
  };
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
        Thêm danh mục
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel='Thêm sản phẩm'
        className='fixed inset-0 flex justify-center items-center h-[90vh] overflow-y-auto z-50'
        overlayClassName='fixed inset-0 bg-black bg-opacity-50'>
        <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-lg'>
          <h2 className='text-2xl font-semibold mb-4 text-black'>
            Thêm danh mục mới
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Tên sản phẩm */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Tên danh mục
              </label>
              <input
                type='text'
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className='mt-1 text-black px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none'
                required
              />
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
      {categories?.length > 0 ? (
        <>
          <div className='relative h-[90vh] overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='text-sm w-full text-left rtl:text-right text-gray-500'>
              <thead className='text-xs w-full uppercase bg-gray-700 text-white'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Ảnh
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    <div className='flex items-center'>Tên danh mục</div>
                  </th>
                </tr>
              </thead>
              <tbody className='w-full'>
                {categories.map((item, index) => {
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
                          alt={item?.categoryName}
                        />
                      </td>
                      <td className='px-6 py-4 text-lg text-gray-800'>
                        {item?.categoryName}
                      </td>
                      <td className='px-6 py-4 text-right'>
                        <a
                          href='#'
                          className='font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400 hover:underline transition-colors duration-200'>
                          Edit
                        </a>
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
        <p className='text-center text-white'>Không có danh mục nào</p>
      )}
    </div>
  );
};

export default CategoryAdmin;
