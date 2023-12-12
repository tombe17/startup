export class PageState {
    static Home = new PageState('home');
    static Play = new PageState('play');
    static Scores = new PageState('scores');
    static About = new PageState('about');

    constructor(name) {
        this.name = name;
    }
}