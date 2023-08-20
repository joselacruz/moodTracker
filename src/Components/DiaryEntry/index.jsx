import React, { useContext } from 'react';
import { MoodContext } from '../../Context';
import './styles.css'


const DiaryEntry = ({ diaryEntry, setDiaryEntry }) => {
  const context = useContext(MoodContext);
  return (
    <div>
      <h2>Diario:</h2>
      <textarea
        value={context.diaryEntry}
        onChange={(e) => context.setDiaryEntry(e.target.value)}
        placeholder="Que te hace sentir asi"
        className='DiaryEntry'
      />
    </div>
  );
};


export default DiaryEntry;
