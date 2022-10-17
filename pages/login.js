import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, useAuth, signup, forgotPassword } from '../services/firebase';
import { Container, Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';
import styles from '../styles/Login.module.css';
import { toast, ToastContainer } from 'react-toastify';
import { getAuth, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { LOGIN, LOGIN_TRUE, ON_SUBMIT, REGISTER, REGISTER_TRUE } from '../redux/actions/login';
import Buttons from '../components/Button';
import { buttonProcess, ProcessTime } from '../middlewares/button';

export default function Login() {
  const login = useSelector((state) => state.login.login);
  const register = useSelector((state) => state.login.register);
  const acc = useSelector((state) => state.login.switch);
  const dispatch = useDispatch();
  const router = useRouter();
  const currentUser = useAuth();
  const auth = getAuth();
  const googleAuth = new GoogleAuthProvider();

  const onInputChange = (e) => {
    dispatch({
      type: LOGIN,
      payload: { [e.target.name]: e.target.value },
    });
  };
  const onRegisterChange = (e) => {
    dispatch({
      type: REGISTER,
      payload: { [e.target.name]: e.target.value },
    });
  };
  const toLogin = () => {
    dispatch({
      type: LOGIN_TRUE,
      payload: false,
    });
  };
  const toRegister = () => {
    dispatch({
      type: REGISTER_TRUE,
      payload: true,
    });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    forgotPassword(login.email)
      .then(() => {
        toast.success('Password reset email sent!');
      })
      .catch((err) => {
        toast.error('Error : ' + err.code);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!login.email || !login.password) {
      return toast.error('Please Insert Missing Details');
    }
    dispatch(buttonProcess());
    setTimeout(() => {
      signIn(login.email, login.password)
        .then(() => {
          dispatch({
            type: ON_SUBMIT,
          });
          toast.success('Login Success');
          router.push('/');
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }, ProcessTime);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!register.email || !register.password || !register.username) {
      return toast.error('Please Insert Missing Details');
    }
    dispatch(buttonProcess());
    setTimeout(() => {
      signup(register.email, register.password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch({
            type: ON_SUBMIT,
          });
          updateProfile(user, {
            displayName: register.username,
          });
          toast.success('Register Success');
          router.push('/');
        })
        .catch((err) => {
          toast.error(err.code);
        });
    }, ProcessTime);
  };

  const popupSignIn = (provider) => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success('Register Success');
        router.push('/');
      })
      .catch((error) => {
        toast.error(error.code);
      });
  };

  const googleSignIn = (e) => {
    e.preventDefault();
    popupSignIn(googleAuth);
  };

  return (
    <Container fluid id="login" className={styles.logContainer}>
      <ToastContainer theme="dark" />
      <Row xs="1" md="2">
        <Col className={styles.logBox1 + ' p-5'}>
          <h2 className={styles.logH2 + ' text-white'} id="titleH2">
            Join The Fun
          </h2>
        </Col>
        <Col className={styles.logBox2 + ' d-flex align-items-center justify-content-center flex-column px-4 py-5'}>
          {!currentUser ? (
            <>
              <h1 className={styles.logH1 + ' text-white'}>{acc ? 'Register' : 'Login'}</h1>

              <Form className="w-100" onSubmit={acc ? handleRegister : handleLogin}>
                {acc && (
                  <FormGroup className="mt-3">
                    <Label for="username" className="text-capitalize text-white">
                      Username
                    </Label>
                    <Input id="username" className="border-0 bg-white" name="username" placeholder="Username" type="text" onChange={onRegisterChange} value={register.username} required />
                  </FormGroup>
                )}
                <FormGroup className="mt-3">
                  <Label for="email" className="text-capitalize text-white">
                    Email
                  </Label>
                  <Input id="email" className="border-0 bg-white" name="email" placeholder="user@mail.com" type="email" onChange={acc ? onRegisterChange : onInputChange} value={acc ? register.email : login.email} required />
                </FormGroup>
                <FormGroup className="mt-3">
                  <Label for="password" className="text-capitalize text-white">
                    Password
                  </Label>
                  <Input id="password" className="border-0 bg-white" name="password" placeholder="password" type="password" onChange={acc ? onRegisterChange : onInputChange} value={acc ? register.password : login.password} required />
                </FormGroup>

                <FormGroup>
                  {!acc && (
                    <Button color="link" onClick={handleForgotPassword} className="w-100">
                      Forgot Password?
                    </Button>
                  )}
                  {/* <Button color="primary" className="mt-3 w-100" type="submit">
                    {acc ? "Register" : "Login"}
                  </Button> */}
                  <Buttons />
                </FormGroup>
              </Form>

              <Row className="w-100">
                <Col className="p-0">
                  <Button outline color="light" block onClick={googleSignIn}>
                    <i className="fa-brands fa-google me-2"></i>
                    <span>Google</span>
                  </Button>
                </Col>
              </Row>
              <div className="mt-3 text-white">{acc ? 'Already Have An Account?' : 'New to Pluto Games?'}</div>

              <Button color="link" onClick={acc ? toLogin : toRegister}>
                {acc ? 'Login Here' : 'Create your Account Here'}
              </Button>
            </>
          ) : (
            <>
              <h1 className="text-white mb-4">User Logged In</h1>
              <Link href="/">
                <Button color="danger" block>
                  Return to Home
                </Button>
              </Link>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
