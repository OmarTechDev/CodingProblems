import { useState, ChangeEvent } from 'react';
import './Body.css'
import land from '../../assets/marsLand.jpg'
import rover from '../../assets/roversFunctional.jpg'

interface BoardProps {
  width: number;
  height: number;
}

const ComandLine: React.FC<BoardProps> = ({ width, height }) => {
  const name = 'Ax-001'
  return(
    <div className="cardA text-bg-dark mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={rover} className="img-fluid rounded-start" alt="roverRepresent"/>
        </div>
        <div className="col-md-8">
          <div className="card-bodyA">
            <h5 className="card-title">Rovers '{name}' Command Line</h5><br/>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">Initial Position:</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder={`Example: 5 5 N  ||  Max ${width - 1} , ${height - 1}`}
              /><br/>
              <label htmlFor="formGroupExampleInput" className="form-label">Comand Line Input:</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder={`Example: LMLMLMLMM`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Board: React.FC<BoardProps> = ({ width, height }) => {
  const maxWidth = 700;
  const maxHeight = 500;

  const imageWidth = maxWidth / width;
  const imageHeight = maxHeight / height;

  const images = []
  const horizontal = []
  const vertical = []
  for (let i = 0; i < width * height; i++) {
    images.push(
      <img
        key={i}
        src={land}
        alt={`Image ${i + 1}`}
        style={{ width: `${imageWidth}px`, height: `${imageHeight}px`, border: '2px solid black'}}
      />
    );
  }

  for (let i = 0; i < width; i++) {
    vertical.push(
      <p className='liHorizontal'>{i}</p>
    );
  }

  for (let i = 0; i < height; i++) {
    horizontal.push(
      <p className='liVertical'>{i}</p>
    );
  }

  return (
    <div>
      <div className='xVertical'>
        {horizontal}
      </div>
      <div className='yHorizontal'>
        {vertical}
      </div>
      <div className='Board'>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${width}, 1fr)`}}>
          {images}
        </div>
      </div>
    </div>
  );
}

interface TitleBoardProps {
  rangeValueX: number;
  rangeValueY: number;
  onRangeChange: (e: ChangeEvent<HTMLInputElement>, identifier: 'X' | 'Y') => void;
}

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

function Body() {
  const [rangeValueX, setRangeValueX] = useState(0);
  const [rangeValueY, setRangeValueY] = useState(0);

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>, identifier: 'X' | 'Y') => {
    const value = parseInt(e.target.value, 10);

    if (identifier === 'X') {
      setRangeValueX(value);
    } else if (identifier === 'Y') {
      setRangeValueY(value);
    }
  }

  return(
    <div className='MainCotainer'>
      <div className='background'></div>
      <TitleBoard
        rangeValueX={rangeValueX}
        rangeValueY={rangeValueY}
        onRangeChange={handleRangeChange}
      />
      <Board
        width={rangeValueX * 4 || 1}
        height={rangeValueY * 4 || 1}
      />
      <ComandLine
        width={rangeValueX * 4 || 1}
        height={rangeValueY * 4 || 1}
      />
    </div>
  )
}

export default Body
