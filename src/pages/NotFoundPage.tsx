import { useNavigate } from "react-router-dom";


const NotFoundPage = () => {
  const navigate = useNavigate()

  const handleClick = () =>{
    navigate('tools')
  }
  
  return (
    <div className="flex w-full h-screen">
      <div className="m-auto">
        <p className="text-xl font-bold my-4">404 Not found</p>
        <div className="flex justify-center">
          <button onClick={handleClick} className="px-3 py-2 bg-slate-200 rounded-lg">
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
