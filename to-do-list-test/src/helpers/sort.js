/*
* Сортировка массива по id
*
* @param {array} array - array for sort
* @param {string} by - by what sorting an array
* @return {array} sorting array
* */

export const sortByInt = (array, by) => {
  return array.sort((a, b) => b[by] - a[by])
}
