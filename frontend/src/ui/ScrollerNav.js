import React, {useRef} from "react";

export default function ScrollerNav(props) {
    const scrollLeftBtn = useRef();
    const scrollRightBtn = useRef();

    /*scrolling the child div and changing the color of the left carret*/
    function scrollLeft() {
        const parent = document.getElementById(scrollLeftBtn.current.dataset.parent_id);
        parent.scrollLeft += 200;
        scrollRightBtn.current.classList.remove('text-muted')

    }

    function scrollRight() {
        const parent = document.getElementById(scrollRightBtn.current.dataset.parent_id)
        parent.scrollLeft -= 200;
        parent.scrollLeft === 0 ? scrollRightBtn.current.classList.add('text-muted') :
            scrollRightBtn.current.classList.add('text-light')


    }

    return (
        <>
         <span
             ref={scrollRightBtn}
             data-parent_id={props.parent_id}
             onClick={scrollRight}
             id={'test'}
             className={'display-6 pe-3 fw-bold pointer scroller_btn text-muted'
             }>
                        &lsaquo;
                    </span>
            <span
                ref={scrollLeftBtn}
                data-parent_id={props.parent_id}
                onClick={scrollLeft}
                className={'display-6 fw-bold pointer scroller_btn1'}>
                        &rsaquo;
                    </span>
        </>
    );

}