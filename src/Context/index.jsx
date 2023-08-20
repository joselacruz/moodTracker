import { createContext, useState,} from "react";

export const MoodContext = createContext();

export const MoodProvider = ({ children }) => {
    const [selectedMood, setSelectedMood] = useState({});
    const [diaryEntry, setDiaryEntry] = useState("");
    
    //Saved Mood
    const [savedMood, setSavedMood] = useState([]);
   
    const [groupedObjects,setGroupedObjects] = useState([]);


    const [selectedDate, setSelectedDate] = useState(new Date());
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
        setSelectedDate

      }}
    >
      {children}
    </MoodContext.Provider>
  );

}