import React from "react";
import AddFeed from "./AddFeed";
import FeedItem from "./FeedItem";
import json from "../../data/db.json";
import Dialog from "../../components/Dialog";
import SignIn from "../Signin";
import { useAuthContext } from "../../context/AuthContext";

const Feed: React.FC = () => {
  const [feedData, setFeedData] = React.useState(json);
  const [openLoginDialog, setOpenLoginDialog] = React.useState(false);
  const { user } = useAuthContext();

  const handleComponentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (user?.isAuthenticated || openLoginDialog) return;
    e.stopPropagation();
    setOpenLoginDialog(true);
  };

  React.useEffect(() => {
    if (user?.isAuthenticated) {
      setOpenLoginDialog(false);
    }
  }, [user?.isAuthenticated]);

  return (
    <div className="flex flex-col items-center h-full w-screen my-32" onClickCapture={handleComponentClick}>
      <AddFeed setFeedData={setFeedData} />
      {feedData.map((item, index) => (
        <FeedItem
          key={`${item?.author}-${item.timestamp}-${index + 1}`}
          author={item?.author}
          content={item?.content}
          timestamp={item?.timestamp}
          image={item?.image}
          emoji={item?.emoji}
        />
      ))}
      <Dialog variant="headless" isOpen={openLoginDialog} onClose={() => setOpenLoginDialog(false)}>
        <div className="no-login-trigger">
          <SignIn />
        </div>
      </Dialog>
    </div>
  );
};

export default Feed;
