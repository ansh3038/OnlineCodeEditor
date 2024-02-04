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
function MyVerticallyCenteredModal(
  props: JSX.IntrinsicAttributes &
    Omit<
      Omit<
        DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
        "ref"
      > & {
        ref?:
          | ((instance: HTMLDivElement | null) => void)
          | RefObject<HTMLDivElement>
          | null
          | undefined;
      },
      BsPrefixProps<"div"> & ModalProps
    > &
    BsPrefixProps<"div"> &
    ModalProps & { children?: ReactNode }
) {
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
            <div><Image
              src={props.session?.user?.image}
              alt={props.session?.user?.name}
              width={60}
              height={60}
            ></Image>
            </div>
            <div className="mx-auto"><h4>{props.session.user.name}</h4></div>
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

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        <Image
          src={session?.user?.image}
          alt={session?.user?.name}
          width={20}
          height={20}
        ></Image>
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        session={session}
      />
    </>
  );
}
