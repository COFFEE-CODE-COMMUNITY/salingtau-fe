type LiveChatBubbleProps = {
  name: string;
  message: string;
  avatar: string;
  isSelf?: boolean;
};

export const LiveChatBubble = ({ name, message, avatar, isSelf }: LiveChatBubbleProps) => {
  return (
    <div
      className={`flex items-start space-x-2.5 max-w-xs ${
        isSelf ? "self-end flex-row-reverse space-x-reverse" : ""
      }`}
    >
      <img
        className="h-8 w-8 rounded-full object-cover"
        src={avatar}
        alt={`${name}'s avatar`}
      />
      <div
        className={`p-3 ${
          isSelf
            ? "bg-blue-100 rounded-l-lg rounded-br-lg"
            : "bg-gray-100 rounded-r-lg rounded-bl-lg"
        }`}
      >
        <p
          className={`text-sm font-semibold ${
            isSelf ? "text-blue-800" : "text-gray-800"
          }`}
        >
          {name}
        </p>
        <p
          className={`text-sm ${
            isSelf ? "text-blue-900" : "text-gray-700"
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
};
