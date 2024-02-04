import { Button, Container, Nav, Navbar } from "react-bootstrap";

export default function NavBar() {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">CodeView</Navbar.Brand>
          <Nav className="ml-auto">
            <Button variant="primary" className="mr-2">Login</Button>
            <Button variant="primary">Register</Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
