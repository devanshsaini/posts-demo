import React, { useRef } from "react";
import IconWrapper from "../../components/IconWrapper";
import Dialog from "../../components/Dialog";
import { getRandomEmoji } from "../../utils/helper";

import BoldIcon from "../../assets/svgs/Bold.svg";
import ItalicsIcon from "../../assets/svgs/Italics.svg";
import UnderlineIcon from "../../assets/svgs/Underlined.svg";
import BulletsIcon from "../../assets/svgs/Bullets.svg";
import NumberedIcon from "../../assets/svgs/NumberBullets.svg";
import QuotesIcon from "../../assets/svgs/Quotes.svg";
import CodeIcon from "../../assets/svgs/Code.svg";
import TrashIcon from "../../assets/svgs/Trash.svg";
import SmilieEmoji from "../../assets/svgs/SmilieEmoji.svg";
import PlusIcon from "../../assets/svgs/Plus.svg";
import MicrophoneIcon from "../../assets/svgs/Microphone.svg";
import CamerIcon from "../../assets/svgs/Camera.svg";
import SendIcon from "../../assets/svgs/Send.svg";

import User3Image from "../../../public/images/User3.svg";

import { useAuthContext } from "../../context/AuthContext";
import Loader from "../../components/Loader";

const Divider: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={`border-b border-solid border-divider w-[30px] rotate-90 ${className}`} />;
};

type FeedData = {
  author: string;
  timestamp: string;
  content: string;
  image: string;
  emoji: string;
};

type AddFeedProps = {
  setFeedData: React.Dispatch<React.SetStateAction<FeedData[]>>;
};

const AddFeed: React.FC<AddFeedProps> = ({ setFeedData }) => {
  const [post, setPost] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const postRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useAuthContext();

  const addNewFeed = () => {
    if (!post.trim()) return;

    const newFeed: FeedData = {
      author: user?.username || "Anonymous",
      timestamp: new Date().toISOString(),
      content: post,
      image: User3Image,
      emoji: getRandomEmoji(),
    };

    setLoading(true);
    setTimeout(() => {
      setFeedData((prevData) => [newFeed, ...prevData]);
      postRef.current?.focus();
      setPost("");
      setLoading(false);
    }, 2000);
  };

  const addEmojiToInput = () => {
    const emoji = getRandomEmoji();
    if (!post) setPost(() => emoji);
    else setPost((prevPost) => `${prevPost} ${emoji}`);
    postRef?.current?.focus();
  };

  const onPostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost(e?.target?.value);
  };

  return (
    <div className="bg-feed-muted w-[568px] rounded-[21px] mb-7">
      <div className="bg-background m-[7px] border border-solid border-feed-border shadow-feed rounded-[18px] p-[9px]">
        <section className="flex justify-between">
          <div className="bg-feed-muted w-fit rounded-[10px] p-1 flex items-center">
            <div className="flex gap-1">
              <IconWrapper icon={BoldIcon} active onClick={() => setOpenDialog((open) => !open)} />
              <IconWrapper icon={ItalicsIcon} onClick={() => setOpenDialog((open) => !open)} />
              <IconWrapper icon={UnderlineIcon} onClick={() => setOpenDialog((open) => !open)} />
            </div>
            <Divider />
            <div className="flex gap-1">
              <IconWrapper icon={BulletsIcon} onClick={() => setOpenDialog((open) => !open)} />
              <IconWrapper icon={NumberedIcon} onClick={() => setOpenDialog((open) => !open)} />
            </div>
            <Divider />
            <div className="flex gap-1">
              <IconWrapper icon={QuotesIcon} onClick={() => setOpenDialog((open) => !open)} />
              <IconWrapper icon={CodeIcon} onClick={() => setOpenDialog((open) => !open)} />
            </div>
          </div>
          <div
            className="bg-trash-bg hover:bg-trash-bg/70 rounded-[10px] p-3 cursor-pointer transition-colors duration-200"
            onClick={() => {
              setPost("");
              postRef?.current?.focus();
            }}
          >
            <img src={TrashIcon} alt="" height={16} width={16} />
          </div>
        </section>
        <section className="mt-3.5 flex items-start">
          <img src={SmilieEmoji} alt="" className="cursor-pointer pt-0.5 pl-[5px]" onClick={() => addEmojiToInput()} />
          <textarea
            ref={postRef}
            value={post}
            onChange={onPostChange}
            rows={5}
            placeholder="How are you feeling today?"
            className="w-full h-[120px] resize-none bg-background outline-0 placeholder:en-feed-input-text px-3 pb-2 pl-3"
          />
        </section>
        <section className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div
              className="bg-plus-bg hover:bg-plus-bg/60 rounded-[10px] p-3 cursor-pointer transition-colors duration-200"
              onClick={() => setOpenDialog((open) => !open)}
            >
              <img src={PlusIcon} alt="" />
            </div>
            <img
              src={MicrophoneIcon}
              alt=""
              className="cursor-pointer"
              onClick={() => setOpenDialog((open) => !open)}
            />
            <img src={CamerIcon} alt="" className="cursor-pointer" onClick={() => setOpenDialog((open) => !open)} />
          </div>
          {!loading ? (
            <img src={SendIcon} alt="" className="cursor-pointer" onClick={addNewFeed} />
          ) : (
            <Loader size="md" className="mr-2" color="text-primary" />
          )}
        </section>
      </div>
      <Dialog isOpen={openDialog} onClose={() => setOpenDialog((open) => !open)} title="Feature Unavailable">
        <p>This function is not currently implemented.</p>
      </Dialog>
    </div>
  );
};

export default AddFeed;
