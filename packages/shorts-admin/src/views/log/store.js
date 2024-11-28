import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { getListAsync, getVisitorsAsync } from '@/api/log';
import { defaultColumns, defaultSearchType } from './config';

export const getList = createAsyncThunk('log/list', getListAsync);

export const getVisitors = createAsyncThunk('log/visitors', getVisitorsAsync)

const pageSlice = createSlice({
  name: 'log',
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
    visitors: [],
    spin: false, // 正在获取visitors
    // searcch
    searchTypes: [
      {
        label: 'cid',
        value: 'cid',
      },
      {
        label: 'ip',
        value: 'ip',
      },
      {
        label: 'sid',
        value: 'sid',
      },
      {
        label: '用户名',
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
        label: '爬虫',
        name: 'isSpider',
        value: 0,
        options: [
          {
            label: '是爬虫',
            value: 1,
          },
          {
            label: '是用户',
            value: 0,
          },
        ],
      },
      {
        label: '日期',
        name: 'date',
        value: 'today',
        options: [
          {
            label: '今天',
            value: 'today',
          },
          {
            label: '昨天',
            value: 'yesterday',
          },
        ],
      },
      {
        label: '类型',
        name: 't',
        value: 'pageview',
        options: [
          {
            label: 'PV',
            value: 'pageview',
          },
          {
            label: 'Click',
            value: 'click',
          },
        ],
      },
    ],
    sorts: [
      {
        label: '创建时间',
        name: 'created',
        value: '',
        options: [
          {
            label: '倒序',
            value: 'desc',
          },
          {
            label: '顺序',
            value: 'asc',
          },
        ],
      },
      {
        label: '文件大小',
        name: 'size',
        value: '',
        options: [
          {
            label: '倒序',
            value: 'desc',
          },
          {
            label: '顺序',
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
          rows, total, pageSize, users, ipsData,
        } = action.payload;
        const userMap = users.reduce((calc, t) => {
          calc[t.id] = t;
          return calc;
        }, {});
        const getCity = (ipInfo) => {
          if (!ipInfo.region) {
            return '';
          }
          const arr = ipInfo.region.split('|');
          if (arr[3] === '0') {
            return arr[0] || '';
          }
          return arr[3] || '';
        };
        state.list = rows.map((t) => ({
          ...t,
          created: dayjs(t.created).format('YYYY-MM-DD HH:mm:ss'),
          user: t.uid ? userMap[t.uid] : {},
          city: getCity(t.ip && (t.ip in ipsData) ? (ipsData[t.ip] || {}) : {}),
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
      })
      .addCase(getVisitors.fulfilled, (state, action) => {
        state.visitors = action.payload.map(t => ({
          ...t,
          created: dayjs(t.created).format('HH:mm:ss'),
        }))
        state.spin = false
      })
      .addCase(getVisitors.pending, (state) => {
        state.spin = true;
      })
      .addCase(getVisitors.rejected, (state) => {
        state.spin = false;
      });
  },
});

export const {
  updateByKey, updateModal, increase,
  resetSearch, updateFilters, updateSorts,
  resetColumns,
} = pageSlice.actions;

export default pageSlice;
