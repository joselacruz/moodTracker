import { createContext, useState, useContext, useEffect} from "react";
import {UserContext}  from "./userContext";
export const MoodContext = createContext();


export const MoodProvider = ({ children }) => {
  
  const contextIsUserAuth = useContext(UserContext);


  //Mood Seleccionado
  const [selectedMood, setSelectedMood] = useState({});
  //Text Area del Diary
  const [diaryEntry, setDiaryEntry] = useState("");

  //Estado para el historial de usuario 
  const [savedMood, setSavedMood] = useState([]);
  
 useEffect(()=> {

  if(contextIsUserAuth.user === true) {
    setSavedMood(contextIsUserAuth.moodHistoyUser);
  }
  
 },[contextIsUserAuth.moodHistoyUser])

  const [groupedObjects, setGroupedObjects] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date());


  const [monthToFilterChart, setMonthToFilterChart] = useState(new Date());
  const [menuMobile, setMenuMobile] = useState(false);

  return (
    <MoodContext.Provider
      value={{
        selectedMood,
        setSelectedMood,
        diaryEntry,
        setDiaryEntry,
        savedMood,
        setSavedMood,
        groupedObjects,
        setGroupedObjects,
        selectedDate,
        setSelectedDate,
        monthToFilterChart,
        setMonthToFilterChart,
        menuMobile, 
        setMenuMobile
      }}
    >
      {children}
    </MoodContext.Provider>
  );
};
