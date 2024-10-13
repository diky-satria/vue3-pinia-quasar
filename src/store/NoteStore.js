import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useNoteStore = defineStore("note", () => {
  const notes = ref([
    { id: 1, title: "Note 1", content: "Content 1" },
    { id: 2, title: "Note 2", content: "Content 2" },
    { id: 3, title: "Note 3", content: "Content 3" },
  ]);

  const title = computed(() => {
    return notes.value.map((note) => note.title);
  });

  const addNote = (title, content) => {
    notes.value.unshift({ id: notes.value.length + 1, title, content });
  };

  const removeNote = (id) => {
    notes.value = notes.value.filter((note) => note.id !== id);
  };

  return { notes, title, addNote, removeNote };
});
