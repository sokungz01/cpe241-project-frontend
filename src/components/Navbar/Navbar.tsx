import UserProfilePic from "/user_profile.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="w-full bg-blue_header h-12 flex flex-row justify-between">
        <div className="flex flex-row items-center pl-6 h-full">
          <Link to='/' className="text-white font-semibold text-md">Sorn Rub Som</Link>
        </div>
        <div className="flex flex-row justify-end items-center pr-6 text-white">
            <img className="size-6 mx-2" src={UserProfilePic} alt="" />
            <p className="font-light">Sorrawit Udom.</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
