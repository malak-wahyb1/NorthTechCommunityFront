import React from "react";
import "swiper/swiper-bundle.min.css";
import "./eventComponent.css";
import LinkIcon from "@mui/icons-material/Link";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import DeleteComponent from "../editpost";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";


const EventComponent = (props) => {
  const user = useSelector((state) => state.user);

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const role = parseInt(user.role);
    if (role === 0 || role === 1) {
      setIsAdmin(true);
    }
  }, [user]);
 if(props.event){
  return (
    <div className="blog-slider">
      <div className="blog-slider__wrp swiper-wrapper">
        <div className="blog-slider__item swiper-slide">
          <div className="blog-slider__img">
            <img
              src={props.event.media}
              alt=""
            />
          </div>
          <div className="blog-slider__content">
            <div className="blog-slider__title">
              <img
                src={props.event.posted.media}
                alt=""
              />{" "}
              <span>{props.event.posted.first_name} {props.event.posted.last_name}</span>
            </div>
            <div className="blog-slider__title">{props.event.event_name} 
            {isAdmin?(<DeleteComponent url="event" Id={props.event._id} title="event"/>):null}

            </div>
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
             <a href={props.event.event_links}>{props.event.event_links}</a> 
              </span>
            </span>):null}
           

         
          </div>
        </div>
      </div>
    </div>
  );
};}
export default EventComponent;
