import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import axios from 'axios';

export const useTodoListStore = defineStore('todoList', () => {
  const BASEURI = '/api/todos';
  const state = reactive({ todoList: [] });

  const fetchTodoList = async () => {
    state.isLoading = true;
    try {
      const response = await axios.get(BASEURI);
      if (response.status === 200) {
        state.todoList = response.data;
      } else {
        alert('데이터 조회 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
    state.isLoading = false;
  };

  // todo를 추가하는 메소드,
  const addTodo = async ({ todo, desc }, successCallback) => {
    state.isLoading = true;
    try {
      const payload = { todo, desc };
      const response = await axios.post(BASEURI, payload);
      if (response.status === 201) {
        state.todoList.push({ ...response.data, done: false });
        successCallback();
      } else {
        alert('Todo 추가 실패');
      }
    } catch (error) {
      alert('에러발생: ' + error);
    }
    state.isLoading = false;
  };

  // todo를 수정하는 메소드, 해당 id의 todo를 찾아서 todo, desc, done 값을 업데이트
  const updateTodo = async ({ id, todo, desc, done }, successCallback) => {
    state.isLoading = true;
    try {
      const payload = { id, todo, desc, done };
      const response = await axios.put(BASEURI + `/${id}`, payload);
      if (response.status === 200) {
        let index = state.todoList.findIndex((todo) => todo.id === id);
        state.todoList[index] = payload;
        successCallback();
      } else {
        alert('Todo 변경 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
    state.isLoading = false;
  };

  // todo를 삭제하는 메소드, 해당 id의 todo를 찾아서 삭제
  const deleteTodo = async (id) => {
    state.isLoading = true;
    try {
      const response = await axios.delete(BASEURI + `/${id}`);
      console.log(response.status, response.data);
      if (response.status === 200) {
        let index = state.todoList.findIndex((todo) => todo.id === id);
        state.todoList.splice(index, 1);
      } else {
        alert('Todo 삭제 실패');
      }
    } catch (error) {
      alert('에러 발생 :' + error);
    }
    state.isLoading = false;
  };

  const toggleDone = async (id) => {
    state.isLoading = true;
    try {
      let todo = state.todoList.find((todo) => todo.id === id);
      let payload = { ...todo, done: !todo.done };
      const response = await axios.put(BASEURI + `/${id}`, payload);
      if (response.status === 200) {
        todo.done = payload.done;
      } else {
        alert('Todo 완료 변경 실패');
      }
    } catch (error) {
      alert('에러 발생 :' + error);
    }
    state.isLoading = false;
  };

  const todoList = computed(() => state.todoList);
  const isLoading = computed(() => state.isLoading);
  const doneCount = computed(() => {
    const filtered = state.todoList.filter(
      (todoItem) => todoItem.done === true
    );
    return filtered.length;
  });
  return {
    todoList,
    isLoading,
    doneCount,
    fetchTodoList,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleDone,
  };
});
