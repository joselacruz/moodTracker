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
import RegistrationPrompt from "../../Components/RegistrationPrompt";
import SuggestButtons from "../../Components/SuggestButtons";
import { FaSmile, FaSadTear, FaMeh, FaAngry } from "react-icons/fa";

import "./Home.css";

const icons = {
  feliz: { value: "Feliz", icon: <FaSmile size={64} color="#FFD700" /> },
  triste: { value: "Triste", icon: <FaSadTear size={64} color="#6495ED" /> },
  neutral: { value: "Neutral", icon: <FaMeh size={64} color="#A9A9A9" /> },
  enojado: { value: "Enojado", icon: <FaAngry size={64} color="#FF6347" /> },
  horrible: {
    value: "Horrible",
    icon: <FaSadTear size={64} color="#8B0000" />,
  },
};

const Home = () => {
  const context = useContext(MoodContext);
  const contextIsUserAuth = useContext(UserContext);
  //clase para el boton
  const [buttonColor, setButtonColor] = useState("");
  const [isClick, setIsClick] = useState(false);
  const [isToday, setIsToday] = useState(false);
  const [isFuture, setIsFuture] = useState(false);
  const [messageAnalizeSentiment, setMessageAnalizeSentiment] = useState("");
  const [spinnerLoad, setSpinnerLoad] = useState(false);
  const [messageSpinner, setMessageSpinner] = useState("");
  //estado para desplegar Botones del sugerencia del analisis de sentimiento
  const [displaySuggestButtons, setDisplaySuggestButtons] = useState(false);
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
  //Activame el boton principal pero prime escucha  se areConditionsMet se cumple
  //se encribio y selecciono una emocion
  const handleMoodsView = async () => {
    if (areConditionsMet()) {
      setIsClick(true); //descativamos boton
      setSpinnerLoad(true); //activamos Spiner
      analizeTextSetiment(context.diaryEntry); //Llamado Funcion analizar sentimiento
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
      const sentimentResult =
        response.data.choices[0].message.content.toLowerCase(); // Repuesta del sentimiento analizado

      const sentimientSelect = context.selectedMood.value.toLowerCase(); //Sentimiento usuario
      //si el analisis de sentimiento es igual al seleccionado
      if (sentimentResult === sentimientSelect) {
        savedMoodInContextAndFirebase(context.selectedMood); //Ok guardamos los datos tal Cual
        setIsClick(false); //activamos el boton
        setSpinnerLoad(false); //desactivamos  Spiner
      }
      //de lo contrario
      else {
        //Regex para identificar si el analisis de sentimiento tiene una Sola Palabra example "feliz"
        const regex = /^(feliz|triste|neutral|enojado|horrible)$/i;
        const isValid = regex.test(sentimentResult);
        //si  es cierto  Sugerimos si Desea Cambiar su Seleccion
        if (isValid) {
          //sentimiento Almacenado en el estado
          setMessageAnalizeSentiment(sentimentResult);
          setMessageSpinner(
            `Sugerimos Cambiar tu Emocion a ${sentimentResult}`
          );
          //mostramos Botones De sugerencia Usamos un Estado Para Activarlos
          setDisplaySuggestButtons(true);
        }
        //si la respuesta de la api no da ninguna segerencia  mostramos el mensaje
        else {
          setMessageSpinner(
            `Sugerimos Cambiar tu Emocion a ${sentimentResult}`
          );

          // activamos el boton principal siempre y cuando existan cambios en la seleccion o el Diario
          if (context.selectedMood || context.diaryEntry) {
            setIsClick(false);
          }
        }
      }

      setSpinnerLoad(false); //desactivacion del espiner
    } catch (error) {
      setSpinnerLoad(false); //desactiva el spinner
      // La api de Openai Fallo hagamoslo Saber al usuario
      setMessageSpinner("No podemos Analizar tus Sentimientos en Este Momento");

      setTimeout(() => {
        setMessageSpinner(""); //limpia el mensaje al usuario
        setIsClick(false); //activa el boton
        savedMoodInContextAndFirebase(context.selectedMood); //Ok igual guardamos los datos tal Cual
      }, 5000);
      console.log("error", error);
    }
  };

  //Guarda las Emociones que estan en el contexto Local
  //y en Firabase si el en usuario esta autenticado
  //Guarda la emocion del contexto o la sugerida
  function savedMoodInContextAndFirebase(moodSuggestOrContext) {

    context.setSavedMood([
      ...context.savedMood,
      {
        // ...context.selectedMood, type
        ...moodSuggestOrContext,
        date: formatDate(context.selectedDate),
        diaryEntry: context.diaryEntry,
      },
    ]);

    contextIsUserAuth.user
      ? saveToFirebase(
          {
            diaryEntry: context.diaryEntry,
            value: moodSuggestOrContext.value,
            date: formatDate(context.selectedDate),
          },
          contextIsUserAuth.userUid
        )
      : null;

    context.setSelectedMood({});
    context.setDiaryEntry("");
  }

  //Acepta la sugerencia de Openai o No
  function handleSuggestion(event) {
    //tipo de  boton
    const type = event.target.className;
    
    //si acepta la sugerencia
    if (type === "suggest btn-suggest") {
      console.log(type)
      const newSentimient = selectButtonBykey(messageAnalizeSentiment);
      setMessageSpinner(""); //limpiamos el mensaje mostrado al usario
      console.log(newSentimient);

      //Nueva Emocion a Guardar icono y value
      //Guardamos los los Datos aplicando la sugerencia
      savedMoodInContextAndFirebase(newSentimient);
      //cerramos los botones de la sugerencias
      setDisplaySuggestButtons(false);

      //permitimos nuevamente el boton pricipal para guardar emociones
      setIsClick(false);
    } else if (type === "suggest btn-clean") {
      setMessageSpinner(""); //limpiamos el mensaje mostrado al usario
      setMessageAnalizeSentiment(""); //limpiamos el estado de almacenamiento Seleccionado
      context.setSelectedMood({}); //Borramos la seleccion del usuario
      context.setDiaryEntry(""); //Borramos el texo del usuario
      setDisplaySuggestButtons(false);
      //permitimos nuevamente el boton pricipal para guardar emociones
      setIsClick(false);
    }
  }

  // Nueva Emocion a Guardar
  function selectButtonBykey(key) {
    let typeIcon;
    switch (key) {
      case "feliz":
        typeIcon = icons.feliz;
        break;
      case "triste":
        typeIcon = icons.triste;
        break;
      case "neutral":
        typeIcon = icons.neutral;
        break;
      case "enojado":
        typeIcon = icons.enojado;
        break;
      case "horrible":
        typeIcon = icons.horrible;
        break;
    }
    return typeIcon;
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
          {displaySuggestButtons && (
            <SuggestButtons handleClick={handleSuggestion} />
          )}
        </div>
        {context.savedMood?.length > 0 && <MoodVisualization />}
      </div>
      {!contextIsUserAuth.user && <RegistrationPrompt />}
    </Layout>
  );
};

export default Home;
