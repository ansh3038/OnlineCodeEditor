"use client"
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { signIn, signOut, useSession } from "next-auth/react";
import User from "../userinfo";
import { redirect, useRouter } from "next/navigation";
export default function NavBar() {
  const { data: session } = useSession();
  const route = useRouter();
  // console.log(session);
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
                <Button variant="primary" onClick={() => route.push("/register")}>Register</Button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
