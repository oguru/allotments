import React, {useLayoutEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import styles from "../Notice/Notice.module.scss";
import {noticeButtons} from "../AdminNotice/AdminNotice.module.scss";
import {formatDate} from "../../util/utils";

const MIN_TEXTAREA_HEIGHT = 32;

const NoticeEditor = (props) => {
   const {
      handleSave,
      handleCancel,
      item
   } = props;

   NoticeEditor.propTypes = {
      handleSave: PropTypes.func,
      handleCancel: PropTypes.func,
      item: PropTypes.object
   };

   const [title, setNewTitle] = useState(item?.title || "");
   const [desc, setNewDesc] = useState(item?.desc || "");
   const textareaRef = useRef(null);

   useLayoutEffect(() => {
      // Reset height - important to shrink on delete
      textareaRef.current.style.height = "inherit";
      // Set height
      textareaRef.current.style.height = `${Math.max(
         textareaRef.current.scrollHeight,
         MIN_TEXTAREA_HEIGHT
      )}px`;
   }, [desc]);

   return (
      <div
         className={`card border shadow-sm ${item ? "mt-5" : "mt-3"}`}
         data-test="noticeEditor"
      >
         <div className={`${styles.noticeHeader} card-header d-flex justify-between`}>
            <input
               className={`${styles.noticeInput} flex-grow-1 mr-3 rounded`}
               onChange={(e) => setNewTitle(e.target.value)}
               placeholder="Notice title goes here..."
               value={title}
            />
            <p className="card-text m-auto text-muted small">
               {item?.date || formatDate(new Date())}
            </p>
         </div>
         <div className="card-body">
            <textarea
               className={`${styles.textWrap} ${styles.noticeInput} info-item-text card-text w-100`}
               onChange={(e) => setNewDesc(e.target.value)}
               placeholder="Notice title goes here..."
               ref={textareaRef}
               style={{
                  minHeight: MIN_TEXTAREA_HEIGHT,
                  resize: "none",
                  overflow: "hidden"
               }}
               value={desc}
            />
         </div>
         <div className={`${noticeButtons} d-flex`}>
            <button
               className="flex-grow-1"
               data-test="noticeEditorCancel"
               onClick={handleCancel}
            >
              Cancel
            </button>
            <button
               className="flex-grow-1"
               data-test="noticeEditorSave"
               onClick={() => {
                  handleSave(desc, title, item?.id);
                  handleCancel();
               }}
            >
              Save
            </button>
         </div>

      </div>
   );
};

export default NoticeEditor;
