import { useContext, useState } from "react";
import "./comments.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

// Icons
import { AiOutlineSend } from "react-icons/ai";

// Context
import { AuthContext } from "../../context/authContext";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get(`/comments?postId=${postId}`).then((res) => {
      return res.data;
    })
  );

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div className='comments'>
      <div className='write'>
        <img src={currentUser.profilePic} alt='' />
        <input
          type='text'
          placeholder='Add a comment'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>
          <AiOutlineSend />
        </button>
      </div>

      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((comment) => (
            <div className='comment' key={comment.id}>
              <img src={comment.profilePic} alt='' />
              <div className='info'>
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <span>{moment(comment.createdAt).fromNow()}</span>
            </div>
          ))}
    </div>
  );
};

export default Comments;
