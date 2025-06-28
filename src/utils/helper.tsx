export const getRandomEmoji = (): string => {
  const emojis = [
    "😀",
    "😂",
    "😍",
    "😎",
    "🤔",
    "😢",
    "😡",
    "🥳",
    "🤗",
    "😴",
    "🙈",
    "🙉",
    "🙊",
    "💖",
    "🎉",
    "🎂",
    "🍕",
    "🍔",
    "🍟",
    "🌮",
    "🌯",
    "🍣",
    "🍦",
    "🍩",
    "🍿",
    "🥤",
    "☕️",
    "🍵",
    "🍺",
    "🍷",
    "🍸",
    "🍹",
    "🍾",
    "🥂",
    "🏆",
    "🎖️",
    "🏅",
    "🎗️",
    "🎯",
    "🎮",
    "🎲",
    "🎳",
    "🎤",
    "🎸",
    "🎹",
    "🎺",
    "🎻",
    "🎷",
    "🎬",
    "🎨",
  ];
  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
};

const getRandomLightBgAndTextColor = (): { bgColor: string; textColor: string } => {
  const lightColors = [
    { bgColor: "#FDE68A", textColor: "#92400E" }, // yellow-200 bg, amber-900 text
    { bgColor: "#BFDBFE", textColor: "#1E3A8A" }, // blue-200 bg, blue-900 text
    { bgColor: "#C4B5FD", textColor: "#4C1D95" }, // purple-200 bg, purple-900 text
    { bgColor: "#FBCFE8", textColor: "#831843" }, // pink-200 bg, pink-900 text
    { bgColor: "#BBF7D0", textColor: "#065F46" }, // green-200 bg, green-900 text
    { bgColor: "#FECACA", textColor: "#7F1D1D" }, // red-200 bg, red-900 text
    { bgColor: "#DDD6FE", textColor: "#5B21B6" }, // indigo-200 bg, indigo-900 text
  ];

  return lightColors[Math.floor(Math.random() * lightColors.length)];
};

export const createImagePlaceholderByName = (authorName: string) => {
  if (!authorName) return null;

  const initials = authorName
    .split(" ")
    .map((name) => name?.[0]?.toUpperCase())
    .join("");

  const { bgColor, textColor } = getRandomLightBgAndTextColor();

  return (
    <div
      className="border p-2 rounded-[7px] h-[37px] w-[37px] flex items-center justify-center font-semibold text-sm"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {initials}
    </div>
  );
};
