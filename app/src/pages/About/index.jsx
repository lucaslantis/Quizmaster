import "./styles.css";

const About = () => {
  return (
    <section className="about">
      <h2>About QuizMaster</h2>
      <p>
        QuizMaster is an interactive quiz platform that allows users to test
        their knowledge in various subjects. Whether youre interested in
        science, history, or pop culture, QuizMaster has quizzes for everyone.
      </p>

      <h2>Our Mission</h2>
      <p>
        Our mission is to make learning fun and engaging by providing a platform
        where users can challenge themselves, compete with others, and expand
        their knowledge in a variety of topics.
      </p>

      <h2>Created by</h2>
      <div className="social">
        <a
          href="https://www.instagram.com/quan.tran.739/"
          target="_blank"
          className="instagram"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://www.facebook.com/quan.tran.739/"
          target="_blank"
          className="facebook"
        >
          <i className="fab fa-facebook-f"></i>
        </a>
       
      </div>
    </section>
  );
};

export default About;
