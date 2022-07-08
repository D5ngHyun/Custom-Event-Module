

class Smooth {
    constructor(options){
        this.elem = options.elem;
        this.SPEED = options.speed;

        this.currentScroll = 0;
        this.targetScroll;
        this.distance;
        this.ref;
        this.isScroll = true;
        this.stopScrolling = 0.001;

        this.init();
        this.resize();
        this.scrollEvent();
        this.scrollCondition();
    }

    addStyle(){
        this.elem.style.position = 'fixed';
        this.elem.style.width = '100%';
        this.elem.style.height = '100vh';
        this.elem.style.top = '0';
        this.elem.style.left = '0';
    }

    scrollEvent(){
        this.targetScroll = pageYOffset;
        this.distance = (this.targetScroll - this.currentScroll) * this.SPEED;
        this.currentScroll += this.distance;

        this.elem.style.transform = `translate3d(0, -${this.currentScroll}px, 0)`;

        this.ref = requestAnimationFrame(this.scrollEvent.bind(this));

        if(Math.abs(this.distance) < this.stopScrolling && this.isScroll){
            cancelAnimationFrame(this.ref);
            this.isScroll = false;
        }
    }

    scrollCondition(){
        window.addEventListener('scroll', () => {
            if(!this.isScroll){
                this.isScroll = true;
                this.ref = requestAnimationFrame(this.scrollEvent.bind(this));
            }
        })
    }

    init(){
        document.body.style.height = this.elem.offsetHeight + 'px';

        this.addStyle();
    }

    resize(){
        window.addEventListener('resize', () => {
            document.body.style.height = this.elem.scrollHeight + 'px';
        })
    }
}



const smooth = new Smooth({
    elem: document.querySelector('[data-smooth="smooth-scroll"]'),
    speed: 0.05,  
})