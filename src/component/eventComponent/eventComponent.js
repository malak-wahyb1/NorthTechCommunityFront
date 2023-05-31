import React from "react";
import "swiper/swiper-bundle.min.css";
import "./eventComponent.css";
import LinkIcon from "@mui/icons-material/Link";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link } from "react-router-dom";
import DeleteComponent from "../editpost";

const EventComponent = (props) => {
  console.log(props)
 if(props.event){
  return (
    <div className="blog-slider">
      <div className="blog-slider__wrp swiper-wrapper">
        <div className="blog-slider__item swiper-slide">
          <div className="blog-slider__img">
            <img
              src={`https://northtechcommunitymalakwahyb.onrender.com/${props.event.media}`}
              alt=""
            />
          </div>
          <div className="blog-slider__content">
            <div className="blog-slider__title">
              <img
                src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759872/kuldar-kalvik-799168-unsplash.webp"
                alt=""
              />{" "}
              <span>{props.event.posted.first_name} {props.event.posted.last_name}</span>
            </div>
            <div className="blog-slider__title">{props.event.event_name} <DeleteComponent url="event" Id={props.event._id} title="event"/></div>
            <span className="blog-slider__code">
              <DateRangeIcon />
              <span>{props.event.date.split('T')[0]}</span>
            </span>
            <span className="blog-slider__code">
              <AccessTimeIcon />
              <span>{props.event.date.split('T')[0]}</span>
            </span>
            <span className="blog-slider__code">
              <LocationOnIcon />
              <span>{props.event.address}</span>
            </span>
            {props.event.event_links?( <span className="blog-slider__code">
              <LinkIcon />
              <span>
              {props.event.event_links}
              </span>
            </span>):null}
           

            <Link href="#" className="blog-slider__button">
              <StarBorderIcon />
              interested
            </Link>
            <div className="speaker_wrapp">
              {" "}
              Speakers:
              <div className="speaker">
                <Link>
                  <img
                    src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759872/kuldar-kalvik-799168-unsplash.webp"
                    alt=""
                  />
                 
                </Link>
                <Link>
                  <img
                    src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759872/kuldar-kalvik-799168-unsplash.webp"
                    alt=""
                  />
                 
                </Link>
                <Link>
                  <img
                    src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759872/kuldar-kalvik-799168-unsplash.webp"
                    alt=""
                  />
                 
                </Link>
                <Link>
                  <img
                    src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759872/kuldar-kalvik-799168-unsplash.webp"
                    alt=""
                  />
                 
                </Link>
                <Link>
                  <img
                    src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759872/kuldar-kalvik-799168-unsplash.webp"
                    alt=""
                  />
                 
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};}
export default EventComponent;
