import css from "./CamperDetailsPage.module.css";
import BookingForm from "../../components/BookingForm/BookingForm";
import CamperDetails from "../../components/CamperDetails/CamperDetails";
import FeaturesTab from "../../components/FeaturesTab/FeaturesTab";
import ReviewsTab from "../../components/ReviewsTab/ReviewsTab";
import { useState } from "react";


function CamperDetailsPage() {
    const [activeTab, setActiveTab] = useState("features");

    return (
        <div className={css.page}>
            <CamperDetails />
             <div className={css.TABSBtn}>
                <button type="button" className={`${css.tabButton} ${activeTab === "features" ? css.active : ""}`}
                 onClick={() => setActiveTab("features")}>Features</button>

                <button type="button" className={`${css.tabButton} ${activeTab === "reviews" ? css.active : ""}`}
                 onClick={() => setActiveTab("reviews")} >Reviews</button>
              </div>
            <div className={css.bottomContent}>
                
                <div className={css.leftBottomContent}>
           
            <div className={css.TabsContent}>
                {activeTab === "features" && <FeaturesTab />}
                {activeTab === "reviews" && <ReviewsTab />}             
                </div>
                </div>
            <BookingForm />
            </div>
        </div>
    )
}

export default CamperDetailsPage;