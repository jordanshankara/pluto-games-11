import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Button,
  Input,
  CardImg,
  UncontrolledCarousel,
} from "reactstrap";
import styles from "../styles/Home.module.css";

import cardscommunity from "../public/assets/cardscommunity.jpg";
import cardstournaments from "../public/assets/cardsgametournaments.jpg";
import cardslivestreaming from "../public/assets/cardslivestreaming.jpg";
import Logo from "../public/assets/pg-logo-white.png";
import carouselfortnite from "../public/assets/carouselfortnite.png";
import carouselrockpaperscissor from "../public/assets/rps.jpg";
import carouselstray from "../public/assets/carouselstray.jpg";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Container
        fluid
        id="home"
        className={
          styles.cover +
          " text-white d-flex flex-column justify-content-center align-items-center"
        }
      >
        <img src={Logo.src} alt="Logo" className={styles.logo} />
        <h4 className="text-capitalize my-4 text-center">
          Play fun and challenging games with your friends.
        </h4>
        <Link href="/games" className="text-decoration-none text-dark">
          <Button
            outline
            color="warning"
            className={styles.playButton + " fw-bold px-md-5 py-md-3"}
          >
            PLAY NOW
          </Button>
        </Link>
      </Container>
      <Container id="about" fluid className={styles.homeSlider}>
        <Container className={styles.about + " text-white pb-5"}>
          <h2 className="text-center mb-3">WHO ARE WE?</h2>
          <p className="text-center mb-5">We are Pluto Games team two!</p>
          <p className="px-md-5">
            We are an independent video game developer based in Indonesia. We
            develop, publish and distribute multiplayer mobile games. Currently,
            we reach an incredible 11 players each month, and our audience keeps
            growing. Founded in 2022, we have successfully grown a huge global
            audience in over Indonesia. We have also grown in size by recruiting
            brilliant people, working with, and acquiring studios worldwide to
            help us fulfil our purpose.
          </p>
        </Container>
        <Container className="pt-5">
          <h2 className="text-white text-center mb-5">GAMES HIGHLIGHT</h2>
          <UncontrolledCarousel
            items={[
              {
                altText: "F O R T N I T E",
                caption:
                  "Nulla vitae elit libero, a pharetra augue mollis interdum.",
                key: 1,
                src: carouselfortnite.src,
              },
              {
                altText: "ROCK PAPER SCISSOR",
                caption:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                key: 2,
                src: carouselrockpaperscissor.src,
              },
              {
                altText: "S T R A Y",
                caption:
                  "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
                key: 3,
                src: carouselstray.src,
              },
            ]}
          />
        </Container>
      </Container>

      <Container fluid className={styles.community}>
        <Row md="3" xs="1">
          <Col>
            <Card className={styles.card + " mb-4"}>
              <CardImg alt="Card Community" src={cardscommunity.src} />
              <CardBody className="p-md-4">
                <CardTitle className="text-center fw-bold">
                  BIGGEST COMMUNITY
                </CardTitle>
                <CardText className={styles.cardText}>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card className={styles.card + " mb-4"}>
              <CardImg alt="Card Tournament" src={cardstournaments.src} />
              <CardBody className="p-md-4">
                <CardTitle className="text-center fw-bold">
                  E-SPORT TOURNAMENTS
                </CardTitle>
                <CardText className={styles.cardText}>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card className={styles.card + " mb-4"}>
              <CardImg alt="Card Community" src={cardslivestreaming.src} />
              <CardBody className="p-md-4">
                <CardTitle className="text-center fw-bold">
                  LIVE STREAMING
                </CardTitle>
                <CardText className={styles.cardText}>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container fluid id="contact" className={styles.contact}>
        <h2 className="text-white mb-5">CONTACT US</h2>
        <Form>
          <FormGroup floating className="mb-4" controlid="formBasicEmail">
            <Input id="name" type="Name" placeholder="Enter your name" />
            <Label id="name">Name</Label>
          </FormGroup>
          <FormGroup floating className="mb-4" controlid="formBasicEmail">
            <Input id="email" type="email" placeholder="Enter email" />
            <Label id="email">Email address</Label>
          </FormGroup>
          <FormGroup floating className="mb-4" controlid="formBasicEmail">
            <Input
              id="message"
              type="Message"
              placeholder="Enter your message"
            />
            <Label id="message">Message</Label>
          </FormGroup>
          <Button outline color="warning" type="submit" className="w-100">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}
