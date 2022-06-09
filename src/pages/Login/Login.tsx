import React, { FC, useState } from "react";
import { Input, Button } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./Login.scss"
import { useNavigate } from "react-router-dom";
import Http from "../../api/http";

const Login: FC = () => {
    const [loginForm, setLoginForm] = useState({ username: '', password: '' })
    const navagate = useNavigate()

    const login = () => {
        Http.post('login', loginForm).then(res => {
            navagate('/')
        })
    }
    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-title">登录</div>
                <Input
                    className="login-input"
                    placeholder="default size"
                    prefix={<UserOutlined />}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                />
                <Input.Password
                    className="login-input"
                    placeholder="input password"
                    prefix={<LockOutlined />}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                />
                <Button className="login-button" type="primary" onClick={login}>登录</Button>
            </div>
        </div>
    )
}
export default Login