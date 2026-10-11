import React, { useState, useEffect, useRef, forwardRef } from "react";
import {
    motion,
    animate,
    useMotionValue,
    useReducedMotion,
} from "framer-motion";
import { useNavigate } from "react-router-dom";

// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
const API_URL = process.env.REACT_APP_API_URL;

async function getJson(path, signal) {
    const response = await fetch(`${API_URL}${path}`, { signal });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Request failed");
    }

    return response.json();
}

function getFolderKey(folder, index) {
    return folder.id ?? folder._id ?? index;
}

/**
 * Renders exactly the same <motion.div> (and children) as before.
 *
 * Each item owns a motion value and drives it with animate(). Pausing uses the
 * animation's own pause()/play(), so an item resumes from the exact spot it
 * stopped at, at the original speed, and its loop keeps the original start
 * and end points.
 */
function CarouselItem({
    folder,
    row,
    windowWidth,
    started,
    paused,
    onFirstItemLeave,
    onPlayVideo,
    isLeader,
}) {
    const slim = windowWidth > 1000;
    const prefersReducedMotion = useReducedMotion();

    // Same ranges as the original code.
    // const firstIntroEnd = wide ? windowWidth - 0 : 935;
    // const firstLoopFrom = wide ? -windowWidth : -984;
    // const firstLoopTo = wide ? windowWidth - 0 : 936;
    // const secondStart = wide ? -((windowWidth * 2) + 0) : ((-936 * 2) - 48);

    const firstIntroEnd = windowWidth;
    const firstLoopFrom = -windowWidth;
    const firstLoopTo = windowWidth;
    const secondStart = -(windowWidth * 2);

    const x = useMotionValue(row === "first" ? 0 : secondStart);
    const controlsRef = useRef(null);
    const pausedRef = useRef(paused);
    pausedRef.current = paused;



    useEffect(() => {
        if (prefersReducedMotion) return undefined;

        let keyframes;
        let options;

        if (slim && !started) {
            // Intro sweep: runs once.
            keyframes = [0, firstIntroEnd];
            options = { ease: "linear", duration: 15 }; 
        } else {
            options = {
                ease: "linear",
                duration: 30,
                repeat: Infinity,
                repeatType: "loop",
            };
            keyframes = [firstLoopFrom, firstLoopTo];
        }

        const controls = animate(x, keyframes, options);
        if (pausedRef.current) controls.pause();
        controlsRef.current = controls;

        return () => {
            controls.stop();
            controlsRef.current = null;
        };
    }, [
        started,
        prefersReducedMotion,
        firstIntroEnd,
        firstLoopFrom,
        firstLoopTo,
        x,
        slim
    ]);

    useEffect(() => {
        const controls = controlsRef.current;
        if (!controls) return;

        if (paused) controls.pause();
        else controls.play();
    }, [paused]);

    return (
        <motion.div
            style={{ x }}
            viewport={{ once: false, margin: "0px -32.5px 0px 0px" }}
            onViewportLeave={() => {
                slim && isLeader && !started && onFirstItemLeave();
                
            }}
            id=""
            className="flx flx-drc container"
        >
            <div>
                <img
                    src={folder.image ? `${API_URL}${folder.image.url}` : undefined}
                    alt={folder.title}
                />
                <h1>{folder.title}</h1>
                <p>{folder.description}</p>
                <button
                    type="button"
                    onClick={() =>
                        onPlayVideo(`${API_URL}${folder.video.shareUrl}`)
                    }
                >
                    Play Video
                </button>
            </div>
        </motion.div>
    );
}

function CarouselItem1({
    folder,
    windowWidth,
    started,
    paused,
    onFirstItemLeave,
    onPlayVideo,
    isLeader,
}) {
    const prefersReducedMotion = useReducedMotion();

    // Same ranges as the original code.
    // const secondStart = wide ? -((windowWidth * 2) ) : ((-936 * 2) - 48);

    const secondStart = -(windowWidth * 2);
    const slim = windowWidth > 1000;


    const x = useMotionValue(secondStart);
    const controlsRef = useRef(null);
    const pausedRef = useRef(paused);
    pausedRef.current = paused;



    useEffect(() => {
        if (prefersReducedMotion) return undefined;

        let keyframes;
        let options;

        options = {
            ease: "linear",
            duration: 30,
            repeat: Infinity,
            repeatType: "loop",
            delay: !slim && 15
        };
        keyframes = [secondStart, 0];
        

        const controls = animate(x, keyframes, options);
        if (pausedRef.current) controls.pause();
        controlsRef.current = controls;

        return () => {
            controls.stop();
            controlsRef.current = null;
        };
    }, [
        prefersReducedMotion,
        secondStart,
        x,
        slim
    ]);

    useEffect(() => {
        const controls = controlsRef.current;
        if (!controls) return;

        if (paused) controls.pause();
        else controls.play();
    }, [paused]);

    return (
        <motion.div
            style={{ x }}
            viewport={{ once: false }}
            onViewportLeave={() => {
                if (isLeader && !started) onFirstItemLeave();
            }}
            id=""
            className="flx flx-drc"
        >
            <div>
                <img
                    src={folder.image ? `${API_URL}${folder.image.url}` : undefined}
                    alt={folder.title}
                />
                <h1>{folder.title}</h1>
                <p>{folder.description}</p>
                <button
                    type="button"
                    onClick={() =>
                        onPlayVideo(`${API_URL}${folder.video.shareUrl}`)
                    }
                >
                    Play Video
                </button>
            </div>
        </motion.div>
    );
}

const contents = [
    {
        image: "https://res.cloudinary.com/dxj0d1v3g/image/upload/v1690911685/Portfolio%201/portfolio-1_1_2x_1_2x.png",
        title: "Portfolio 1",
        description: "This is my first portfolio project.",
    }, {
        image: "https://res.cloudinary.com/dxj0d1v3g/image/upload/v1690911685/Portfolio%201/portfolio-2_1_2x_1_2x.png",
        title: "Portfolio 2",
        description: "This is my second portfolio project.",
    }, {
        image: "https://res.cloudinary.com/dxj0d1v3g/image/upload/v1690911685/Portfolio%201/portfolio-3_1_2x_1_2x.png", 
        title: "Portfolio 3",
        description: "This is my third portfolio project.",
    }, {
        image: "https://res.cloudinary.com/dxj0d1v3g/image/upload/v1690911685/Portfolio%201/portfolio-4_1_2x_1_2x.png",
        title: "Portfolio 4",
        description: "This is my fourth portfolio project.",
    }, {
        image: "https://res.cloudinary.com/dxj0d1v3g/image/upload/v1690911685/Portfolio%201/portfolio-5_1_2x_1_2x.png",
        title: "Portfolio 5",
        description: "This is my fifth portfolio project.",
    }
]


const Project = forwardRef((props, ref) => {
    const [folders, setFolders] = useState([]);
    const [playingVideo, setPlayingVideo] = useState(null);
    const [started, setStarted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const windowHeight= window.innerHeight;
    const [columns, setColumns] = useState(2);
    const elementRef = useRef(null);
    const containerRef = useRef(null);

    const navigate = useNavigate();

    // Keep the width-based ranges in sync with the window.
    // useEffect(() => {
    //     const onResize = () => setWindowWidth(window.innerWidth);
    //     window.addEventListener("resize", onResize);
    //     return () => window.removeEventListener("resize", onResize);
    // }, []);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const width = element.getBoundingClientRect().width;
        setWindowWidth(width);

        if (windowHeight < 1401) {
            if (windowWidth < 801) {
                setColumns(3);
                // console.log("windowWidth < 801");
            } else if (windowWidth < 1001) {
                setColumns(4);
            }
        }
        if (windowHeight < 1001) {
            if (windowWidth < 499) {
                setColumns(5);
            } else if (windowWidth > 1199) {
                setColumns(5);
            } else if (windowWidth > 499) {
                setColumns(4);
            }
        }
        if (windowHeight < 801) {
            if (windowWidth < 367) {
                setColumns(4);
            }
        }
    }, []);

    useEffect(() => {
        const container = elementRef.current;

        if (!container) return;

        const styles = getComputedStyle(container);

        const columns = styles.gridTemplateColumns
            .split(" ")
            .length;

        console.log("Number of columns:", columns);
        // setColumns(columns);
    }, []);

    // Load the gallery; abort if the component unmounts mid-request.
    useEffect(() => {
        const controller = new AbortController();

        async function loadGallery() {
            try {
                const foldersData = await getJson(
                    "/api/folders",
                    controller.signal
                );
                setFolders(foldersData.folders ?? []);
            } catch (requestError) {
                if (requestError.name === "AbortError") return;
                // Nothing may be added to the DOM, so report to the console.
                console.error("Failed to load projects:", requestError.message);
            }
        }

        loadGallery();

        return () => controller.abort();
    }, []);

    // Close the video player with Escape.
    useEffect(() => {
        if (!playingVideo) return undefined;

        const onKeyDown = (event) => {
            if (event.key === "Escape") setPlayingVideo(null);
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [playingVideo]);

    const firstFolders = folders.slice(0, columns);
    const secondFolders = folders.slice(0, columns);

    // Carousels also hold still while a video is playing.
    const paused = isHovered || Boolean(playingVideo);

    const pauseBothCarousels = () => setIsHovered(true);
    const resumeBothCarousels = () => setIsHovered(false);

    // Only resume on blur when focus actually leaves the wrapper.
    const handleBlurCapture = (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            resumeBothCarousels();
        }
    };

    return (
        <div id="project" className="flx flx-drc" ref={ref}>
            <div className="grd contents">
                <div
                    className="grd contents"
                    onMouseEnter={pauseBothCarousels}
                    onMouseLeave={resumeBothCarousels}
                    onFocusCapture={pauseBothCarousels}
                    onBlurCapture={handleBlurCapture}
                    ref={elementRef}
                >
                    {firstFolders.map((folder, index) => (
                        <CarouselItem
                            key={getFolderKey(folder, index)}
                            folder={folder}
                            row="first"
                            windowWidth={windowWidth}
                            started={started}
                            paused={paused}
                            isLeader={index === 0}
                            onFirstItemLeave={() => setStarted(true)}
                            onPlayVideo={setPlayingVideo}
                        />
                    ))}
                </div>

                <div
                    className="grd contents"
                    onMouseEnter={pauseBothCarousels}
                    onMouseLeave={resumeBothCarousels}
                    onFocusCapture={pauseBothCarousels}
                    onBlurCapture={handleBlurCapture}
                >
                    {secondFolders.map((folder, index) => (
                        <CarouselItem1
                            key={getFolderKey(folder, index)}
                            folder={folder}
                            row="second"
                            windowWidth={windowWidth}
                            started={started}
                            paused={paused}
                            isLeader={false}
                            onFirstItemLeave={() => {}}
                            onPlayVideo={setPlayingVideo}
                        />
                    ))}
                </div>
            </div>

            <div>
                <button onClick={() => navigate("/project")}>
                    View More
                </button>
            </div>

            {playingVideo && (
                <section id="video-player">
                    <video
                        src={playingVideo}
                        controls
                        autoPlay
                        preload="metadata"
                    />

                    <button
                        type="button"
                        onClick={() => setPlayingVideo(null)}
                    >
                        Close video
                    </button>
                </section>
            )}
        </div>
    );
});

Project.displayName = "Project";

export default Project;
