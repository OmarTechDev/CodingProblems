import {ChangeEvent} from 'react'

export interface ProcessProps {
  toExplore: string[]
  routesToExplore: string[]
  rotation: number;
  handleRotationInitial: (e: number) => void;
  handleXInitial: () => void;
  handleYInitial: () => void;
  handleRotationLeft: () => void;
  handleRotationRigth: () => void;
  handleRigth: () => void;
  handleLeft: () => void;
  handleUp: () => void;
  handleDown: () => void;
}

export interface RoversProps {
  width: number;
  height: number;
  numberRovers: string[]
  routeRovers: string[]
  addComplete: (e: string) => void;
}

export interface ResultProps {
  numberRovers: string[]
  commands  : string[]
  result: string
}

export interface ComandLineProps {
  width: number;
  height: number;
  addRover: (e: string) => void;
  addRouteRover: (e: string) => void;
  numberRobers: string[]
}

export interface BoardProps {
  width: number;
  height: number;
}

export interface TitleBoardProps {
  rangeValueX: number;
  rangeValueY: number;
  onRangeChange: (e: ChangeEvent<HTMLInputElement>, identifier: 'X' | 'Y') => void;
}
//Delete this
