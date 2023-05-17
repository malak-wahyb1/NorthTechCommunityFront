import "./eventComponent.css";

function EventComponent() {
  return (
 <>
 <div class="component">
        <div class="component__background">
            <div class="card">
                <div class="top">
                    <h4 class="event-date">Wed, May 25, 2022 ・8:00 GMT</h4>
                    <h2 class="event-name">Hitchhiker's <span>Towel Day</span></h2>
                    <h3 class="event-location">London</h3>
                </div>
                <div class="bottom">
                    <div class="attendees-detail">
                        <img src="./attendee-1.svg" alt="Attendee 1"/>
                        <img src="./attendee-2.svg" alt="Attendee 2"/>
                        <img src="./attendee-3.svg" alt="Attendee 3"/>
                        <p class="count">+1,3k</p>
                    </div>
                    <button class="btn btn-attend">I'm Attending</button>
                </div>

            </div>
        </div>
    </div>
 </>
  );
}
export default EventComponent;
