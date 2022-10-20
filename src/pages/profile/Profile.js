import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { fetchUserByUsername } from "../../apiCalls";
import "./Profile.scss";

function Profile() {
  let { username } = useParams();
  const [user, setUser] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    fetchUserByUsername(username).then((res) => {
      setUser(res);
    });
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="right">
          <div className="rightTop">
            <img
              src={user.coverPicture || PF + "person/noCover.png"}
              alt="coverPicture"
              className="coverPicture"
            />
            <div className="coverPictureBottom">
              {user.username}
              <p>{user.desc}</p>
            </div>
            <img
              src={user.profilePicture || PF + "person/noAvatar.png"}
              alt="profilePic"
              className="profilePic"
            />
          </div>
          <div className="rightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
