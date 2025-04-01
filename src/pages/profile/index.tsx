import { useSession } from "next-auth/react";
import React from "react";

function ProfilePage() {
  interface Session {
    data: {
      accessToken?: string;
      expires?: string;
      user?: {
        id?: string;
        email?: string;
        fullname?: string;
        name?: string;
        image?: string;
      };
    } | null;
    status: "loading" | "authenticated" | "unauthenticated";
  }

  const { data, status } = useSession() as Session;

  return (
    <>
      <div>
        {data ? (
          <div>
            <div className="hover:text-gray-400 transall clicked flexc">
              {`name ==> ${data?.user?.fullname}`}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default ProfilePage;
