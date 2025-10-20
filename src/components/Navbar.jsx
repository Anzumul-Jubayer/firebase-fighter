import { Link, NavLink } from "react-router";
import logo from "../assets/img/firebase-logo.png";
import MyContainer from "./MyContainer";
import MyLink from "./MyLink";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { BounceLoader } from "react-spinners";

const Navbar = () => {
  const { user, signOutFunc, setUser,loading } = useContext(AuthContext);
   
  const handleSignout = () => {
    signOutFunc()
      .then(() => {
        setUser(null);
        toast.success("Signout successful");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  return (
    <div className="bg-slate-100f py-2 border-b border-b-slate-300 ">
      <MyContainer className="flex items-center justify-between">
        <figure>
          <img src={logo} className="w-[55px]" />
        </figure>
        <ul className="flex items-center gap-2">
          <li>
            <MyLink to={"/"}>Home</MyLink>
          </li>
          <li>
            <MyLink to={"/about-us"}>About US</MyLink>
          </li>
         {
          user &&  <li>
            <MyLink to={"/profile"}>Profile</MyLink>
          </li>
         }
        </ul>
        {loading?<BounceLoader />:user ? (
          <div className="text-center space-y-3 mt-5">
            {/* change popover-1 and --anchor-1 names. Use unique names for each dropdown */}
            {/* For TSX uncomment the commented types below */}
            <button
              className="btn"
              popoverTarget="popover-1"
              style={{ anchorName: "--anchor-1" } /* as React.CSSProperties */}
            >
               <h2 className="font-semibold text-xl">{user?.displayName}</h2>
              <img
              src={user?.photoURL || "photo"}
              alt=""
              className="h-13 w-13 rounded-full mx-auto"
            /> 
            
            </button>

            <ul
              className="dropdown menu min-w-60 rounded-box bg-base-100 shadow-sm text-center"
              popover="auto"
              id="popover-1"
              style={
                { positionAnchor: "--anchor-1" } /* as React.CSSProperties */
              }
            >
              <li>
                <p className=" text-white/80">{user?.email}</p>
              </li>
              <li>
                <button onClick={handleSignout} className="my-btn">
              Sign Out
            </button>
              </li>
            </ul>
           
           
           
           
          </div>
        ) : (
          <button className="bg-purple-500 text-white px-4 py-2 rounded-md font-semibold cursor-pointer">
            <Link to={"/signin"}>Sign in</Link>
          </button>
        )}
      </MyContainer>
    </div>
  );
};

export default Navbar;
