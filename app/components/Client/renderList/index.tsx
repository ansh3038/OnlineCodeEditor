"use client";
import Client from "@/app/components/Client";
import { useState } from "react";

export default function RenderList() {
  const [clients, setClients] = useState([
    { socketId: 1, username: "Naman" },
    { socketId: 2, username: "Ansh" },
    { socketId: 3, username: "unknown" },
  ]);

  return (
    <>
      {clients.map((client) => (
        <Client key={client.socketId} username={client.username} />
      ))}
    </>
  );
}
