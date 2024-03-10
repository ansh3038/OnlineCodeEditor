"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";
import Form from "react-bootstrap/Form";
import NavBar from "./components/navbar";
export default function Home() {
  const [roomId, setRoomId] = useState("");
  const route = useRouter();

  const joinMeet = () => {
    if (roomId == "") {
      return;
    }
    route.push(`/editor/${roomId}`);
  };
  const createMeet = () => {
    const id = uuidV4();
    setRoomId(id);
    route.push(`/editor/${id}`);
  };

  return (
    <>
      
      <div className="flex items-center justify-center h-screen ">
        <div className="w-30 mx-10">
          <Form.Control
            type="text"
            id="inputLink"
            className="flex bg-slate-50"
            placeholder="Enter Code"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </div>
        <Button variant="secondary" className="mr-10" onClick={joinMeet}>
          Join Meet
        </Button>
        OR
        <Button variant="primary" className="mx-10" onClick={createMeet}>
          Create a new Link
        </Button>
        <Form.Label></Form.Label>
      </div>
      <footer className="flex items-center justify-content-center flex-col">
        Built by &nbsp;
        <Link href="https://github.com/ansh3038">Ansh Singla</Link>
        <Link href="">Naman Sharma</Link>
      </footer>
    </>
  );
}
