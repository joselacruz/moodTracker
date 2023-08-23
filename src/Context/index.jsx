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
  setSavedMood(contextIsUserAuth.moodHistoyUser);
 },[contextIsUserAuth.moodHistoyUser])

  const [groupedObjects, setGroupedObjects] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [monthToFilterChart, setMonthToFilterChart] = useState(new Date());

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
      }}
    >
      {children}
    </MoodContext.Provider>
  );
};
