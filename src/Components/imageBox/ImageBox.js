import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, CardImg, CardTitle, CardFooter, Button, CardBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ImageBox() {
    const [images, setImages] = useState(["", "", "", "", "", "",]);
    const boxRef = useRef([]);

    const sortBoxes = (a, b) => isInValidObject(a) ? 1 : isInValidObject(b) ? -1 : 0;

    const UpdateImage = (idx, val) => {
        let tempObj = [...images];
        tempObj[idx] = val;
        setImages(tempObj.sort(sortBoxes));
    }

    const isInValidObject = obj => obj == undefined || obj == null || obj == "" ? true : false;

    const imageHandler = idx => ({ target }) => {
        if (target.files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    UpdateImage(idx, reader.result);
                }
            }

            reader.readAsDataURL(target.files[0]);
        }
    };

    const removeImage = (idx) => {
        UpdateImage(idx, "");
    }
    function handleClick(idx) {
        return boxRef.current[idx]?.click();
    }

    function box(val, idx) {
        return (
            <Col sm="2">
                <Card color="primary" onClick={() => handleClick(idx)}>
                    {val && <CardImg src={val} alt='Upload Image' height="150px" width="150px" />}
                    {isInValidObject(val) &&
                        <CardBody>
                            <CardTitle>
                                {isInValidObject(val) && 'Upload Image'}
                                <input
                                    type="file"
                                    className="form-control-file"
                                    accept="image/*"
                                    onChange={imageHandler(idx)}
                                    style={{ display: 'none' }}
                                    ref={x => boxRef.current[idx] = x}
                                />
                            </CardTitle>
                        </CardBody>
                    }
                </Card>
                {val && <card>
                    <CardFooter className="text-muted" >
                        <Button color="danger" onClick={() => removeImage(idx)}>Remove Image</Button>
                    </CardFooter>
                </card>
                }

            </Col>
        );
    }


    return (
        <Row>
            {images.map(box)}
        </Row>
    );

}

export default ImageBox;