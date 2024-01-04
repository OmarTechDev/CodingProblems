import { useState, useEffect } from "react"
import { RoversProps } from "./Interfaces"

import rover from '../../assets/roversFunctional.jpg'

export const RoversPositions: React.FC<RoversProps> = ({width, height, numberRovers, routeRovers}) => {
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
            handleDown()
          }
        }
      }
    }
    if (routesToExplore.length > 0){
      processCommands()
    }
  }, [routesToExplore])
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
