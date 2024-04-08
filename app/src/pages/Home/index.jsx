import "./styles.css";

import homeBannerImage from "../../resources/images/home_banner.png";
import homeBanner3Image from "../../resources/images/home_banner3.png";

const Home = () => {
  return (
    <main className="home">
      <section className="home_banner first">
        <div className="left_content">
          <div className="home_header">SOLVE</div>
          <h1 className="home_banner_title">
            <span className="lead">QUIZES</span>
            <span>NOW</span>
          </h1>
          <p className="home_description">
            The versatile platform for Students to Warm up there Studies with
            Joy During Exams!
          </p>
          <a className="banner_button" href="/quiz">
            Lets Do it!
          </a>
        </div>
        <div className="right_content">
          <img
            src={homeBannerImage}
            alt="home_banner"
            className="home_banner_image"
          />
        </div>
      </section>

      <div className="home_title"></div>
      <section className="home_banner second">
      
       
        <div className="right_content">
          <img
            src={homeBanner3Image}
            alt="home_banner"
            className="home_banner_image"
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
