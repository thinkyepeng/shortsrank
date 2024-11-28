import { Input, Button, message } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '@/api/user';
import { getUserInfo } from '../stores/profile';

const useLoginData = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUsername = (evt) => setUsername(evt.target.value);
  const handlePassword = (evt) => setPassword(evt.target.value);
  const handleSubmit = () => {
    if (loading) return;
    if (!username) {
      return message.warning('请输入用户名');
    }
    if (!password) {
      return message.warning('请输入密码');
    }
    setLoading(true);
    login({ username, password })
      .then(() => {
        setLoading(false);
        dispatch(getUserInfo).then(() => {
          navigate('/');
        });
      }).catch((err) => {
        setLoading(false);
        message.warning('登录失败');
      });
  };

  return {
    username, password, loading, handleUsername, handlePassword, handleSubmit,
  };
};

export default function LoginPage() {
  const {
    username, password, loading, handleUsername, handlePassword, handleSubmit,
  } = useLoginData();
  return (
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center">
      <div className="border shadow-md p-4 min-w-[300px] min-h-[300px]">
        <div className="text-center text-xl pt-4">
          登录
          {ADMIN_SITE_NAME}
        </div>
        <div className="py-8 space-y-6">
          <Input placeholder="用户名" size="large" className="block w-[300px]" value={username} onChange={handleUsername} />
          <Input placeholder="密码" size="large" className="block w-[300px]" type="password" value={password} onChange={handlePassword} />
          <div>
            <Button type="primary" block size="large" disabled={loading} loading={loading} onClick={handleSubmit}>登录</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
