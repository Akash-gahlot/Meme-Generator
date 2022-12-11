import React, {createRef} from "react";
import { exportComponentAsJPEG } from "react-component-export-image";

export default function Form() {
  console.log("comp running");
  const [meme, setMeme] = React.useState({
    toptext: "",
    bottomtext: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  }); //

  const [memeData, setmemeData] = React.useState([]);

  React.useEffect(function () {
    fetch("https://api.imgflip.com/get_memes")
      .then((resp) => resp.json())
      .then((data) => setmemeData(data.data.memes));
  }, []);

  function Getimage(e) {
    e.preventDefault();
    const rand = Math.floor(Math.random() * memeData.length);
    setMeme((preVal) => ({
      ...preVal,
      randomImage: memeData[rand].url,
    }));
  }
  function memeText(event) {
    setMeme((preVal) => ({
      ...preVal,
      [event.target.name]: event.target.value,
    }));
    console.log(meme.toptext);
    console.log(meme.bottomtext);
  }
  function Reset() {
    setMeme((preVal) => ({
      ...preVal,
      toptext: "",
      bottomtext: "",
      randomImage: "http://i.imgflip.com/1bij.jpg",
    }));
  }
    const memeref = createRef();

  return (
    <main>
      <div className="memeForm">
        <input
          type="text"
          placeholder="FirstText"
          className="formInput"
          name="toptext"
          value={meme.toptext}
          onChange={memeText}
        />
        <input
          type="text"
          placeholder="SecondText"
          className="formInput"
          name="bottomtext"
          value={meme.bottomtext}
          onChange={memeText}
        />
        <button className="formButton" onClick={Getimage}>
          Get New Image 🖼
        </button>
      </div>
      <div className="meme" ref={memeref}>
        <img src={meme.randomImage} className="memeImage" alt="memeImage" />
        <h2 className="meme-text top">{meme.toptext}</h2>
        <h2 className="meme-text bottom">{meme.bottomtext}</h2>
      </div>
      <button className="last-button resetbutton" onClick={Reset}>
        Reset 
      </button>
          <button className=" last-button downloadbutton" onClick={(e) =>exportComponentAsJPEG(memeref)}>Download</button>
    </main>
  );
}
