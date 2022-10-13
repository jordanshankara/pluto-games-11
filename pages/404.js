import React from "react";
import Link from "next/link";
import { Button, Container } from "reactstrap";
import styles from "../styles/NotFound.module.css";

export default function NotFound() {
  return (
    <Container
      fluid
      className={
        styles.notFound +
        " d-flex align-items-center justify-content-center flex-column min-vh-100"
      }
    >
      <h1 className={styles.four04 + " text-white text-center mb-2"}>404</h1>
      <h4 className="text-white mb-4">Page Not Found</h4>
      <Link href="/">
        <Button color="danger">Back to Home</Button>
      </Link>
    </Container>
  );
}
