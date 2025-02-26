import { Button, Form, Input } from "antd";

type FieldType = {
    username?: string;
    password?: string;
    remember?: boolean; 
}

export default function Login(){
    return (
        <div>
            <h1>Login Demo Page</h1>
            <Form
                name="login"
                style={{width:600}}
                // initialValues={{}}
            >
                <Form.Item<FieldType>
                    label='Username'
                    name='username'
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item<FieldType>
                    label='Password'
                    name='password'
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item  label={null}>
                    <Button type='primary' htmlType='submit'>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
    }