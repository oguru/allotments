import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import styles from "./Notice.module.scss";

const Notice = (props) => {
   const {
      addToDb,
      deleteNotice,
      modifyNotice,
      item,
      loggedIn,
      newNotice,
      setNewNotice
   } = props;

   const [newTitle, setNewTitle] = useState("");
   const [newDesc, setNewDesc] = useState("");

   Notice.propTypes = {
      addToDb: PropTypes.func,
      deleteNotice: PropTypes.func,
      modifyNotice: PropTypes.func,
      item: PropTypes.object,
      loggedIn: PropTypes.bool,
      newNotice: PropTypes.bool,
      setNewNotice: PropTypes.func
   };

   const [editMode, setEditMode] = useState(false);
   const [delWarning, setDelWarning] = useState(false);

   const saveNewNotice = () => {
      addToDb(newDesc, newTitle);
      setNewNotice(false);
   };

   const newItem = newNotice && (
      <>
         <div className="card-header d-flex justify-between mdb-color lighten-5">
            <input
               className="flex-grow-1 mr-3"
               onChange={e => setNewTitle(e.target.value)}
               placeholder="Notice title goes here..."
            />
         </div>
         <div className="card-footer rgba-white-strong border-0 ">
            <textarea
               className="info-item-text card-text w-100"
               onChange={e => setNewDesc(e.target.value)}
               placeholder="Notice text goes here..."
            />
         </div>
         <div className="d-flex">
            <button
               className="flex-grow-1"
               onClick={() => setNewNotice(false)}
            >
              Cancel
            </button>
            <button
               className="flex-grow-1"
               onClick={() => saveNewNotice()}
            >
              Save
            </button>
         </div>
      </>
   );

   const enableEditMode = () => {
      setNewDesc(item.desc);
      setNewTitle(item.title);
      setEditMode(true);
   };

   const editNotice = () => {
      modifyNotice(newDesc, newTitle, item.id);
      setEditMode(false);
   };

   const checkNotice = () => {
      if (editMode && loggedIn && !newNotice) {
         return (
            <>
               <div className={`card-header d-flex justify-between lighten-5`}>
                  <input
                     className="flex-grow-1 mr-3"
                     onChange={(e) => setNewTitle(e.target.value)}
                     value={newTitle}
                  />
                  <p className="card-text m-auto text-muted small">
                     {item.date}
                  </p>
               </div>
               <div className="card-body">
                  <textarea
                     className={`${styles.textWrap} info-item-text card-text w-100`}
                     onChange={(e) => setNewDesc(e.target.value)}
                     value={newDesc}
                  />
               </div>
               <div className="d-flex">
                  <button
                     className="flex-grow-1"
                     onClick={() => setEditMode(false)}
                  >
              Cancel
                  </button>
                  <button
                     className="flex-grow-1"
                     onClick={() => editNotice()}
                  >
              Save
                  </button>
               </div>
            </>
         );
      } else if (!newNotice) {
         return (
            <>
               <div className={`${styles.noticeHeader} card-header d-flex justify-between`}>
                  <p className="flex-grow-1 m-auto">
                     {item.title}
                  </p>
                  <p className="card-text m-auto text-muted small">
                     {item.date}
                  </p>
               </div>
               <div className="card-body">
                  <p className={`${styles.textWrap} info-item-text card-text`}>
                     {item.desc}
                  </p>
               </div>
               {loggedIn && !editMode &&
            <div className="d-flex">
               <button
                  className="flex-grow-1"
                  onClick={() => enableEditMode()}
               >
                Edit
               </button>
               {delWarning ? (
                  <div className="d-flex flex-grow-1">
                     <button
                        className="flex-grow-1"
                        onClick={() => deleteNotice(item.id)}
                     >
                        Confirm
                     </button>
                     <button
                        className="flex-grow-1"
                        onClick={() => setDelWarning(false)}
                     >
                        Cancel
                     </button>
                  </div>
               ) : (
                  <button
                     className="flex-grow-1"
                     onClick={() => setDelWarning(true)}
                  >
                    Delete
                  </button>
               )
               }

            </div>
               }
            </>
         );
      }

   };

   const notice = checkNotice();

   return (
      <>
         <div className="card border shadow-sm mt-5" >
            {newItem || notice}
         </div>
      </>
   );
};

export default Notice;
