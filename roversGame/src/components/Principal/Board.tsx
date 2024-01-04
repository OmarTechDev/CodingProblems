import { BoardProps } from "./Interfaces"

import land from '../../assets/marsLand.jpg'

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
        key={`Image-${i}`}
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
      <p className='liVertical'>{height - i - 1}</p>
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

export default Board
