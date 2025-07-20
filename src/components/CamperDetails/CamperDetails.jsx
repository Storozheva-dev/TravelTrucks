import css from "./CamperDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCamperById } from "../../redux/campers/operations";
import {
  selectCurrentCamper,
  selectIsLoading,
} from "../../redux/campers/selectors";
import { useEffect } from "react";
import { MapIcon, StarFullIcon } from "../../icons";
import ImageModal from "../ImageModal/ImageModal";
import { useState } from "react";

const CamperDetails = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  const dispatch = useDispatch();
  const { id } = useParams();
  const camper = useSelector(selectCurrentCamper);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (id) dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  if (isLoading) return <p>Loading...</p>;
  if (!camper) return <p>Camper not found</p>;

  return (
    <div className={css.component}>
      <h2 className={css.title}>{camper.name}</h2>
      <div className={css.infoCamper}>
        <p className={css.rating}>
          <StarFullIcon className={css.star} />
          {camper.rating}({camper.reviews.length} Reviews)
        </p>
        <MapIcon className={css.map} />
        <p className={css.location}>{camper.location}</p>
      </div>
      <p className={css.price}>${camper.price.toFixed(2)}</p>
      <div className={css.imgGallery}>
        {camper.gallery.map((image, index) => (
          <img
            key={index}
            src={image.thumb}
            alt={`${camper.name} - image ${index + 1}`}
            className={css.img}
            onClick={() => setSelectedImg(image.original)}
            style={{ cursor: "pointer" }}
          />
        ))}
        {selectedImg && (
          <ImageModal src={selectedImg} onClose={() => setSelectedImg(null)} />
        )}
      </div>
      <p className={css.description}>{camper.description}</p>
    </div>
  );
};

export default CamperDetails;
