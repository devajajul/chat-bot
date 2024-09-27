import { Button, Input, Modal } from "antd";
import { IoCall, IoClose } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { LiaHourglassEndSolid } from "react-icons/lia";
import { BsCapsule } from "react-icons/bs";
import { FaUserGraduate } from "react-icons/fa6";
import { RiMedicineBottleFill } from "react-icons/ri";
import Logo from "../../assets/logo.png";
import Profile from "../../assets/profile.png";
import "./index.scss";

const ChatModal = (props: { openModal: boolean; handleClose: () => void }) => {
  const { openModal, handleClose } = props;
  const items = [
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

  return (
    <>
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
              <img src={Logo}></img>
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
                <img src={Profile}></img>
              </div>
              <div className="profile-info">
                <span>Jena</span>
                <p>Ready for Medical Assitance</p>
              </div>
            </div>

            <div className="body-container-inner">
              {items.map((item) => (
                <MessageBlock item={item} />
              ))}
            </div>
          </div>
          <div className="footer-container">
            <div className="message-input-block">
              <Input size="large" placeholder="Message" />
            </div>
            <Button
              size="large"
              className="send-button"
              type="primary"
              shape="circle"
              icon={<IoIosSend size={20} />}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ChatModal;

interface MessageItemI {
  icon?: React.ReactNode;
  text: string;
}
interface MessageBlockI {
  item: MessageItemI;
}
const MessageBlock = (props: MessageBlockI) => {
  const { item } = props;
  return (
    <div className="chat-message-block">
      {item?.icon && <div className="message-icon">{item.icon}</div>}
      <p>{item.text}</p>
    </div>
  );
};
