import React, { useState, useCallback } from 'react';
import './SecondPage.css';
import Cropper from 'react-easy-crop';
import Logo from '../../../images/stargram logo cutted.png';

const Demo = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
  }, [])

  return (
    <Cropper
      image={'https://i.pcmag.com/imagery/articles/00Cx7vFIetxCuKxQeqPf8mi-23..1580943870.jpg'}
      crop={crop}
      zoom={zoom}
      aspect={3 / 4}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
  )
}

export default function SecondPage() {
    document.body.style = 'background-color: #f1f1f1;'
    document.body.style = 'background-image:url(https://www.dreamzzfurniture.com/wp-content/uploads/2019/10/LegalCraftyFinch-small.gif); background-repeat:no-repeat;background-size:cover'
    // document.body.style = 'background-size:cover'

    function imageUpload (e)  {
      console.log(e.target.files);
      var yourImage = e.target.files
    }

    


    return (
        <div className="body">
            <div className="card text-center" style={{width: "21rem"}} >
              <div className="card-body">
                <img id="logo" src={Logo}></img>
                <h3  className="card-title heading text-center mt-0">Add Profile Picture</h3>
                <label className="dpLabel">
                <div className="img-wrp">
                  <img for="photo-upload" className="dp" src="https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true"/>
                </div>
                <input id="photoUpload" onChange={imageUpload} style={{display:"none"}} type="file"></input>
                </label>
                <div>
                <button type="submit" className="save dpButton">Continue </button>
                </div>
              </div>
            </div>
            {/* <Demo/> */}
        </div>
    )
}
