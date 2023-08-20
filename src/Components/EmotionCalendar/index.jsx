import React, { useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { MoodContext } from "../../Context";
import "./styles.css";

const EmotionCalendar = () => {
  const context = useContext(MoodContext);



  const filterEmotionsByDate = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    const emotionsForDate = context.savedMood.filter((e) => e.date.formatedData === formattedDate);
    console.log(emotionsForDate, "dele");
    return emotionsForDate;
  }

  const handleDateClick = (date) => {
    const emotionsForDate = filterEmotionsByDate(date);
    console.log(emotionsForDate, "origin");
  };

  const customTileContent = ({ date }) => {
    const formattedDate = date.toISOString().split("T")[0];
    const emotionsForDate = filterEmotionsByDate(date);

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

  return (
    <div>
      <h2>Calendario de Emociones</h2>
      <Calendar onClickDay={handleDateClick} tileContent={customTileContent} />
    </div>
  );
};

export default EmotionCalendar;
