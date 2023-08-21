import React, { useContext, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { MoodContext } from "../../Context";
import MoodItem from "../MoodItem";
import { AiOutlineCaretDown } from "react-icons/ai";
import { AiOutlineCaretUp } from "react-icons/ai";

import "./EmotionCalendar.css";

const EmotionCalendar = () => {
  const context = useContext(MoodContext);
  //emociones a mostrar por fecha
  const [showEmotionsByDate, setShowEmotionsByDate] = useState([]);

  //calendario  movil
  const [isCalendarCollapsed, setIsCalendarCollapsed] = useState(true);

  //estado para la fecha seleccionada
  const [selectedDate, setSelectedDate] = useState(null);

  //filtrar  emociones  del array del contexto
  const filterEmotionsByDate = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    const emotionsForDate = context.savedMood.filter(
      (e) => e.date.formatedData === formattedDate
    );
    return emotionsForDate;
  };

  const handleDateClick = (date) => {
    const emotionsForDate = filterEmotionsByDate(date);
    // Actualiza el estado de la fecha seleccionada y las emociones
    setSelectedDate(date);
    setShowEmotionsByDate(emotionsForDate);

    if (window.innerWidth <= 767) {
      // Cerrar el calendario en la versión móvil al seleccionar una fecha
      setIsCalendarCollapsed(true);
    }
  };

  const customTileContent = ({ date }) => {
    const emotionsForDate = filterEmotionsByDate(date);

    //iconos en el calendarios
    if (emotionsForDate.length > 0) {
      return (
        <div className="icons-calendar-container">
          {emotionsForDate.map((emotion, index) => (
            <span key={index} className="icon-calendar">
              {emotion.icon}
            </span>
          ))}
        </div>
      );
    }

    return null;
  };

  const renderEmotiosbyClikc = () => {
    //si tenemos al menos un elemento los mostramos
    if (showEmotionsByDate.length > 0) {
      return (
        <div className="show-emotion-by-date">
          {showEmotionsByDate.map((item, index) => {
            return <MoodItem props={item} key={index} />;
          })}
        </div>
      );
    }
    //si no hay elementos para la fecha selecionada
    else if (selectedDate) {
      return <p>There are no emotions registered for this date</p>;
    }
    //si aun no seleccionamos una fecha
    else {
      return <p>Select a Date to see your recorded emotions</p>;
    }
  };

  const toggleCalendar = () => {
    setIsCalendarCollapsed(!isCalendarCollapsed);
  };

  return (
    <div
      className={`EmotionCalendar ${isCalendarCollapsed ? "collapsed" : ""}`}
    >
      <h2>Calendario de Emociones</h2>

      <button className="toggle-calendar-btn" onClick={toggleCalendar}>
        {isCalendarCollapsed ? "Show Calendar" : "Hide calendar"}
        {isCalendarCollapsed ? (
          <AiOutlineCaretDown className="toogle-icon" />
        ) : (
          <AiOutlineCaretUp className="toogle-icon" />
        )}
      </button>

      <Calendar
        onClickDay={handleDateClick}
        tileContent={customTileContent}
        className="react-calendar"
      />

      {renderEmotiosbyClikc()}
    </div>
  );
};

export default EmotionCalendar;
