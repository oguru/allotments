import React, {useState} from "react";
import {firestore} from "../../firebase.js";

const buildDate = (date) => {
   const shortDate =
      `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

   return shortDate;
};

const getNoticesJsx = (setNotices) => {
   firestore
      .collection("notices")
      .orderBy("date", "desc")
      .get()
      .then(querySnapshot => {
         const items = [];

         querySnapshot.forEach(item => {
            const itemDate = buildDate(item
               .data()
               .date
               .toDate());

            const id = item.id;

            items.push({
               ...item.data(),
               date: itemDate,
               id
            });
         });
         setNotices(items);
      });
};

export default getNoticesJsx;