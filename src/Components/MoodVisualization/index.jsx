import React, { useContext, useEffect, useState } from 'react';
import { MoodContext } from '../../Context';
import MoodItem from '../MoodItem';
import dayjs from 'dayjs'; // Importa la biblioteca dayjs
import './MoodVisualization.css';

const MoodVisualization = () => {
  const context = useContext(MoodContext);

  // Crear un array para almacenar objetos agrupados por date.groups
  const [groupedObjects, setGroupedObjects] = useState([]);

  // Verificar si la fechas Corresponde a Hoy
  const IsToday = (date) => {
    const currentDate = dayjs();
    const formattedSelectedDate = dayjs(date);

    // Comparar las fechas sin la hora
    const isSameDay = formattedSelectedDate.isSame(currentDate, 'day');

    return isSameDay;
  };

  useEffect(() => {
    const tempGroupedObjects = [];

    // Agrupar y ordenar los objetos por date.groups
    context.savedMood.forEach((item) => {
      const groups = item.date.groups;
      const existingGroup = tempGroupedObjects.find(
        (group) => group.groups === groups
      );

      if (existingGroup) {
        existingGroup.items.push(item);
      } else {
        tempGroupedObjects.push({ groups, items: [item] });
      }
    }, []);

    // Ordenar los grupos por fecha (groups) en orden descendente
    tempGroupedObjects.sort((a, b) => {
      const dateA = dayjs(a.groups);
      const dateB = dayjs(b.groups);
      return dateB - dateA; // Ordenar en orden descendente
    });

    setGroupedObjects(tempGroupedObjects);
  }, [context.savedMood]);

  return (
    <div className="MoodVisualization">
      {groupedObjects.map((grupos, index) => {
        const dayIsToday = IsToday(grupos.groups);
        const [day, mes, _] = grupos.groups.split('-');

        return (
          <div key={index} className="MoodVisualization-container">
            {/* titulo del contenedor cambia si la fecha es Hoy */}
            {dayIsToday ? (
              <h3>{`Hoy ${day} de ${mes}`}</h3>
            ) : (
              <h3>{`${day} de ${mes}`}</h3>
            )}
            {grupos.items.map((item, index) => {
              return <MoodItem props={item} key={index} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default MoodVisualization;
