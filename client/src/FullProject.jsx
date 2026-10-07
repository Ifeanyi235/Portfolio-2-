import React, {useState, useEffect, forwardRef} from "react";
import {easeInOut, motion} from "framer-motion";
import NavBar from "./components/main/navbar";
import { useNavigate } from "react-router-dom";
import { FourSquare } from "react-loading-indicators";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

async function getJson(path) {
    const response = await fetch(`${API_URL}${path}`);

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Request failed");
    }

    return response.json();
}

const FullProject = forwardRef((props, ref) => {

    const [folders, setFolders] = useState([]);
    const [count, setCount] = useState(null);
    const [playingVideo, setPlayingVideo] = useState(null);
    const [error, setError] = useState("");
    const [stay, setStay] = useState(true);

    const navigate = useNavigate();

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const pages = {
        home: "home",
        product: "product",
        about: "project",
        contact: "contact",
    };

    // useEffect(() => {
    //     const { width, height } =
    //         containerRef.current.getBoundingClientRect();

    //     console.log("Width:", width);
    //     console.log("Height:", height);
    // }, []);

    useEffect(() => {
        if (count !== null) {
            const timer  = setTimeout(() => {
                setStay(false);
            }, 1000)

            return () => clearTimeout(timer);
        }

    }, [count])

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

    function scrollToNext (pageref, currentPosition) {
        navigate("/", {
            state: {
                scrollTo: pageref
            }
        });
    };

    if (error) return <div id="loading" >
            <div>
                <div>
                    <h1>404</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="188 206 417 336" fill="currentColor" aria-label="Video camera outline icon">
                        <path d="M 472 449 L 466 452 L 461 457 L 458 464 L 458 472 L 461 479 L 469 486 L 472 487 L 483 487 L 489 484 L 494 479 L 497 472 L 497 464 L 494 457 L 486 450 L 483 449 Z M 474 461 L 480 461 L 484 464 L 485 470 L 482 474 L 480 475 L 475 475 L 471 472 L 470 466 Z M 418 449 L 412 452 L 407 457 L 404 464 L 404 472 L 407 479 L 415 486 L 418 487 L 429 487 L 435 484 L 440 479 L 443 472 L 443 464 L 440 457 L 432 450 L 429 450 L 428 449 Z M 420 461 L 426 461 L 430 464 L 431 470 L 428 474 L 426 475 L 421 475 L 417 472 L 416 466 Z M 269 452 L 269 484 L 273 487 L 276 488 L 285 488 L 286 487 L 323 487 L 324 488 L 332 488 L 333 487 L 359 487 L 362 484 L 362 452 L 359 449 L 334 449 L 333 448 L 323 448 L 322 449 L 287 449 L 284 448 L 283 449 L 282 448 L 275 448 L 272 449 Z M 281 462 L 284 460 L 294 460 L 295 461 L 301 461 L 302 460 L 305 460 L 306 461 L 312 461 L 313 460 L 342 460 L 343 461 L 349 461 L 350 462 L 350 474 L 346 476 L 310 476 L 309 475 L 306 475 L 305 476 L 300 476 L 299 475 L 284 476 L 281 474 Z M 605 284 L 603 281 L 597 280 L 582 288 L 580 288 L 578 290 L 576 290 L 572 293 L 570 293 L 568 295 L 566 295 L 562 298 L 560 298 L 558 300 L 556 300 L 548 305 L 546 305 L 540 309 L 539 311 L 539 319 L 538 320 L 524 320 L 522 316 L 521 310 L 519 308 L 519 306 L 517 303 L 508 294 L 496 288 L 493 288 L 492 287 L 455 287 L 454 286 L 450 286 L 449 287 L 441 287 L 440 286 L 438 287 L 417 287 L 414 290 L 414 296 L 417 305 L 391 344 L 391 359 L 390 360 L 390 363 L 391 364 L 391 374 L 389 377 L 388 377 L 363 351 L 375 316 L 375 310 L 362 289 L 356 286 L 354 287 L 313 287 L 312 286 L 301 287 L 300 286 L 296 286 L 295 287 L 274 287 L 265 290 L 258 294 L 247 306 L 242 320 L 242 332 L 240 334 L 229 334 L 227 332 L 227 324 L 222 320 L 193 320 L 188 324 L 188 477 L 193 481 L 222 481 L 227 477 L 227 469 L 229 467 L 240 467 L 242 469 L 242 481 L 243 482 L 243 485 L 249 498 L 259 508 L 270 513 L 273 513 L 274 514 L 293 514 L 296 516 L 296 526 L 299 533 L 304 538 L 310 541 L 319 541 L 320 542 L 325 542 L 326 541 L 329 541 L 330 542 L 334 542 L 335 541 L 367 541 L 368 542 L 373 542 L 374 541 L 377 542 L 381 542 L 382 541 L 414 541 L 415 542 L 421 542 L 422 541 L 424 542 L 429 542 L 430 541 L 456 541 L 462 538 L 467 533 L 470 526 L 470 516 L 473 514 L 492 514 L 505 509 L 516 499 L 521 491 L 524 481 L 538 481 L 539 482 L 539 490 L 541 493 L 546 496 L 548 496 L 550 498 L 554 499 L 556 501 L 558 501 L 560 503 L 564 504 L 566 506 L 568 506 L 570 508 L 574 509 L 576 511 L 578 511 L 580 513 L 582 513 L 586 516 L 588 516 L 590 518 L 592 518 L 597 521 L 601 521 L 603 520 L 605 517 Z M 308 516 L 311 514 L 348 514 L 349 515 L 354 515 L 355 514 L 394 514 L 395 515 L 401 515 L 402 514 L 443 514 L 444 515 L 455 514 L 458 516 L 458 524 L 455 528 L 449 530 L 438 530 L 437 529 L 434 529 L 433 530 L 415 530 L 414 529 L 407 529 L 406 530 L 391 530 L 390 529 L 387 529 L 386 530 L 367 530 L 366 529 L 360 529 L 359 530 L 343 530 L 342 529 L 337 529 L 336 530 L 316 530 L 311 528 L 308 524 Z M 281 388 L 283 386 L 326 386 L 343 403 L 343 420 L 340 422 L 284 422 L 281 420 Z M 228 346 L 241 346 L 242 347 L 242 454 L 241 455 L 228 455 L 227 454 L 227 347 Z M 338 380 L 355 363 L 357 363 L 392 398 L 395 400 L 398 400 L 401 398 L 402 396 L 402 383 L 403 382 L 403 376 L 402 375 L 402 368 L 403 367 L 403 364 L 402 363 L 402 350 L 403 347 L 409 339 L 484 339 L 485 340 L 485 420 L 482 422 L 358 422 L 355 420 L 355 398 Z M 281 373 L 281 340 L 282 339 L 352 339 L 354 341 L 352 345 L 352 348 L 350 351 L 327 374 L 282 374 Z M 526 332 L 537 332 L 539 334 L 539 467 L 537 469 L 526 469 L 524 467 L 524 334 Z M 202 332 L 213 332 L 215 334 L 215 467 L 213 469 L 202 469 L 200 467 L 200 334 Z M 259 310 L 265 304 L 271 300 L 274 300 L 275 299 L 283 299 L 284 298 L 323 298 L 324 299 L 330 299 L 331 298 L 351 298 L 356 302 L 363 314 L 360 321 L 360 324 L 357 327 L 273 327 L 269 331 L 269 430 L 272 433 L 284 433 L 285 434 L 291 434 L 292 433 L 315 433 L 316 434 L 321 434 L 322 433 L 332 433 L 333 434 L 338 434 L 339 433 L 363 433 L 364 434 L 368 434 L 369 433 L 379 433 L 380 434 L 383 434 L 384 433 L 411 433 L 412 434 L 417 434 L 418 433 L 427 433 L 428 434 L 433 434 L 434 433 L 458 433 L 459 434 L 475 433 L 476 434 L 481 434 L 482 433 L 494 433 L 497 430 L 497 331 L 493 327 L 419 327 L 418 325 L 429 309 L 428 300 L 431 298 L 467 298 L 468 299 L 485 298 L 486 299 L 494 300 L 501 304 L 507 310 L 512 320 L 512 480 L 507 491 L 498 499 L 491 502 L 486 502 L 485 503 L 481 503 L 480 502 L 476 502 L 475 503 L 465 503 L 464 502 L 460 502 L 459 503 L 431 503 L 430 502 L 427 503 L 418 503 L 417 502 L 414 502 L 413 503 L 383 503 L 382 502 L 379 503 L 370 503 L 369 502 L 365 502 L 364 503 L 341 503 L 340 502 L 333 502 L 332 503 L 321 503 L 320 502 L 317 502 L 316 503 L 289 503 L 288 502 L 282 503 L 281 502 L 272 501 L 265 497 L 259 491 L 254 481 L 254 320 Z M 589 297 L 592 297 L 593 298 L 593 503 L 592 504 L 589 504 L 581 499 L 579 499 L 571 494 L 569 494 L 567 492 L 565 492 L 561 489 L 559 489 L 557 487 L 553 486 L 551 484 L 551 317 L 553 315 L 557 314 L 559 312 L 561 312 L 563 310 L 569 307 L 571 307 L 573 305 L 579 302 L 581 302 Z M 384 273 L 384 285 L 396 285 L 396 273 Z M 303 266 L 303 278 L 315 278 L 315 267 L 314 266 Z M 466 259 L 465 260 L 465 271 L 477 271 L 477 260 L 475 259 L 471 259 L 470 260 Z M 372 226 L 369 223 L 366 222 L 344 229 L 341 229 L 337 231 L 330 232 L 327 234 L 323 234 L 320 236 L 315 237 L 313 240 L 313 244 L 314 246 L 317 248 L 327 251 L 347 260 L 355 261 L 357 260 L 359 257 L 359 255 L 362 251 L 362 249 L 364 247 L 365 243 L 367 241 L 367 239 L 372 231 Z M 353 240 L 352 244 L 349 247 L 344 246 L 340 243 L 342 241 L 345 241 L 349 239 L 352 239 Z M 391 212 L 391 216 L 390 217 L 391 224 L 402 224 L 403 223 L 402 220 L 402 212 Z M 421 206 L 419 207 L 418 209 L 418 215 L 424 233 L 424 237 L 426 240 L 431 261 L 434 264 L 438 265 L 443 261 L 448 246 L 455 231 L 456 222 L 453 219 L 451 219 L 449 217 L 447 217 L 443 214 L 441 214 L 439 212 L 437 212 L 433 209 L 431 209 L 429 207 Z M 436 224 L 442 228 L 441 234 L 438 237 L 436 235 L 436 232 L 434 228 L 434 226 Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"/>
                    </svg>
                </div>
                <h1>Don't worry it's just a 404</h1>
                <button type="button" onClick={() => navigate("/")}>Go Back</button>
            </div>
        </div>;
    if (stay) return <motion.div id="loading" >
        <div>
            <motion.div 
            // initial={{x: (windowWidth / 2), y: (windowHeight / 2)}} 
            animate={{opacity: count !== null && [1, 0]}} 
            transition={{ease: easeInOut, duration: 1.2}} >
                <h1>Tega</h1>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024">
                    <path d="M0 0h1024v1024H0z" fill="none" />
                    <path fill="currentColor" d="M912 302.3L784 376V224c0-35.3-28.7-64-64-64H128c-35.3 0-64 28.7-64 64v576c0 35.3 28.7 64 64 64h592c35.3 0 64-28.7 64-64V648l128 73.7c21.3 12.3 48-3.1 48-27.6V330c0-24.6-26.7-40-48-27.7M328 352c0 4.4-3.6 8-8 8H208c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h112c4.4 0 8 3.6 8 8zm560 273l-104-59.8V458.9L888 399z" />
                </svg>
            </motion.div>
            <motion.h1 
            // initial={{x: (windowWidth / 2) - 64, y: (windowHeight / 2) - 128}}
            >My Projects</motion.h1>
            <FourSquare size="small" color={["#c90000", "#960000", "#c90000", "#fc0000"]} />
        </div>
        </motion.div>;

    return (
        
        <div id="Fullproject" className="grd">
            <NavBar pages={pages} scrollToNext={scrollToNext} />
            <motion.div initial={{x: (windowWidth / 2) - 80, y: (windowHeight / 2) - 48}} animate={{x: 0, y: 0}} transition={{duration: 1.2, ease: "easeInOut"}}>
                <h1>My Projects</h1>
            </motion.div>

            <div className="grd">
                {folders.map((folder, index) => <motion.div initial={{ opacity: 0
                    }} whileInView={{
                    }} animate={{ opacity: 1
                    }} viewport={{
                        once: false
                    }} transition={{
                        ease: "easeInOut",
                        duration: 2,
                    }} key={index} id="" className="flx flx-drc">
                        <div>
                            <img src={`${API_URL}${folder.image.url}`} alt={folder.title}/>   
                            <h1>{folder.title}</h1> 
                            <p>{folder.description}</p>
                            <button type="button" onClick={() => setPlayingVideo(`${API_URL}${folder.video.shareUrl}`)}>Play Video</button>
                        </div>
                </motion.div>)}

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

        </div>
    )
});

export default FullProject;