import React, {useState, useEffect} from "react";
import { ReactTyped } from "react-typed";
import Collapse from '@mui/material/Collapse';

function Welcome() {

    const [checked, setChecked] = useState (false);
    const [fade, setFade] = useState (false)
    const typeSpeed = 80;


    useEffect(() => {
        const timer = setTimeout(() => {
        setChecked(true);
        }, 2000);

        return () => clearTimeout(timer); // cleanup
    }, []);

     useEffect(() => {
        const timer = setTimeout(() => {
        setFade(true);
        }, 4000);

        return () => clearTimeout(timer); // cleanup
    }, []);

    return (
        <div id="Welcome" className={`font-welcome flx flx-drc fade ${fade && "fade-out"}`} >
            <ReactTyped
            className="wel-fontsz1"
                startWhenVisible
                strings={["Hello!!!"]}
                typeSpeed={typeSpeed}
                backSpeed={30}
                showCursor={false}
                // loop
            />

            {checked && <ReactTyped
                className="wel-fontsz2"
                startWhenVisible
                strings={["Welcome"]}
                typeSpeed={typeSpeed}
                backSpeed={30}
                showCursor={false}
                // loop
            />}
        </div>
    );
}

export default Welcome;