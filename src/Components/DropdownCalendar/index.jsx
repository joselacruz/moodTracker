import React, { useState, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { MoodContext } from "../../Context";
import "./DropdownCalendar.css"; 

const DropdownCalendar = () => {
  const context = useContext(MoodContext);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Alternar la visibilidad del calendario
  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  // Manejar el clic en una fecha del calendario
  const handleDateClick = (date) => {
    context.setSelectedDate(date);
    toggleCalendar();
  };

  return (
    <div className="dropdown-calendar-container">
      <button className="calendar-toggle-button" onClick={toggleCalendar}>
        {context.selectedDate.toDateString()} {/* Muestra la fecha seleccionada */}
      </button>
      {isCalendarOpen && (
        <div className="calendar-dropdown">
          <Calendar
            value={context.selectedDate}
            onClickDay={handleDateClick}
            onChange={context.setSelectedDate}
          />
        </div>
      )}
    </div>
  );
};

export default DropdownCalendar;

