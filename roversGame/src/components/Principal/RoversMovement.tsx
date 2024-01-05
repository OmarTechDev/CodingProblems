import { useState, useEffect } from "react"
import { RoversProps } from "./Interfaces"

import rover from '../../assets/roversFunctional.jpg'

const initialDirection = (toExplore:string[], setRotation: (e:number) => void) => {
  if (toExplore[2] === 'N') {
    setRotation(0)
  }
  else if (toExplore[2] === 'W') {
    setRotation(270)
  }
  else if (toExplore[2] === 'E') {
    setRotation(90)
  }
  else if (toExplore[2] === 'S') {
    setRotation(180)
  }
}

const movements = (direction:string, rotation:number, handleRigth: () => void, handleRotationLeft: () => void,
handleRotationRigth: () => void, handleLeft: () => void, handleUp: () => void, handleDown: () => void)  => {

  const comando = direction;
  if (comando === 'M') {
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
      handleDown()
    }
  } else if (comando === 'L') {
    handleRotationLeft()
  } else if (comando === 'R') {
    handleRotationRigth()
  }
}

export const RoversPositions: React.FC<RoversProps> = ({width, height, numberRovers, routeRovers, addComplete}) => {
  const [rotation, setRotation] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [positionX, setPositionX] = useState(0);
  const [boolean, setBoolean] = useState(false);
  const [routesToExplore, setRoutesToExplore] = useState<string[]>([])
  const [toExplore, setToExplore] = useState<string[]>([])
  const [directions, setDirections] = useState<string[]>([])

  const roversWidth = 700 / width / 2
  const roversHeigth = 500 / height / 2

  const borderX = 78 + roversWidth/2
  const borderY = 120 + 500 - ((3/2) * roversHeigth)

  useEffect(() => {
    if (numberRovers[0]) {
      setToExplore(numberRovers[0].split(" "))
    }
    else console.log('incorrect Format')
  }, [numberRovers[0]])
  const handleRoutes = () => {setRoutesToExplore(routeRovers)}

  useEffect(() => {
    handleRoutes()
  }, [routeRovers])

  const handleResults = () => {
    const resultX = ((positionX - borderX) / (roversWidth * 2))
    const resultY = -Math.ceil((positionY - borderY) / (roversHeigth * 2))
    const getDirectionFromRotation = (rotation:number) => {
      if (rotation % 360 === 0) {
        return 'N'
      } else if (rotation % 360 === 180) {
        return 'S'
      } else if (rotation % 360 === 270) {
        return 'W'
      } else if (rotation % 360 === 90) {
        return 'E'
      }
    }
    const resultDirection = getDirectionFromRotation(rotation)
    addComplete(`${resultX} ${resultY} ${resultDirection}`)
  }

  useEffect(() => {

    const processCommands = () => {

      initialDirection(toExplore,setRotation)

      setPositionX(borderX + 2 * roversWidth * (parseInt(toExplore[0])))

      setPositionY(borderY - 2 * roversHeigth * (parseInt(toExplore[1])))

      setBoolean(true)

      setDirections(routesToExplore[0].split(''))

    }
    if (routesToExplore.length > 0) {
      processCommands()
    }
  }, [routesToExplore])

  useEffect(() => {
    handleResults()
  }, [rotation, positionX, positionY])

  useEffect(() => {
    if (directions.length > 0) {
      setTimeout(() => {
        movements(directions[0], rotation, handleRigth, handleRotationLeft, handleRotationRigth, handleLeft, handleUp, handleDown)
        setDirections(prevDirections => {
          const updatedDirections = [...prevDirections];
          updatedDirections.shift()
          return updatedDirections
        })
        //handleResults()
      }, 1000)
    }
  }, [directions])

  const handleRotationRigth = () => {
    setRotation((prevRotacion) => prevRotacion + 90)
  }

  const handleRotationLeft = () => {
    setRotation((prevRotacion) => prevRotacion + 270)
  }

  const handleUp = () => {
    if(positionY > (120 + roversHeigth/2)) {
      setPositionY((prevpositionY) => prevpositionY - 2 * roversHeigth)
    }
    else if (positionY !== 0){
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

  return (
    <>
      {routesToExplore.length > 0 && (
        <img
          src={rover}
          alt="Rovers"
          style={{
            transform: `rotate(${rotation}deg)`,
            //transition: 'transform 0.1s ease-in-out',
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
