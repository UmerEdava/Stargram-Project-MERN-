import React, { useState, useCallback } from 'react';
import './SecondPage.css';
import Cropper from 'react-easy-crop';
import Logo from '../../../images/stargram logo cutted.png';
import { Button, Modal } from 'react-bootstrap';
import UploadIcon from '../../../images/Upload-icon.jpg';
import axios from 'axios';
import server from '../../../Server';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

function Example() {
  var [show, setShow] = useState(false);

  var handleClose = () => setShow(false);
  var handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" style={{display:'none'}} id="modalButton" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal centered show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{height:"26rem"}}>
        <Demo/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default function SecondPage(props) {
    document.body.style = 'background-color: #f1f1f1;'
    document.body.style = 'background-image:url(https://www.dreamzzfurniture.com/wp-content/uploads/2019/10/LegalCraftyFinch-small.gif); background-repeat:no-repeat;background-size:cover'
    // document.body.style = 'background-size:cover'
    const [post, setPost] = useState()
    const { values, handleImageChange } = props;

    function imgChange () {
      document.getElementById('dpImage').src=UploadIcon 
    }

    function imgNormal () {
      document.getElementById('dpImage').src=img 
    }

    var [img,setImg] = useState("https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true");

    function imageUpload (e)  {
      
      // console.log(e.target.files[0]);
      // const data = new FormData();
      // data.append('file', e.target.files[0]);
      // console.log('data aane',data)
      // axios.post(server + '/addPost', data)
      // .then((res) => {
      //   console.log('ress',res);
      // });

      // setPost(e.target.files[0])
      // data.append('item', post)
      
      // console.log('dataaaa',data)
      // axios.post(server + '/addPost', data).then((res) => {
      //   if (res.data === 'success') {
      //       toast("Data Posted Successfully")
      //   }
      //   else {
      //       toast.error("Something Went Wrong !!!")
      //   }
      // })

      // document.getElementById('modalButton').click()
      setImg(URL.createObjectURL(e.target.files[0]))

      handleImageChange('image',e.target.files[0])

      // let file = e.target.files[0];
      // let reader = new FileReader();

      // reader.onloadend = function() {
      //   // console.log('RESULT: ', reader.result);
      //   var base = reader.result
      //   console.log('base::; - ',base);
      //   props.values.image = 'state image testing'


      // }
      // reader.readAsDataURL(file);

      // props.values.image = e.target.files[0]

      console.log('props',props.values)

      // const data = new FormData();
      // data.append('file', e.target.files[0]);

      // console.log('formdata',data)

      // axios.post('http://localhost:3001/addCelebrityPhoto', data)
      // .then((res) => {
      //   console.log('res',res)
      // });

    }

    function next () {
      console.log('valuese',props.values)

      props.nextStep()
    }


    return (
        <div className="body">
            <div className="card text-center" style={{width: "21rem"}} >
              <div className="card-body">
                <img id="logoCelebLogin" src={Logo}></img>
                <h3  className="card-title heading text-center mt-0">Add Profile Picture</h3>
                <label className="dpLabel" id="dpLabel" onMouseOver={imgChange} onMouseOut={imgNormal}>
                <div className="img-wrp">
                  <img for="photo-upload" id="dpImage" className="dp" src={img}/>
                </div>
                <input id="photoUpload" name="image" onChange={imageUpload} style={{display:"none"}} type="file"></input>
                </label>
                <div>
                <button type="submit" className="save dpButton" onClick={next} >Continue </button>
                </div>
              </div>
            </div>
            {/* <Demo/> */}
            <Example id="modal"/>
        </div>
    )
}
