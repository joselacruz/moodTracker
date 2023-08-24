import React, { useContext, useEffect, useState } from "react";
import MoodSelection from "../../Components/MoodSelection";
import DiaryEntry from "../../Components/DiaryEntry";
import MoodVisualization from "../../Components/MoodVisualization";
import { MoodContext } from "../../Context";
import { UserContext } from "../../Context/userContext";
import DropdownCalendar from "../../Components/DropdownCalendar";
import { formatDate } from "../../Utils/dateUtils";
import Layout from "../../Components/Layout";
import { saveToFirebase } from "../../Utils/firebase";
import SpinnerMessage from "../../Components/SpinnerMessage";
import axios from "axios";

import "./Home.css";

const Home = () => {
  const context = useContext(MoodContext);
  const contextIsUserAuth = useContext(UserContext);
  const [buttonColor, setButtonColor] = useState("");
  //Mostrar el loader y desactivar el buttton
  const [isClick, setIsClick] = useState(false);
  const [isToday, setIsToday] = useState(false);
  const [isFuture, setIsFuture] = useState(false);

  //Almcenar el analisis del sentimiento on chat gpt response
  const [messageAnalizeSentiment, setMessageAnalizeSentiment] = useState("");
  //Estado para Determinar si mostrar el spinner despues del Click
  const [spinnerLoad, setSpinnerLoad] = useState(false);
  //Muestra el Message Al usuario del resultado del analisis de sentimiento
  const [messageSpinner, setMessageSpiner] = useState("");

  // Verificar si la fecha seleccionada en el calendario corresponde a la de hoy
  useEffect(() => {
    const currentDate = new Date();
    const formattedSelectedDate = new Date(context.selectedDate);

    // Comparar las fechas sin la hora
    const isSameDay =
      formattedSelectedDate.toDateString() === currentDate.toDateString();
    const isFutureDate = formattedSelectedDate > currentDate;

    setIsToday(isSameDay);
    setIsFuture(isFutureDate);
  }, [context.selectedDate]);

  // Función para El Titulo Depenediendo de la fecha seleccionanda
  const getMessage = () => {
    if (isToday) {
      return <h1 className="Home-title">¿Cómo estás hoy?</h1>;
    } else if (isFuture) {
      return (
        <h1 className="Home-title">
          Recuerda vivir el presente. ¡Esa fecha es en el futuro!
        </h1>
      );
    } else {
      return <h1 className="Home-title">¿Cómo estabas?</h1>;
    }
  };

  // Función areConditionsMet para verificar si fue selecionada una emocion y se escribio del diario
  const areConditionsMet = () => {
    return (
      Object.keys(context.selectedMood).length > 0 &&
      context.diaryEntry.length >= 4
    );
  };

  // Si areConditionsMet se cumple establecer el color del botón
  const checkConditions = () => {
    if (areConditionsMet()) {
      setButtonColor("active"); // Cambia el color a cumplido
    } else {
      setButtonColor(""); // Restaura el color por defecto
    }
  };

  // Llamar a checkConditions cuando cambien los valores relevantes
  useEffect(() => {
    checkConditions();
  }, [context.selectedMood, context.diaryEntry]);

  const handleMoodsView = async (event) => {
    // verifica que el usuario Escribio y seleccion una Emocion
    if (areConditionsMet()) {
      // Si ya se seleccionó un MoodSelection y se escribió en diaryEntry, guardar
      setIsClick(true); //desactivamos el boton
      setSpinnerLoad(true); //activamos el spinner
      setIsClick(false);
      analizeTextSetiment(context.diaryEntry);
    }
  };

  //Analiza el texto del diario con Openai
  //su valor es guardado en setMessageAnalizeSentiment
  //recibe El texto a Analizar
  const analizeTextSetiment = async (analyze) => {
    const functionUrl =
      "https://jocular-queijadas-9d022c.netlify.app/.netlify/functions/analizeText";

    const queryParams = {
      text: analyze,
    };

    try {
      const response = await axios.get(functionUrl, { params: queryParams });
      const data = response.data.choices[0].message.content;
      return setMessageAnalizeSentiment(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  //Guardar emociones  en en contexto Local Asi como Tambie en Firebase
  function savedMoodInContextAndFirebase() {
    context.setSavedMood([
      ...context.savedMood,
      {
        ...context.selectedMood,
        date: formatDate(context.selectedDate),
        diaryEntry: context.diaryEntry,
      },
    ]);
    //Guardar Datos en Firebase Siempre que El usuario este auntenticado
    contextIsUserAuth.user
      ? saveToFirebase(
          {
            diaryEntry: context.diaryEntry,
            value: context.selectedMood.value,
            date: formatDate(context.selectedDate),
          },
          contextIsUserAuth.userUid
        ) //id Unico de la coleccion user.uid
      : null;

    // Al guardar, reiniciar el estado de la emoción y el texto
    context.setSelectedMood({});
    context.setDiaryEntry("");
  }

  //cada vez que messageAnalizeSentiment
  useEffect(() => {
    //compramos si el sentimiento es de acuerdo con lo que escibio el usuario
    //si es es asi guardamos si no No
    if (
      messageAnalizeSentiment &&
      context.selectedMood.value &&
      context.selectedMood.value.toLowerCase() ===
        messageAnalizeSentiment.toLowerCase()
    ) {
      setTimeout(() => {
        console.log("true");
        setSpinnerLoad(false); //activamos el boton
        savedMoodInContextAndFirebase();
        setMessageSpiner("");
      }, 1000);
    } else {
      setTimeout(() => {
        setSpinnerLoad(false); //activamos el boton
        setMessageSpiner(messageAnalizeSentiment);
      }, 1000);
    }
  }, [messageAnalizeSentiment]);

  return (
    <Layout>
      <div className="Home">
        <div>
          {getMessage()}
          <DropdownCalendar />
          <MoodSelection />
          <DiaryEntry />
          <button
            className={`saved-mood ${buttonColor}`}
            onClick={handleMoodsView}
            disabled={isClick}
          >
            Guardar
          </button>
          <SpinnerMessage loading={spinnerLoad} message={messageSpinner} />
        </div>
        {context.savedMood?.length > 0 && <MoodVisualization />}
      </div>
    </Layout>
  );
};

export default Home;
