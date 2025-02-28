import {Button, Form, FormProps, Input} from 'antd';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

import useAuth from '../hooks/useAuth.tsx';

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

export default function Login() {
  // const [token, setToken] = useAtom(tokenAtom)
  const {login, isAuthenticated} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Token:', isAuthenticated);
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    if (!values.username || !values.password) {
      console.error('Username and password are required');
      return;
    }

    const user = {username: values.username, password: values.password};
    login(user);
    navigate('/');
  };

  return (
    <div>
      <h1>Login Demo Page</h1>
      <Form
        name="login"
        style={{width: 600}}
        onFinish={onFinish}
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{required: true, message: 'Please input your username!'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{required: true, message: 'Please input your password!'}]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
