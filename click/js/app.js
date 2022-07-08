
class ClickEvent {
    constructor(options){  
        // 클릭할 대상에 요소를 받아와야함.
        this.target = document.querySelector(options.yourClass),
        this.yourClass = options.targetClass
        this.addClassName = options.addClassName; // 어떤 클래스명을 붙여줄지에 대한 정의
        this.eventElem = options.eventElem;
        this.currentTarget;
        this.prevTarget;

        this.clickHandler();
    }

    clickHandler(){
        this.target.addEventListener('click', (e) => {
            this.currentTarget = e.target;

            // 이벤트 위임 기법이라 ul태그도 선택되는걸 방지
            if(this.currentTarget.nodeName === this.yourClass) return;
            if(this.prevTarget){
                this.inActivate();
            }

            // li태그에다가 클래스명을 주어 원하는 스타일 적용하기.
            // 클릭한 요소가 li가 아닐때 무한반복 실행
            while(this.currentTarget.nodeName !== this.eventElem){
                this.currentTarget = e.target.parentNode;
            }

            this.activate();
            // 클릭한 요소를 prevTarget에 담아서 이전클릭한것이 무엇인지 확인.
            this.prevTarget = this.currentTarget;
        });
    }

    activate(){
        this.currentTarget.classList.add(this.addClassName);
    }

    inActivate(){
        this.prevTarget.classList.remove(this.addClassName);
    }
}


const click = new ClickEvent({
    addClassName: 'active', // 활성화되는 클래스명
    yourClass: '.click-wrapper', // 이벤트를 줘야할 직속 상위(부모)요소
    eventElem: 'LI' // 실제 클릭대상의 html요소 대문자로만 적어주어야함.
});
// Push