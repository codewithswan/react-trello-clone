/**
 * Move item in array.
 * NOTE: 2 splice operations will occur.
 * First splice will briefly remove item array, second splice re-insert it into desired location.
 * @see https://jsperf.com/array-prototype-move
 */
function moveItemInArray(
  array: any[],
  moveIndex: number,
  toIndex: number
): void {
  array.splice(toIndex, 0, array.splice(moveIndex, 1)[0]);
}

interface IndexedItem {
  index: number;
  id: string;
}

export function positionIndexedItem<T extends IndexedItem>(
  items: { [key: string]: T },
  movedItem: T,
  targetIndex: number
): { [id: string]: T } {
  const safeItems = { ...items };

  // the item is not on the list, insert with new max index, so that we can use the same logic to sort it correctly
  if (!safeItems[movedItem.id]) {
    safeItems[movedItem.id] = {
      ...movedItem,
      index: Object.keys(items).length,
    };
  }

  const indexForMovedItem = safeItems[movedItem.id].index;

  // get a sorted array that we can mutate to get desired indexes - we use this as a map between updated indexes and items
  const indexMapArray = Object.values(safeItems).sort(
    (a, b) => a.index - b.index
  );

  // this mutates the array we created and gets the items at the correct indexes
  moveItemInArray(indexMapArray, indexForMovedItem, targetIndex);

  // generate a new object with items at the correct indexes
  const withUpdatedIndexes = Object.entries(safeItems).reduce(
    (obj, [key, item]) => {
      const indexInMapForItem = indexMapArray.indexOf(item);
      // preserve the object reference if index the same, otherwise create a new ref with the correct instance
      obj[key] =
        item.index === indexInMapForItem
          ? item
          : { ...item, index: indexInMapForItem };

      return obj;
    },
    {} as { [id: string]: T }
  );

  return withUpdatedIndexes;
}
