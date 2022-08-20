import React, {useState} from "react";
import Notice from "../Notice/Notice";
import NoticeEditor from "../NoticeEditor/NoticeEditor";
import PropTypes from "prop-types";
import styles from "./AdminNotice.module.scss";

const AdminNotice = (props) => {
   const {
      handleCancel,
      handleDelete,
      handleSave,
      item,
      newNotice
   } = props;

   AdminNotice.propTypes = {
      handleCancel: PropTypes.func,
      handleDelete: PropTypes.func,
      handleSave: PropTypes.func,
      item: PropTypes.object,
      newNotice: PropTypes.bool
   };

   const [delWarning, setDelWarning] = useState(false);
   const [editMode, setEditMode] = useState(false);

   return (
      <>
         {editMode || newNotice ? (
            <NoticeEditor
               item={item}
               handleCancel={() => item ? setEditMode(false) : handleCancel()}
               handleSave={handleSave}
            />
         ) : (
            <Notice item={item}>
               <div className={styles.noticeButtons}>
                  {delWarning ? (
                     <>
                        <button
                           className="flex-grow-1"
                           data-test="confirmDeleteBtn"
                           onClick={() => handleDelete(item.id)}
                        >
                           Confirm
                        </button>
                        <button
                           className="flex-grow-1"
                           data-test="cancelDeleteBtn"
                           onClick={() => setDelWarning(false)}
                        >
                           Cancel
                        </button>
                     </>
                  ) : (
                     <>
                        <button
                           className="flex-grow-1"
                           data-test="editNoticeBtn"
                           onClick={() => setEditMode(true)}
                        >
                           Edit
                        </button>
                        <button
                           className="flex-grow-1"
                           data-test="deleteNoticeBtn"
                           onClick={() => setDelWarning(true)}
                        >
                           Delete
                        </button>
                     </>
                  )}
               </div>
            </Notice>
         )}
      </>
   );
};

export default AdminNotice;
