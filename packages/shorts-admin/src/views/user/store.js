import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getListAsync } from '@/api/user';
import dayjs from 'dayjs';
import { defaultColumns } from './config';

export const getList = createAsyncThunk('user/list', getListAsync);

const pageSlice = createSlice({
  name: 'user',
  initialState: {
    keyword: '',
    pending: false, // 正在加载列表数据
    // 弹窗状态
    visible: false,
    modalData: {},
    adding: false,
    // 列表状态
    list: [],
    page: 1,
    pageSize: 10,
    total: 0, // 总条数
    totalPage: 0,
    // searcch
    searchTypes: [
      {
        label: '用户名',
        value: 'username',
      },
      {
        label: '邮箱',
        value: 'email',
      },
      {
        label: '手机号',
        value: 'phone',
      },
      {
        label: '昵称',
        value: 'title',
      },
      {
        label: 'UserId',
        value: 'id',
      },
    ],
    searchType: 'username',
    filters: [
      {
        label: '会员',
        name: 'isPro',
        value: '',
        options: [
          {
            label: '会员',
            value: 1,
          },
          {
            label: '非会员',
            value: 0,
          },
        ],
      },
      {
        label: '角色',
        name: 'role',
        value: '',
        options: [
          {
            label: '普通用户',
            value: 'user',
          },
          {
            label: '管理员',
            value: 'admin',
          },
        ],
      },
    ],
    sorts: [
      {
        label: 'Created',
        name: 'created',
        value: '',
        options: [
          {
            label: 'Desc',
            value: 'desc',
          },
          {
            label: 'Asc',
            value: 'asc',
          },
        ],
      },
      {
        label: '更新时间',
        name: 'updated',
        value: '',
        options: [
          {
            label: 'Desc',
            value: 'desc',
          },
          {
            label: 'Asc',
            value: 'asc',
          },
        ],
      },
    ],
    columns: defaultColumns,
    // 刷新数据
    refreshCount: 0,
  },
  reducers: {
    updateByKey: (state, action) => {
      const [key, value] = action.payload;
      state[key] = value;
    },
    updateModal: (state, action) => {
      const [key, value] = action.payload;
      state.modalData[key] = value;
    },
    increase: (state, action) => {
      const key = action.payload;
      state[key] += 1;
    },
    resetSearch: (state) => {
      state.searchType = 'username';
      state.keyword = '';
      state.filters = state.filters.map((t) => ({ ...t, value: '' }));
      state.sorts = state.sorts.map((t) => ({ ...t, value: '' }));
    },
    updateFilters: (state, action) => {
      const [index, value] = action.payload;
      state.filters[index].value = value;
    },
    updateSorts: (state, action) => {
      const [index, value] = action.payload;
      state.sorts = state.sorts.map((t) => ({ ...t, value: '' }));
      state.sorts[index].value = value;
    },
    resetColumns: (state) => {
      state.columns = defaultColumns;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getList.fulfilled, (state, action) => {
        const {
          rows, total, pageSize,
        } = action.payload;
        state.list = rows.map((t) => ({
          ...t,
          created: dayjs(t.created).format('YYYY-MM-DD HH:mm:ss'),
          updated: dayjs(t.updated).format('YYYY-MM-DD HH:mm:ss'),
          proExpireAt: t.proExpireAt ? dayjs(t.proExpireAt).format('YYYY-MM-DD HH:mm:ss') : '',
        }));
        state.total = total;
        state.totalPage = Math.ceil(total / pageSize);
        state.pending = false;
      })
      .addCase(getList.pending, (state) => {
        state.pending = true;
      })
      .addCase(getList.rejected, (state) => {
        state.pending = false;
      });
  },
});

export const {
  updateByKey, updateModal, increase,
  resetSearch, updateFilters, updateSorts,
  resetColumns,
} = pageSlice.actions;

export default pageSlice;
