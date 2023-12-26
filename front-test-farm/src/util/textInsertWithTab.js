//
export const handleSetValue = (e, setFunc) => {
  setFunc(e.target.value);
};

export const handleSetTab = (e) => {
  if (e.keyCode === 9) {
    e.preventDefault();
    let val = e.target.value;
    let start = e.target.selectionStart;
    let end = e.target.selectionEnd;
    e.target.value = val.substring(0, start) + '\t' + val.substring(end);
    e.target.selectionStart = e.target.selectionEnd = start + 1;
    handleSetValue(e);
    return false; //  prevent focus
  }
};
//
