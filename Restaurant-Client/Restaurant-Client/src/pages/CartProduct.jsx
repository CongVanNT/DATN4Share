import "../css/CartProduct.css";

import { addtoCart, getCart, getVouchers, Order, paymentt } from "../api/index";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import { toast } from "react-toastify";

// const CODE_VOUCHERS = ["WELCOME10", "LOYALTY5X20", "BIGSPENDER100"];

function CartProduct() {
  const [cartItems, setCartItems] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [payment, setPayment] = useState("Trả tiền sau khi vào bàn");
  const [selectedOption, setSelectedOption] = useState(null);
  const [user, setUser] = useState(null);
  const [checkedInput, setCheckedInput] = useState(false);

  const navigate = useNavigate();

  // Hàm xử lý sự kiện khi checkbox được chọn
  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value); // Cập nhật trạng thái cho checkbox được chọn
  };

  const fetchData = async () => {
    const response = await getCart();
    const response1 = await getVouchers();
    setVouchers(response1?.vouchers);
    setCartItems(response.cart);
    console.log(response.cart);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token || !user) {
      alert("Bạn cần đăng nhập");
      navigate("/login");
      return;
    }

    setUser(user);

    fetchData();
  }, []);

  const handleCartItem = async (id, action) => {
    try {
      console.log(id, action);

      const res = await addtoCart(id, 1, action);
      console.log(res);

      fetchData();
    } catch (error) {
      toast.error("Thêm thất bại");
    }
  };

  const totalCart = (cart) => {
    return cart?.products?.reduce((sum, item) => {
      return sum + item.quantity * item.productId.price;
    }, 0);
  };

  const order = async () => {
    let tprice = totalCart(cartItems);
    let discount = 0;
    const option = JSON.parse(selectedOption);
    if (!option) {
      discount = 0;
    } else if (option.code === "WELCOME10" && user.order_count != 0) {
      alert("Voucher chỉ áp dụng cho lấn mua đầu tiên");
      return;
    } else if (
      option.code === "LOYALTY5X20" &&
      (user.order_count % 5 != 0 || user.order_count < 5)
    ) {
      alert("Voucher chỉ áp dụng các đơn hàng lần thứ 5, 10, 15...");
      return;
    } else if (option.code === "BIGSPENDER100" && tprice < 1000000) {
      alert("Voucher chỉ áp dụng cho hóa đơn trên 1 triệu!!");
      return;
    }
    const npros = cartItems.products.map((item) => {
      const obj = {};
      (obj.productId = item.productId._id), (obj.quantity = item.quantity);
      return obj;
    });
    const amount = cartItems.products.reduce((sum, item) => {
      return sum + +item.quantity;
    }, 0);

    const obj = {
      products: npros,
      totalPrice: tprice,
      totalAmount: amount,
      discount: option?.discount || 0,
      paymentMethod: payment,
    };

    console.log(obj);

    try {
      const res = await Order(obj);
      console.log(res);
      if (payment === "Thanh toán Momo") {
        const res1 = await paymentt(res?.order?._id);
        console.log(res1?.data?.payUrl);
        if (res1?.data && res1?.data?.payUrl) {
          window.location.href = res1?.data?.payUrl;
        }
      }
      setCheckedInput(false);
      fetchData();
    } catch (error) {
      alert("Đặt hàng không thành công!!");
    }
  };

  return (
    <>
      <div className='cart-header'>
        <ul className='cart-page-header'>
          {/* <li className="cart-page-logo">
            <img src={Logo2} alt="" />
            <h3>HightFive</h3>
          </li> */}
          <li className='cart-page-cart'>Shopping Cart</li>
        </ul>
      </div>
      <div className='cart text-black'>
        <div className='cart-container'>
          <div className='cart-items'>
            <table className='cart-table'>
              <thead className='cart-menus'>
                <tr className='cart_menu'>
                  <td className='cart-checkbox'>
                    <input type='checkbox' />
                  </td>
                  <td className='cart-product'>Sản phẩm</td>
                  <td className='cart-price'>Đơn giá</td>
                  <td className='cart-quantity'>Số lượng</td>
                  <td className='cart-money'>Thành tiền</td>
                  <td className='cart-manipulate'>Thao tác</td>
                </tr>
              </thead>
              <tbody className='cart-contents'>
                {cartItems?.products?.map((item, index) => {
                  return (
                    <tr key={index} className='cart-content'>
                      <td>
                        <input type='checkbox' />
                      </td>
                      <td className='cart-image'>
                        <img
                          className='image'
                          src={item?.productId?.image}
                          alt=''
                        />
                        <p>{item?.productId?.productName}</p>
                      </td>
                      <td>{formatPrice(item?.productId?.price)} đ</td>
                      <td>
                        <div className='counters'>
                          <button
                            className={`minus ${
                              item?.quantity === 1 ? "invisible" : ""
                            }`}
                            onClick={() => {
                              handleCartItem(item?.productId?._id, "minus");
                            }}>
                            -
                          </button>
                          {/* <input className='numbers' value={item?.quantity} /> */}
                          <p className='numbers flex items-center justify-center'>
                            {item?.quantity}
                          </p>
                          <button
                            className='plus'
                            onClick={() => {
                              handleCartItem(item?.productId?._id, "plus");
                            }}>
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        {formatPrice(item?.productId?.price * item?.quantity)} đ
                      </td>
                      <td
                        className='cart-manipulates'
                        onClick={() => {
                          handleCartItem(item?.productId?._id, "delete");
                        }}>
                        Xóa
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className='cart-summary bg-white'>
            <p className='total-title'> Cart totals</p>
            <ul className='cart-sub-total'>
              <li>
                <p>Subtotal:</p>
                <h5>{formatPrice(totalCart(cartItems))} đ</h5>
              </li>

              <li>
                <p className='total'>Total:</p>
                <h5 className='total'>{formatPrice(totalCart(cartItems))} đ</h5>
              </li>
            </ul>
            <div>
              {vouchers?.length > 0 &&
                vouchers.map((item, index) => {
                  return (
                    <div
                      key={item?._id}
                      className={`${index != 2 ? "invisible" : ""}`}>
                      <label className='' onClick={() => setCheckedInput(true)}>
                        <input
                          type='radio'
                          value={JSON.stringify(item)}
                          name='voucher'
                          onChange={handleChange}
                          checked={checkedInput}
                          onClick={() => setCheckedInput(true)}
                        />
                        {item?.description}
                      </label>
                      <br />
                    </div>
                  );
                })}
            </div>
            <label
              htmlFor='payments'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Select an option
            </label>
            <select
              id='payments'
              onChange={(e) => {
                setPayment(e.target.value);
              }}
              // defaultValue={"Trả tiền sau khi vào bàn"}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
              <option value={"Trả tiền sau khi vào bàn"}>
                Trả tiền sau khi vào bàn
              </option>
              <option value={"Thanh toán Momo"}>Thanh toán Momo</option>
            </select>
            <div className='button-container'>
              <button
                onClick={() => {
                  order();
                }}
                className='send'>
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartProduct;
