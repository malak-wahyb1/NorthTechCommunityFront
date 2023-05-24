import React from "react";
import "swiper/swiper-bundle.min.css";
import "./eventComponent.css";
import LinkIcon from "@mui/icons-material/Link";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DateRangeIcon from "@mui/icons-material/DateRange";
const EventComponent = () => {
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
              <DateRangeIcon />
              <span>26 December 2019</span>
            </span>
            <span className="blog-slider__code">
              <LocationOnIcon />
              <span>akkar</span>
            </span>
            <span className="blog-slider__code">
              <LinkIcon />
              <span>
                https://mui.com/material-ui/material-icons/?query=address
              </span>
            </span>

            <a href="#" className="blog-slider__button">
              <StarBorderIcon />
              interested
            </a>
            <div className="speaker_wrapp">
              {" "}
              Speakers:
              <div className="speaker">
                <a>
                  <img
                    src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759872/kuldar-kalvik-799168-unsplash.webp"
                    alt=""
                  />
                 
                </a>
                <a>
                  <img
                    src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759872/kuldar-kalvik-799168-unsplash.webp"
                    alt=""
                  />
                 
                </a>
                <a>
                  <img
                    src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759872/kuldar-kalvik-799168-unsplash.webp"
                    alt=""
                  />
                 
                </a>
                <a>
                  <img
                    src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759872/kuldar-kalvik-799168-unsplash.webp"
                    alt=""
                  />
                 
                </a>
                <a>
                  <img
                    src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759872/kuldar-kalvik-799168-unsplash.webp"
                    alt=""
                  />
                 
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventComponent;
