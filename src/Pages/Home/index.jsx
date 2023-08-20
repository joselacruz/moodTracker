import React, { useContext, useEffect, useState } from 'react';
import MoodSelection from '../../Components/MoodSelection';
import DiaryEntry from '../../Components/DiaryEntry';
import MoodVisualization from '../../Components/MoodVisualization';
import { MoodContext } from '../../Context';
import DropdownCalendar from '../../Components/DropdownCalendar';
import { formatDate } from '../../Utils/dateUtils';
import Layout from '../../Components/Layout';
import './Home.css';

const Home = () => {
  const context = useContext(MoodContext);
  const [buttonColor, setButtonColor] = useState('');

  const [isToday, setIsToday] = useState(false);
  const [isFuture, setIsFuture] = useState(false);

  // Verificar si la fecha seleccionada en el calendario corresponde a la de hoy
  useEffect(() => {
    const currentDate = new Date();
    const formattedSelectedDate = new Date(context.selectedDate);

    // Comparar las fechas sin la hora
    const isSameDay = formattedSelectedDate.toDateString() === currentDate.toDateString();
    const isFutureDate = formattedSelectedDate > currentDate;

    setIsToday(isSameDay);
    setIsFuture(isFutureDate);
  }, [context.selectedDate]);

  // Función para manejar los mensajes
  const getMessage = () => {
    if (isToday) {
      return <h1 className='Home-title'>¿Cómo estás hoy?</h1>;
    } else if (isFuture) {
      return <h1 className='Home-title'>Recuerda vivir el presente. ¡Esa fecha es en el futuro!</h1>;
    } else {
      return <h1 className='Home-title'>¿Cómo estabas?</h1>;
    }
  };

  // Función para verificar si fue selecionada una emocion y se escribio del diario
  const areConditionsMet = () => {
    return Object.keys(context.selectedMood).length > 0 && context.diaryEntry.length >= 4;
  };

  // Si areConditionsMet se cumple establecer el color del botón
  const checkConditions = () => {
    if (areConditionsMet()) {
      setButtonColor('active'); // Cambia el color a cumplido
    } else {
      setButtonColor(''); // Restaura el color por defecto
    }
  };

  // Llamar a checkConditions cuando cambien los valores relevantes
  useEffect(() => {
    checkConditions();
  }, [context.selectedMood, context.diaryEntry]);

  // Manejar la vista de emociones guardadas
  const handleMoodsView = (event) => {
    if (areConditionsMet()) {
      // Si ya se seleccionó un MoodSelection y se escribió en diaryEntry, guardar
      context.setSavedMood([...context.savedMood, { ...context.selectedMood, date: formatDate(context.selectedDate), diaryEntry: context.diaryEntry }]);
      
      // Al guardar, reiniciar el estado de la emoción y el texto
      context.setSelectedMood({});
      context.setDiaryEntry("");
    }
  };

  return (
    <Layout>
      <div>
        {getMessage()}
        <DropdownCalendar />
        <MoodSelection />
        <DiaryEntry />
        <button 
          className={`saved-mood ${buttonColor}`}
          onClick={handleMoodsView}
        >
          Guardar
        </button>
        {context.savedMood.length > 0 && <MoodVisualization />}
      </div>
    </Layout>
  );
};

export default Home;