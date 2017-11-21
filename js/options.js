/* Proudly Coded by Travis Kipp */
/* Created November 15, 2016 */
/* Options Page */

function saveOptions(e) {
  browser.storage.local.set({
    backgroundColor: document.querySelector("#bg-color-hex").value
  });
  browser.storage.local.set({
    customSearchName: document.querySelector("#custom-search-name").value
  });
  browser.storage.local.set({
    customSearchUrl: document.querySelector("#custom-search-url").value
  });
  e.preventDefault();
  console.log('Saved!');
}

function clearCustom(e) {
  document.querySelector("#custom-search-name").value = '';
  document.querySelector("#custom-search-url").value = '';
  e.preventDefault();
  console.log('Cleared!');
}

function restoreOptions() {
  //Background Color
  var gettingBackgroundColor = browser.storage.local.get('backgroundColor');
  gettingBackgroundColor.then((res) => {
    document.querySelector("#bg-color-hex").value = res.backgroundColor || '#4d4d4d';
  });

  //Custom Search Name
  var gettingCustomSearchName = browser.storage.local.get('customSearchName');
  gettingCustomSearchName.then((res) => {
    document.querySelector("#custom-search-name").value = res.customSearchName || '';
  });

  //Custom Search URL
  var gettingCustomSearchUrl = browser.storage.local.get('customSearchUrl');
  gettingCustomSearchUrl.then((res) => {
    document.querySelector("#custom-search-url").value = res.customSearchUrl || '';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("#clear").addEventListener("click", clearCustom);
