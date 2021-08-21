import React, { useState } from 'react';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux'; //dispatch
import { uploadUser } from '../../../_actions/user_action';

function UploadPage(props) {

    const dispatch = useDispatch();
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [Images, setImages] = useState([])

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();

        const variables = {
            description: DescriptionValue,
            images: Images
        }
        dispatch(uploadUser(variables))
        .then(response => {
            if (response.payload.uploadSuccess) {
                props.history.push('/')  //리엑트에서 페이지 이동시 props.history.push이용 function LoginPage(props) {에서 props 넣어 줬기 때문에 가능
            } else {
                alert('Failed to upload')
            }
        })
        // Axios.post('/api/users/upload', variables)
        //     .then(response => {
        //         if (response.data.success) {
        //             alert('Successfully Uploaded')
        //             props.history.push('/')
        //         } else {
        //             alert('Failed to upload')
        //         }
        //     })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto', float: 'right' }}>
            <form onSubmit={onSubmitHandler} >

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label style={{ margin_bottom: '10px'}}>Description</label>
                <textarea
                    style={{ padding: '20px', margin: '20px'}}
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br />
                <br />
                
                <button type="submit">
                        Submit
                </button>
                
                {/* <button
                    onClick={onSubmitHandler}
                >
                    Submit
                </button> */}

            </form>

        </div>
    )
}

export default withRouter(UploadPage);
