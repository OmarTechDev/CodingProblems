import { useState, ChangeEvent, useEffect } from 'react';
import './Body.css'
import land from '../../assets/marsLand.jpg'
import rover from '../../assets/roversFunctional.jpg'

interface RoversProps {
  width: number;
  height: number;
  numberRovers: string[]
  routeRovers: string[]
}

const RoversPositions: React.FC<RoversProps> = ({width, height, numberRovers, routeRovers}) => {
  const [rotation, setRotation] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [positionX, setPositionX] = useState(0);

  const roversWidth = 700 / width / 2
  const roversHeigth = 500 / height / 2

  const borderX = 78 + roversWidth/2
  const borderY = 120 + 500 - ((3/2) * roversHeigth)

  const toExplore: string[] = numberRovers.filter((element) => !element.endsWith('H'))
  const routesToExplore: string[] = numberRovers.reduce((result, element, index)=> {
    if(!element.endsWith('H')){
      result.push(routeRovers[index])
    }
    return result
  }, [] as string[])

  const handleRotationInitial = (e:number) => {
    setRotation(e)
  }

  const handleXInitial = () => {
    setPositionX(borderX + 2 * roversWidth * (parseInt(toExplore[0][0])))
  }

  const handleYInitial = async () => {
    setPositionY(borderY - 2 * roversHeigth * (parseInt(toExplore[0][2])))
  }

  const handleRotationRigth = () => {
    setRotation((prevRotacion) => prevRotacion + 90)
  }

  const handleRotationLeft = () => {
    setRotation((prevRotacion) => prevRotacion - 90)
  }

  const handleUp = () => {
    if(positionY > (120 + roversHeigth/2)) {
      setPositionY((prevpositionY) => prevpositionY - 2 * roversHeigth)
    }
    else {
      setPositionY(120 + roversHeigth/2)
    }
  }

  const handleDown = () => {
    if(positionY < borderY){
      setPositionY((prevpositionY) => prevpositionY + 2 * roversHeigth)
    }
    else {
      setPositionY(borderY)
    }
  }

  const handleRigth = () => {
    if(positionX < (700 + 78 - roversWidth)) {
      setPositionX((prevpositionX) => prevpositionX + 2 * roversWidth)
    }
    else {
      setPositionX(700 + 78 - roversWidth)
    }
  }

  const handleLeft = () => {
    if (positionX > borderX) {
      setPositionX((prevpositionX) => prevpositionX - 2 * roversWidth)
    }
    else {
      setPositionX(borderX)
    }
  }

  // useEffect(() => {
  //   if (rotation == 360) {
  //     setRotation(0)
  //   }
  //   else if (rotation == -90) {
  //     setRotation(270)
  //   }

  // },[rotation])

  useEffect(() => {

    const processCommands = async() => {
      console.log(toExplore[0][toExplore[0].length - 1], "||" , toExplore)
      if (toExplore[0][toExplore[0].length - 1] === 'N') {
        handleRotationInitial(0)
      }
      else if (toExplore[0][toExplore[0].length - 1] === 'W') {
        handleRotationInitial(270)
      }
      else if (toExplore[0][toExplore[0].length - 1] === 'E') {
        handleRotationInitial(90)
      }
      else if (toExplore[0][toExplore[0].length - 1] === 'S') {
        handleRotationInitial(180)
      }

      handleXInitial()
      handleYInitial()

      for (let i = 0; i < routesToExplore[0].length; i++) {
        const comando = routesToExplore[0][i];
        console.log("===========", comando, comando === 'L')
        if (comando === 'L') {
          handleRotationLeft()
        } else if (comando === 'R') {
          handleRotationRigth()
        } else if (comando === 'M') {
          if (rotation % 360 === 90 ) {
            handleRigth()
          }
          else if (rotation % 360 === 270) {
            handleLeft()
          }
          else if (rotation % 360 === 0) {
            handleUp()
          }
          else if (rotation % 360 === 180) {
            console.log('=========', positionY, borderY)
            handleDown()
          }
        }
      }
    }
    if (routesToExplore.length > 0){
      processCommands()
    }
  }, [routesToExplore])
  console.log(positionY, "|| " , positionX, "||", rotation)
  return (
    <>
      {routesToExplore.length > 0 && (
        <img
          src={rover}
          alt="Rovers"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 0.5s ease-in-out',
            position: 'absolute',
            top: `${positionY}px`,
            left: `${positionX}px`,
            height: `${roversHeigth}px`,
            width: `${roversWidth}px`
          }}
        />
      )}
    </>
  )
}

function verifyFormatInitial(inputString:string): boolean {
  const regex = /^\d+\s\d+\s[NSWE]$/

  if (regex.test(inputString)) {
    return true
  }
  return false
}

function commandFormat(cadena: string): boolean {
  const regex = /^[LMR]+$/

  return regex.test(cadena);
}

interface ComandLineProps {
  width: number;
  height: number;
  addRover: (e: string) => void;
  addRouteRover: (e: string) => void;
  numberRobers: string[]
}

const ComandLine: React.FC<ComandLineProps> = ({ width, height, addRover, addRouteRover, numberRobers }) => {
  const name = `Ax-00${numberRobers.length+1}`

  const [initialPosition, setInitialPosition] = useState('');
  const [commandLineInput, setCommandLineInput] = useState('');
  //const [pivot, setPivot] = useState(false)

  const handleSubmit = () => {
    if(verifyFormatInitial(initialPosition) &&
      commandFormat(commandLineInput) &&
      (parseInt(initialPosition[0]) <= width) &&
      (parseInt(initialPosition[2]) <= height))
      {

        addRover(initialPosition)
        addRouteRover(commandLineInput)
        setInitialPosition('')
        setCommandLineInput('')
    }
    else{
      alert('The coordInates in the Command Line are not in the allowed Format or your cordindates are out of range')
      setInitialPosition('')
      setCommandLineInput('')
    }
  }

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
                value={initialPosition}
                onChange={(e) => setInitialPosition(e.target.value)}
                placeholder={`Example: 5 5 N  ||  Max ${width - 1} , ${height - 1}`}
              /><br/>
              <label htmlFor="formGroupExampleInput" className="form-label">Command Line Input:</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={commandLineInput}
                placeholder={`Example: LMLMLMLMRRM`}
                onChange={(e) => setCommandLineInput(e.target.value)}
              /><br/>
              <button className="btn btn-primary" onClick={handleSubmit}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface BoardProps {
  width: number;
  height: number;
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
  const [rangeValueX, setRangeValueX] = useState(0)
  const [rangeValueY, setRangeValueY] = useState(0)
  const [numberPositionR, setNumberPositionR] = useState<string[]>([])
  const [routeRovers, setRouteRovers] = useState<string[]>([])

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>, identifier: 'X' | 'Y') => {
    const value = parseInt(e.target.value, 10);

    if (identifier === 'X') {
      setRangeValueX(value);
    } else if (identifier === 'Y') {
      setRangeValueY(value);
    }
  }

  const handlePositions = (e: string, setPosition: React.Dispatch<React.SetStateAction<string[]>>) => {
    setPosition((prevPositions) => [...prevPositions, e]);
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
        addRover={(value:string) => handlePositions(value,setNumberPositionR)}
        addRouteRover={(value:string) => handlePositions(value,setRouteRovers)}
        numberRobers={numberPositionR}
      />
      <RoversPositions
        width={rangeValueX * 4 || 1}
        height={rangeValueY * 4 || 1}
        numberRovers={numberPositionR}
        routeRovers={routeRovers}
      /> ({numberPositionR.length > 0})
    </div>
  )
}

export default Body
