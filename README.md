# payment-terminal - тостовое задание

## Зависимости
```
Vue.js - для более удобной работы с DOM
Vuex - для упрощения работы с состоянием проекта
Vue-router - для упрощения работы с маршрутизацией
Vuetify - для упрощения построения сетки 
Vuelidate - для упрощения валидации входных данных
Vue-the-mask - для упрощения работы с масками 
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Задача на рефакторинг
```
function func(s, a, b) {

	if (!s.length) {
		return -1;
	}
	
    var splitedStr = s.split('');
	var aIndex =     -1;
	var bIndex =     -1;

	splitedStr.forEach((item, i) => {
	    if (item == a) {
	    	aIndex = i;
    	}

	    if (item == b) {
	    	bIndex = i;
    	}

        if (aIndex + 1 && bIndex + 1) {
            return false;
        }
	});
	
    return Math.max(aIndex, bIndex);
}
```
