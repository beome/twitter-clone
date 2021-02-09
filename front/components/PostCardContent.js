import Link from 'next/link';
import React from 'react';

const PostCardContent = ({ postData }) => (
  <div>
    {
      postData.split(/(#[^\s#]+)/g).map((v, i) => {
        if (v.match(/(#[^\s#]+)/g)) {
          return <Link href={`/hashtag/${v.slice(1)}`} key={i} ><a>{v}</a></Link>
        }
        return v;
    })}
  </div>
);
  

export default PostCardContent;