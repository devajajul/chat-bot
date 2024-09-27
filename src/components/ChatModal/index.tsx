import { useEffect, useRef, useState } from "react";
import { Button, Input, Modal } from "antd";
import axios from "axios";
import { IoCall, IoClose } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { LiaHourglassEndSolid } from "react-icons/lia";
import { BsCapsule } from "react-icons/bs";
import { FaUserGraduate } from "react-icons/fa6";
import { RiMedicineBottleFill } from "react-icons/ri";
import Logo from "../../assets/logo.png";
import Profile from "../../assets/profile.png";
import MessageBlock, { MessageItemI } from "../MessageBlock";
import "./index.scss";

type ChatMessage = {
  type: "receiver" | "sender";
  text: string;
  name: string;
};

const defaultIteam: MessageItemI[] = [
  {
    icon: <LiaHourglassEndSolid />,
    text: "Cost & Savings",
  },
  {
    icon: <BsCapsule />,
    text: "Information on the medicine",
  },
  {
    icon: <FaUserGraduate />,
    text: "Find a doctor for condition",
  },
  {
    icon: <RiMedicineBottleFill />,
    text: "I have do i get a prior authorisation",
  },
  {
    icon: <LiaHourglassEndSolid />,
    text: "Find pharmacy where is available",
  },
  {
    icon: <RiMedicineBottleFill />,
    text: "I have do i get a prior authorisation",
  },
  {
    icon: <LiaHourglassEndSolid />,
    text: "Find pharmacy where is available",
  },
];

const ChatModal = (props: { openModal: boolean; handleClose: () => void }) => {
  const { openModal, handleClose } = props;
  const [input, setInput] = useState("");
  const [messageItem, setMessageItem] = useState<ChatMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    setMessageItem([
      ...messageItem,
      { type: "sender", text: input, name: "you" },
    ]);
    sendMessageAPI();
    setInput("");
  };

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageItem]);

  const sendMessageAPI = () => {
    const newmessageItem: ChatMessage[] = [
      ...messageItem,
      { type: "sender", text: input, name: "you" },
    ];
    const data = JSON.stringify({
      input: {
        input: JSON.stringify(input),
      },
      config: {
        configurable: {
          session_id: "npqlz6edjj",
        },
      },
      kwargs: {},
    });
    const config = {
      method: "post",
      url: "https://chat-dev.healthbackend.com/core-bot/invoke",
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setMessageItem([
          ...newmessageItem,
          {
            type: "receiver",
            text: response.data.output.output,
            name: "Jena - TheRxAssistant",
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal
      open={openModal}
      className="chat-modal"
      closeIcon={null}
      title={null}
      footer={null}
    >
      <div className="chat-container">
        <div className="header-container">
          <div className="left-block">
            <img alt="logo" src={Logo}></img>
            <span>
              The<b>Rx</b>Assistant
            </span>
          </div>
          <div className="right-block">
            <Button icon={<IoCall />} type="text" shape="circle"></Button>
            <Button icon={<MdMessage />} type="text" shape="circle"></Button>
          </div>
          <div className="close-btn-block">
            <Button
              icon={<IoClose size={20} />}
              type="text"
              shape="circle"
              onClick={handleClose}
            ></Button>
          </div>
        </div>
        <div className="modal-body-container">
          <div className="profile-block">
            <div className="profile-img">
              <img alt="profile" src={Profile}></img>
            </div>
            <div className="profile-info">
              <span>Jena</span>
              <p>Ready for Medical Assitance</p>
            </div>
          </div>

          <div className="body-container-inner">
            {(messageItem.length > 0 ? messageItem : defaultIteam).map((item: MessageItemI) => <MessageBlock key={item.text} item={item} />)}
          </div>
          <div ref={chatEndRef} />
        </div>
        <div className="footer-container">
          <div className="message-input-block">
            <Input
              size="large"
              placeholder="Message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={(e) => handleKeyPress(e)}
            />
          </div>
          <Button
            size="large"
            className="send-button"
            type="primary"
            shape="circle"
            icon={<IoIosSend size={20} />}
            onClick={() => sendMessage()}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ChatModal;
