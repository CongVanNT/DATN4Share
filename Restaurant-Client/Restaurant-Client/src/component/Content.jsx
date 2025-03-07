import { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import "../css/Content.css";
import "aos/dist/aos.css";
import { addtoCart, getProducts, getCategory } from "../api/index";




const Content = () => {

  const [product, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  // const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    getProducts(6).then((data) => {
      console.log(data, "products");
      setProducts(data.products);
    }).catch((error) => {
      console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
    });
  }, []);


  const categorClick = async (id) => {
    setCategoryId(id)
  }

  useEffect(() => {
    if (categoryId !== null && product.length > 0) {
      const filtered = product.filter(product => product.categoryId === categoryId);
      setCategory(filtered);
    }
  }, [categoryId, product]); 
  



  const addToCartHandler = async (id) => {
    try {
      const res = await addtoCart(id);

      console.log(res);
      alert('add to cart success')

    } catch (error) {
      alert('add to cart error')
      console.log(error)
    }
  }


  useEffect(() => {
    getCategory().then((data) => {
      console.log(data, "category");
      setCategory(data.categories);
    }).catch((error) => {
      console.error('L��i khi lấy dữ liệu danh mục:', error);
    });
  }, []);

  return (
    <div>
      <div className="container mx-auto py-12">
        <div className="text-center">
          <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">
            Food Menu
          </h4>
          <h1 className="text-4xl font-bold mb-8">Our Specials Menu</h1>
          <div className="inline-block border-[1px] border-gray-300 rounded-lg overflow-hidden">
            <div className="flex menu-our-special ">
              {category.map((item) => {
                return (
                  <>
                    <button onClick={() => categorClick(item._id)}
                      key={item.id}
                      className="px-6 py-2 text-gray-100 hover:text-white hover:bg-[#9d7e5a] transition duration-200 item-our-special"
                    >
                      {item.categoryName}
                    </button>
                  </>
                );
              })}

            </div>
          </div>
        </div>





        <div className="flex justify-center items-center min-h-screen container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[1300px] mt-[70px]">
            {product.map((item) => {
              return (
                <>
                  <div
                    className="relative border-[1px] rounded-xl overflow-hidden shadow-lg bg-white"
                    key={item.id}
                  >
                    <img
                      className="w-full h-auto rounded-t-xl"
                      src={item.image}
                      alt="Shushi"
                    />
                    <div className="absolute top-[275px] left-2 bg-neutral-800 rounded-lg px-3 py-1 text-gray-500 flex items-center space-x-2 z-10">
                      <CiStar className="text-yellow-500" />
                      <span className="font-bold ml-2 text-white">{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                      <h1 className="text-xl font-bold mb-2">{item.productName}</h1>
                    </div>
                    <div className="p-4 bg-neutral-800 text-white">
                      <p className="text-sm font-semibold text-gray-500 mb-2">
                        {item.description}
                      </p>



                      <button onClick={() => addToCartHandler(item._id)} className="mt-4 w-full border-2 border-gray-200 rounded-lg py-2 flex justify-center items-center space-x-2 hover:bg-gray-700 transition duration-200">
                        <span className="font-semibold">Add to cart</span>
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>

          {/* <div className="relative flex flex-col md:flex-row h-screen bg-black mx-auto rounded-[20px] w-[733px] md:w-[1296px]">
            <div className="flex-1 flex items-center justify-center relative">
              <div className="relative z-10 flex justify-center">
                <img
                  src="https://wp.validthemes.net/restan/wp-content/uploads/2024/04/21.png"
                  alt="App Interface"
                  className="relative z-20 w-[550px] h-auto transform translate-x-0 "
                />
                <img
                  src="https://wp.validthemes.net/restan/wp-content/uploads/2024/04/16.png"
                  alt="App Interface"
                  className="relative z-30 w-[450px] h-auto transform translate-x-0 "
                />
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center text-white">
              <div className="text-center px-8">
                <h1 className="text-[50px] font-bold mb-4">
                  Are you Ready to Start your online Order?
                </h1>
                <p className="text-[16px] mb-8 text-gray-300">
                  Bndulgence diminution so discovered mr apartments. Are off under
                  folly death wrote cause her way spite. Plan upon yet way get cold
                  spot its week. Almost do am or limits hearts. Resolve parties but
                  why she shewing. She sang know now
                </p>
                <div className="flex justify-center space-x-4">
                  <a
                    href="#"
                    className="bg-[#b89f76] text-black px-4 py-2 rounded-full hover:bg-gray-200"
                  >
                    App Store
                  </a>
                  <a
                    href="#"
                    className="bg-[#b89f76] text-black px-4 py-2 rounded-full hover:bg-gray-200"
                  >
                    Play Store
                  </a>
                </div>
              </div>
            </div>
          </div>  */}


          {/* <div className="py-10 bg-neutral-800 text-white bg-[#EBE9E6]">
        <div className="flex items-center justify-center space-x-4">
          <img
            className="w-[100px] h-auto"
            src="https://wp.validthemes.net/restan/wp-content/uploads/2024/05/Subtittle-shape-1.png"
            alt=""
          />
          <h1 className="text-[20px] text-[#826a45] font-semibold text-primary-foreground dark:text-primary">
            MASTER CHEFS
          </h1>
          <img
            className="w-[100px] h-auto"
            src="https://wp.validthemes.net/restan/wp-content/uploads/2024/04/18.png"
            alt=""
          />
        </div>

        <h2 className="text-center text-5xl font-bold mb-6 text-primary-foreground dark:text-primary">
          Meet Our Special Chefs
        </h2>
        <div className="flex flex-col md:flex-row justify-center space-y-5 md:space-y-0 md:space-x-8 flex-wrap">
          <div className="text-center group relative mb-5">
            {" "}
            <div className="relative">
              <img
                className="w-[250px] h-[250px] rounded-full border-4 border-primary dark:border-primary dark:border-opacity-50"
                src="https://wp.validthemes.net/restan/wp-content/uploads/2024/01/1-1.jpg"
                alt="Mendia Juxef"
              />
              <div className="flex justify-center items-center space-x-4 opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-transform duration-[600ms] absolute inset-0 bg-opacity-50 bg-black rounded-full">
              </div>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-primary-foreground dark:text-primary">
              Mendia Juxef
            </h3>
            <p className="text-muted-foreground dark:text-muted-foreground">
              BURGER KING
            </p>
          </div>

          <div className="text-center group relative mb-5">
            {" "}
            <div className="relative">
              <img
                className="w-[250px] h-[250px] rounded-full border-4 border-primary dark:border-primary dark:border-opacity-50"
                src="https://wp.validthemes.net/restan/wp-content/uploads/2024/01/3-2.jpg"
                alt="Mendia Juxef"
              />
              <div className="flex justify-center items-center space-x-4 opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-transform duration-[600ms] absolute inset-0 bg-opacity-50 bg-black rounded-full">
                <a href="#" className="text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-primary-foreground dark:text-primary">
              Mendia Juxef
            </h3>
            <p className="text-muted-foreground dark:text-muted-foreground">
              BURGER KING
            </p>
          </div>

          <div className="text-center group relative mb-5">
            {" "}
            {/* Thêm mb-5 ở đây */}
          {/* <div className="relative">
            <img
              className="w-[250px] h-[250px] rounded-full border-4 border-primary dark:border-primary dark:border-opacity-50"
              src="https://wp.validthemes.net/restan/wp-content/uploads/2024/01/2-2.jpg"
              alt="Petro William"
            />
            <div className="flex justify-center items-center space-x-4 opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-transform duration-[600ms] absolute inset-0 bg-opacity-50 bg-black rounded-full">
              <a href="#" className="text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div> */}
          {/* <h3 className="mt-4 text-lg font-semibold text-primary-foreground dark:text-primary">
            Petro William
          </h3>
          <p className="text-muted-foreground dark:text-muted-foreground">
            MAIN CHEF
          </p> */}
        </div>

        <div className="text-center group relative mb-5">
          {" "}
          {/* Thêm mb-5 ở đây */}
          <div className="relative">
            {/* <img
              className="w-[250px] h-[250px] rounded-full border-4 border-primary dark:border-primary dark:border-opacity-50"
              src="https://wp.validthemes.net/restan/wp-content/uploads/2024/01/3-2.jpg"
              alt="Petro William"
            /> */}
            {/* <div className="flex justify-center items-center space-x-4 opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-transform duration-[600ms] absolute inset-0 bg-opacity-50 bg-black rounded-full">
              <a href="#" className="text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-youtube"></i>
              </a>
            </div> */}
          </div>
          <h3 className="mt-4 text-lg font-semibold text-primary-foreground dark:text-primary">
            Petro William
          </h3>
          <p className="text-muted-foreground dark:text-muted-foreground">
            MAIN CHEF
          </p>
        </div>

        {/* <div className="text-center group relative mb-5">
          <div className="relative">
            <img
              className="w-[250px] h-[250px] rounded-full border-4 border-primary dark:border-primary dark:border-opacity-50"
              src="https://wp.validthemes.net/restan/wp-content/uploads/2024/01/1-1.jpg"
              alt="Petro William"
            />
            <div className="flex justify-center items-center space-x-4 opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-transform duration-[600ms] absolute inset-0 bg-opacity-50 bg-black rounded-full">
              <a href="#" className="text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-primary-foreground dark:text-primary">
            Petro William
          </h3>
          <p className="text-muted-foreground dark:text-muted-foreground">
            MAIN CHEF
          </p>
        </div> */}
      </div>

      <div className="text-center py-12">
        <h2 className="text-4xl font-semibold text-white mb-8">
          Our Latest News & Blog
        </h2>
        <div className="flex justify-center gap-8">
          <div className="max-w-xs sm:max-w-sm md:max-w-md shadow-lg overflow-hidden">
            <img
              src="https://wp.validthemes.net/restan/wp-content/uploads/2023/12/1.jpg"
              alt="Bài viết blog 1"
              className="w-full h-48 sm:h-56 object-cover"
            />
            <div className="p-4">
              <div className="text-sm text-gray-500 mb-2">
                BỞI VALIDTHEME • BURGER, ẨM THỰC
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-4">
                Thưởng thức burger Brussels với măng tây và thịt nguội
              </h3>
              <div className="flex justify-between items-center">
                <a href="#" className="text-indigo-600 hover:underline">
                  Đọc thêm &rarr;
                </a>
                <div className="bg-yellow-500 text-white font-bold py-1 px-3 md:py-2 md:px-4">
                  13 THÁNG 5
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-xs sm:max-w-sm md:max-w-md shadow-lg overflow-hidden">
            <img
              src="https://wp.validthemes.net/restan/wp-content/uploads/2024/05/2-2.jpg"
              alt="Bài viết blog 2"
              className="w-full h-48 sm:h-56 object-cover"
            />
            <div className="p-4">
              <div className="text-sm text-gray-500 mb-2">
                BỞI VALIDTHEME • BURGER, ẨM THỰC
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-4">
                Ngôi nhà thụ động được lắp ráp sẵn có tính bền vững cao
              </h3>
              <div className="flex justify-between items-center">
                <a href="#" className="text-indigo-600 hover:underline">
                  Đọc thêm &rarr;
                </a>
                <div className="bg-yellow-500 text-white font-bold py-1 px-3 md:py-2 md:px-4">
                  13 THÁNG 5
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Content;
