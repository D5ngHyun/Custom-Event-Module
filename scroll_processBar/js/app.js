

class ProgressBar {
    constructor({ progressBar, progress}){
        this.progressBar = progressBar;
        this.progress = progress;


        this.init();
        this.scrollEvent();
    }

    init(){
        this.progressBarStyle();
    }

    progressBarStyle(){
        this.progressBar.classList.add('default__progressBar');
        this.progress.classList.add('default__progress');
    }

    scrollRatio(){
        const ratio = pageYOffset / (document.body.offsetHeight - innerHeight) * 100;

        return ratio;
    }

    scrollEvent(){
        window.addEventListener('scroll', () => {
            this.progress.style.width = this.scrollRatio() + '%'
        });
    }
}


const progressBar = new ProgressBar({
    progressBar: document.querySelector('[data-name="progress-bar"'),
    progress: document.querySelector('[data-name="progress"')
});


