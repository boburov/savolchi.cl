import authService from "@/app/api/service/auth.service";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
  email: string;
}

const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth/login");
        return;
      }

      try {
        const response = await authService.verifyToken(token);
        setUser(response.data);
      } catch (err) {
        console.error("Token verify error:", err);
        authService.logout();
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  return { user, loading };
};

export default useAuth;
