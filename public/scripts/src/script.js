let Card = function (title, poster, rating, plot, year, country, genre, duration, director, cast) {
    this.title = new Heading(3, title, 'title');
    this.poster = new Image(poster, 'poster');
    this.rating = rating || 'Rating';
    this.plot =  plot || 'Джейк Салли становится главным вождем народа Нави, находит себе любимую девушку из этого племени. Теперь ему предстоит защищать их, иначе новое вторжение людей им не пережить. На его новую планету Пандору выдвигаются хорошо вооруженные отряды землян, которых наняли злые бизнесмены, но Джейк подготовился и даст отпор корыстным и жадным людям.';
    this.year ='Год: ' + year || 'Год: 2022';
    this.country = 'Страна: ' + country || 'Страна: США';
    this.genre = 'Жанр: ' + genre || 'Жанр: Фентези, Боевики, Приключения, Фантастика';
    this.duration = 'Продолжительность: ' + duration || 'Продолжительность: 180 мин';
    this.director = 'Режиссер: ' + director || 'Режиссер: Джеймс Кэмерон';
    this.cast = 'В ролях: ' + cast || 'В ролях: Кейт Уинслет, Сэм Уортингтон, Дэвид Тьюлис, Зои Салдана, Уна Чаплин, Джемейн Клемент, Мишель Йео, Джованни Рибизи, Вин Дизель, Сигурни Уивер';
    this.template = function (){
        let rating = document.createElement('div');
        rating.classList.add('rating')
        rating.innerHTML = this.rating;
        let plot = document.createElement('div');
        plot.classList.add('plot');
        plot.innerHTML = this.plot;
        let year = document.createElement('div');
        year.classList.add('year');
        year.innerHTML = this.year;
        let country = document.createElement('div');
        country.classList.add('country');
        country.innerHTML = this.country;
        let genre = document.createElement('div');
        genre.classList.add('genre');
        genre.innerHTML = this.genre;
        let duration = document.createElement('div');
        duration.classList.add('duration');
        duration.innerHTML = this.duration;
        let director = document.createElement('div');
        director.classList.add('director');
        director.innerHTML = this.director;
        let cast = document.createElement('div');
        cast.classList.add('cast');
        cast.innerHTML = this.cast;
        let date = document.createElement('div');
        date.classList.add('date');
        let now = new Date();
        date.innerHTML = now.getDate().toString()+'-'+now.getMonth().toString()+'-'+now.getFullYear().toString()+', ' + now.getHours().toString()+":"+now.getMinutes().toString();

        let card = document.createElement('div');
        let flex_wrapper = document.createElement('div');
        let r_side = document.createElement('div');
        let l_side = document.createElement('div');
        let about = document.createElement('div');
        let description = document.createElement('div');
        card.classList.add('card');
        flex_wrapper.classList.add('flex-wrapper');
        l_side.classList.add('l-side');
        r_side.classList.add('r-side');
        description.classList.add('description');
        about.classList.add('about');

        card.appendChild(flex_wrapper);
        flex_wrapper.appendChild(l_side);
        l_side.appendChild(this.title);
        l_side.appendChild(this.poster);
        flex_wrapper.appendChild(r_side);
        r_side.appendChild(rating);
        r_side.appendChild(description);
        description.appendChild(plot);
        description.appendChild(year);
        description.appendChild(country);
        description.appendChild(genre);
        description.appendChild(duration);
        description.appendChild(director);
        description.appendChild(cast);
        about.appendChild(new Button('Смотреть онлайн','thorough'));
        about.appendChild(date);
        card.appendChild(about);
        return card;
    };
    // this.initEvents();
    return this.template();
}

let Image = function(src, classNames, alt){
    this.classNames = classNames || '';
    this.src = src;
    this.alt = alt || 'Broken image';
    this.template = function (){
        let poster = document.createElement('div');
        poster.classList.add(this.classNames);
        let img = document.createElement('img');
        img.classList.add();
        img.setAttribute('src', this.src);
        img.setAttribute('alt', this.alt);
        poster.appendChild(img);
        return poster;
    }
    return this.template();
}
let Paragraph = function (text, classNames){
    this.text = text;
    this.classNames = classNames || '';
    this.template = function (){
        let tmp = document.createElement('p');
        tmp.innerText = this.text;
        tmp.classList.add(classNames);
        return tmp;
    }
    return this.template();
}
let Heading = function (level, text, classNames){
    this.level = level;
    this.text = text;
    this.classNames = classNames || '';
    this.template = function (){
        let tmp = document.createElement(`h${this.level}`);
        tmp.innerText = this.text;
        tmp.classList.add(this.classNames);
        return tmp;
    }
    return this.template();
}
let Button = function (text, classNames) {
    this.text = text;
    this.classNames = classNames || '';
    this.template = function (){
        let tmp = document.createElement('button');
        tmp.innerText = this.text;
        tmp.classList.add(this.classNames);
        return tmp;
    }
    return this.template();
}
function ready() {
    let cards = document.querySelector('.cards');
    fetch('/conf')
        .then(response => response.json())
        .then(data => {
            data.forEach(function (data) {
                cards.appendChild(new Card(data.title, data.poster, data.rating, data.plot, data.year, data.country, data.duration, data.director, data.cast))
            })
        });

    // cards.appendChild(new Card("Avatar 1"));
    // cards.appendChild(new Card("Avatar 2"));
    // cards.appendChild(new Card("Avatar 3"));
}
document.addEventListener("DOMContentLoaded", ready);






