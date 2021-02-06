import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { PostApi } from 'api/post';

const StyledPageNav = styled.div``;
const StyledPostList = styled.ul``;

export function pagination() {
  const [page, setPage] = useState(1);
  const getPosts = (page = 1) => PostApi.all(page);

  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData,
  } = useQuery(['projects', page], () => getPosts(page), {
    // previousData 옵션을 true로 설정하면 이전 데이터를 새로운 데이터가 들어올때까지 유지하고,
    // 새로운 데이터가 들어오면 끊김없이 데이터를 교체하므로 화면 깜빡임이 없음
    keepPreviousData: true,
  });

  // isPreviousData : 현재 보이는 데이터가 이전에 요청한 데이터인지 아닌지 나타내는 값
  // pagenation용 api는 뒤에 더 데이터가 있는지 없는지 값을 가진 키도 같이 보내줘야 구성이 쉽다. hasMore같은.
  return (
    <>
      {isLoading ? (
        <div>로딩중..</div>
      ) : isError ? (
        <div>에러가 발생했습니다.</div>
      ) : (
        <StyledPostList>
          {data.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </StyledPostList>
      )}
      <StyledPageNav>
        <button
          onClick={() => setPage((oldPageNum) => Math.max(oldPageNum - 1, 1))}
          disabled={page === 1}>
          이전
        </button>
        <button
          onClick={() => {
            if (!isPreviousData) {
              setPage((oldPageNum) => oldPageNum + 1);
            }
          }}
          disabled={isPreviousData || data?.length === 0}>
          다음
        </button>
        {isFetching ? <span>로딩중..</span> : null}
      </StyledPageNav>
    </>
  );
}

export default pagination;
