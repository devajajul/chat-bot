import { useState } from "react";
import { Button } from "antd";

import ChatModal from "../components/ChatModal";

function Chat() {
  const [openModal, setOpenModal] = useState(true);

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Chat now</Button>
      <ChatModal openModal={openModal} handleClose={()  => setOpenModal(false)}/>
    </>
  );
}

export default Chat;