import { useSelector } from "react-redux";
function Sender(){
  const user = useSelector((state) => state.user);

return (
    <>
       <div className="app-profile-box">
            <img
              src={`https://northtechcommunitymalakwahyb.onrender.com/${user.media}`}
              alt="profile"
            />
            <p className="app-profile-box-title name">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-user"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
             {user.first_name} {user.last_name}
            </p>
            <p className="app-profile-box-title mail">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-mail"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {user.email}
            </p>
            <button className="archive-btn">
              Edit Profile
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="feather feather-archive"
                viewBox="0 0 24 24"
              >
                <defs />
                <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" />
              </svg>
            </button>
          </div>
    </>
)
}
export default Sender