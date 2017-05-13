export const filterByStatus = (status) => {
  return {
    type: 'FILTER_BY_STATUS',
    status
  }
};

export const filterByTags = (tag) => {
  return {
    type: 'FILTER_BY_TAGS',
    tag
  }
};

export const filterByText = (text) => {
  return {
    type: 'FILTER_BY_TEXT',
    text
  }
};

export const toggleStatus = (key) => {
  return {
    type: 'TOGGLE_STATUS',
    key
  }
};