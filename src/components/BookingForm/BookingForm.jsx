import BookingDatePicker from "../DatePicker/DatePicker";
import css from "./BookingForm.module.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader/Loader";

const BookingForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bookingDate, setBookingDate] = useState(null);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !bookingDate) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    if (name.trim().length < 3) {
      toast.error("Name must be at least 3 characters.");
      return;
    }

    if (/\d/.test(name)) {
      toast.error("Name should not contain numbers.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success("Booking successful!");
      setName("");
      setEmail("");
      setBookingDate(null);
      setComment("");
    }, 1500);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formContent}>
        <h2 className={css.title}>Book your campervan now</h2>
        <p className={css.description}>
          Stay connected! We are always ready to help you.
        </p>

        <label>
          <input
            className={css.input}
            type="text"
            placeholder="Name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoading}
          />
        </label>

        <label>
          <input
            className={css.input}
            type="email"
            placeholder="Email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </label>

        <BookingDatePicker
          selectedDate={bookingDate}
          onChange={setBookingDate}
          disabled={isLoading}
        />

        <label>
          <textarea
            className={css.textarea}
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isLoading}
          />
        </label>
      </div>

      <button className={css.button} type="submit" disabled={isLoading}>
        {isLoading ? <Loader /> : "Send"}
      </button>

      <ToastContainer position="top-right" autoClose={3000} />
    </form>
  );
};

export default BookingForm;
