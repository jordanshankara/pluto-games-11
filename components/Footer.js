import { Button, Container } from "reactstrap";
import styles from "../styles/Navbar.module.css";
import Logo from "../public/assets/pg-logo-white.png";
import Link from "next/link";
import Script from "next/script";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <Container className={styles.upperFooter + " d-flex py-3"}>
          <section className="d-flex justify-content-center align-items-center">
            <img src={Logo.src} alt="Platinum Team 2" />
          </section>
          <section
            className={
              styles.social +
              " d-flex justify-content-center align-items-center p-3"
            }
          >
            <Link
              href="https://facebook.com"
              className="mx-1 rounded"
              rel="noreferrer"
              target="_blank"
            >
              <Button color="warning" outline>
                <i className="fab fa-facebook-f"></i>
              </Button>
            </Link>
            <Link
              href="https://twitter.com"
              className="mx-1 rounded"
              rel="noreferrer"
              target="_blank"
            >
              <Button color="warning" outline>
                <i className="fab fa-twitter"></i>
              </Button>
            </Link>
            <Link
              href="https://instagram.com"
              className="mx-1 rounded"
              rel="noreferrer"
              target="_blank"
            >
              <Button color="warning" outline>
                <i className="fab fa-instagram"></i>
              </Button>
            </Link>
            <Link
              href="https://github.com"
              className="mx-1 rounded"
              rel="noreferrer"
              target="_blank"
            >
              <Button color="warning" outline>
                <i className="fab fa-github"></i>
              </Button>
            </Link>
          </section>
        </Container>

        <Container className="text-white text-center p-3 border-top">
          © 2020 Copyright Platinum Team 2
        </Container>
      </footer>

      <Script
        src="https://kit.fontawesome.com/8e8a593fa9.js"
        crossorigin="anonymous"
      ></Script>
    </>
  );
}
