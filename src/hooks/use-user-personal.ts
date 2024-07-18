// hooks/use-user-personal.ts
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserByEmail } from "@/data/user";

export const useUserPersonal = () => {
  const { data: session } = useSession();
  const [personal, setPersonal] = useState<any>(null);

  useEffect(() => {
    const fetchPersonalData = async () => {
      if (session?.user?.email) {
        console.log(
          "This is the useUserPersonal hook inside the fetchPersonalData"
        );
        console.log(session.user.email);
        const user = await getUserByEmail(session.user.email);
        console.log(user); // Log the user to debug
        setPersonal(user?.personal);
      }
    };

    fetchPersonalData();
  }, [session]);

  return personal;
};
