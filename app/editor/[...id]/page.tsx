import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import EditorCom from "@/app/components/EditorCom";
import { getServerSession } from "next-auth";
import RenderList from "@/app/components/Client/renderList";

async function editor() {
  const session = await getServerSession();
  if (!session || !session?.user) {
    redirect("/api/auth/signin");
  }
  return (
    <>
      <div className="mainWrap">
        <div className="leftSide">
          <div className="leftInner">
            <h3>Connected</h3>
            <div className="clientList">
              <RenderList />
            </div>
          </div>
          <button className="btn copyBtn">Copy ROOM ID</button>
          <button className=" btn leaveBtn">
            {" "}
            <Link href="/">leave here</Link>
          </button>
        </div>
        <div className="EditorWrap">
          <EditorCom />
        </div>
      </div>
    </>
  );
}

export default editor;
