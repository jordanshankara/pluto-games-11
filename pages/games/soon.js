import React from "react";
import Link from "next/link";
import { Button, Container } from "reactstrap";
import styles from "../../styles/NotFound.module.css";

export default function ComingSoon() {
  return (
    <Container
      fluid
      className={
        styles.notFound +
        " d-flex align-items-center justify-content-center flex-column min-vh-100"
      }
    >
      <h1 className="text-white text-center mb-3 text-uppercase">
        Coming Soon
      </h1>
      <Link href="/games">
        <Button color="danger" className="px-4">
          Back
        </Button>
      </Link>
    </Container>
  );
}
