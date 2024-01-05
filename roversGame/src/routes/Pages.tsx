import Maintop from '../components/NavBar.tsx';
import Body from '../components/Principal/Body.tsx';
import BodyMany from '../components/Many/Body.tsx';

function HomePage() {
  return (
    <div>
      <Maintop/>
      <Body/>
    </div>
  )
}

function Many() {
  return (
    <div>
      <Maintop/>
      <BodyMany/>
    </div>
  )
}

export {HomePage, Many}
