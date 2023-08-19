import React, { useContext, useEffect, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { MoodContext } from "../../Context";
import {
  FaSmile,
  FaSadTear,
  FaMeh,
  FaAngry,
  FaGrinStars,
} from "react-icons/fa";
import "./styles.css";

const MoodVisualization = () => {
  const context = useContext(MoodContext);

  // Crear un array para almacenar objetos agrupados por date.groups
  const [groupedObjects, setGroupedObjects] = useState([]);

  useEffect(() => {
    const tempGroupedObjects = [];

    // Agrupar los objetos por date.groups
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
    });

    // tempGroupedObjects.push({
    //   groups: "3333", // Valor hardcodeado
    //   items: [
    //     // Aquí puedes agregar objetos individuales dentro del grupo
    //     // Ejemplo: { date: ..., value: ..., id: ... }
    //   ],
    // });
    setGroupedObjects(tempGroupedObjects);
  }, [context.savedMood]);

  console.log(groupedObjects, "sss");

  return (
    <div className="MoodVisualization">
      <h2>Visualización de estado de ánimo:</h2>

      {groupedObjects.map((grupos, index) => {
        const [day, mes, _] = grupos.groups.split("-");
        return (
          <div key={index} className="MoodVisualization-container">
            <h3>{`${day} de ${mes}`}</h3>
            {grupos.items.map((item, index) => {
              return (
                <div className="mood-item" key={index}>
                  <div className="mood-item-icon"> {item.icon}</div>

                  <div className="mood-value-container">
                    <p className="value-emotion">
                      <span style={{ color: `${item.icon.props.color}` }}>
                        {item.value}{" "}
                      </span>
                      <small className="value-hrs"> {item.date.hours} </small>
                    </p>
                    <span className="value-entry">{item.diaryEntry}</span>
                  </div>

                  <FaEllipsisH className="mood-edit" />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default MoodVisualization;
