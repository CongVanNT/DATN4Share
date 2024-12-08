import React, { useState } from "react";
import { FaHouse } from "react-icons/fa6";
import {
  FiBox,
  FiGrid,
  FiLogOut,
  FiShoppingCart,
  FiUsers,
} from "react-icons/fi";
import { MdOutlineArticle } from "react-icons/md";
import { PiCertificateFill, PiFactoryDuotone } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

const SideBarAdmin = () => {
  const [open, setOpen] = useState(0);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const logoutHandler = () => {
    //   dispatch(logout());
    navigate("/");
    return;
  };
  return (
    <div className='flex flex-col w-64 h-screen px-4 pt-2 pb-4 text-white bg-gray-900'>
      {/* User Section */}
      <div
        className='flex items-center gap-3 p-2 cursor-pointer'
        onClick={() => handleOpen(1)}>
        {/* <img
          src={logo}
          alt='user'
          className='object-cover w-10 h-10 rounded-full'
        /> */}
        <div className='flex-1'>
          <p className='text-sm font-semibold'></p>
        </div>
      </div>

      <hr className='mb-6 border-gray-700' />

      {/* Navigation Section */}
      <div className='flex-1 space-y-1'>
        <Link
          to='/'
          className={`w-full flex items-center gap-3 p-3 rounded-md ${
            open === 2 ? "bg-gray-800" : "hover:bg-gray-800"
          }`}
          onClick={() => handleOpen(2)}>
          <FiGrid className='w-5 h-5' />
          Trang chủ
        </Link>
        <Link
          to='/admin/san-pham'
          className='flex items-center w-full gap-3 p-3 rounded-md hover:bg-gray-800'>
          <FiBox className='w-5 h-5' />
          Sản phẩm
        </Link>
        <Link
          to='/admin/don-hang'
          className='flex items-center w-full gap-3 p-3 rounded-md hover:bg-gray-800'>
          <FiShoppingCart className='w-5 h-5' />
          Đơn hàng
        </Link>
        <Link
          to='/admin/danh-muc'
          className='flex items-center w-full gap-3 p-3 rounded-md hover:bg-gray-800'>
          <PiCertificateFill className='w-5 h-5' />
          Danh mục
        </Link>
        <Link
          to='/admin/bai-viet'
          className='flex items-center w-full gap-3 p-3 rounded-md hover:bg-gray-800'>
          <MdOutlineArticle className='w-5 h-5' />
          Bài viết
        </Link>
        <Link
          to='/admin/khach-hang'
          className='flex items-center w-full gap-3 p-3 rounded-md hover:bg-gray-800'>
          <FiUsers className='w-5 h-5' />
          Khách hàng
        </Link>
        <Link
          to='/admin/dau-bep'
          className='flex items-center w-full gap-3 p-3 rounded-md hover:bg-gray-800'>
          <PiFactoryDuotone className='w-5 h-5' />
          Đầu bếp
        </Link>
      </div>

      <hr className='my-6 border-gray-700' />

      {/* Footer Section */}
      <div className='space-y-4'>
        <Link
          to='/'
          className='flex items-center w-full gap-3 p-3 rounded-md hover:bg-gray-800'>
          <FaHouse className='w-5 h-5' />
          Trang chủ
        </Link>
        <button
          onClick={logoutHandler}
          className='flex items-center w-full gap-3 p-3 rounded-md hover:bg-gray-800'>
          <FiLogOut className='w-5 h-5' />
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default SideBarAdmin;
