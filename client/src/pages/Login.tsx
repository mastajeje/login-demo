import { Button, Form, FormProps, Input } from "antd";

type FieldType = {
    username?: string;
    password?: string;
    remember?: boolean; 
}


export default function Login(){

    const onFinish:FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Received values:', values);
        fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }

    return (
        <div>
            <h1>Login Demo Page</h1>
            <Form
                name="login"
                style={{width:600}}
                onFinish={onFinish}
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