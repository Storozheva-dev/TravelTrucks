import DatePicker, { registerLocale } from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import css from "./DatePicker.module.css";
import enGB from "date-fns/locale/en-GB";

registerLocale("en-GB", enGB); 

function BookingDatePicker({ selectedDate, onChange }) {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      placeholderText="Booking date*"
      wrapperClassName={css.inputWrapper}
      calendarClassName={css.calendar}
      dayClassName={() => css.day}
      weekDayClassName={() => css.weekday}
      popperPlacement="bottom-start"
      dateFormat="dd.MM.yyyy"
      locale="en-GB"                
      minDate={new Date()}
      shouldCloseOnSelect={false}
    />
  );
}

export default BookingDatePicker;
