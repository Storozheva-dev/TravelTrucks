import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.backdrop}>
      <div className={css.dots}>
        <span className={css.dot}></span>
        <span className={css.dot}></span>
        <span className={css.dot}></span>
      </div>
    </div>
  );
};

export default Loader;
