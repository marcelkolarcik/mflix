import React, {useState} from "react";

export default function Comment(props) {
    const comment = props.comment;
    const [confirm, setConfirm] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);


    function deleteCommentHandler() {
        setIsDeleting(true);
        fetch('/api/comments/delete/',
            {
                method: 'POST',
                body: JSON.stringify({commentId: comment.id}),
                headers: new Headers({
                    'content-type': 'application/json'
                })
            })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(data => {
                    if (data.result === 'success') {
                        setIsDeleting(false);
                        setIsDeleted(true);
                        document.getElementById(comment.id).remove();
                    }
                },
                error => {
                    console.log('error ' + error)
                })
            .catch(error => {
                console.log('error ' + error)
            })
    }

    return (
        <div id={comment.id} className={'border-bottom border-secondary mb-3'}>
            <p className="small text-muted p-0 m-0">{comment.name} - {comment?.date.split('T')[0]}</p>
            <p className={'fst-italic text-light'}>{comment.text}</p>

            {props.isOwner ? <div className={'text-end'}>
                <button onClick={() => setConfirm(true)} className={'btn btn-sm text-danger p-0 m-0 px-2'}>delete
                </button>
            </div> : ''}

            {(confirm && !isDeleted) && <div className={'text-center mb-2'}>
                <button className="btn btn-sm text-danger" onClick={() => setConfirm(false)}>Cancel</button>
                <button className="btn btn-sm btn-outline-info" onClick={deleteCommentHandler}>
                    {isDeleting ? 'Deleting...' : 'Yes, delete!' }
                </button>
            </div>}

            {isDeleted && <p className={'text-light'}>Comment deleted!</p>}

        </div>
    );
}