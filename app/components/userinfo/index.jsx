"use client";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  JSX,
  ReactNode,
  RefObject,
  useState,
} from "react";
import Button from "react-bootstrap/Button";
import Modal, { ModalProps } from "react-bootstrap/Modal";
import { Omit, BsPrefixProps } from "react-bootstrap/esm/helpers";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Avatar from "react-avatar";
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="flex justify-between items-center"
        >
          <div className="items-center flex justify-between mx-auto">
            <div className="mr-4"> 
              {props.session.user.picture ? (
                <Avatar
                  githubHandle={props.session.user.name}
                  size="50px"
                  round="20px"
                ></Avatar>
              ) : (
                <Avatar
                  name={props.session.user.name}
                  size="50px"
                  round="20px"
                ></Avatar>
              )}
            </div>
            <div className="mx-auto">
              <h4>{props.session.user.name}</h4>
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function App() {
  const [modalShow, setModalShow] = useState(false);
  const { data: session } = useSession();
  console.log("session ", session);
  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        {session.user.picture ? (
          <Avatar
            githubHandle={session.user.name}
            size="50px"
            round="20px"
          ></Avatar>
        ) : (
          <Avatar name={session.user.name} size="50px" round="20px"></Avatar>
        )}
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        session={session}
      />
    </>
  );
}
