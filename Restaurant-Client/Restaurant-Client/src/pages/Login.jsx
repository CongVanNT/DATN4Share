import "../style/Login.css";
import logohi5 from "../assets/logo-hi-5.png";
import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { Logins } from "../api/index";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const logins = await Logins({
        email,
        password,
      });
      localStorage.setItem("token", logins.accessToken);
      console.log(logins);

      localStorage.setItem("user", JSON.stringify(logins.user));
      if (logins?.user?.role == "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      alert("đăng nhập thành công");
      // setErrorMessage(errorMessage);
      console.log(logins, "setErrorMessage");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='App'>
      <div className='container'>
        <div className='container-login'>
          <div className='welcome-section'>
            <h2 className='welcome-title'>
              Chào mừng đến{" "}
              <span className='highlight'>Nhà hàng HIGHTFIVE+</span>
            </h2>
            <Link to='/'>
              <img src={logohi5} alt='Logo' className='logo' />
            </Link>
            <p className='description'>
              Đã tồn tại không chỉ qua năm thế kỷ, mà còn bước vào điện tử, vẫn
              giữ nguyên bản chất.
            </p>
            <p className='copyright'>Bản quyền thuộc về Hight Five Group</p>
          </div>
          <div className='form-section'>
            <h3>Đăng nhập</h3>
            {/* {errorMessage && <p className="error">{errorMessage}</p>} */}
            <form className='text-black' onSubmit={handleLogin}>
              <input
                type='email'
                placeholder='Email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type='password'
                placeholder='Mật khẩu'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className='forgot-password'>
                <Link to='#'>Quên mật khẩu?</Link>
              </div>
              <button type='submit' className='btn'>
                Đăng nhập
              </button>
            </form>
            <p className='account'>
              Chưa có tài khoản?{" "}
              <Link className='redirect-link' to='/signup'>
                Tạo tài khoản
              </Link>
            </p>
            <div className='social-buttons'>
              <button className='facebook icon-social-network'>
                <i className='fa-brands fa-facebook-f'></i>
                <p className='text-social-network'>Facebook</p>
              </button>
              <button className='google icon-social-network'>
                <i className='fa-brands fa-google'></i>
                <p className='text-social-network'>Google</p>
              </button>
            </div>
            <p className='team-info'>Nhóm HightFive © 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
