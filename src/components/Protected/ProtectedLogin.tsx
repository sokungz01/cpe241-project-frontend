import { CheckToken } from "@/api/authen.api";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  successHref?: string;
  errorHref?: string;
  protect?: boolean;
};

const ProtectedLogin: React.FC<Props> = ({
  children,
  successHref = null,
  errorHref = "/login",
  protect = true,
}) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken") || "";
  
  useMemo(async () => {
    try {
      if (!token || token === "") {
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
      
      await CheckToken(token);

      setIsLogin(true);

      if (successHref !== null) return navigate(successHref);
    } catch (error) {
      localStorage.removeItem("accessToken");
      navigate(errorHref);
    }
  }, [errorHref, navigate, successHref, token]);

  if (protect && !isLogin) return null;

  return children;
};

export default ProtectedLogin;
