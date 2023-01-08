import { queryGetProfile } from "../queries";
import { useRoutes } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import { useQuery } from "urql";

const ProfileHandle = () => {
    let element = useRoutes([{
        path: `/`,
        element: <ProfilePage />
    }])
    console.log("fetching profile for", id);
  const { loading, error, data } = useQuery(queryGetProfile, {
    variables: { request: { profileId: id } },
  });


  if (loading) return "Loading..";
  if (error) return `Error! ${error.message}`;

  console.log("on profile page data: ", data);
    return <ProfilePage />
}

export default ProfileHandle;