import { useEffect, useState } from "react";
import "../css/BookingForm-3.css";
import { getTimeOpens, bookingTable } from "../api";
import axios from "axios";

function BookingForm3() {
  const [timeOpens, setTimeOpens] = useState([]);
  const [phone, setPhone] = useState("");
  const [person, setPerson] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Kiểm tra dữ liệu
    if (!phone || !time || !date || !person) {
      setErrorMessage("Các trường dữ liệu không được để trống");
      return;
    }

    const data = {
      phone,
      numberOfGuests: person,
      reservationDate: date,
      timeSlot: time,
    };
    console.log(data);

    try {
      // Gửi yêu cầu đến API để đặt bàn
      const response = await bookingTable(data);
      console.log(response);
      // Kiểm tra phản hồi từ API
      if (response) {
        console.log("Đặt bàn thành công:", response.data);
        alert("Đặt bàn thành công");
        // Reset form
        setPhone("");
        setPerson("");
        setDate("");
        setTime("");
        setErrorMessage("");
      }
    } catch (error) {
      // Xử lý lỗi từ API
      if (error.response) {
        setErrorMessage(
          error.response.data.message || "Có lỗi xảy ra. Vui lòng thử lại."
        );
      } else {
        setErrorMessage("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      let res = await getTimeOpens();
      setTimeOpens(res?.timeOpens);
    };
    fetchData();
  }, []);
  return (
    <div className='bgr-booking3'>
      <div className='booking-container container-vphu'>
        <div className='hours-section'>
          <h2 className='hours-title'>Giờ Mở Cửa</h2>
          <ul className='hours-list'>
            {timeOpens?.length > 0 &&
              timeOpens.map((item) => {
                return (
                  <li key={item._id} className='hours-item'>
                    <span className='day'>{item?.dayName}:</span>
                    <span className='time'>
                      {item?.startTime} - {item?.endTime}
                    </span>
                  </li>
                );
              })}
          </ul>
          <div className='bgr-booking-2'>
            <div className='animation-background'></div>
          </div>
        </div>
        <div className='booking-anchor-point'>
          <div className='wrapper-booking'>
            <div className='booking-section'>
              {errorMessage && <p className='error'>{errorMessage}</p>}
              <form onSubmit={handleSubmit} className='booking-form'>
                <div className='form-group'>
                  <label htmlFor='phone' className='label-booking'>
                    Số Điện Thoại
                  </label>
                  <input
                    type='text'
                    id='phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className='input-booking'
                    placeholder='+4733378901'
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='person' className='label-booking'>
                    Số Người
                  </label>
                  <select
                    id='person'
                    value={person}
                    onChange={(e) => setPerson(e.target.value)}
                    className='select-booking'>
                    <option value='1'>1 Người</option>
                    <option value='2'>2 Người</option>
                    <option value='3'>3 Người</option>
                    <option value='4'>4 Người</option>
                    <option value='5'>5 Người</option>
                    <option value='6'>6 Người</option>
                    <option value='7'>7 Người</option>
                    <option value='8'>8 Người</option>
                    <option value='9'>9 Người</option>
                    <option value='10'>10 Người</option>
                    <option value='Larger Quantity'>Số Lượng Lớn Hơn</option>
                  </select>
                </div>

                <div className='form-group'>
                  <label htmlFor='date' className='label-booking'>
                    Ngày
                  </label>
                  <input
                    type='date'
                    id='date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className='input-booking'
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='time' className='label-booking'>
                    Giờ
                  </label>
                  <input
                    type='time'
                    id='time'
                    onChange={(e) => setTime(e.target.value)}
                    className='input-booking'
                    value={time}
                  />
                </div>

                <button type='submit' className='button-booking'>
                  Đặt Bàn
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingForm3;
