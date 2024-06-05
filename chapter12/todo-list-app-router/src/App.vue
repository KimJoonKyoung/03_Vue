<template>
  <div class="container">
    <Header />
    <router-view />
    <Loading v-if="states.isLoading" />
  </div>
</template>

<script setup>
import { reactive, computed, provide } from 'vue';
import Header from '@/components/Header.vue';
import Loading from '@/components/Loading.vue';
import axios from 'axios';

const BASEURI = '/api/todos';
const states = reactive({ todoList: [] });

const fetchTodoList = async () => {
  states.isLoading = true;
  // try~ catch 문 : 예외 처리 구문
  // try : 예외가 발생할 수 있는 문장을 넗는다.
  try {
    const response = await axios.get(BASEURI);
    if (response.status === 200) {
      states.todoList = response.data;
    } else {
      alert('데이터 조회 실패');
    }
    // catch : 예외를 어떻게 처리할 지 적어둠
  } catch (error) {
    alert('에러발생 :' + error);
  }
  states.isLoading = false;
};

// todo를 추가하는 메소드,
const addTodo = async ({ todo, desc }, successCallback) => {
  states.isLoading = true;
  try {
    const payload = { todo, desc };
    const response = await axios.post(BASEURI, payload);
    if (response.status === 201) {
      states.todoList.push({ ...response.data, done: false });
      successCallback();
    } else {
      alert('Todo 추가 실패' + response.data.message);
    }
  } catch (error) {
    alert('에러발생: ' + error);
  }
  states.isLoading = false;
};

// todo를 수정하는 메소드, 해당 id의 todo를 찾아서 todo, desc, done 값을 업데이트
const updateTodo = async ({ id, todo, desc, done }, successCallback) => {
  states.isLoading = true;
  try {
    const payload = { id, todo, desc, done };
    const response = await axios.put(BASEURI + `/${id}`, payload);
    if (response.status === 200) {
      let index = states.todoList.findIndex((todo) => todo.id === id);
      states.todoList[index] = payload;
      successCallback();
    } else {
      alert('Todo 변경 실패' + response.data.message);
    }
  } catch (error) {
    alert('에러발생 :' + error);
  }
  states.isLoading = false;
};

// todo를 삭제하는 메소드, 해당 id의 todo를 찾아서 삭제
const deleteTodo = async (id) => {
  states.isLoading = true;
  try {
    const response = await axios.delete(BASEURI + `/${id}`);
    console.log(response.status, response.data);
    if (response.status === 200) {
      let index = states.todoList.findIndex((todo) => todo.id === id);
      states.todoList.splice(index, 1);
    } else {
      alert('Todo 삭제 실패');
    }
  } catch (error) {
    alert('에러 발생 :' + error);
  }
  states.isLoading = false;
};

// todo의 done을 true -> false, false -> true로 변경해주는 메소드
const toggleDone = async (id) => {
  states.isLoading = true;
  try {
    let todo = states.todoList.find((todo) => todo.id === id);
    // todo의 값을 그대로 가져오고 done 값만 반대로 변경해줌
    let payload = { ...todo, done: !todo.done };
    // done이 변경됐으므로 해당 아이디의 todo를 업데이트 해줌
    const response = await axios.put(BASEURI + `/${id}`, payload);
    if (response.status === 200) {
      todo.done = payload.done;
    } else {
      alert('Todo 완료 변경 실패');
    }
  } catch (error) {
    alert('에러 발생 :' + error);
  }
  states.isLoading = false;
};

// provide로 하위 컴포넌트에서 사용 가능하도록 제공해줌
provide(
  'todoList',
  // computed로 감싸주면 반응성과 읽기전용 유지
  computed(() => states.todoList)
);
provide('actions', {
  addTodo,
  deleteTodo,
  toggleDone,
  updateTodo,
  fetchTodoList,
});

fetchTodoList();
</script>
