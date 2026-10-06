import React, {useState, useRef, useEffect, forwardRef} from "react";
import {motion, useAnimationControls } from "framer-motion";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

async function getJson(path) {
    const response = await fetch(`${API_URL}${path}`);

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Request failed");
    }

    return response.json();
}

const Project = forwardRef((props, ref) => {

    const containerRefs = useRef([]);

    const [folders, setFolders] = useState([]);
    const [count, setCount] = useState(null);
    const [playingVideo, setPlayingVideo] = useState(null);
    const [error, setError] = useState("");
    const [started, setStarted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const controls = useAnimationControls();

    const windowWidth = window.innerWidth;
    const navigate = useNavigate();

    useEffect(() => {
        let animationFrame;

        const trackPositions = () => {
            containerRefs.current.forEach((element, index) => {
                if (!element) return;

                const rect = element.getBoundingClientRect();

                console.log(
                    index,
                    "left:", rect.left,
                    "right:", rect.right,
                    "top:", rect.top,
                    "bottom:", rect.bottom
                );
            });

            animationFrame = requestAnimationFrame(trackPositions);
        };

        animationFrame = requestAnimationFrame(trackPositions);

        return () => cancelAnimationFrame(animationFrame);
    }, []);

    const variants = {
        moving: {
            x : started ? ([windowWidth > 1000 ? (-windowWidth) : (-984), windowWidth > 1000 ? (windowWidth - 80) : 936]) : ([0, windowWidth > 1000 ? (windowWidth - 79) : 935])
,
            transition: {
                duration: 30,
                repeat: Infinity,
                ease: "linear",
            },
        },

        paused: {

            transition: {
                duration: 0
            }
        }
    };

    useEffect(() => {
        async function loadGallery() {
            try {
                const [countData, foldersData] = await Promise.all([
                    getJson("/api/folders/count"),
                    getJson("/api/folders")
            ]);

            setCount(countData.count);
            setFolders(foldersData.folders);
            } catch (requestError) {
                setError(requestError.message);
            }
        }

        loadGallery();
    }, []);

    return (
        <div id="project" className="flx flx-drc"ref={ref}>
            <div className="grd contents">
                <div className="grd contents">
                    {folders.slice(0, 5).map((folder, index) => <motion.div ref={(el) => containerRefs.current[index] = el} initial={{
                        x: 0
                        // x : windowWidth > 1000 ? (-windowWidth) : (936)
                    }} whileInView={{
                            opacity: 1,
                            y: 0
                        }} animate={{
                            x : started ? ([windowWidth > 1000 ? (-windowWidth) : (-984), windowWidth > 1000 ? (windowWidth - 80) : 936]) : ([0, windowWidth > 1000 ? (windowWidth - 79) : 935])
                            // x :  (0, windowWidth > 1000 ? (windowWidth - 80) : 936)
                        }} viewport={{
                            once: false
                        }} transition={ started ? {
                            repeat: Infinity,
                            ease: "linear",
                            duration: 30,
                            delay: 0
                        } : {
                            ease: "linear",
                            duration: 15,
                            delay: 0
                        }} //onAnimationComplete={() => {(numberVideo > 5) ? (index === 4 && setStarted(true)) : ((index === (numberVideo - 1)) && setStarted(true))}} 
                        onViewportLeave={() => index === 0 && (!started && setStarted(true))} 
                            key={index} id="" className="flx flx-drc">
                            <div>
                                <img src={`${API_URL}${folder.image.url}`} alt={folder.title}/>   
                                <h1>{folder.title}</h1> 
                                <p>{folder.description}</p>
                                <button type="button" onClick={() => setPlayingVideo(`${API_URL}${folder.video.shareUrl}`)}>Play Video</button>
                            </div>

                    </motion.div>)}
                </div>

                <div className="grd contents">
                    {folders.slice(0, 5).map((folder, index) => <motion.div key={index} initial={{
                        x : windowWidth > 1000 ? (-(windowWidth * 2)) : (-936 * 2)
                    }} whileInView={{
                            opacity: 1,
                            y: 0
                        }} animate={{
                            x : [windowWidth > 1000 ? (-((windowWidth) * 2) + 80) : ((-936 * 2) - 48), 0]
                        }} viewport={{
                            once: false
                        }} transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 30,
                            delay: 0
                        }} id="" className="flx flx-drc">
                            <div>
                                <img src={`${API_URL}${folder.image.url}`} alt={folder.title}/>   
                                <h1>{folder.title}</h1> 
                                <p>{folder.description}</p>
                                <button type="button" onClick={() => setPlayingVideo(`${API_URL}${folder.video.shareUrl}`)}>Play Video</button>
                            </div>
                    </motion.div>)}  
                </div>   
            </div>

            <div>
                <button onClick={() => navigate("/project")}>View More</button>
            </div>

            {playingVideo && (
                <section id="video-player">
                    <video
                        src={playingVideo}
                        controls
                        autoPlay
                        preload="metadata"
                    />

                    <button type="button" onClick={() => setPlayingVideo(null)}>
                        Close video
                    </button>
                </section>
            )}
        </div>
    )
});

export default Project;