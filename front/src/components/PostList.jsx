import React from "react";
import PostItem from './PostItem';
import { TransitionGroup, CSSTransition } from "react-transition-group";

const PostList = ({posts, remove}) => {
  const nodeRef = React.useRef(null);
  if (!posts.length) {
    return (
      <h1 style={{textAlign: 'center'}}>
        Не найдено
      </h1>
    )
  }
    
  return (
    <div className="container">
    <ul className="catalog__list list-reset">
      {/* <h1 style={{textAlign: 'center'}}>{title}</h1> */}
      <TransitionGroup component={null}>
        {posts.map((post, index) => (
          <CSSTransition
            key={post.id}
            timeout={500}
            classNames="post"
            nodeRef={nodeRef}
          >
            <PostItem remove={remove} number={index + 1} post={post}/>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
    </div>
  )
}

export default PostList;