import { useState, useCallback} from "react";

export default () => {

  const [openGroups, setOpenGroups] = useState(new Map());

  const сhangesOpeningGroups = (idGroup) => {
    setOpenGroups((prevState) => {

      let newOpenGroups = new Map(prevState);

      if (newOpenGroups.has(idGroup)) {
        newOpenGroups.delete(idGroup);
      } else {
        newOpenGroups.set(idGroup, true);
      }
      return newOpenGroups;
    })
  }

  const groupIsOpen = useCallback(
    (idGroup) => {
      return openGroups.has(idGroup);
    },
    [openGroups],
  )
  return [сhangesOpeningGroups, groupIsOpen];

};