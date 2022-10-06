import { useState } from 'react';
import { signup, useAuth } from '../services/firebase';
import useRouter from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { Container, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import '../../public/assets/css/register.css';

export default function Register() {
  const [register, setRegister] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();
  const currentUser = useAuth();

  const onInputChange = (e) => {
    setRegister({ ...register, ...{ [e.target.name]: e.target.value } });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!register.email || !register.password) return toast.error('Please Insert Missing Details');
    signup(register.email, register.password)
      .then((result) => {
        router.push('/');
        toast.success('Register Success');
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <Container className="reg-container d-flex flex-column align-items-center justify-content-center">
      {!currentUser ? (
        <>
          <Row>
            <h1 className="reg-h1">Sign Up</h1>
          </Row>
          <Row>
            <Form onSubmit={handleRegister}>
              <FormGroup className="col-sm mt-4">
                <Label for="email">Email Address</Label>
                <Input id="email" name="email" placeholder="user@mail.com" type="email" onChange={onInputChange} />
              </FormGroup>
              <FormGroup className="col-sm mt-4">
                <Label for="password">Password</Label>
                <Input id="password" name="password" type="password" onChange={onInputChange} />
              </FormGroup>
            </Form>
          </Row>
          <Row>
            <Button className="reg-btn mt-5" type="submit">
              Sign Up
            </Button>
          </Row>
        </>
      ) : (
        <>
          <h2>Please Log Out Before Register Another User</h2>
        </>
      )}
    </Container>
  );
}
