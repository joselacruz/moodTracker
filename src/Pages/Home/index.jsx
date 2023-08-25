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
import RegistrationPrompt from '../../Components/RegistrationPrompt'

import "./Home.css";

const Home = () => {
  const context = useContext(MoodContext);
  const contextIsUserAuth = useContext(UserContext);
  const [buttonColor, setButtonColor] = useState("");
  const [isClick, setIsClick] = useState(false);
  const [isToday, setIsToday] = useState(false);
  const [isFuture, setIsFuture] = useState(false);
  const [messageAnalizeSentiment, setMessageAnalizeSentiment] = useState("");
  const [spinnerLoad, setSpinnerLoad] = useState(false);
  const [messageSpinner, setMessageSpinner] = useState("");

  //muestra el titulo dependiendo de lo seleccionado en el calendario
  useEffect(() => {
    const currentDate = new Date();
    const formattedSelectedDate = new Date(context.selectedDate);

    const isSameDay =
      formattedSelectedDate.toDateString() === currentDate.toDateString();
    const isFutureDate = formattedSelectedDate > currentDate;

    setIsToday(isSameDay);
    setIsFuture(isFutureDate);
  }, [context.selectedDate]);

  //renderiza el titulo
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

  //Verifica Si se escribio y selecciono una emocion
  const areConditionsMet = () => {
    return (
      Object.keys(context.selectedMood).length > 0 &&
      context.diaryEntry.length >= 4
    );
  };
  //efectto que actualiza areConditionsMet
  useEffect(() => {
    checkConditions();
  }, [context.selectedMood, context.diaryEntry]);

  //Uso de areConditionsMet
  const checkConditions = () => {
    if (areConditionsMet()) {
      setButtonColor("active"); //boton a clase  activa
    } else {
      setButtonColor(""); //boton sin estilos
    }
  };

  const handleMoodsView = async () => {
    if (isClick || spinnerLoad) {
      return;
    }

    if (areConditionsMet()) {
      setIsClick(true);
      setSpinnerLoad(true);
      setMessageSpinner("Analyzing sentiment...");

      try {
        const sentimentResult = await analizeTextSetiment(context.diaryEntry);

        setIsClick(false);
        setSpinnerLoad(false);

        if (sentimentResult) {
          setMessageAnalizeSentiment(sentimentResult);
        }
      } catch (error) {
        console.log("Error analyzing sentiment:", error);
      }
    }
  };

  //Analiza el Texto del Diario en Openai
  const analizeTextSetiment = async (analyze) => {
    const functionUrl =
      "https://jocular-queijadas-9d022c.netlify.app/.netlify/functions/analizeText";

    const queryParams = {
      text: analyze,
    };

    try {
      const response = await axios.get(functionUrl, { params: queryParams });
      const data = response.data.choices[0].message.content;
      return data;
    } catch (error) {
      console.log("error", error);
      setMessageAnalizeSentiment("");
    }
  };

  //Ejecucion Para analizar el texto de Diario
  useEffect(() => {
    if (
      messageAnalizeSentiment &&
      context.selectedMood.value &&
      context.selectedMood.value.toLowerCase() ===
        messageAnalizeSentiment.toLowerCase()
    ) {
       setTimeout(() => {
        setSpinnerLoad(false);
        savedMoodInContextAndFirebase();
        setMessageSpinner(""); //lipiamos lo que ya este
      }, 100);
    } else {
      setTimeout(() => {
    
        const analizeSentimentText = messageAnalizeSentiment.toLowerCase();
        const regex = /^(feliz|triste|neutral|enojado|horrible)$/i;
        const isValid = regex.test(analizeSentimentText);
        if (isValid) {
          setMessageSpinner(
            `Sugerimos Cambiar tu Emocion a ${messageAnalizeSentiment}`
          );
          setSpinnerLoad(false);
          setIsClick(false);
        } else {
          setMessageSpinner(messageAnalizeSentiment);
          setSpinnerLoad(false);
          setIsClick(false);
        }
        context.setSelectedMood({}); //Borramos la seleccion del usuario
        context.setDiaryEntry(""); //Borramos el texo del usuario
        setTimeout(() => {       //temp Solucion  Debido al que Cuando se volvia a Dar click si ecogia le emocido suegerida no se ejecutaba
          setMessageAnalizeSentiment("");
        }, 2000);
      }, 1000);
    }
  }, [messageAnalizeSentiment]);

  //Guarda Nuesta Emociones en el cotexto Local
  //y en Firabase si el en usuario esta autenticado
  function savedMoodInContextAndFirebase() {
    context.setSavedMood([
      ...context.savedMood,
      {
        ...context.selectedMood,
        date: formatDate(context.selectedDate),
        diaryEntry: context.diaryEntry,
      },
    ]);

    contextIsUserAuth.user
      ? saveToFirebase(
          {
            diaryEntry: context.diaryEntry,
            value: context.selectedMood.value,
            date: formatDate(context.selectedDate),
          },
          contextIsUserAuth.userUid
        )
      : null;

    context.setSelectedMood({});
    context.setDiaryEntry("");
  }

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
            disabled={isClick || spinnerLoad}
          >
            Guardar
          </button>
          <SpinnerMessage loading={spinnerLoad} message={messageSpinner} />
        </div>
        {context.savedMood?.length > 0 && <MoodVisualization />}
      </div>
      {!contextIsUserAuth.user && <RegistrationPrompt/>}
    </Layout>
   
  );
};

export default Home;
