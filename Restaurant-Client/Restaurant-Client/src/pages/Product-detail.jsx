import "../css/Product-Detail.css";
import { FaCartShopping } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { MdAccountCircle } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { IoTimeSharp } from "react-icons/io5";
import { FaArrowTurnDown } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addtoCart, getDetailProduct, getProducts } from "../api";
import { formatPrice } from "../utils/formatPrice";
import { toast } from "react-toastify";

function ProductDetail() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getDetailProduct(id);
      const res1 = await getProducts(5);
      setProducts(res1.products);
      setComments(res?.comments);
      setProduct(res?.product);
    };
    fetchData();
  }, [id]);
  const addToCartHandler = async (id, action) => {
    try {
      console.log(id);

      const res = await addtoCart(id, count, action);
      console.log(res);

      toast.success("THêm vào giỏ hàng thành công");
    } catch (error) {
      console.log(error);

      toast.error("Thêm vào giỏ hàng thất bại");
    }
  };
  return (
    <>
      <div className='product-detail-page'>
        <div className='navbar-detail'>
          <div className='image-detail'>
            <div className='navbar-left'>
              <img src={product?.image} alt='' />
            </div>
            {/* <div className='list-image-detail'>
              <img
                src='https://wp.validthemes.net/restan/wp-content/uploads/2024/06/Salmon-Fry-1.png'
                alt=''
              />
              <img
                src='https://wp.validthemes.net/restan/wp-content/uploads/2024/06/Salmon-Fry-1.png'
                alt=''
              />
              <img
                src='https://wp.validthemes.net/restan/wp-content/uploads/2024/06/Salmon-Fry-1.png'
                alt=''
              />
              <img
                src='https://wp.validthemes.net/restan/wp-content/uploads/2024/06/Salmon-Fry-1.png'
                alt=''
              />
            </div> */}
          </div>
          <div className='navbar-right'>
            <div>
              <h3 className='product-title'>
                {product?.categoryId?.categoryName}
              </h3>
            </div>
            <h2 className='product-name'>{product?.productName}</h2>
            <div className='rate'>
              <span className='rating-text'>(4.5)</span>
              <div className='stars'>
                <i className='star-icon full-star'>★</i>
                <i className='star-icon full-star'>★</i>
                <i className='star-icon full-star'>★</i>
                <i className='star-icon full-star'>★</i>
                <i className='star-icon half-star'>★</i>
                <span className='total-ratings'>120 lượt đánh giá</span>
              </div>
            </div>
            <p className='product-children'>
              Giá tiền: {formatPrice(product?.price)} đ
            </p>
            <p className='product-children'>
              Nguyên liệu chính: Tôm, Thịt, Trứng{" "}
            </p>
            <p className='product-children'>Thành phần: ABC</p>
            <p className='product-children'>Mã món ăn: {product?._id}</p>
            <div className='productQuantity'>
              <div className='counter'>
                <button
                  className='minus'
                  onClick={() => setCount((prev) => (prev -= 1))}>
                  -
                </button>
                <input className='number' value={count} />
                <button
                  className='plus'
                  onClick={() => setCount((prev) => (prev += 1))}>
                  +
                </button>
              </div>
              <button
                className='add'
                onClick={() => addToCartHandler(product?._id, "add")}>
                <i>
                  <FaCartShopping />
                </i>
                <span className=''>Add To Cart</span>
              </button>
              <i className='like'>
                <CiHeart />
              </i>
            </div>
          </div>
          {/* <div className="food-description">
              <h4>Mô tả món ăn</h4>
              <p>
                Đây là món ăn độc đáo, kết hợp giữa hương vị tươi ngon của hải sản
                và sự đậm đà của nước sốt đặc trưng. Món ăn được chế biến từ
                nguyên liệu tươi sống, đảm bảo chất lượng và an toàn.
              </p>
            </div> */}
        </div>
        <div className='food-description'>
          <h3 className='product-title'>Thông tin chi tiết về món ăn</h3>
          <p>{product?.description}</p>
        </div>
        <div className='comment-section'>
          <h3>Tất cả bình luận</h3>
          <ul className='media-list'>
            {comments?.map((item) => {
              return (
                <li className='media' key={item?._id}>
                  <div className='avatar'>
                    <img
                      src='https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/462284740_3639086459737333_4604508730620509631_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=HLXrsSBNhncQ7kNvgEfvIvF&_nc_zt=23&_nc_ht=scontent.fdad3-4.fna&_nc_gid=AHb0BhUhZmnJaxFpv5lswm-&oh=00_AYDeqj4OG5b688vuQvz6V8C1FgDO5uBd62LNI_qX2tBOCw&oe=67297B59'
                      alt='User Avatar'
                    />
                  </div>
                  <div className='comment-details'>
                    <div className='comment-meta'>
                      <ul className='comment-meta-list'>
                        <li className='comment-meta-item'>
                          <i className='comment-icon'>
                            <MdAccountCircle />
                          </i>
                          <p className='comment-name'>LanHuong</p>
                        </li>
                        <li className='comment-meta-item'>
                          <i className='comment-icon'>
                            <MdDateRange />
                          </i>
                          <p className='comment-name'>22/10/2024</p>
                        </li>
                        <li className='comment-meta-item'>
                          <i className='comment-icon'>
                            <IoTimeSharp />
                          </i>
                          <p className='comment-name'>10:14 a.m</p>
                        </li>
                      </ul>
                    </div>
                    <p className='comment-content'>Món ăn ngon quá!!</p>
                    <div className='comment-replay'>
                      <i className='replay-icon'>
                        <FaArrowTurnDown />
                      </i>
                      <span className='replay-text'>Replay</span>
                    </div>
                  </div>
                </li>
              );
            })}
            <li className='media second-media'>
              <div className='avatar'>
                <img
                  src='https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/451021686_3567165343596112_987871808300877131_n.jpg?stp=dst-jpg_p526x296&_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=HcSxLjVaVFIQ7kNvgFRmCm4&_nc_zt=23&_nc_ht=scontent.fdad3-4.fna&_nc_gid=A3xUAdbDsoCUEymSCQ2zC8e&oh=00_AYCDOLkoVgn8P58WiharXst2cq6V8vhmCxzVGmoTQhkSlQ&oe=671CD678'
                  alt='User Avatar'
                />
              </div>
              <div className='comment-details'>
                <div className='comment-meta'>
                  <ul className='comment-meta-list'>
                    <li className='comment-meta-item'>
                      <i className='comment-icon'>
                        <MdAccountCircle />
                      </i>
                      <p className='comment-name'>QUan,,</p>
                    </li>
                    <li className='comment-meta-item'>
                      <i className='comment-icon'>
                        <MdDateRange />
                      </i>
                      <p className='comment-name'>22/10/2024</p>
                    </li>
                    <li className='comment-meta-item'>
                      <i className='comment-icon'>
                        <IoTimeSharp />
                      </i>
                      <p className='comment-name'>10:14 a.m</p>
                    </li>
                  </ul>
                </div>
                <p className='comment-content'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className='comment-replay'>
                  <i className='replay-icon'>
                    <FaArrowTurnDown />
                  </i>
                  <span className='replay-text'>Replay</span>
                </div>
              </div>
            </li>
            <li className='media'>
              <div className='avatar'>
                <img
                  src='https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/456787753_485315210955798_1941782062025356100_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=MzYfTNJEKsEQ7kNvgGTsZtm&_nc_zt=23&_nc_ht=scontent.fdad3-4.fna&_nc_gid=AqvWuyUuWa14LTPxNPIEiKf&oh=00_AYAhTk82apyFtavl-5MUbjjifYFKLQE53tNnHkzb_LqCzw&oe=671CE00B'
                  alt='User Avatar'
                />
              </div>
              <div className='comment-details'>
                <div className='comment-meta'>
                  <ul className='comment-meta-list'>
                    <li className='comment-meta-item'>
                      <i className='comment-icon'>
                        <MdAccountCircle />
                      </i>
                      <p className='comment-name'>LanHuong</p>
                    </li>
                    <li className='comment-meta-item'>
                      <i className='comment-icon'>
                        <MdDateRange />
                      </i>
                      <p className='comment-name'>22/10/2024</p>
                    </li>
                    <li className='comment-meta-item'>
                      <i className='comment-icon'>
                        <IoTimeSharp />
                      </i>
                      <p className='comment-name'>10:14 a.m</p>
                    </li>
                  </ul>
                </div>
                <p className='comment-content'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className='comment-replay'>
                  <i className='replay-icon'>
                    <FaArrowTurnDown />
                  </i>
                  <span className='replay-text'>Replay</span>
                </div>
              </div>
            </li>
            <li className='media second-media'>
              <div className='avatar'>
                <img
                  src='https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/455098255_422318400844545_5950076218158271442_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=17HzIA0LOkkQ7kNvgGgFqwO&_nc_zt=23&_nc_ht=scontent.fdad3-4.fna&_nc_gid=AfVqLM6Xd5V_jv-Bx6nTxAQ&oh=00_AYD6dn6Bm6ZbGEktlbTE9U5f3aEv3eMlySR6CoqgzxQOmA&oe=671CE178'
                  alt='User Avatar'
                />
              </div>
              <div className='comment-details'>
                <div className='comment-meta'>
                  <ul className='comment-meta-list'>
                    <li className='comment-meta-item'>
                      <i className='comment-icon'>
                        <MdAccountCircle />
                      </i>
                      <p className='comment-name'>LanHuong</p>
                    </li>
                    <li className='comment-meta-item'>
                      <i className='comment-icon'>
                        <MdDateRange />
                      </i>
                      <p className='comment-name'>22/10/2024</p>
                    </li>
                    <li className='comment-meta-item'>
                      <i className='comment-icon'>
                        <IoTimeSharp />
                      </i>
                      <p className='comment-name'>10:14 a.m</p>
                    </li>
                  </ul>
                </div>
                <p className='comment-content'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className='comment-replay'>
                  <i className='replay-icon'>
                    <FaArrowTurnDown />
                  </i>
                  <span className='replay-text'>Replay</span>
                </div>
              </div>
            </li>
            <li className='media second-media'>
              <div className='avatar'>
                <img
                  src='https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/451021686_3567165343596112_987871808300877131_n.jpg?stp=dst-jpg_p526x296&_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=HcSxLjVaVFIQ7kNvgFRmCm4&_nc_zt=23&_nc_ht=scontent.fdad3-4.fna&_nc_gid=A3xUAdbDsoCUEymSCQ2zC8e&oh=00_AYCDOLkoVgn8P58WiharXst2cq6V8vhmCxzVGmoTQhkSlQ&oe=671CD678'
                  alt='User Avatar'
                />
              </div>
              <div className='comment-details'>
                <div className='comment-meta'>
                  <ul className='comment-meta-list'>
                    <li className='comment-meta-item'>
                      <i className='comment-icon'>
                        <MdAccountCircle />
                      </i>
                      <p className='comment-name'>LanHuong</p>
                    </li>
                    <li className='comment-meta-item'>
                      <i className='comment-icon'>
                        <MdDateRange />
                      </i>
                      <p className='comment-name'>22/10/2024</p>
                    </li>
                    <li className='comment-meta-item'>
                      <i className='comment-icon'>
                        <IoTimeSharp />
                      </i>
                      <p className='comment-name'>10:14 a.m</p>
                    </li>
                  </ul>
                </div>
                <p className='comment-content'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className='comment-replay'>
                  <i className='replay-icon'>
                    <FaArrowTurnDown />
                  </i>
                  <span className='replay-text'>Replay</span>
                </div>
              </div>
            </li>
            <li className='media'>
              <div className='avatar'>
                <img
                  src='https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/451021686_3567165343596112_987871808300877131_n.jpg?stp=dst-jpg_p526x296&_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=HcSxLjVaVFIQ7kNvgFRmCm4&_nc_zt=23&_nc_ht=scontent.fdad3-4.fna&_nc_gid=A3xUAdbDsoCUEymSCQ2zC8e&oh=00_AYCDOLkoVgn8P58WiharXst2cq6V8vhmCxzVGmoTQhkSlQ&oe=671CD678'
                  alt='User Avatar'
                />
              </div>
              <div className='comment-details'>
                <div className='comment-meta'>
                  <ul className='comment-meta-list'>
                    <li className='comment-meta-item'>
                      <i className='comment-icon'>
                        <MdAccountCircle />
                      </i>
                      <p className='comment-name'>LanHuong</p>
                    </li>
                    <li className='comment-meta-item'>
                      <i className='comment-icon'>
                        <MdDateRange />
                      </i>
                      <p className='comment-name'>22/10/2024</p>
                    </li>
                    <li className='comment-meta-item'>
                      <i className='comment-icon'>
                        <IoTimeSharp />
                      </i>
                      <p className='comment-name'>10:14 a.m</p>
                    </li>
                  </ul>
                </div>
                <p className='comment-content'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className='comment-replay'>
                  <i className='replay-icon'>
                    <FaArrowTurnDown />
                  </i>
                  <span className='replay-text'>Replay</span>
                </div>
              </div>
            </li>
          </ul>
          <div className='comment-input'>
            <textarea
              className='comment-textarea'
              placeholder='Viết bình luận của bạn...'></textarea>
            <button className='comment-submit'>Gửi bình luận</button>
          </div>
        </div>

        <div className='tab-content'>
          <div>
            <h2 className='other-dishes'>Các món ăn khác</h2>
            <div className='vt-product'>
              {products.map((item) => {
                return (
                  <div className='product-content' key={item?._id}>
                    <img className='product-image' src={item?.image} alt='' />
                    <div className='product-caption'>
                      {/* <span className='product-tags'>Chicken, Spicy</span> */}
                      <h3 className='product-title'>{item?.productName}</h3>
                      <h4 className='product-price'>
                        {formatPrice(item?.price)} đ
                      </h4>
                      <button
                        className='add-to-cart'
                        onClick={() => addToCartHandler(item?._id)}>
                        {/* <i>
                          <FaCartShopping />
                        </i> */}
                        Add to cart
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* <div className='product-content'>
                <img
                  className='product-image'
                  src='https://wp.validthemes.net/restan/wp-content/uploads/2024/05/fried-chicekn.png'
                  alt=''
                />
                <div className='product-caption'>
                  <span className='product-tags'>Chicken, Spicyy</span>
                  <h3 className='product-title'>Chicken Alfredo</h3>
                  <h4 className='product-price'>35.000 đ</h4>
                  <button className='add-to-cart'>
                    {" "}
                    <i>
                      <FaCartShopping />
                    </i>{" "}
                    Add to cart
                  </button>
                </div>
              </div>
              <div className='product-content'>
                <img
                  className='product-image'
                  src='https://wp.validthemes.net/restan/wp-content/uploads/2024/05/fried-chicekn.png'
                  alt=''
                />
                <div className='product-caption'>
                  <span className='product-tags'>Chicken, Spicyy</span>
                  <h3 className='product-title'>Chicken Alfredo</h3>
                  <h4 className='product-price'>35.000 đ</h4>
                  <button className='add-to-cart'>
                    {" "}
                    <i>
                      <FaCartShopping />
                    </i>{" "}
                    Add to cart
                  </button>
                </div>
              </div>
              <div className='product-content'>
                <img
                  className='product-image'
                  src='https://wp.validthemes.net/restan/wp-content/uploads/2024/05/fried-chicekn.png'
                  alt=''
                />
                <div className='product-caption'>
                  <span className='product-tags'>Chicken, Spicyy</span>
                  <h3 className='product-title'>Chicken Alfredo</h3>
                  <h4 className='product-price'>35.000 đ</h4>
                  <button className='add-to-cart'>
                    {" "}
                    <i>
                      <FaCartShopping />
                    </i>{" "}
                    Add to cart
                  </button>
                </div>
              </div>
              <div className='product-content'>
                <img
                  className='product-image'
                  src='https://wp.validthemes.net/restan/wp-content/uploads/2024/05/fried-chicekn.png'
                  alt=''
                />
                <div className='product-caption'>
                  <span className='product-tags'>Chicken, Spicyy</span>
                  <h3 className='product-title'>Chicken Alfredo</h3>
                  <h4 className='product-price'>35.000 đ</h4>
                  <button className='add-to-cart'>
                    {" "}
                    <i>
                      <FaCartShopping />
                    </i>{" "}
                    Add to cart
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
