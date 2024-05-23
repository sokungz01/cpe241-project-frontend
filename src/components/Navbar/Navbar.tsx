import { Link } from "react-router-dom";
import UserProfilePic from "/user_profile.png";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/auth.context";
import EmployeeInfoModal from "../EmployeeInfoComponent/EmployeeInfoModal";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      <div className="w-full bg-blue_header h-12 flex flex-row justify-between">
        <div className="flex flex-row items-center pl-6 h-full">
          <Link to="/" className="text-white font-semibold text-md">
            Sorn Rub Som
          </Link>
        </div>
        <button
          onClick={() => {
            setOpenModal(true);
          }}
          className="flex flex-row justify-end items-center pr-6 text-white"
        >
          <img
            className="size-6 mx-2 rounded-full aspect-square"
            src={authContext?.authContext.imageURL || UserProfilePic}
            alt=""
          />
          <p className="font-light">
            {authContext?.authContext.name.toLocaleUpperCase()}{" "}
            {authContext?.authContext.surname
              .substring(0, 4)
              .toLocaleUpperCase()}
            .
          </p>
        </button>
      </div>
      {authContext?.authContext && (
        <EmployeeInfoModal
          data={authContext?.authContext}
          setOpen={setOpenModal}
          open={openModal}
        />
      )}
    </>
  );
};

export default Navbar;
