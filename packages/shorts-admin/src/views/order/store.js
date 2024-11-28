import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { getListAsync } from '@/api/order';
import { defaultColumns, defaultSearchType } from './config';

export const getList = createAsyncThunk('order/list', getListAsync);

const pageSlice = createSlice({
  name: 'order',
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
    // search
    searchTypes: [
      {
        label: 'Order Number',
        value: 'out_trade_number',
      },
      {
        label: 'Username',
        value: 'username',
      },
      {
        label: 'UserId',
        value: 'id',
      },
    ],
    searchType: defaultSearchType,
    filters: [
      {
        label: 'Date',
        name: 'date',
        value: '',
        options: [
          {
            label: 'Today',
            value: 'today',
          },
          {
            label: 'Yesterday',
            value: 'yesterday',
          },
        ],
      },
      {
        label: 'Status',
        name: 'isPay',
        value: '',
        options: [
          {
            label: 'Paid',
            value: 1,
          },
          {
            label: 'Not paid',
            value: 0,
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
      state.searchType = defaultSearchType;
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
          rows, total, pageSize, users,
        } = action.payload;
        const userMap = users.reduce((calc, t) => {
          calc[t.id] = t;
          return calc;
        }, {});
        state.list = rows.map((t) => ({
          ...t,
          created: dayjs(t.created).format('YYYY-MM-DD HH:mm:ss'),
          user: t.user_id ? {
            ...userMap[t.user_id],
            created: dayjs(userMap[t.user_id].created).format('YYYY-MM-DD HH:mm:ss'),
          } : {},
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
