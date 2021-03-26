import React, {useState} from "react";
import {firestore} from "../../firebase.js";

const buildDate = (date) => {
   const shortDate =
      `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

   return shortDate;
};

const getNoticesJsx = (setNotices) => {
   firestore
      .collection("notices")
      .orderBy("date", "desc")
      .get()
      .then(querySnapshot => {
         const items = [];
         //  return querySnapshot.map(item => item.data());
         querySnapshot.forEach(item => {
            const itemDate = buildDate(item
               .data()
               .date
               .toDate());

            items.push({
               ...item.data(),
               stringDate: itemDate
            });
         });
         setNotices(items);
      });
};

export default getNoticesJsx;