import './SuggestButtons.css';

const  SuggestButtons = ({handleClick}) => {
    return (
        <div className="SuggestButtons" onClick={handleClick}>
            <button className="suggest btn-suggest">Aceptar</button>
            <button className="suggest btn-clean">Limpiar</button>
        </div>
    )
}

export default SuggestButtons;