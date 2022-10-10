import { useState } from "react";
import { useAuth, storageRef, editUser } from "../services/firebase";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import {
  Container,
  FormGroup,
  Col,
  Label,
  Input,
  Button,
  Form,
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
} from "reactstrap";
import styles from "../styles/Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_URL,
  CROP,
  EDIT,
  EDITOR,
  SCALE,
  USER,
  VIEW,
} from "../redux/actions/profile";
import Buttons from "../components/Button";
import { buttonProcess, ProcessTime } from "../middlewares/button";
import ImageCrop from "../components/CropImage";
import { async } from "@firebase/util";

export default function Profile(args) {
  const currentUser = useAuth();
  const [profilePic, setProfilePic] = useState(null);
  // const [modal, setModal] = useState(false);
  const [editor, setEditor] = useState(null);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  // const edit = useSelector((state) => state.profile.editToggle);
  // const user = useSelector((state) => state.profile.user.username);
  // const modal = useSelector((state) => state.profile.modal);
  // const pictureURL = useSelector((state) => state.profile.pictureURL);
  // const editor = useSelector((state) => state.profile.editor);
  // const scaleValue = useSelector((state) => state.profile.scaleValue);

  const toggle = () => {
    dispatch({
      type: CROP,
      payload: !profile.modal,
    });
  };

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

  const setEditorRef = (editor) => {
    setEditor(editor);
  };

  const onCrop = async () => {
    if (editor != null) {
      const url = editor.getImageScaledToCanvas().toDataURL();
      dispatch({
        type: CROP,
        payload: false,
      });
      dispatch({
        type: ADD_URL,
        payload: url,
      });
      fetch(url)
        .then((res) => {
          return res.blob();
        })
        .then((blob) => {
          return blob;
        });
    }
  };

  // const pictureLink = async () => {
  //   if (profile.pictureURL != null) {
  //     const res = await fetch(url);
  //     const blobFile = await res.blob();
  //     console.log(blobFile);
  //     return blobFile;
  //   }
  // };

  // console.log(pictureLink);

  const imageCropBlob = onCrop();
  console.log(imageCropBlob);

  const onScaleChange = (e) => {
    const imageScale = parseFloat(e.target.value);
    dispatch({
      type: SCALE,
      payload: imageScale,
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(buttonProcess());

      setTimeout(async () => {
        const profilePicRef = storageRef(`profile-pictures/${Date.now()}.png`);

        const metadata = {
          contentType: "image/png",
        };

        await uploadBytes(profilePicRef, profilePic, metadata);
        const photoURL = await getDownloadURL(profilePicRef);

        await editUser(profile.user, photoURL);
        dispatch({
          type: EDIT,
        });
        toast.success("Update Success!");
      }, ProcessTime);
    } catch (error) {
      toast.error(error.message);
    }
  };

  console.log(profile.modal);
  return (
    <Container fluid className={styles.profileContainer}>
      <ToastContainer theme="dark" />
      <h1 className="mb-4 text-white">My Profile Page</h1>

      <div className={styles.profileData + " p-3 p-md-4 p-lg-5"}>
        {currentUser ? (
          <>
            {profile.editToggle ? (
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
              {profile.editToggle ? (
                <FormGroup row>
                  <Col className="d-flex justify-content-center">
                    <div
                      className={styles.imgBox}
                      style={{
                        backgroundImage: `url(${profile.pictureURL})`,
                      }}
                    ></div>
                  </Col>
                </FormGroup>
              ) : (
                ""
              )}

              <FormGroup row>
                {profile.editToggle ? (
                  <>
                    <Col xs="12" md={4}>
                      <Label for="username">Profile Picture</Label>
                    </Col>
                    <Col xs="12" md={8}>
                      <Input
                        type="file"
                        name="profilePic"
                        onChange={handleProfilePic}
                        onClick={toggle}
                        className="w-100"
                        accept="image/png"
                      />
                      {/* <FormText className="text-secondary">
                        PNG Format Recommended
                      </FormText> */}
                    </Col>
                  </>
                ) : (
                  <Col className="d-flex justify-content-center">
                    <div
                      className={styles.imgBox}
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
                  {profile.editToggle ? (
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
                <Col>{profile.editToggle ? <Buttons /> : ""}</Col>
              </FormGroup>
            </Form>
            {profile.editToggle ? (
              <Button block outline color="secondary" onClick={editFalse}>
                Back
              </Button>
            ) : (
              ""
            )}
            <Modal isOpen={profile.modal} {...args}>
              <ModalHeader toggle={toggle}>Adjust your Picture</ModalHeader>
              <ModalBody>
                <ImageCrop
                  imageSrc={profilePic}
                  setEditorRef={setEditorRef}
                  scaleValue={profile.scaleValue}
                  onScaleChange={onScaleChange}
                ></ImageCrop>
              </ModalBody>
              <ModalFooter>
                <Row className="w-100">
                  <Col className="p-0">
                    <Button color="success" onClick={onCrop} block>
                      Save
                    </Button>
                  </Col>
                </Row>
              </ModalFooter>
            </Modal>
          </>
        ) : (
          <h2 className="text-white text-center">Please Log In</h2>
        )}
      </div>
    </Container>
  );
}
