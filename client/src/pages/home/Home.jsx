// Components
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";

const Home = () => {
  return (
    <div className='home'>
      <div className='container'>
        <Share />
        <Posts />
      </div>
    </div>
  );
};

export default Home;
