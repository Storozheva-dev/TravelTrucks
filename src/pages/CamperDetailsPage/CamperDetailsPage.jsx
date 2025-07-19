import css from "./CamperDetailsPage.module.css";
import BookingForm from "../../components/BookingForm/BookingForm";
import CamperDetails from "../../components/CamperDetails/CamperDetails";
import FeaturesTab from "../../components/FeaturesTab/FeaturesTab";
import ReviewsTab from "../../components/ReviewsTab/ReviewsTab";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

function CamperDetailsPage() {
  const { id } = useParams();
  const currentTab = window.location.hash.replace("#", "") || "features";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, location.hash]);

  return (
    <div className={css.page}>
      <CamperDetails />
      <div className={css.TABSBtn}>
        <Link
          to={`/catalog/${id}#features`}
          className={`${css.tabButton} ${
            currentTab === "features" ? css.active : ""
          }`}
        >
          Features
        </Link>
        <Link
          to={`/catalog/${id}#reviews`}
          className={`${css.tabButton} ${
            currentTab === "reviews" ? css.active : ""
          }`}
        >
          Reviews
        </Link>
      </div>
      <div className={css.bottomContent}>
        <div className={css.leftBottomContent}>
          <div className={css.TabsContent}>
            {currentTab === "features" && <FeaturesTab />}
            {currentTab === "reviews" && <ReviewsTab />}
          </div>
        </div>
        <BookingForm />
      </div>
    </div>
  );
}

export default CamperDetailsPage;
