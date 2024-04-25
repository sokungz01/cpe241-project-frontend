import UserProfilePic from "/user_profile.png";

const Navbar = () => {
  return (
    <>
      <div className="w-full bg-blue_header h-12 flex flex-row justify-between">
        <div className="flex flex-row items-center pl-6 h-full">
          <p className="text-white font-semibold text-md">Sorn Rub Som</p>
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
