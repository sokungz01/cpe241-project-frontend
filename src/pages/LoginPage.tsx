import LoginForm from "@/components/Login/LoginForm";
const LoginPage = () => {
  return (
  <>
  <div className="relative flex h-screen items-center justify-center bg-[url(/bg.png)] object-contain">
      <div className="w-1/4 flex flex-col items-center">
        <div className="flex flex-row items-end">
          <img src="/logo.png" alt="logo" className="size-8" />
          <h4 className="text-2xl mx-2">Sorn Rub Som</h4>
        </div>
        <h6 className="text-base text-black/[0.45] py-2">
          Machine Maintenance
        </h6>
        <hr className="w-full my-4"/>
        <LoginForm />
      </div>
    <p className="absolute bottom-4">Copyright © 2024 Sorn Rub Som | All right reserved.</p>
    </div>
    </>
    
  );
};
export default LoginPage;
