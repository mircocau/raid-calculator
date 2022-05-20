/*console.log("here");
const favicon = document.getElementById("favicon");
const isDark = window.matchMedia("(prefers-color-scheme: dark)");
const changeFavicon = () => {
if (isDark.matches) favicon.href = "./assets/images/favicon/favicon--dark.svg";
else favicon.href = "./assets/images/favicon/favicon--light.svg";
};
changeFavicon();
setInterval(changeFavicon, 1000);*/
var darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
handleDarkmode(darkModeMediaQuery);
function handleDarkmode(e){
	var darkModeOn = e.matches; // true if dark mode is enabled
    var favicon = document.getElementById("favicon");
	//var favicon = document.querySelector('link[rel="shortcut icon"]'); // get favicon-192.png element
	//var largeFavicon = document.querySelector('link[rel="icon"]'); // get favicon.ico element
	if(!favicon /*|| !largeFavicon*/){
		return; // where are our favicon elements???
	}
	// replace icons with dark/light themes as appropriate
	if(darkModeOn){
		favicon.href = './assets/images/favicon/favicon--dark-mode.svg';
		//largeFavicon.href = '/assets/images/favicon-dark-192.png';
	}else{
		favicon.href = './assets/images/favicon/favicon--light-mode.svg';
		//largeFavicon.href = '/assets/images/favicon-192.png';
	}
}
darkModeMediaQuery.addListener(handleDarkmode);