import React from "react";
import "swiper/swiper-bundle.min.css";
import DescriptionIcon from '@mui/icons-material/Description';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarBorderIcon from "@mui/icons-material/StarBorder";


const WorkspaceComponent = () => {
  return (
    <div className="blog-slider">
      <div className="blog-slider__wrp swiper-wrapper">
        <div className="blog-slider__item swiper-slide">
          <div className="blog-slider__img">
            <img
              src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759872/kuldar-kalvik-799168-unsplash.webp"
              alt=""
            />
          </div>
          <div className="blog-slider__content">
            <div className="blog-slider__title">
              <img
                src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759872/kuldar-kalvik-799168-unsplash.webp"
                alt=""
              />{" "}
              <span>Malak wahyb</span>
            </div>
            <div className="blog-slider__title">Lorem Ipsum Dolor</div>
    
            <span className="blog-slider__code">
              <LocationOnIcon />
              <span>akkar</span>
            </span>
            <span className="blog-slider__code">
              <DescriptionIcon />
              <span>
               description
              </span>
            </span>

           
           
        
          </div>
        </div>
      </div>
    </div>
  );
};
export default WorkspaceComponent;
