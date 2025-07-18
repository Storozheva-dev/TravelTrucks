import BookingDatePicker from "../DatePicker/DatePicker";
import css from "./BookingForm.module.css";
import { useState } from "react";

const BookingForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bookingDate, setBookingDate] = useState(null);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
         if (!name.trim() || !email.trim() || !bookingDate) {
      alert("Please fill in all required fields.");
      return;
        }
        const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      alert("Invalid email address.");
      return;
        }

        alert("Booking successful!");
        
        setName("");
        setEmail("");
        setBookingDate(null);
        setComment("");
        
    }
    return (
        <form className={css.form} onSubmit={handleSubmit} >
            <div className={css.formContent}>
            <h2 className={css.title}>Book your campervan now</h2>
            <p className={css.description}>Stay connected! We are always ready to help you.</p>
            <label>
                <input className={css.input} type="text" placeholder="Name*" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
                <input className={css.input} type="email" placeholder="Email*" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <BookingDatePicker selectedDate={bookingDate} onChange={setBookingDate} />
            <label>
                <textarea className={css.textarea} placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
            </label>
            </div>
            <button className={css.button}  type="submit">Send</button>

        </form>
    );
}

export default BookingForm;