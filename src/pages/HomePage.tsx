import { Button } from "antd";

const HomePage = () => {
  return (
    <>
        <div className="w-full flex flex-col justify-center items-center h-screen">
          <p className="text-xl font-bold">Home</p>
        <Button
        type="primary"
        className="bg-[#0174BE] text-white flex text-sm h-9 align-middle items-center"
        href="/employeeInfo"
        >
          Go to dashboard
        </Button>
        </div>
    </>
  );
};

export default HomePage;
