import React, { useContext,useEffect,useState } from 'react';
import MoodSelection from '../../Components/MoodSelection';
import DiaryEntry from '../../Components/DiaryEntry';
import MoodVisualization from '../../Components/MoodVisualization';
import './Layout.css';
import { MoodContext } from '../../Context';
import axios from 'axios';

const Screen1 = () => {
  const [buttonColor, setButtonColor] = useState('');
  const context = useContext(MoodContext);

  // Función para verificar si se cumplen las condiciones
  const areConditionsMet = () => {
    return Object.keys(context.selectedMood).length > 0 && context.diaryEntry.length >= 4;
  };

  // Función para verificar y establecer el color del botón
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

  const handleMoodsView = (event) => {
    if (areConditionsMet()) {
      //Si ya seleccionamos un MoodSelection y escribimos en diaryEntry
      //guardamos
      context.setSavedMood([...context.savedMood, { ...context.selectedMood, diaryEntry: context.diaryEntry }]);
    }
  };


  return (
    <div className='Layout'>
      <div>
        <h1>Registra tu Estado de Ánimo</h1>
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
    </div>
  );
};

export default Screen1;
