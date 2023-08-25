import React, { useContext } from 'react';
import { MoodContext } from '../../Context';
import './DiaryEntry.css'


const DiaryEntry = () => {
  const context = useContext(MoodContext);
  return (
    <div className='DiaryEntry'>
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
