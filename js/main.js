/* Proudly Coded by Travis Kipp */
/* Created November 7, 2016 */
/* Main JavaScript */

//Storage get
var customSearchName = chrome.storage.local.get('customSearchName');
var customSearchUrl = chrome.storage.local.get('customSearchUrl');
var backgroundColor = chrome.storage.local.get('backgroundColor');

//Add custom search to dropdown if present
customSearchName.then((res) => {
  if (res.customSearchName != undefined) {
    $("#dropdown-menu").prepend("<a class='dropdown-item' id='dropdown-custom' href='#'>" + res.customSearchName + "</a>" );
  }  
});

//Search when enter key pressed
document.getElementById("search").addEventListener("keydown", function(e){
    if(e.keyCode === 13) {
        e.preventDefault();
        search();
    }
});

//Listens for settings change - reloads page
chrome.storage.onChanged.addListener(callback);
function callback() {
  location.reload();
}

//Listen for dropdown change after load
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("dropdown-duckduckgo").addEventListener("click", function(e){
    document.getElementById("search-dropdown-button").textContent = 'DuckDuckGo';
    localStorage.setItem('searchEngine', 'DuckDuckGo');
    e.preventDefault();
  });
  document.getElementById("dropdown-google").addEventListener("click", function(e){
    document.getElementById("search-dropdown-button").textContent = 'Google';
    localStorage.setItem('searchEngine', 'Google');
    e.preventDefault();
  });
  document.getElementById("dropdown-bing").addEventListener("click", function(e){
    document.getElementById("search-dropdown-button").textContent = 'Bing';
    localStorage.setItem('searchEngine', 'Bing');
    e.preventDefault();
  });
  document.getElementById("dropdown-yahoo").addEventListener("click", function(e){
    document.getElementById("search-dropdown-button").textContent = 'Yahoo';
    localStorage.setItem('searchEngine', 'Yahoo');
    e.preventDefault();
  });
  document.getElementById("dropdown-wikipedia").addEventListener("click", function(e){
    document.getElementById("search-dropdown-button").textContent = 'Wikipedia';
    localStorage.setItem('searchEngine', 'Wikipedia');
    e.preventDefault();
  });
  document.getElementById("dropdown-twitter").addEventListener("click", function(e){
    document.getElementById("search-dropdown-button").textContent = 'Twitter';
    localStorage.setItem('searchEngine', 'Twitter');
    e.preventDefault();
  });
  document.getElementById("dropdown-custom").addEventListener("click", function(e){
    customSearchName.then((res) => {
      document.getElementById("search-dropdown-button").textContent = res.customSearchName;
      localStorage.setItem('searchEngine', res.customSearchName);
    });
    e.preventDefault(); 
  });
});

//Wait for load
document.addEventListener('DOMContentLoaded', function() {
  //Set background color
  backgroundColor.then((res) => {
    $('body, nav').css("background-color", res.backgroundColor);
  });

  //Set search engine
  document.getElementById("search-dropdown-button").textContent = localStorage.getItem('searchEngine');
  

  //If none set force DDG
  if (localStorage.getItem('searchEngine') == undefined) {
    localStorage.setItem('searchEngine', 'DuckDuckGo');
    location.reload();
  }

  //Listen for Settings Button
  document.getElementById("settings-button").addEventListener("click", openSettings);
  //Listen for Search Arrow button
  document.getElementById("search-button-input").addEventListener("click", search);
});

function openSettings() {
  chrome.runtime.openOptionsPage();
}

function search() {
  var customSearchName = chrome.storage.local.get('customSearchName');
  var customSearchUrl = chrome.storage.local.get('customSearchUrl');
  customSearchName.then((res) => {
    valueCustomSearchName = res.customSearchName;
  });
  customSearchUrl.then((res) => {
    valueCustomSearchUrl = res.customSearchUrl;
  });

  if (document.getElementById("search-dropdown-button").textContent.trim() == 'DuckDuckGo') {
    chrome.tabs.update({url: "https://duckduckgo.com/?q="+ document.getElementById("search").value});
  }
  else if (document.getElementById("search-dropdown-button").textContent.trim() == 'Google') {
    chrome.tabs.update({url: "https://www.google.com/search?q="+ document.getElementById("search").value});
  }
  else if (document.getElementById("search-dropdown-button").textContent.trim() == 'Bing') {
    chrome.tabs.update({url: "https://www.bing.com/search?q="+ document.getElementById("search").value});
  }
  else if (document.getElementById("search-dropdown-button").textContent.trim() == 'Yahoo') {
    chrome.tabs.update({url: "https://search.yahoo.com/search?p="+ document.getElementById("search").value});
  }
  else if (document.getElementById("search-dropdown-button").textContent.trim() == 'Wikipedia') {
    chrome.tabs.update({url: "https://en.wikipedia.org/wiki/Special:Search?search="+ document.getElementById("search").value});
  }
  else if (document.getElementById("search-dropdown-button").textContent.trim() == 'Twitter') {
    chrome.tabs.update({url: "https://twitter.com/search?q="+ document.getElementById("search").value});
  }
  else if (document.getElementById("search-dropdown-button").textContent.trim() == valueCustomSearchName) {
    customSearchUrl.then((res) => {
      chrome.tabs.update({url: valueCustomSearchUrl + document.getElementById("search").value});
    });
  }
}

//Save settings to localStorage
function settingsSave() {
  setTimeout(enable, 500);

  localStorage.setItem('searchEngine', document.getElementById("search-select").value);
  localStorage.setItem('backgroundColor', document.getElementById("bg-color-hex").value);
  localStorage.setItem('backgroundImage', document.getElementById("bg-image").value);

  function enable(){
    location.reload();
  }
}