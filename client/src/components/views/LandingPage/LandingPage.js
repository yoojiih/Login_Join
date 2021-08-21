// import React from 'react';
import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'; 

import { USER_SERVER } from '../../Config';
import { useSelector } from "react-redux";

import { useDispatch } from 'react-redux'; //dispatch


// main 페이지!!
function LandingPage(props) {
    const user = useSelector(state => state.user)
    const [Image, setImage] = useState([])
    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")


    // useEffect(() => {
    //     axios.get('/api/hello')
    //         .then(response => { console.log(response) })
    // }, [])

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>
            <input type="image" id="image" alt="사진" src={user.images}></input>
            <p> {user.title} </p>
            <p> {user.description} </p>

            <a href="/upload">업로드</a>
        </div>
    )
}

export default withRouter(LandingPage);

// import { Icon, Col, Card, Row} from 'antd'
// import Meta from 'antd/lib/card/Meta'
// import ImageSlider from '../../utils/ImageSlider'

// function LandingPage() {
    
//     // 1. 렌더카드, 이미지슬라이더
//     const [Products, setProducts] = useState([])
//     const renderCards = Products.map((product, index) => {
//         return <Col lg={6} md={8} xs={24} key={index}>
//             <a href={`/upload/${product._id}`}><ImageSlider images={product.images} /></a>
//                 <Meta
//                     title={product.title}
//                     description={`$${product.price}`}
//                 />
//             </Card>
//         </Col> 
//     })

//     return (

//         <div style={{ width: '75%', margin: '3rem auto' }}>

//             <Row gutter={[16, 16]}>
//                 {renderCards}
//             </Row>

//         </div>
//     )
// }