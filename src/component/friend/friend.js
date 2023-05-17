import "./friend.css";
import DoneIcon from '@mui/icons-material/Done';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
function FriendComponent() {
  return (
    <>
      <figure class="snip1218">
        <div class="image">
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample70.jpg"
            alt="sample70"
          />

        </div>
        <figcaption>
          <h3>
            Ingredia<span> Nutrisha</span>
          </h3>
          <h5>Artist</h5>
          <div class="icons">
            <a href="#">
              <i class="ion-social-reddit-outline"><DoneIcon/></i>
            </a>
            <a href="#">
              {" "}
              <i class="ion-social-twitter-outline"><CloseOutlinedIcon/></i>
            </a>
          
          </div>
        </figcaption>
      </figure>
    </>
  );
}
export default FriendComponent;
