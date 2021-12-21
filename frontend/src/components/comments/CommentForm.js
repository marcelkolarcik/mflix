import React, {useRef, useState} from "react";

export default function CommentForm(props) {
    const commentLength = 500;
    const [remaining, setRemaining] = useState(commentLength);
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const comment = useRef();

    function onSubmitHandler(e) {
        e.preventDefault();
        const _comment = comment.current.value
        if (_comment.length === 0) {
            alert('Empty comment');
            return;
        }
        fetch('/api/comments/add/',
            {
                method: 'POST',
                body: JSON.stringify({
                    comment: _comment.substring(0, 500),
                    movieId: props.movie_id
                }),
                headers: new Headers({
                    'content-type': 'application/json'
                })
            })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
            })
            .then(data => {
                    if (data.result === 'success') {
                        document.getElementById('new_comment').append(comment.current.value);
                        comment.current.value = ''
                        setIsSending(false);
                        setIsSent(true);


                    } else if (data.result === 'error') {
                        alert('Server says: ' + data.message)
                    }
                },
                error => {
                    console.log('error', error.message)
                })
            .catch(err => console.log('error', err))
    }

    return (
        <div>
            {!isSent ?
                <>
                    <p className="lead text-light">Add your comment <small className={'small'}>({remaining})</small></p>
                    <form action="" onSubmit={onSubmitHandler}>
                <textarea name="comment"
                          id="comment"
                          ref={comment}
                          placeholder={'Your comment...'}
                          maxLength={commentLength}
                          className={'form-control mb-3'}
                          onChange={(e) => setRemaining(commentLength - e.target.value.length)}
                />
                        <button
                            onClick={() => setIsSending(true)}
                            className={'btn btn-outline-info float-end btn-sm'}>
                            {isSending ? 'Sending...' : 'Submit'}
                        </button>
                    </form>
                </>
                :
                <p className={'text-light'}>Thank you for your comment!</p>}

        </div>
    );
}