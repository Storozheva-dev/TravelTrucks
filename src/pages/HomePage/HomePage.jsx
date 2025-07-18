import css from "./HomePage.module.css";
import { Link } from "react-router-dom";


function HomePages() {
    return (
        <div className={css.homeSection}>
            <div className={css.banner}></div>
            <div className={css.content}>
                <h1 className={css.title}>Campers of your dreams</h1>
                <p className={css.description}>You can find everything you want in our catalog</p>
                <Link to="/catalog">
                <button className={css.button}>View Now</button>
                </Link>
            </div>

        </div>
        
        
    )
}

export default HomePages;