import React from 'react';

const FollowList = ({ header, data }) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <div>{header}</div>
      {data.map((item, index) => (
        <div key={index} style={{ marginTop: 20 }}>
          <div>{item.nickname}</div>
          {/* Stop 버튼 */}
        </div>
      ))}
      {/* 더 보기 버튼 */}
    </div>
  );
};

export default FollowList;
