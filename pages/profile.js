import { useState } from 'react';
import { useAuth, storageRef, editUser } from '../services/firebase';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { Container, FormGroup, Col, Label, Input, Button, Form, FormText } from 'reactstrap';
import styles from '../styles/Profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { EDIT, PROFILE_PIC, USER, VIEW } from '../redux/actions/profile';
import Buttons from '../components/Button';
import { buttonProcess, ProcessTime } from '../middlewares/button';

export default function Profile() {
  const currentUser = useAuth();
  const [profilePic, setProfilePic] = useState(null);
  const dispatch = useDispatch();
  const edit = useSelector((state) => state.profile.editToggle);
  const user = useSelector((state) => state.profile.user.username);

  const onInputChange = (e) => {
    dispatch({
      type: USER,
      payload: { [e.target.name]: e.target.value },
    });
  };

  const handleProfilePic = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
  };

  const editTrue = (e) => {
    dispatch({
      type: VIEW,
    });
  };

  const editFalse = (e) => {
    dispatch({
      type: EDIT,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(buttonProcess());

      setTimeout(async () => {
        const profilePicRef = storageRef(`profile-pictures/${Date.now()}.png`);

        const metadata = {
          contentType: "image/png",
        };

        await uploadBytes(profilePicRef, profilePic, metadata);
        const photoURL = await getDownloadURL(profilePicRef);

        await editUser(user, photoURL);
        await dispatch({
          type: EDIT,
        });
        await toast.success("Update Success!");
      }, ProcessTime);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container fluid className={styles["profile-container"]}>
      <ToastContainer theme="dark" />
      <h1 className="mb-4 text-white">My Profile Page</h1>

      <div className={styles["profile-data"] + " p-3 p-md-4 p-lg-5"}>
        {currentUser ? (
          <>
            {edit ? (
              ""
            ) : (
              <Button
                className="w-100 mb-4"
                outline
                color="warning"
                onClick={editTrue}
              >
                Edit Profile
              </Button>
            )}
            <Form onSubmit={handleSubmit} className="w-100">
              <FormGroup row>
                {edit ? (
                  <>
                    <Col xs="12" md={4}>
                      <Label for="username">Profile Picture</Label>
                    </Col>
                    <Col xs="12" md={8}>
                      <Input
                        type="file"
                        name="profilePic"
                        onChange={handleProfilePic}
                        className="w-100"
                      />
                      <FormText className="text-secondary">
                        PNG Only, other format won't be saved
                      </FormText>
                    </Col>
                  </>
                ) : (
                  <Col className="d-flex justify-content-center">
                    <div
                      className={styles["img-box"]}
                      style={{
                        backgroundImage: `url(${currentUser?.photoURL})`,
                      }}
                    ></div>
                  </Col>
                )}
              </FormGroup>
              <FormGroup row>
                <Col xs="12" md={4}>
                  <Label for="username">Username</Label>
                </Col>

                <Col xs="12" md={8} className="text-white">
                  {edit ? (
                    <>
                      <Input
                        id="username"
                        name="username"
                        placeholder={currentUser?.displayName}
                        className="w-100"
                        type="text"
                        onChange={onInputChange}
                      />
                    </>
                  ) : (
                    <div>{currentUser?.displayName}</div>
                  )}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs="12" md={4}>
                  <Label for="email">Email</Label>
                </Col>

                <Col
                  xs="12"
                  md={4}
                  className="text-white d-flex align-items-center"
                >
                  {currentUser?.email}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>{edit ? <Buttons /> : ""}</Col>
              </FormGroup>
            </Form>
            {edit ? (
              <Button block outline color="secondary" onClick={editFalse}>
                Back
              </Button>
            ) : (
              ""
            )}
          </>
        ) : (
          <h2 className="text-white text-center">Please Log In</h2>
        )}
      </div>
    </Container>
  );
}
