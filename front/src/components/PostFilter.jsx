import React from "react";
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';
const PostFilter = ({filter, setFilter}) => {
    return (
        <div className="container catalog__container">
            
            
        <MyInput value={filter.query} onChange={e => setFilter({...filter, query: e.target.value})} placeholder='Поиск...'></MyInput>
        {/* <MySelect value={filter.sort} onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
         defaultValue='Sort with' options={[{value: 'title', name: 'namee'}, {value: 'body', name: 'descrr'}]}></MySelect> */}
      </div>
    )
}

export default PostFilter;
