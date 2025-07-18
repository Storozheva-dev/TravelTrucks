import css from "./Header.module.css";
import Navigation from "./Navigation";
import { LogoIcon } from "../../icons/index";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className={css.header}>
            <Link to ="/" className={css.link}>
                <LogoIcon className={css.logo} />
            </Link>
            <Navigation />
        </header>
    );
};

export default Header;