"use client";
import Client from "@/app/components/Client";
import { useState } from "react";

export default function RenderList(clients: any) {
  const [clients1, setClients1] = useState([]);
  setClients1(clients);

  return (
    <>
      {clients1.map((client: { socketId: any; username: any; }) => (
        <Client key={client.socketId} username={client.username} />
      ))}
    </>
  );
}
