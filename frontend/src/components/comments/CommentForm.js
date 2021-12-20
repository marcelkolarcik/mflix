import React, {useRef, useState} from "react";

export default function CommentForm(props) {
    const commentLength = 500
    const [remaining, setRemaining] = useState(commentLength)
    const comment = useRef();

    function onSubmitHandler(e) {
        e.preventDefault();
        const _comment = comment.current.value
        if (_comment.length === 0) {
            alert('Empty comment');
            return;
        }
        fetch('/api/comment/add/',
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

                        comment.current.value = ''


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
                <button className={'btn btn-outline-info float-end btn-sm'}>Submit</button>
            </form>
        </div>
    );
}