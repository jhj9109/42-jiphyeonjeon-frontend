import { DragEventHandler } from "react";
import { useGetTagsSuperTagIdSub } from "../../api/tags/useGetTagsSuperTagIdSub";
import { useDeleteTagsSuper } from "../../api/tags/useDeleteTagsSuper";
import { usePatchTagsBookInfoIdMerge } from "../../api/tags/usePatchTagsBookInfoIdMerge";
import { Tag } from "../../types";
import useDialog from "../../hook/useDialog";
import Accordion from "../utils/Accordion";
import SuperTagMergeSubTag from "./SuperTagMergeSubTag";
import Droppable from "../utils/Droppable";
import Image from "../utils/Image";
import TrashIcon from "../../img/trash.svg";

type Props = {
  bookInfoId: number;
  tag: Tag;
  removeTag: (tagId: number) => void;
};

const SuperTagMergeAccordion = ({ bookInfoId, tag, removeTag }: Props) => {
  const { Dialog, setOpenTitleAndMessage } = useDialog();
  const { subTagList, toggleOpened, addSubTag, removeSubTag } =
    useGetTagsSuperTagIdSub({
      tagId: tag.id,
      setOpenTitleAndMessage,
    });
  const { deleteTag } = useDeleteTagsSuper({
    removeTag,
    setOpenTitleAndMessage,
  });

  const { setParams } = usePatchTagsBookInfoIdMerge({
    bookInfoId,
    setOpenTitleAndMessage,
  });

  const addNewListAndMergeIfMoved: DragEventHandler = e => {
    const stringifiedTag = e.dataTransfer.getData("text/plain");
    const { superTag: previousSuperTag, subTag } = JSON.parse(stringifiedTag);
    addSubTag(subTag);
    if (previousSuperTag?.id !== tag.id) {
      setParams({ superTag: tag, subTag });
    }
  };

  return (
    <div className="super-tag__accordion__wrapper">
      <Dialog />
      <Accordion
        summaryButtonClassName="super-tag__accordion__summary"
        summaryUI={
          <>
            <span className="super-tag__accordion__super-text">
              {tag.content}
            </span>
            <button
              className="super-tag__accordion__delete"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                deleteTag(tag.id);
              }}
            >
              <Image src={TrashIcon} alt={`delete ${tag.content}`} />
            </button>
          </>
        }
        detailUI={
          <Droppable
            className="super-tag__accordion__detail"
            onDrop={addNewListAndMergeIfMoved}
          >
            <div className="super-tag__sub-tags">
              {subTagList.map(subTag => (
                <SuperTagMergeSubTag
                  superTag={tag}
                  subTag={subTag}
                  key={subTag.id}
                  removePreviousList={removeSubTag}
                />
              ))}
            </div>
          </Droppable>
        }
        onChange={toggleOpened}
      />
    </div>
  );
};

export default SuperTagMergeAccordion;
