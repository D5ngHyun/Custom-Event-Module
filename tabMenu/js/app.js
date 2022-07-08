

class TabMenu {
    constructor(options){

        // tabBtnsContainer: '.tabs__btns', // 탭메뉴 버튼 상위요소 클래스명
        // tabContentsContainer: '.tabs__contents', // 탭메뉴 컨텐츠 상위요소 클래스명
        // addClassName: 'active'

        this.ADD_CLASS_NAME = options.addClassName;
        this.TAB_BTNS_CLASS_NAME = options.tabBtnsContainer; //

        this.tabBtnsContainer = document.querySelector(`.${options.tabBtnsContainer}`); 
        this.tabBtns = [...this.tabBtnsContainer.children];

        this.tabContentsContainer = document.querySelector(`.${options.tabContentsContainer}`); 
        this.tabContents = [...this.tabContentsContainer.children];

        this.targetElem;

        this.prevBtnElem;
        this.prevTabContentElem;

        this.conditionNode = this.tabBtns[0].nodeName; // 탭메뉴 클릭시 이벤트 위임 방지.

        this.init();
        this.tabBtnEvent();
    }


    init(){
        for( let i = 0; i < this.tabBtns.length; i++){
            this.tabBtns[i].setAttribute('data-name', `tabs__contents__${i}`);
            this.tabContents[i].setAttribute('class', `tabs__contents__${i}`);

            if( i === 0 ){
                this.defaultSettings(i);
            }
        }
    }

    defaultSettings(i){
        this.prevBtnElem = this.tabBtns[i];
        this.prevTabContentElem = document.querySelector(`.${this.prevBtnElem.dataset.name}`)

        this.prevBtnElem.classList.add(this.ADD_CLASS_NAME);
        this.prevTabContentElem.classList.add(this.ADD_CLASS_NAME);
    }

    tabBtnEvent(){
        this.tabBtnsContainer.addEventListener('click', e => {
            this.targetElem = e.target;

            if(this.targetElem.classList.contains(this.TAB_BTNS_CLASS_NAME)) return
            if(this.prevBtnElem && this.prevTabContentElem) {
                this.tabRemove();
            }

            // 이벤트 위임
            while(this.targetElem.nodeName !== this.conditionNode){
                this.targetElem = this.targetElem.parentNode;
            }

            this.tabActive();

            this.prevBtnElem = this.targetElem;
            this.prevTabContentElem = document.querySelector(`.${this.targetElem.dataset.name}`);
        });
    }

    tabRemove(){
        this.prevBtnElem.classList.remove(this.ADD_CLASS_NAME)
        this.prevTabContentElem.classList.remove(this.ADD_CLASS_NAME)
    }

    tabActive(){
        this.targetElem.classList.add(this.ADD_CLASS_NAME);
        document.querySelector(`.${this.targetElem.dataset.name}`).classList.add(this.ADD_CLASS_NAME);
    }

}




const tabMenu = new TabMenu({
    tabBtnsContainer: 'tabs__btns', // 탭메뉴 버튼 상위요소 클래스명
    tabContentsContainer: 'tabs__contents', // 탭메뉴 컨텐츠 상위요소 클래스명
    addClassName: 'active'
});




