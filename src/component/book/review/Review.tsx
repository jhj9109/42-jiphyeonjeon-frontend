import { reviewTabList } from "../../../constant/tablist";
import PostReview from "./PostReview";
import ShowReviews from "./ShowReviews";
import { useTabFocus } from "../../../hook/useTabFocus";
import { usePostReview } from "../../../api/reviews/usePostReview";
import { useDialog } from "../../../hook/useDialog";
import "../../../asset/css/Tabs.css";
import "../../../asset/css/Review.css";

type Props = {
  bookInfoId: string;
};

const Review = ({ bookInfoId }: Props) => {
  const { currentTab, changeTab } = useTabFocus(0, reviewTabList);
  const {
    Dialog,
    config,
    setConfig: setDialogConfig,
    setOpen: openDialog,
    setClose: closeDialog,
    setOpenTitleAndMessage,
  } = useDialog();
  const { setContent } = usePostReview({
    setOpenTitleAndMessage,
    bookInfoId: +bookInfoId,
    changeTab,
  });

  return (
    <>
      <div className="tabs">
        {reviewTabList.map((tab, index) => (
          <div
            key={tab.type}
            className={`tab tab-${
              tab.type === currentTab ? "on" : "not"
            }-focus`}
            role="button"
            tabIndex={index}
            onClick={() => changeTab(index)}
          >
            {tab?.name}
          </div>
        ))}
      </div>
      <div className="tabs-line" />
      <div className="review-list">
        {currentTab === "showReviews" ? (
          <ShowReviews bookInfoId={+bookInfoId} type="bookReviews" />
        ) : (
          <PostReview
            onClickPost={setContent}
            Dialog={<Dialog />}
            config={config}
            openDialog={openDialog}
            closeDialog={closeDialog}
            setDialogConfig={setDialogConfig}
            setOpenTitleAndMessage={setOpenTitleAndMessage}
          />
        )}
      </div>
    </>
  );
};

export default Review;
