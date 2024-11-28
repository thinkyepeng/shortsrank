import { Upload as Upload2, Button, message } from 'antd';
import { useState } from 'react';

export default function Upload({ onSuccess }) {
  const [uploading, setUploading] = useState(false);
  const uploadProps = {
    name: 'file',
    action: '/api/admin/asset/upload',
    showUploadList: false,
    onChange({ file }) {
      if (file.status === 'uploading') {
        setUploading(true);
      } else if (file.status === 'done') {
        if (file.response.code === 0) {
          message.success('success');
          onSuccess(file.response.data.url);
          // dispatch(updateModal(['image', file.response.data.url]));
        } else {
          message.warning(file.response.message || 'failed');
        }
        setUploading(false);
      } else {
        setUploading(false);
        message.warning('failed');
      }
    },
  };
  return (
    <Upload2 {...uploadProps}>
      <Button loading={uploading}>Upload</Button>
    </Upload2>
  );
}
