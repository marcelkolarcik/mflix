import React from "react";

export default function Hero(props) {
   let _style={}
    if(props.image)
    {
        console.log('image ',props.image)
         _style = {
            backgroundImage:`url(${props.image})`,
            backgroundRepeat:'no repeat',
            backgroundPosition: 'top center',
            backgroundSize:'cover'

        }
    }
    return (
        <div className="jumbo-hero" style={_style}>
            <div className={'text-light'}>
                {props.title}
            </div>
        </div>);
}