import { useContext, useState } from "react";
import "./profile.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";

// Context
import { AuthContext } from "../../context/authContext";

// Components
import Posts from "../../components/posts/Posts";
import Update from "../../components/update/Update";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  console.log(currentUser);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get(`/users/find/${userId}`).then((res) => {
      return res.data;
    })
  );

  const { data: relationshipData } = useQuery(["relationship"], () =>
    makeRequest.get(`/relationships?followedUserId=${userId}`).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  return (
    <div className='profile'>
      <div className='container'>
        <div className='container-x3'>
          <div className='coverImage'>
            {isLoading
              ? "l"
              : data.coverPic && (
                  <img
                    src={`http://localhost:5000/uploads/${data.coverPic}`}
                    alt=''
                  />
                )}
          </div>
          <div className='profileDetails'>
            <img
              src={
                isLoading
                  ? "l"
                  : `http://localhost:5000/uploads/${data.profilePic}`
              }
              alt=''
            />
            <div className='details'>
              <h1>{isLoading ? "l" : data.name}</h1>
              <div className='info'>
                <div className='item'>50 Friends</div>
                <div className='item'>15 Posts</div>
                <div className='item'>
                  {isLoading ? (
                    "l"
                  ) : userId === currentUser.id ? (
                    <button onClick={() => setOpenUpdate(true)}>Update</button>
                  ) : (
                    <button onClick={handleFollow}>
                      {relationshipData.includes(currentUser.id)
                        ? "Following"
                        : "Follow"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Posts userId={userId} />
      </div>

      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;
