import React from "react";

export default function Comment(props) {
    const comment = props.comment;
    return (
        <div className={'border-bottom border-secondary mb-3'}>
            <p className="small text-muted p-0 m-0">{comment.name} - {comment?.date.split('T')[0]}</p>
            <p className={'fst-italic text-light'}>{comment.text}</p>
        </div>
    );
}