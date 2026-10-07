import React, {forwardRef} from "react";

const Home = forwardRef((props, ref) => {
    return (
        <div id="home" className="flx " ref={ref}>
            
            <img src="\images\image 5.png" alt="Profile"></img>
            
            <div className="flx flx-drc">
                <div id="intro">
                    <h3>Hello, I'm Tega</h3>
                    <h1>Video Editor</h1>
                </div>
                <p>I am a passionate video editor with experience creating engaging and professional content. I specialize in transforming raw footage into high quality videos using clean editing, smooth transitions, color correction, sound design, and motion graphics. I am dedicated to understanding each project and delivering content that captures attention and communicates the right message.</p>
            </div>
        </div>
    )
})

export default Home;