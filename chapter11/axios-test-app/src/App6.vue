<template>
  <div>
    <h2>콘솔을 확인합니다.</h2>
  </div>
</template>

<script setup>
import axios from 'axios';

const requestAPI = async () => {
  const url = '/api/todos2';
  // API 요청 성공 시
  try {
    const response = await axios.get(url, { timeout: 900 });
    console.log('# 응답객체 : ', response);
  } catch (e) {
    // API 요청 실패 시
    console.log('## 다음 오류가 발생했습니다.');
    // instanceof : e가 Error 타입인지 체크
    if (e instanceof Error) console.log(e.message);
    else console.log(e);
  }
};

requestAPI();
</script>
