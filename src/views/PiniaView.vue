<template>
  <div>
    <h5>PINIA</h5>

    <form @submit.prevent="submitForm">
      <input type="text" v-model="title" />
      <input type="text" v-model="content" />
      <button type="submit">submit</button>
    </form>

    <div>{{ noteStore.title }}</div>
    <table border="1" style="margin: 0 auto">
      <thead>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Content</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(note, index) in noteStore.notes" :key="note.id">
          <td>{{ index + 1 }}</td>
          <td>{{ note.title }}</td>
          <td>{{ note.content }}</td>
          <td>
            <button @click="noteStore.removeNote(note.id)">delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useNoteStore } from "@/store/NoteStore";
import { ref } from "vue";

export default {
  name: "PiniaView",
  setup() {
    let noteStore = useNoteStore();

    const title = ref("");
    const content = ref("");

    const submitForm = () => {
      noteStore.addNote(title.value, content.value);
      title.value = "";
      content.value = "";
    };

    const removeNote = (id) => {
      noteStore.removeNote(id);
    };

    return {
      noteStore,
      title,
      content,
      submitForm,
      removeNote,
    };
  },
};
</script>

<style></style>
