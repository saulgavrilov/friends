import { useContext, useState } from "react";
import "./post.css";
import { Link } from "react-router-dom";
import moment from "moment";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { makeRequest } from "../../axios";

// Context
import { AuthContext } from "../../context/authContext";

// Components
import Comments from "../comments/Comments";

// Icons
import { BsThreeDots, BsHeart, BsHeartFill } from "react-icons/bs";
import { TfiComment } from "react-icons/tfi";

const Post = ({ post }) => {
  const { currentUser } = useContext(AuthContext);

  const [commentOpen, setCommentOpen] = useState(false);

  const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    makeRequest.get(`/likes?postId=${post.id}`).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };

  return (
    <div className='post'>
      <div className='user'>
        <div className='userInfo'>
          <img
            src={`http://localhost:5000/uploads/${post.profilePic}`}
            alt=''
          />
          <div className='details'>
            <Link to={`/profile/${post.userId}`}>
              <span>{post.name}</span>
            </Link>
            <span>{moment(post.createdAt).fromNow()}</span>
          </div>
        </div>
        <BsThreeDots />
      </div>

      <div className='content'>
        {post.desc}
        {post.img ? (
          <img src={`http://localhost:5000/uploads/${post.img}`} alt='' />
        ) : null}
      </div>

      <div className='info'>
        <div className='item'>
          {error ? (
            "Something went wrong"
          ) : isLoading ? (
            "loading"
          ) : data.includes(currentUser.id) ? (
            <BsHeartFill style={{ fill: "red" }} onClick={handleLike} />
          ) : (
            <BsHeart onClick={handleLike} />
          )}
          <span>{isLoading ? "L" : data.length} Likes</span>
        </div>
        <div className='item' onClick={() => setCommentOpen(!commentOpen)}>
          <TfiComment />
          <span>5 Comments</span>
        </div>
      </div>
      {commentOpen && <Comments postId={post.id} />}
    </div>
  );
};

export default Post;
