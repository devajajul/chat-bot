import "./index.scss";

export interface MessageItemI {
  type?: string;
  text: string;
  name?: string;
  icon?: React.ReactNode | React.ReactElement;
}
interface MessageBlockI {
  item: MessageItemI;
}

const MessageBlock = (props: MessageBlockI) => {
  const { item } = props;
  const isSenderMessage = item?.type === "sender";

  return (
    <div
      className={`chat-message-block ${
        isSenderMessage ? "sender-message-block" : ""
      }`}
    >
      <span className="name-info">{item?.name}</span>
      <div
        className={`message-text-block ${
          isSenderMessage ? "sender-message" : ""
        }`}
      >
        {item?.icon && <div className="message-icon">{item.icon}</div>}
        <p>{item.text}</p>
      </div>
    </div>
  );
};

export default MessageBlock;
