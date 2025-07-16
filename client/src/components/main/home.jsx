import React, {forwardRef} from "react";

const Home = forwardRef((props, ref) => {
    return (
        <div id="home" className="flx" ref={ref}>
            
            <img src="\images\image 4.png"></img>
            
            <div className="flx flx-drc">
                <h3>Hello, I'm Peter</h3>
                <h1>Web Developer</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                <button>ABOUT US</button>
            </div>
        </div>
    )
})

export default Home;