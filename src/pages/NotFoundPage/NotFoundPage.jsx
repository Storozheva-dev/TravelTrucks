import css from "./NotFoundPage.module.css";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className={css.container}>
      <img
        src="/404.png"
        alt="404 error"
        width="400"
        height="400"
        className={css.image}
      />
      <h2 className={css.title}>404 — You’ve gone off the road!</h2>
      <p className={css.description}>
        Looks like you took a wrong turn in the woods. Time to get back on
        track!
      </p>
      <Link to="/" className={css.homeButton}>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
