import React, {useEffect, useState} from 'react';
import {db, storage} from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {doc, setDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import {Button, Col, Row, Form, Input, Upload} from "antd";


const SetDoc = () => {

    const [file, setFile] = useState('')
    const [data, setData] = useState('')
    console.log('file', file)
    const addDocColl = async (e) => {

        await setDoc(doc(db, 'cities', 'SY'), {
            name: e.city
        })
            .then(e => console.log(e))
            .catch(e => console.log(e))
    }

    const addDocs = async (e) => {
        console.log(e)
        const resp = await addDoc(collection(db, 'cities'), {
            name: e.city2,
            img: data,
            timestamp: serverTimestamp()
        })
        console.log(resp)
    }

    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData(downloadURL)
                    });
                }
            );
        };
        file && uploadFile();
    }, [file])


    return (
        <div>
            <Row>
                <Col offset={8} span={8}>


            <Form onFinish={addDocColl}>
                <Form.Item

                    // getValueFromEvent={(value) => {
                    // }}
                    name='city'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input  />
                </Form.Item>
                <Button type='primary'
                        htmlType='submit'
                > AddDoc </Button>
            </Form>

            <Form onFinish={addDocs}>
                <Upload name='image' onChange={(e) => setFile(e.fileList[0])}>
                    Upload
                </Upload>
                <Form.Item
                    // getValueFromEvent={(value) => {
                    // }}

                    name='city2'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>

                </Form.Item>
                <Button type='primary'
                        htmlType='submit'
                > AddDoc </Button>
            </Form>
                </Col>
            </Row>
        </div>
    );
};

export default SetDoc;