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

function camelize(prop) {
		var wordsArr = prop.split('-');

		wordsArr = wordsArr.map((word, index) => {

				if (index !== 0) {
						var word = word.split('');
						word[0] = word[0].toUpperCase();
						return word.join('')
						//word.splice(0, 1, word.charAt(0).toUpperCase()) return word.toUpperCase();
				}

				return word;
		})

		var result = wordsArr.join('');
		console.log(result)
}

camelize("background-color");
camelize("list-style-image");
camelize("-webkit-transition")