import "../css/FavoriteFood.css";
import { useEffect, useState } from "react";
import { getProducts } from "../api/index";
import { Link } from "react-router-dom";

const FoodCategory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        console.log(data, "products");
        setProducts(data.products);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
      });
  }, []);

  return (
    <div className='food-category container-vphu'>
      <h2 className='category-title'>Món Ăn Ngon Nhất</h2>
      <div className='food-items'>
        {products.map((item) => (
          <Link
            to={`/product-detail/${item._id}`}
            className='food-card'
            key={item.id}>
            <img src={item.image} alt={item.name} className='food-image' />
            <div className='rating-section text-center text-red-500'>
              {/* <p className="food-name">{item.price} VND</p> */}
            </div>
            <div className='food-info'>
              <h3 className='food-name'>{item.productName}</h3>
              <p className='food-description'>
                {item.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <a href={item.orderLink} className='order-link'>
                <p className='order-now'>ĐẶT NGAY</p>
                <i className='fa-solid fa-arrow-right fa-rotate-by icon-arrow'></i>
              </a>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FoodCategory;
