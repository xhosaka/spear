console.log('bbb');
require("core-js/fn/array/from");

function mobileNavInit() {
		const nav = document.querySelector('.nav ul');
		const button = document.querySelector('.nav__toggle');

		const toggle = () => {
				console.log('what up beach??');
				nav
						.classList
						.add('is-active');
		};

		button.addEventListener('click', toggle);
}(function initApp() {
		mobileNavInit();
})();