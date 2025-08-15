import React from 'react';
import { Carousel } from 'antd';


const SwiperComponent: React.FC = ({ children }) => (
  <>
    <Carousel arrows infinite={false}>
      {children}
    </Carousel>
  </>
);

export default SwiperComponent;