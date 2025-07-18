import css from "./CatalogCard.module.css";
import { useDispatch,  } from "react-redux";
// import { toggleFavorite } from "../../redux/campers/slice";
// import { selectFavorites } from "../../redux/Campers/Selectors";
import features from "../../constants/features";
import { HeartIcon, StarFullIcon, StarEmptyIcon, MapIcon } from "../../icons";
import { Link } from "react-router-dom";

const CatalogCard = ({ camper }) => {
  const dispatch = useDispatch();
  // const favorites = useSelector(selectFavorites(camper.id));
  // const handleToggle = () => dispatch(toggleFavorite(camper.id));

  const truncate = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength).trimEnd() + '...' : text;
  };

  // пріоритетні категорії для прев'ю
  const previewKeys = ['transmission', 'engine', 'kitchen', 'AC'];
  const validFeatures = features.filter(({ key, expected }) => {
    const value = camper[key];
    if (expected) return value === expected;
    return typeof value === 'boolean' && value === true;
  });
// добиваєм 4 категорії для прев'ю
  const sortedFeatures = validFeatures
    .sort((a, b) => {
      const aIndex = previewKeys.indexOf(a.key);
      const bIndex = previewKeys.indexOf(b.key);
      return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
    })
    .slice(0, 4);

  return (
    <div className={css.card}>
      <img src={camper.gallery[0].thumb} alt={camper.name} />
      <div className={css.textContent}>
        <div className={css.firstLine}>
          <h2 className={css.name}>{camper.name}</h2>
          <div className={css.about}>
            <p className={css.price}>${camper.price.toFixed(2)}</p>
            <HeartIcon className={css.heart} />
            {/* className={favorites ? `${css.heart} ${css.active}` : css.heart} onClick={handleToggle} */}
          </div>
        </div>

        <div className={css.secondLine}>
          <StarFullIcon className={css.star} />
          <div className={css.underlineStyle}>
            <p className={css.rating}>{camper.rating}</p>
            <p>({camper.reviews.length} Reviews)</p>
          </div>
          <MapIcon className={css.map} />
          <p className={css.location}>{camper.location}</p>
        </div>

        <p className={css.description}>{truncate(camper.description, 64)}</p>

        <div className={css.categories}>
          <ul className={css.features}>
            {sortedFeatures.map(({ key, expected, label, icon: Icon }) => (
              <li className={css.item} key={`${key}-${expected ?? 'bool'}`}>
                <Icon className={css.icon} />
                {label}
              </li>
            ))}
          </ul>
        </div>

       <Link to={`/catalog/${camper.id}`} className={css.button}>
      Show More
    </Link>
      </div>
    </div>
  );
};

export default CatalogCard;
