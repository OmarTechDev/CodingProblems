import { TitleBoardProps } from "./Interfaces"

const TitleBoard: React.FC<TitleBoardProps> = ({ rangeValueX, rangeValueY, onRangeChange }) => {

  return(
    <div className='bodyContent'>
      <label className='TitleA'>
        &nbsp;&nbsp;X:&nbsp;
      </label>
      <input
        type="range"
        className="form-range"
        min="0"
        max="5"
        id="customRangeX"
        value={rangeValueX}
        onChange={(e) => onRangeChange(e, 'X')}/>
      &nbsp;
      <h3> & Y:&nbsp;</h3>
      <input
        type="range"
        className="form-range"
        min="0"
        max="5"
        id="customRangeY"
        value={rangeValueY}
        onChange={(e) => onRangeChange(e, 'Y')}
      />&nbsp; &nbsp;
      <h3>Select the size of the Planeu({rangeValueX * 4 || 1} x {rangeValueY * 4 || 1})</h3>
    </div>
  )
}

export default TitleBoard
