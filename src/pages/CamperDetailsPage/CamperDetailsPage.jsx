import css from "./CamperDetailsPage.module.css";
import BookingForm from "../../components/BookingForm/BookingForm";
import CamperDetails from "../../components/CamperDetails/CamperDetails";
import FeaturesTab from "../../components/FeaturesTab/FeaturesTab";
import ReviewsTab from "../../components/ReviewsTab/ReviewsTab";


function CamperDetailsPage() {
    const [acriveTab, setActiveTab] = useState("features");







    return (
        <div className={css.page}>
            <CamperDetails />

            <FeaturesTab />
            <ReviewsTab />

            <BookingForm />
        </div>
    )
}

export default CamperDetailsPage;