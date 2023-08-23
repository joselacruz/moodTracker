import { FaEllipsisH } from "react-icons/fa";
import './style.css'

const MoodItem = ({props})  => {
return(
    <div className="mood-item">
    <div className="mood-item-icon"> {props?.icon}</div>

    <div className="mood-value-container">
      <p className="value-emotion">
        <span style={{ color: `${props?.icon?.props?.color}` }}>
          {props?.value}{" "}
        </span>
        <small className="value-hrs"> {props?.date?.hours} </small>
      </p>
      <span className="value-entry">{props?.diaryEntry}</span>
    </div>

    <FaEllipsisH className="mood-edit" />
  </div>
)
}

export default MoodItem