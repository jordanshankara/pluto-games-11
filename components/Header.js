import React from "react";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import Logo from "../public/assets/pg-logo-white.png";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import { useAuth, logOut } from "../services/firebase";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE } from "../redux/actions/header";
import { getAuth } from "firebase/auth";

function Header() {
  const isOpen = useSelector((state) => state.header.isOpen);
  const totalScore = useSelector((state) => state.score.score);
  const dispatch = useDispatch();
  const router = useRouter();
  const currentUser = useAuth();

  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);

  const toggle = () => {
    dispatch({
      type: TOGGLE,
      payload: !isOpen,
    });
  };

  const handleLogOut = () => {
    toggle();
    logOut();
    router.push("/login");
  };

  const homeNav = (e) => {
    e.preventDefault();
    setTimeout(() => {
      router.push("/");
      toggle();
    }, 100);
  };

  const aboutNav = (e) => {
    e.preventDefault();
    setTimeout(() => {
      router.push("/#about");
      toggle();
    }, 100);
  };

  const contactNav = (e) => {
    e.preventDefault();
    setTimeout(() => {
      router.push("/#contact");
      toggle();
    }, 100);
  };

  return (
    <div>
      <Head>
        <title>Pluto Games</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Binar Academy Platinum Team 2 Wave 22"
        />
        <link rel="apple-touch-icon" href="/android-chrome-192x192.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <Navbar
        dark
        className={styles.myNavbar + " navbar-expand-lg fixed-top px-md-4 py-4"}
      >
        <NavbarBrand className="fw-bold text-uppercase me-4">
          <Button
            onClick={() => history.back()}
            color="link"
            outline
            className="me-3 text-white"
          >
            <i className="fa-solid fa-circle-chevron-left"></i>
          </Button>
          <Link href="/" className="me-3">
            <img src={Logo.src} alt="Platinum Team 2" className={styles.logo} />
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem className={styles.navItem}>
              <Link href="/">
                <div
                  className={styles.pointer + " text-white nav-link"}
                  onClick={homeNav}
                >
                  Home
                </div>
              </Link>
            </NavItem>
            <NavItem className={styles.navItem}>
              <Link href="/games">
                <div
                  className={styles.pointer + " text-white nav-link"}
                  onClick={toggle}
                >
                  Games
                </div>
              </Link>
            </NavItem>
            <NavItem className={styles.navItem}>
              <Link href="/">
                <div
                  className={styles.pointer + " text-white nav-link"}
                  onClick={aboutNav}
                >
                  About
                </div>
              </Link>
            </NavItem>
            <NavItem className={styles.navItem}>
              <Link href="/">
                <div
                  className={styles.pointer + " text-white nav-link"}
                  onClick={contactNav}
                >
                  Contact
                </div>
              </Link>
            </NavItem>
          </Nav>
          <Nav className="navbar-nav">
            {!currentUser ? (
              <Link href="/login" className="nav-item border-0 mt-3 mt-lg-0">
                <a onClick={toggle}>
                  <Button
                    className={styles.myLogin + " text-uppercase fw-bold"}
                  >
                    Login
                    <span>
                      <i className="fa-solid fa-caret-right ms-2"></i>
                    </span>
                  </Button>
                </a>
              </Link>
            ) : (
              <>
                <UncontrolledDropdown nav inNavbar className={styles.navItem}>
                  <DropdownToggle nav caret id="welcomeUser">
                    Welcome, {currentUser?.displayName}
                  </DropdownToggle>
                  <DropdownMenu end className="bg-dark">
                    <DropdownItem>
                      <Link href="/profile">
                        <div className="nav-link text-warning" onClick={toggle}>
                          Profile
                        </div>
                      </Link>
                    </DropdownItem>
                    <button className="dropdown-item text-warning" disabled>
                      <div className="nav-link text-warning">
                        Current Score: {totalScore}
                      </div>
                    </button>
                  </DropdownMenu>
                </UncontrolledDropdown>

                <Button color="danger" onClick={handleLogOut}>
                  Log Out
                </Button>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
