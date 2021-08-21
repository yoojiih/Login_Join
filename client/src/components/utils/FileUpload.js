import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { withRouter } from 'react-router-dom'; 

function FileUpload(props) {

    const [Images, setImages] = useState([])
    const dropHandler = (files) => {

        // 이미지를 Ajax로 업로드할 경우 Form 전송이 필요
        let formData = new FormData()

        const config = {
            header: { 'content-type': 'multipart/form-data'}
        }

        // append를 통해 키-값 형식으로 추가
        formData.append('file', files[0])

        axios.post('/api/users/images', formData, config)
            .then(res => {
                if (res.data.success) {
                    // 서버에 최종 데이터를 전달하기 위해 저장
                    setImages([...Images, res.data.filePath])
                    // UploadPage.js로 데이터 업데이트
                    props.refreshFunction([...Images, res.data.filePath])
                } else {
                    alert('파일을 저장하는데 실패했습니다.')
                }
            })
    }

    // 이미지를 지우는 기능
    const deleteHandler = (images) => {

        const currentIndex = Images.indexOf(images)
        let newImages = [...Images]
        newImages.splice(currentIndex, 1)
        setImages(newImages)
        // 부모 컴포넌트(UploadProductPage.js)로 데이터 업데이트
        props.refreshFunction(newImages)
    }

    return (
        // 이미지 업로드 Form
        <div style={{ display: 'flex', justifyContent: 'space-between', float: 'right' }}>
            <Dropzone onDrop={dropHandler}>
                {({getRootProps, getInputProps}) => (
                    <div 
                        style={{
                            width: 300, height: 240, border: '1px solid lightgray',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                    </div>
                )}
            </Dropzone>

            {/* 업로드된 이미지를 넣을 Form */}
            <div style={{ display: 'flex', width: '350px', height: '240px'}}>
                {Images.map((images, index) => (
                    <div onClick={() => deleteHandler(images)} key={index}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
                            src={`http://localhost:5000/${images}`}
                        />
                    </div>
                    ))}
            </div>
        </div>
    )
}

export default withRouter(FileUpload);