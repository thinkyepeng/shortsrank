import { useEffect } from 'react'
import { handleToken } from '@/api/user'
import Modal from '@/components/ui/modal'
import './login-modal.css'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo, hideLoginModal } from '@/stores/profile'
import { AppDispatch, RootState } from '@/stores'
const logo = require('@/assets/img/logo.jpg')

declare var google: any;
declare var GOOGLE_CLIENT_ID: any;
declare var SITE_NAME: any;

export default function LoginModal() {
  const dispatch = useDispatch<AppDispatch>()
  const { modal } = useSelector((state: RootState) => state.profile)
  const handleCredentialResponse = (data:any) => {
    handleToken(data.credential).then(() => {
      dispatch(hideLoginModal())
      dispatch(getUserInfo)
    })
  }
  const handleClose = () => {
    dispatch(hideLoginModal())
  }
  useEffect(() => {
    if (modal) {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse
      });
      google.accounts.id.renderButton(
        document.querySelector('.g_id_signin'),
        {
          theme: 'outline',
          size: 'large',
        }
      )
    }
  }, [modal])
  return (
    <Modal visible={modal}>
      <div  className="login-modal-1">
        <div className="login-modal-2" onClick={handleClose}>x</div>
        <img
          alt=""
          src={logo}
          className="login-modal-3"
        />
        <p  className="login-modal-5">Welcome to {SITE_NAME}!</p>
        <div className='relative w-full h-[56px]'>
          <img
            alt=""
            src={require('@/assets/img/google.png')}
            className="login-modal-7"
          />
          <div id="buttonDiv" className="login-modal-8">
            <div className="login-modal-9">
              <div className="login-modal-10"></div>
              </div>
              <div id="g_id_onload"
                data-client_id={GOOGLE_CLIENT_ID}
                data-context="signin"
                data-ux_mode="popup"
                data-login_uri="https://localhost:3003/api/users/oauth/google/login"
                data-auto_select="true"
                data-auto_prompt="false">
              </div>
              <div className="g_id_signin"
                  data-type="standard"
                  data-shape="pill"
                  data-theme="outline"
                  data-text="signin_with"
                  data-size="large"
                  data-logo_alignment="left">
              </div>
          </div>
        </div>
        <p  className="login-modal-12">
          If you continue,you agree to the{' '}
          <a  href="./terms.html" className="login-modal-13"
            >Terms of Service</a>
          {' '}and{' '}
          <a  href="./privacy.html" className="login-modal-14"
            >Privacy Policy</a>
        </p>
      </div>
    </Modal>
  )
}