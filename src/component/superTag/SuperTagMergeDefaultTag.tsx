import { useState } from "react";
import { Tag } from "../../types";
import Accordion from "../utils/Accordion";
import SearchBar from "../utils/SearchBar";
import SuperTagMergeSubTag from "./SuperTagMergeSubTag";
import Droppable from "../utils/Droppable";
import { usePatchTagsBookInfoIdMerge } from "../../api/tags/usePatchTagsBookInfoIdMerge";
import useDialog from "../../hook/useDialog";

type Props = {
  bookInfoId: number;
  defaultTagList: Tag[];
  removeTag: (id: number) => void;
  addTag: (tag: Tag) => void;
};

const SuperTagMergeDefaultTag = ({
  bookInfoId,
  defaultTagList,
  addTag,
  removeTag,
}: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const defaultTagFiltered = defaultTagList.filter(tag =>
    tag.content.includes(searchInput),
  );

  const { setOpenTitleAndMessage } = useDialog();

  const { setParams } = usePatchTagsBookInfoIdMerge({
    bookInfoId,
    setOpenTitleAndMessage,
  });

  const addNewListAndMergeIfMoved = (stringifiedData: string) => {
    const { superTag: previousSuperTag, subTag } = JSON.parse(stringifiedData);
    addTag({ ...subTag, type: "default" });
    if (previousSuperTag.id) {
      setParams({ superTag: null, subTag });
    }
  };

  return (
    <div className="super-tag__accordion__wrapper">
      <Accordion
        summaryButtonClassName="super-tag__accordion__summary"
        summaryUI={<span>분류없음</span>}
        initialOpened={true}
        detailUI={
          <Droppable
            className="super-tag__accordion__detail"
            format="text/plain"
            onDropped={addNewListAndMergeIfMoved}
          >
            <SearchBar
              wrapperClassName="super-tag__default__search-bar"
              width="short"
              placeHolder="분류없음 내 검색"
              setQuery={setSearchInput}
              isFocusedOnMount={false}
            />
            <div className="super-tag__sub-tags">
              {defaultTagFiltered.map(tag => (
                <SuperTagMergeSubTag
                  superTag={null}
                  subTag={tag}
                  key={tag.id}
                  removePreviousList={removeTag}
                />
              ))}
            </div>
          </Droppable>
        }
      />
    </div>
  );
};

export default SuperTagMergeDefaultTag;
