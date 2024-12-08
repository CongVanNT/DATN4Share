import { useEffect, useState } from "react";
import { confirmOrder, getOrdersAdmin } from "../../api";
import Pagination from "../../UI/Pagination";

const OrderAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const fetchData = async () => {
    const res = await getOrdersAdmin(currentPage);
    console.log(res);
    setOrders(res.orders);
    setTotalPages(res.totalPages);
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  const confirmOrderHandler = async (id) => {
    try {
      const res = await confirmOrder(id);
      alert("Xác nhận đơn hàng thành công");
      fetchData();
    } catch (error) {
      console.log(error);
      alert("Xác nhận đơn hàng thất bại");
    }
  };
  return (
    <div className='px-10 mt-7'>
      {orders?.length > 0 ? (
        <>
          <div className='relative h-[90vh] overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='text-sm w-full text-left rtl:text-right text-gray-500'>
              <thead className='text-xs w-full uppercase bg-gray-700 text-white'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Mail
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    <div className='flex items-center'>SĐT</div>
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    <div className='flex items-center'>Số lượng</div>
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    <div className='flex items-center'>Thành tiền</div>
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    <div className='flex items-center'>Giảm giá</div>
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    <div className='flex items-center'>Trạng thái</div>
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    <div className='flex items-center'>Thanh toán</div>
                  </th>
                </tr>
              </thead>
              <tbody className='w-full'>
                {orders.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className='bg-white w-full border-b border-[2px] border-[#ccc] hover:bg-gray-50'>
                      {/* <td
                        scope='row'
                        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap space-x-4'></td> */}
                      <td className='px-6 py-4 text-lg text-gray-800'>
                        {item?.userId?.email}
                      </td>
                      <td className='px-6 py-4 text-lg text-gray-800'>
                        {item?.phone}
                      </td>
                      <td className='px-6 py-4 text-lg text-gray-800'>
                        {item?.totalAmount}
                      </td>
                      <td className='px-6 py-4 text-lg text-gray-800'>
                        {item?.totalPrice}
                      </td>
                      <td className='px-6 py-4 text-lg text-gray-800'>
                        {item?.discount ? item?.discount : 0}
                      </td>
                      <td className='px-6 py-4 text-lg text-gray-800'>
                        {item?.status}
                      </td>
                      <td className='px-6 py-4 text-lg text-gray-800'>
                        {item?.paymentMethod}
                      </td>
                      <td className='px-6 py-4 text-right'>
                        <button
                          onClick={() => confirmOrderHandler(item?._id)}
                          className='font-medium text-white bg-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400 hover:underline transition-colors duration-200'>
                          Xác nhận
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
        <p className='text-center text-white'>Không có danh mục nào</p>
      )}
    </div>
  );
};

export default OrderAdmin;
