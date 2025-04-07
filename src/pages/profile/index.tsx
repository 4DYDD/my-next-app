import { Session } from "@/interfaces/session";
import { useSession } from "next-auth/react";
import React from "react";

function ProfilePage() {
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
