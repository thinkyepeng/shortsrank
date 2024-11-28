import {
  Tag, AutoComplete, message,
} from 'antd';
import { useEffect, useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { getListAsync } from '@/api/category';

export default function CategoryEditor({ categories, onChange }) {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const request = useRef({ requestId: 0 });
  const inputRef = useRef(null);
  const tagPlusStyle = {
    borderStyle: 'dashed',
  };
  const onDel = (category) => {
    const newData = categories.filter((item) => item.category_id !== category.category_id);
    if (onChange) {
      onChange(newData);
    }
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputConfirm = () => {
    setInputVisible(false);
  };
  const onSelect = (v) => {
    const value = parseInt(v)
    const exist = categories.findIndex(x => x.category_id === value) > -1
    if (!exist) {
      const option = options.find(x => x.value === v)
      const newData = [...categories, {category_id: parseInt(option.value), title: option.label}]
      onChange(newData)
      setInputValue('');
    } else {
      message.warn('repeated action');
      setInputValue('');
    }
  };
  const onSearch = (v) => {
    request.current.requestId += 1;
    const { requestId } = request.current;
    getListAsync({
      page: 1, pageSize: 10, keyword: v, searchType: 'title',
    }).then(({ rows }) => {
      if (request.current.requestId === requestId) {
        setOptions(rows.map((t) => ({ label: t.title, value: String(t.id) })));
      }
    });
  };
  const handleOnChange = (value) => {
    setInputValue(value.trim().toLowerCase());
  };
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  return (
    <div className="flex items-center flex-wrap space-y-1">
      {categories.map(((item) => <Tag key={item.category_id} closable onClose={() => onDel(item)}>{item.title}</Tag>))}
      {inputVisible ? (
        <AutoComplete
          options={options}
          ref={inputRef}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleOnChange}
          onBlur={handleInputConfirm}
          onSelect={onSelect}
          onSearch={onSearch}
        />
      ) : (
        <Tag
          onClick={showInput}
          style={tagPlusStyle}
          className="flex items-center"
        >
          <PlusOutlined />
          {' '}
          New Category
        </Tag>
      )}
    </div>
  );
}
