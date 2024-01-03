import { useState, ChangeEvent } from 'react';
import './Body.css'
import land from '../../assets/marsLand.jpg'

interface BoardProps {
  width: number;
  height: number;
}

const Board: React.FC<BoardProps> = ({ width, height }) => {
    const maxWidth = 700;
    const maxHeight = 500;

    const imageWidth = maxWidth / width;
    const imageHeight = maxHeight / height;

    const images = [];
    for (let i = 0; i < width * height; i++) {
      images.push(
        <>
          <img
            key={i}
            src={land}
            alt={`Image ${i + 1}`}
            style={{ width: `${imageWidth}px`, height: `${imageHeight}px`, border: '2px solid black'}}
          />
        </>
      );
    }

    return (
      <div className='Board'>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${width}, 1fr)`}}>
          {images}
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
        width={rangeValueX*4 || 1}
        height={rangeValueY*4 || 1}
      />
    </div>
  )
}

export default Body
