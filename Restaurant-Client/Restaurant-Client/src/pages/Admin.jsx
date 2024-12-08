import React, { useEffect, useState } from "react";
import SideBarAdmin from "../component/SideBarAdmin";
import { Outlet, useNavigate } from "react-router-dom";

const Admin = () => {
  const [isShowSideBar, setIsShowSideBar] = useState(true);
  const navigate = useNavigate();
  const showSideBar = () => {
    setIsShowSideBar((prev) => !prev);
  };
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (user.role != "admin") {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div className='flex'>
      <SideBarAdmin />
      <div className='w-full overflow-hidden'>
        {/* <HeaderAdmin /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
