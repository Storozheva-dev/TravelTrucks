import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = () => {
    return (
        <nav className={css.nav}>
            <ul className={css.list}>
                <li className={css.item}>
                    <NavLink to="/" className={({ isActive }) => isActive ? `${css.link} ${css.active}` : css.link}>
                        Home
                    </NavLink>
                </li>
                <li className={css.item}>
                    <NavLink to="/catalog" className={({ isActive }) => isActive ? `${css.link} ${css.active}` : css.link}>
                        Catalog
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;

