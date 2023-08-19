import React, { useContext } from 'react';
import { FaSmile, FaSadTear, FaMeh, FaAngry, FaGrinStars } from 'react-icons/fa';
import './MoodSelection.css';
import { MoodContext } from '../../Context';
import  {formatDate} from '../../Utils/dateUtils';


function MoodSelection() {

 const context = useContext(MoodContext);

  const moodOptions = [
    { value: 'Feliz', icon: <FaSmile size={64} color="#FFD700" /> },
    { value: 'Triste', icon: <FaSadTear size={64} color="#6495ED" /> },
    { value: 'Neutral', icon: <FaMeh size={64} color="#A9A9A9" /> },
    { value: 'Enojado', icon: <FaAngry size={64} color="#FF6347" /> },
    { value: 'Horrible', icon: <FaSadTear size={64} color="#8B0000" /> }
  ];

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);


  return (
    <div>
      <h2>¿Como estas hoy?</h2>
      <div className="mood-icons">
        {moodOptions.map((mood) => (

          <div
            key={mood.value}
            className={`mood-icon ${context.selectedMood.value === mood.value ? 'selected' : ''}`}
            onClick={() => context.setSelectedMood({
             
              value: mood.value,
              icon: mood.icon,
              date: formattedDate,

            })}
          >
            {mood.icon}
            <p>{mood.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoodSelection;
