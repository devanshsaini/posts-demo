import React from "react";
import type { FeedItemProps } from "../../types/types";
import HeartIcon from "../../assets/svgs/Heart.svg";
import CommentIcon from "../../assets/svgs/Comment.svg";
import ShareIcon from "../../assets/svgs/Share.svg";
import { createImagePlaceholderByName } from "../../utils/helper";
import Dialog from "../../components/Dialog";

const FeedItem: React.FC<FeedItemProps> = ({ author, content, timestamp, image, emoji }) => {
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <div className="bg-feed-muted w-[568px] rounded-[21px] mb-7">
      <div className="flex flex-col gap-2.5 bg-background m-[7px] mb-0 border border-solid border-feed-border shadow-feed rounded-[18px] p-[13px]">
        <section className="flex items-center gap-2.5">
          {image ? <img src={image} alt="" /> : createImagePlaceholderByName(author)}
          <div className="flex flex-col gap-1">
            <span className="en-feed-author-text">{author}</span>
            <span className="en-feed-timestamp-text"> {timestamp}</span>
          </div>
        </section>
        <section className="flex items-start gap-2.5">
          <span className="rounded-full p-2 bg-emoji-bg h-8 w-8 flex items-center justify-center">{emoji}</span>
          <span className="en-alternate-text text-feed-content">{content}</span>
        </section>
      </div>
      <div className="flex items-center gap-7 py-3.5 pl-6">
        <img
          src={HeartIcon}
          alt=""
          height={18}
          width={18}
          className="cursor-pointer hover:opacity-70"
          onClick={() => setOpenDialog((open) => !open)}
        />
        <img
          src={CommentIcon}
          alt=""
          height={18}
          width={18}
          className="cursor-pointer hover:opacity-70"
          onClick={() => setOpenDialog((open) => !open)}
        />
        <img
          src={ShareIcon}
          alt=""
          height={18}
          width={18}
          className="cursor-pointer hover:opacity-70"
          onClick={() => setOpenDialog((open) => !open)}
        />
      </div>
      <Dialog isOpen={openDialog} onClose={() => setOpenDialog((open) => !open)} title="Feature Unavailable">
        <p>This function is not currently implemented.</p>
      </Dialog>
    </div>
  );
};

export default FeedItem;
