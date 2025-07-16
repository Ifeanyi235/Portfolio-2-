import React, {useState, useEffect} from "react";
import { ReactTyped } from "react-typed";
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
// import { setimageAnimation } from "./imageAnimation";
import Welcome from "./components/welcome";
import Main from "./components/main/main"

function App() {

  // const dispatch = useDispatch();
  // const imageanimationState = useSelector((state) => state.imageAnimationState.isimageAnimation);

  // const [check, setCheck] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setCheck(false)
  //   }, 7000);

  //   return () => clearTimeout(timer); // cleanup
  // }, []);

  return (
    <div id="body" className="flx flx-drc">
        {/* <Welcome /> */}
        <Main />
    </div>

  );
}

export default App;
