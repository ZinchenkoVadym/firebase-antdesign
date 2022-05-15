import React, {useContext, useEffect} from 'react'
import {Form, Input, Checkbox, Button, PageHeader, Table, Upload} from 'antd';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "./firebase";
import {AuthContext} from "./context/authContext";
import SetDoc from "./components/setDoc";

function App() {
    const {currentUser,setCurrentUser} = useContext(AuthContext)
    const submitForm = (e) => {
        signInWithEmailAndPassword(auth, e.email, e.password)
            .then(({user}) => {
                setCurrentUser({currentUser: user})
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        let user = localStorage.getItem('user')
    },[currentUser.currentUser])


  return (
    <div className="App">
        <PageHeader
            className="site-page-header"
            title="Fire & Ant design"
        />
            <Form
                style={{
                    paddingTop: '50px'
                }}
                name="basic"
                size={'middle'}
                labelCol={{
                    span: 9,
                }}
                wrapperCol={{
                    span: 6,
                }}
                initialValues={{
                    remember: true,
                }}
                autoComplete="off"
                onFinish={submitForm}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        {
                            max: 12,
                            message: 'asd'
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 9,
                        span: 6,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 9,
                        span: 6,
                    }}
                >

                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        {currentUser.currentUser ? <div>USER 1</div> : <div>NO USER</div>
        }

        <SetDoc/>

    </div>

  );
}

export default App;
