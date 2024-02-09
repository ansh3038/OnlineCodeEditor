"use client"
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { signIn, signOut, useSession } from "next-auth/react";
import User from "../userinfo";
export default function NavBar() {
  const { data: session } = useSession();

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">CodeView</Navbar.Brand>
          <Nav className="ml-auto">
            {session ? (
               <> 
                <User user={session}></User>
              </>
            ) : (
              <>
                <Button
                  variant="primary"
                  className="mr-2"
                  onClick={() => signIn()}
                >
                  Login
                </Button>
                <Button variant="primary">Register</Button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
