import Link from "next/link";
import {
  Container,
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
} from "reactstrap";
import styles from "../../styles/Games.module.css";
import plutogame from "../../public/assets/pg-logo-white.png";
import Loading from "../../components/Loading.js";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchGames } from "../../middlewares/games";
import { ToastContainer } from "react-toastify";

export default function Games() {
  const games = useSelector((state) => state.games);
  const played = useSelector((state) => state.history.true);

  const dispatch = useDispatch();

  const loadState = () => {
    switch (games.state) {
      case "LOADING": {
        return (
          <div className="w-100 d-flex justify-content-center">
            <Loading></Loading>
          </div>
        );
      }
      case "SUCCESS": {
        return (
          <Row xs="1" md="2">
            {games.gameData?.map((item, i) => {
              return (
                <Col className="mb-3" key={i}>
                  <Link
                    href={`/games/${i}`}
                    className="text-decoration-none text-dark"
                  >
                    <Card className={styles.cardGamelist}>
                      <CardImg
                        alt="Sample"
                        src={item.imageURL}
                        className="img-fluid"
                      />
                      <CardBody className="text-center">
                        <CardTitle
                          className="text-center text-uppercase fw-bold"
                          tag="h5"
                        >
                          {item.name}
                        </CardTitle>

                        {item?.slug ? (
                          <CardText className="text-white">
                            <div
                              className={
                                played.length !== 0 &&
                                played.map((item) => {
                                  if (item == i) {
                                    return " text-danger ";
                                  }
                                })
                              }
                            >
                              already played
                            </div>
                          </CardText>
                        ) : (
                          <CardText className="text-danger">
                            COMING SOON
                          </CardText>
                        )}
                      </CardBody>
                    </Card>
                  </Link>
                </Col>
              );
            })}
          </Row>
        );
      }
      case "ERROR": {
        return (
          <div>
            <h2 className="text-white">{games.error}</h2>
          </div>
        );
      }

      default: {
        return (
          <div>
            <Loading></Loading>
          </div>
        );
      }
    }
  };

  useEffect(() => {
    dispatch(fetchGames());
  }, []);

  return (
    <>
      <ToastContainer />
      <Container
        fluid
        className={
          styles.title +
          " d-flex align-items-center justify-content-center flex-column m-0"
        }
      >
        <img
          className={styles.pgLogo}
          src={plutogame.src}
          alt="Logo"
          width="200px"
        />
        <h1 className="text-white text-center mt-4">Discover our games!</h1>
      </Container>

      <Container
        fluid
        className={
          styles.listGames + " d-flex align-items-center justify-content-center"
        }
      >
        {loadState()}
      </Container>
    </>
  );
}
