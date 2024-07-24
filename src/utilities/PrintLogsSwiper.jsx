import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

const PrintLogsSlider = ({ printLogs }) => {
  if (!printLogs) return null;

  return (
    <div className="slider-container py-4" style={{ backgroundColor: '#fff', width: '100%' , borderRadius:'5px'}}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {printLogs.map((log, index) => (
          <SwiperSlide key={index}>
            <div style={{ padding: '10px' }}>
              <h3>{log.labelName}</h3>
              <p><strong>Short ID:</strong> {log.shortId}</p>
              <p><strong>Printed By:</strong> {log.printLog.printedBy}</p>
              <p><strong>Number of Prints:</strong> {log.printLog.numOfPrint}</p>
              <p><strong>Print Date:</strong> {new Date(log.printLog.printDate).toLocaleString()}</p>
              <p><strong>Print Status:</strong> {log.printLog.printStatus}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PrintLogsSlider;
