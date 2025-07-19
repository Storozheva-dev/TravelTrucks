import css from './ReviewsTab.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCamperById } from '../../redux/campers/operations';
import { selectCurrentCamper, selectIsLoading } from '../../redux/campers/selectors';
import { StarFullIcon, StarEmptyIcon } from '../../icons';
import Loader from '../../components/Loader/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReviewsTab = () => {
  const dispatch = useDispatch();
  const camper = useSelector(selectCurrentCamper);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (camper?.id) dispatch(fetchCamperById(camper.id));
  }, [camper?.id, dispatch]);

  useEffect(() => {
    if (!isLoading && !camper) {
      toast.warning("Reviews not found");
    }
  }, [isLoading, camper]);


  if (isLoading) return <Loader />;
  

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) =>
      i < rating ? (
        <StarFullIcon key={i} className={css.star} />
      ) : (
        <StarEmptyIcon key={i} className={css.star} />
      )
    );

  return (
    <div className={css.reviewsTab}>
      {camper.reviews.map(({ reviewer_name, reviewer_rating, comment }, index) => (
        <div className={css.review} key={index}>
          <div className={css.aboutUser}>
            <div className={css.avatar}>{reviewer_name.charAt(0).toUpperCase()}</div>
            <div className={css.reviewerGrade}>
              <p className={css.reviewerName}>{reviewer_name}</p>
              <p className={css.grade}>{renderStars(reviewer_rating)}</p>
            </div>
          </div>
          <p className={css.reviewText}>{comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsTab;
