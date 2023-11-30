import { useState } from "react";
import "./Carousel.css";
import Card from "./Card";


/** Carousel: displays images and arrows to navigate through them
 * 
 * Props:
 * - photos: array of {src, caption} objects
 * - title: string describing the collection of images
 * 
 * State:
 * - currCardIdx: integer for current card index
 * 
 * App --> Carousel --> Card
 */



 function Carousel({ photos, title }) {
  const [currCardIdx, setCurrCardIdx] = useState(0);

  console.log('this is the currect card index', currCardIdx)

  const currCard = photos[currCardIdx];
  const total = photos.length;

  //Increments currCardIdx state by 1
  function goForward() {
    setCurrCardIdx(currCardIdx + 1);
  }
  // Decrement currCardIdx state by 1
  function goBackward() {
    setCurrCardIdx(currCardIdx - 1);
  }

  function isFirstPhoto() {
    if(currCardIdx === 0) {
      return true
    } else {
      return false
    }
  }

  function isLastPhoto() {
    if(currCardIdx === photos.length-1) {
      return true
    } else {
      return false
    }
  }

  return (
    <div className="Carousel">
      <h1>{title}</h1>
      <div className="Carousel-main">
        {isFirstPhoto() ? null : 
          <i
            data-testid="left-arrow"
            className="bi bi-arrow-left-circle"
            onClick={goBackward}
          />
        }

        <Card
          caption={currCard.caption}
          src={currCard.src}
          currNum={currCardIdx + 1}
          totalNum={total}
        />

        {isLastPhoto() ? null : 
          <i
            data-testid="right-arrow"
            className="bi bi-arrow-right-circle"
            onClick={goForward}
          />
        }

      </div>
    </div>
  );
  
}

export default Carousel;
