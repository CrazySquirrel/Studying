import {createStore} from 'redux';

import Items from '../json/all-courses.json';

let _Items = Items;

const filter = (filter) => {
  filter.filterText = filter.filterText.toLowerCase();

  return Object.keys(_Items).reduce((_items, key) => {
    const item = _Items[key];

    if (
        (
            filter.filterStatus === "" ||
            item.status.toString() === filter.filterStatus
        ) &&
        (
            filter.filterText === "" ||
            item.name.toLowerCase().indexOf(filter.filterText) !== -1 ||
            item.description.toLowerCase().indexOf(filter.filterText) !== -1 ||
            item.tags.join(" ").toLowerCase().indexOf(filter.filterText) !== -1
        ) &&
        item.tags.some(tag => filter.filterTags[tag])
    ) {
      _items[key] = item;
    }

    return _items;
  }, {})
};

const getState = (state = {}) => {
  const filterTags = Object.keys(_Items).reduce((_filterTags, key) => {
    _Items[key]._key = key;
    _Items[key].tags.forEach(tag => _filterTags[tag] = true);

    return _filterTags;
  }, {});

  state = {
    pageCount: state.pageCount || 50,
    page: state.page || 0,
    filterStatus: state.filterStatus || '',
    filterTags: state.filterTags || filterTags,
    filterText: state.filterText || '',
    items: _Items,
  };

  state.items = filter({
    filterStatus: state.filterStatus,
    filterTags: state.filterTags,
    filterText: state.filterText
  });

  return state;
};

const saveState = (state) => {
  try {
    localStorage.setItem("state", JSON.stringify(state));
  } catch (e) {
    return undefined;
  }
};

const loadState = () => {
  try {
    const state = localStorage.getItem("state");
    if (state) {
      return getState(JSON.parse(state));
    } else {
      return getState();
    }
  } catch (e) {
    return getState();
  }
};

const saveItem = (key, item) => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/study/api/courses", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify({
    key,
    item
  }));
};

const Store = createStore((state, action) => {
  switch (action.type) {
    case "FILTER_BY_STATUS":
      return {
        pageCount: state.pageCount,
        page: 0,
        filterStatus: action.status,
        filterTags: state.filterTags,
        filterText: state.filterText,
        items: filter({
          filterStatus: action.status,
          filterTags: state.filterTags,
          filterText: state.filterText
        })
      };
    case "FILTER_BY_TAGS":
      const filterTags = state.filterTags;
      filterTags[action.tag] = !filterTags[action.tag];

      return {
        pageCount: state.pageCount,
        page: 0,
        filterStatus: state.filterStatus,
        filterTags: filterTags,
        filterText: state.filterText,
        items: filter({
          filterStatus: state.filterStatus,
          filterTags: filterTags,
          filterText: state.filterText
        })
      };
    case "FILTER_BY_TEXT":
      return {
        pageCount: state.pageCount,
        page: 0,
        filterStatus: state.filterStatus,
        filterTags: state.filterTags,
        filterText: action.text,
        items: filter({
          filterStatus: state.filterStatus,
          filterTags: state.filterTags,
          filterText: action.text
        })
      };
    case "TOGGLE_STATUS":
      _Items[action.key].status = !_Items[action.key].status;

      saveItem(
          action.key,
          _Items[action.key]
      );

      return {
        pageCount: state.pageCount,
        page: 0,
        filterStatus: state.filterStatus,
        filterTags: state.filterTags,
        filterText: state.filterText,
        items: filter({
          filterStatus: state.filterStatus,
          filterTags: state.filterTags,
          filterText: state.filterText
        })
      };
    case "PAGINATION":
      return {
        pageCount: state.pageCount,
        page: action.page,
        filterStatus: state.filterStatus,
        filterTags: state.filterTags,
        filterText: state.filterText,
        items: filter({
          filterStatus: state.filterStatus,
          filterTags: state.filterTags,
          filterText: state.filterText
        })
      };
    default:
      return {
        pageCount: state.pageCount,
        page: state.page,
        filterStatus: state.filterStatus,
        filterTags: state.filterTags,
        filterText: state.filterText,
        items: filter({
          filterStatus: state.filterStatus,
          filterTags: state.filterTags,
          filterText: state.filterText
        })
      };
  }
}, loadState());

const loadItems = () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/study/api/courses", true);
  xhr.onload = () => {
    try {
      _Items = JSON.parse(xhr.responseText);
      Store.dispatch({
        type: null
      });
    } catch (e) {

    }
  };
  xhr.send();
};

Store.subscribe(() => {
  saveState(Store.getState());
});

loadItems();

export default Store;
