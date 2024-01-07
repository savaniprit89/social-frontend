import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { globaTypes } from '../redux/actions/globalTypes'
import { createPost, updatePost } from '../redux/actions/postAction'

function StatusModal() {
    const { auth, theme, status, socket } = useSelector(state => state)
    const dispatch = useDispatch()
const videoRef=useRef();
const refCanvas=useRef();
    const [content, setContent] = useState('')
    const [images, setImages] = useState([])
    const [tracks, setTracks] = useState('')
    const [stream, setstream] = useState(false)
    const handleChangeImages = e => {
        const files = [...e.target.files]
        let err = ""
        let newImages = []

        files.forEach(file => {
            if(!file) return err = "File does not exist."

            if(file.size > 1024 * 1024 * 5){
                return err = "The image/video largest is 5mb."
            }

            return newImages.push(file)
        })

        if(err) dispatch({ type: globaTypes.ALERT, payload: {error: err} })
        setImages([...images, ...newImages])
        console.log([...images, ...newImages])
        
    }
    console.log(images)
    const deleteImages = (index) => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }
    const hanlestream =()=>{
    
            setstream(true)
            if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
                navigator.mediaDevices.getUserMedia({video: true})
                .then(mediaStream => {
                    videoRef.current.srcObject = mediaStream
                    videoRef.current.play()
    
                    
                    const track = mediaStream.getTracks()
                setTracks(track[0])
                }).catch(err => console.log(err))
            }
        
    }

    const handleCapture = () => { 
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        refCanvas.current.setAttribute("width", width)
        refCanvas.current.setAttribute("height", height)

        const ctx = refCanvas.current.getContext('2d')
        ctx.drawImage(videoRef.current, 0, 0, width, height)
        let URL = refCanvas.current.toDataURL()
        setImages([...images, {camera: URL}])
    }
    const handleStopStream = () => {
        tracks.stop()
        setstream(false)
    }

    const handleSubmit = (e) =>{
e.preventDefault();
if(images.length === 0)
return dispatch({ 
    type: globaTypes.ALERT, payload: {error: "Please add your photo."}
})

if(status.onEdit){
    dispatch(updatePost({content, images, auth, status}))
}else{
    dispatch(createPost({content, images, auth,socket}))
}
setContent('')
setImages([])
if(tracks) tracks.stop()
dispatch({ type: globaTypes.STATUS, payload: false})
    }
    useEffect(() => {
        if(status.onEdit){
            setContent(status.content)
            setImages(status.images)
        }
    },[status])
    const imgshow =(src)=>{
        return(
            <img  alt='images' className='img-thumbnail'
            src= {src}
            />
        )
    }
    const videoshow =(src)=>{
        return(
            <video controls  alt='images' className='img-thumbnail'
            src= {src}
            />
        )
    }
  return (
    <div className="status_modal">
    <form onSubmit={handleSubmit} >
        <div className="status_header">
            <h5 className="m-0">Create Post</h5>
            <span onClick={() => dispatch({
                type: globaTypes.STATUS, payload: false
            })}>
                &times;
            </span>
        </div>

        <div className="status_body">
            <textarea name="content" value={content}
            placeholder={`${auth.user.username}, what are you thinking?`}
            onChange={e => setContent(e.target.value)}
            />
            <div className='show_images'>
     
                        {
                            images.map((img, index) => (
                                <div key={index} id="file_img">
                                   {
                                    img.camera ? imgshow(img.camera): img.url ?<>
                                    {
                                                    img.url.match(/video/i)
                                                    ? videoshow(img.url) 
                                                    : imgshow(img.url)
                                                }
                                    </> :<>
                                                {
                                                    img.type.match(/video/i)
                                                    ? videoshow(URL.createObjectURL(img)) 
                                                    : imgshow(URL.createObjectURL(img))
                                                }
                                            </>
                                   }
                                    <span onClick={() => deleteImages(index)}>&times;</span>
                                </div>
                            ))
                        }
            </div>

        
{
    stream && 
    <div className='stream position-relative'>
    <video src='' autoPlay muted ref={videoRef} width="100%" height="100%"></video> 
    <span onClick={handleStopStream}>&times;</span>
    <canvas ref={refCanvas} style={{display:"none"}}></canvas>
    </div>
}
        

            <div className="input_images">
            
                    
                        {
                            stream 
                            ? <i className="fas fa-camera" onClick={handleCapture}  />
                            : <>
                                
                        <i className="fas fa-camera" onClick={hanlestream}  />

<div className="file_upload">
    <i className="fas fa-image" />
    <input type="file" name="file" id="file"
    multiple accept="image/*,video/*" onChange={handleChangeImages}  />
</div>
                            </>
                        }
                
            </div>

        </div>

        <div className="status_footer">
            <button className="btn btn-secondary w-100" type="submit">
                Post
            </button>
        </div>

    </form>
</div>
  )
}

export default StatusModal
