const iconMenu = document.querySelector('.header__burger');
const iconNav = document.querySelector('.header__nav');
if(iconMenu){
    iconMenu.addEventListener('click', function (e) {
        iconMenu.classList.toggle('active');
        document.body.classList.toggle('lock');
        iconNav.classList.toggle('active');
    });
}

const menuLinks = document.querySelectorAll('.header__text[data-scroll]');
if(menuLinks.length > 0){
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick)
    });
    
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.scroll && document.querySelector(menuLink.dataset.scroll)){
            const scrollBlock = document.querySelector(menuLink.dataset.scroll);
            const scrollBlockValue = scrollBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

            if(iconMenu.classList.contains("active")){
                document.body.classList.remove('lock');
                iconMenu.classList.remove('active');
                iconNav.classList.remove('active');
            }

            window.scrollTo({
                top: scrollBlockValue,
                behavior: 'smooth'
            });
            e.preventDefault();
        }
    }
}

const langButtons = document.querySelectorAll("[data-btn]");
const allLangs = [ "en", "ua"];
const currentPathName = window.location.pathname;
let currentLang =
	localStorage.getItem("language") || checkBrowserLang() || "en";
let currentTexts = {};

const homeTexts = {
	"home_page-1": {
		en: "Home",
		ua: "Домашня сторінка",
	},
	"home_page-2": {
		en: "About me",
		ua: "Про мене",
	},
	"home_page-3": {
		en: "Skills",
		ua: "Навички",
	},
	"home_page-4": {
		en: "Portfolio",
		ua: "Портфоліо",
	},
    "home_page-5": {
		en: "Contacts",
		ua: "Контакти",
	},
	"home_page-6": {
		en: "Vadym Serapionov",
		ua: "Вадим Серапіонов",
	},
    "home_page-7": {
		en: "Frontend developer ",
		ua: "Фронтенд розробник ",
	},
	"home_page-7_1": {
		en: "26 years old, Kyiv",
		ua: "26 років, Київ",
	},
	"home_page-8": {
		en: "About me",
		ua: "Про мене",
	},"home_page-9": 
    {
		en: "Hi, i'm Vadym - beginner Frontend Developer from Kyiv. I'm interested in programming and everything connected with it.",
		ua: "Привіт, я Вадим - початківець Frontend Developer з Києва. Мене цікавить програмування та все, що з ним пов'язано.",
	},"home_page-10": 
    {
		en: "I'm studying at courses \"The Complete 2023 Web Development Bootcamp\" on Udemy.",
		ua: "Я навчаюся на курсах \"The Complete 2023 Web Development Bootcamp\" на Udemy.",
	},"home_page-11": 
    {
		en: "Ready to implement excellent projects with wonderful people.",
		ua: "Готовий реалізовувати відмінні проекти з чудовими людьми.",
	},"home_page-12":
     {
		en: "Skills",
		ua: "Навички",
	},"home_page-13": 
    {
		en: "I work in such technologies as",
		ua: "Працюю з такими технологіями як ",
	},"home_page-14": 
    {
		en: "Subscription business - landing page",
		ua: "Підписний бізнес - лендінг",
	},"home_page-15": 
    {
		en: "Qubit - landing page",
		ua: "Qubit - лендінг",
	},"home_page-16": 
    {
		en: "Outsourcing company - project",
		ua: "Компанія з аутсорсингу - проект",
	},"home_page-17": 
    {
		en: "Contacts",
		ua: "Контакти",
	},
	"home_page-18":{
		en: "Want to know more or just chat?",
		ua: "Бажаєте дізнатись більше чи просто поговорити?",
	},
	"home_page-18_1":{
		en: "You are welcome!",
		ua: "Ласкаво прошу!",
	},
	"home_page-19": 
    {
		en: "Send message",
		ua: "Надіслати повідомлення",
	},"home_page-20": 
    {
		en: "Follow me at",
		ua: "Слідкуйте за мною в",
	},
	"home_page-20_1": 
    {
		en: "LinkedIn, Instagram",
		ua: "LinkedIn, Іnstagram",
	},
	
};

function checkPagePathName() {
	switch (currentPathName) {
		case "/index.html":
			currentTexts = homeTexts;
			break;
		case "/another_page.html":
			currentTexts = anotherTexts;
			break;

		default:
			currentTexts = homeTexts;
			break;
	}
}
checkPagePathName();

function changeLang() {
	for (const key in currentTexts) {
		let elem = document.querySelector(`[data-lang=${key}]`);
		if (elem) {
			elem.textContent = currentTexts[key][currentLang];
		}
	}
}
changeLang();

langButtons.forEach((btn) => {
	btn.addEventListener("click", (event) => {
		if (!event.target.classList.contains("header__btn_active")) {
			currentLang = event.target.dataset.btn;
			localStorage.setItem("language", event.target.dataset.btn);
			resetActiveClass(langButtons, "header__btn_active");
			btn.classList.add("header__btn_active");
			changeLang();
		}
	});
});

function resetActiveClass(arr, activeClass) {
	arr.forEach((elem) => {
		elem.classList.remove(activeClass);
	});
}

function checkActiveLangButton() {
	switch (currentLang) {
		case "ua":
			document
				.querySelector('[data-btn="ua"]')
				.classList.add("header__btn_active");
			break;
		case "en":
			document
				.querySelector('[data-btn="en"]')
				.classList.add("header__btn_active");
			break;

		default:
			document
				.querySelector('[data-btn="ua"]')
				.classList.add("header__btn_active");
			break;
	}
}
checkActiveLangButton();

function checkBrowserLang() {
	const navLang = navigator.language.slice(0, 2).toLowerCase();
	const result = allLangs.some((elem) => {
		return elem === navLang;
	});
	if (result) {
		return navLang;
	}
}

console.log("navigator.language", checkBrowserLang());