<template>
  <LayoutDashboard>
    <div class="q-pa-md">
      <q-table
        title="Treats"
        :rows="rows"
        :columns="columns"
        row-key="id"
        :filter="filter"
        :loading="loading"
        @request="onRequest"
        :rows-per-page-options="[5, 10, 20, 50]"
        v-model:pagination="initialPagination"
      >
        <template v-slot:top>
          <q-btn
            color="primary float-right btn-edited-col text-white"
            :disable="loading"
            @click="addModalOpen"
            ><i class="fas fa-plus q-mr-sm"></i>Add</q-btn
          >
          <q-space />
          <q-input
            borderless
            dense
            debounce="300"
            color="primary"
            v-model="filter"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td key="email" :props="props">{{ props.row.email }}</q-td>
            <q-td key="opsi" :props="props">
              <div class="justify-center q-gutter-x-xs">
                <q-btn
                  label="Edit"
                  color="teal"
                  @click="
                    editOpenModalUser(
                      props.row.id,
                      props.row.name,
                      props.row.email
                    )
                  "
                />
                <q-btn
                  label="Delete"
                  color="red"
                  @click="deleteUser(props.row.id)"
                />
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="addModal" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Add</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-gutter-md">
          <q-input
            filled
            v-model="addName"
            label="Name"
            :error="!!addErrors.name"
            :error-message="addErrors.name ? addErrors.name[0] : ''"
          />
          <q-input
            filled
            v-model="addEmail"
            label="Email"
            :error="!!addErrors.email"
            :error-message="addErrors.email ? addErrors.email[0] : ''"
          />
          <q-input
            filled
            type="password"
            v-model="addPassword"
            label="Password"
            :error="!!addErrors.password"
            :error-message="addErrors.password ? addErrors.password[0] : ''"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="addCloseModal" />
          <q-btn flat label="Add" @click="addUser" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="editModal" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Edit</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-gutter-md">
          <q-input
            filled
            v-model="editName"
            label="Name"
            :error="!!editErrors.name"
            :error-message="editErrors.name ? editErrors.name[0] : ''"
          />
          <q-input
            filled
            v-model="editEmail"
            label="Email"
            :error="!!editErrors.email"
            :error-message="editErrors.email ? editErrors.email[0] : ''"
          />
          <q-input
            filled
            type="password"
            v-model="editPassword"
            label="Password"
            :error="!!editErrors.password"
            :error-message="editErrors.password ? editErrors.password[0] : ''"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="editCloseModal" />
          <q-btn flat label="Edit" @click="editUser" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </LayoutDashboard>
</template>

<script>
import { ref, onMounted, reactive } from "vue";
import LayoutDashboard from "@/components/LayoutDashboard.vue";
import axios from "@/interceptors/axios.js";
import Cookies from "js-cookie";
import { useQuasar } from "quasar";

export default {
  name: "UserView",
  components: {
    LayoutDashboard,
  },

  setup() {
    // TABLE STATE
    const columns = [
      {
        name: "name",
        required: true,
        label: "Name",
        align: "left",
        field: (row) => row.name,
        format: (val) => `${val}`,
        // sortable: true,
        class: "text-bold",
      },
      {
        name: "email",
        align: "left",
        label: "Email",
        field: "email",
        // sortable: true,
      },
      {
        name: "opsi",
        align: "right",
        label: "Opsi",
        field: "opsi",
        // sortable: true,
      },
    ];
    const rows = ref([]);

    const loading = ref(false);
    const filter = ref("");
    const rowCount = ref(10);
    const sortByBefore = ref("");

    const initialPagination = ref({
      sortBy: "id",
      descending: false,
      page: 1,
      rowsPerPage: 5,
      rowsNumber: 10,
    });

    // ADD STATE
    const addModal = ref(false);
    const addName = ref("");
    const addEmail = ref("");
    const addPassword = ref("");
    const addErrors = ref([]);

    // STATE
    const editModal = ref(false);
    const editId = ref("");
    const editName = ref("");
    const editEmailOld = ref("");
    const editEmail = ref("");
    const editPassword = ref("");
    const editErrors = ref([]);

    // DELETE STATE
    const confirm = ref(false);

    // NOTIFY STATE
    const q = useQuasar();

    // TABLE FUNCTION
    const ambilUser = async (
      page = 1,
      limit = 5,
      search = "",
      sortBy = "id",
      descending = true
    ) => {
      try {
        let response = await axios.get(
          `/api/v1/user?page=${page}&limit=${limit}&search=${search}&sort_by=${sortBy}&order_by=${descending}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("authToken")}`,
            },
          }
        );

        rows.value = response.data.data.rows;
        initialPagination.value.page = response.data.data.page;
        initialPagination.value.rowsPerPage = response.data.data.limit;
        initialPagination.value.rowsNumber = response.data.data.total_rows;
        initialPagination.value.sortBy = sortBy;
        initialPagination.value.descending = descending;
      } catch (err) {
        console.log(err);
      }
    };

    const onRequest = async (props) => {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;

      // let sortByResult = sortBy;
      // if (sortBy == "opsi") {
      //   sortByResult = "id";
      // }
      // if (!sortByResult) {
      //   sortByResult = sortByBefore.value;
      // }
      // sortByBefore.value = sortByResult;

      // var sortByResult = sortBy ? sortBy : sortByBefore.value;

      // sortByBefore.value = sortBy;

      await ambilUser(page, rowsPerPage, filter.value, sortBy, descending);
    };

    // ADD FUNCTION
    const addModalOpen = () => {
      addModal.value = true;
    };

    const addCloseModal = () => {
      addModal.value = false;
      addName.value = "";
      addEmail.value = "";
      addPassword.value = "";
      addErrors.value = [];
    };

    const addUser = async () => {
      addErrors.value = [];
      try {
        await axios.post(
          `/api/v1/user`,
          {
            name: addName.value,
            email: addEmail.value,
            password: addPassword.value,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("authToken")}`,
            },
          }
        );

        addCloseModal();
        await ambilUser();
        q.notify({
          type: "positive",
          message: "User add successfully",
          position: "bottom",
          timeout: 1500,
        });
      } catch (err) {
        addErrors.value = err.response.data.errors;
      }
    };

    // DELETE FUNCTION
    const deleteUser = async (id) => {
      q.dialog({
        title: "Are you sure ?",
        message: "want to delete this user ?",
        cancel: true,
        persistent: false,
      })
        .onOk(async () => {
          await axios.delete(`/api/v1/user/${id}`, {
            headers: {
              Authorization: `Bearer ${Cookies.get("authToken")}`,
            },
          });
          await ambilUser();
          q.notify({
            type: "positive",
            message: "User deleted successfully",
            position: "bottom",
            timeout: 1500,
          });
        })
        .onCancel(() => {});
    };

    // EDIT FUNCTION
    const editOpenModalUser = (id, name, email) => {
      editModal.value = true;

      editId.value = id;
      editName.value = name;
      editEmailOld.value = email;
      editEmail.value = email;
      editPassword.value = "";
      editErrors.value = [];
    };

    const editCloseModal = () => {
      editModal.value = false;

      editId.value = null;
      editName.value = "";
      editEmailOld.value = "";
      editEmail.value = "";
      editPassword.value = "";
      editErrors.value = [];
    };

    const editUser = async () => {
      editErrors.value = [];
      try {
        await axios.put(
          `/api/v1/user/${editId.value}`,
          {
            name: editName.value,
            email_old: editEmailOld.value,
            email: editEmail.value,
            password: editPassword.value,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("authToken")}`,
            },
          }
        );

        editCloseModal();
        await ambilUser();
        q.notify({
          type: "positive",
          message: "User edit successfully",
          position: "bottom",
          timeout: 1500,
        });
      } catch (err) {
        editErrors.value = err.response.data.errors;
      }
    };

    onMounted(() => {
      ambilUser();
    });

    return {
      columns,
      rows,
      loading,
      filter,
      rowCount,
      ambilUser,
      onRequest,
      initialPagination,
      sortByBefore,
      confirm,
      deleteUser,
      editOpenModalUser,
      addModal,
      addModalOpen,
      addName,
      addEmail,
      addPassword,
      addErrors,
      addUser,
      addCloseModal,
      editModal,
      editName,
      editEmailOld,
      editEmail,
      editPassword,
      editErrors,
      editUser,
      editCloseModal,
    };
  },
};
</script>

<style></style>
