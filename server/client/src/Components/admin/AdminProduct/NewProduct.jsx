import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Alert
} from 'antd';
import { useParams } from "react-router-dom";

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 8,
    },
  },
};
const NewProduct = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formProperties, setFormProperties] = useState([]);
  const { nameCategory } = useParams();

  const props = {
    name: 'images',
    action: `${process.env.REACT_APP_API_URL}/uploads`,
    headers: {
      authorization: 'authorization-text',
    },
    accept: '.jpg, .jpeg, .png',
    multiple: true,
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('Chỉ cho phép tải lên tệp JPG hoặc PNG!');
      }
      return isJpgOrPng;
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        const uploadedFilePaths = info.fileList
          .filter((file) => file.status === 'done')
          .map((file) => file.response.imageUrls);
        const allImageUrls = [].concat(...uploadedFilePaths);
        console.log('')
        form.setFieldsValue({ thumnails: allImageUrls });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  useEffect(() => {
    if (categories) {
      const category = categories.find((cat) => cat.name === nameCategory);
      if (category) {
        const categoryId = category._id;
        fetchBrandsByCategory(categoryId);
      }
    }
  }, [categories, nameCategory]);


  const fetchBrandsByCategory = async (categoryId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/brand/getBrand/${categoryId}`);
      setBrands(response.data.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách thương hiệu theo danh mục:', error);
    }
  };

  const handlePropertyChange = (propertyKey, value) => {
    setFormProperties({
      ...formProperties,
      [propertyKey]: value,
    });
  };
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`)
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);


  const renderAttributes = () => {
    if (selectedCategory === 'Điện thoại') {
      return (
        <>
          <Form.Item
            label="Màn hình"
            name="manHinh"
            rules={[
              { required: true, message: 'Vui lòng điền Màn hình' },
            ]}
          >
            <Input onChange={(e) => handlePropertyChange('Màn hình', e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Hệ điều hành"
            name="heDieuHanh"
            rules={[
              { required: true, message: 'Vui lòng điền Hệ điều hành' },

            ]}
          >
            <Input onChange={(e) => handlePropertyChange('Hệ điều hành', e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Camera sau"
            name="cameraSau"
            rules={[
              { required: true, message: 'Vui lòng điền Camera sau' },
            ]}
          >
            <Input onChange={(e) => handlePropertyChange('Camera sau', e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Camera trước"
            name="cameraTruoc"
            rules={[
              { required: true, message: 'Vui lòng điền Camera trước' },

            ]}
          >
            <Input onChange={(e) => handlePropertyChange('Camera trước', e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Chip"
            name="chip"
            rules={[
              { required: true, message: 'Vui lòng điền Chip' },

            ]}
          >
            <Input onChange={(e) => handlePropertyChange('Chip', e.target.value)} />
          </Form.Item>

          <Form.Item
            label="RAM"
            name="ram"
            rules={[
              { required: true, message: 'Vui lòng điền RAM' },

            ]}
          >
            <Input onChange={(e) => handlePropertyChange('RAM', e.target.value)} />
          </Form.Item>

          <Form.Item
            label="SIM"
            name="sim"
            rules={[
              { required: true, message: 'Vui lòng điền SIM' },

            ]}
          >
            <Input onChange={(e) => handlePropertyChange('SIM', e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Pin, Sạc"
            name="pinSac"
            rules={[
              { required: true, message: 'Vui lòng điền Pin, Sạc' },
            ]}
          >
            <Input onChange={(e) => handlePropertyChange('Pin, Sạc', e.target.value)} />
          </Form.Item>
        </>
      );
    } else if (selectedCategory === 'Ốp lưng') {
      return (
        <>
          <Form.Item
            label="Loại ốp lưng"
            name="caseType"
            rules={[
              { required: true, message: 'Vui lòng điền loại ốp lưng' },
            ]}
          >
            <Input onChange={(e) => handlePropertyChange('Loại ốp lưng', e.target.value)} />
          </Form.Item>
        </>
      );
    } else if (selectedCategory === 'Cáp sạc') {
      return (
        <>
          <Form.Item
            label="Loại cáp" name="loaiCap" rules={[{ required: true, message: 'Vui lòng điền loại cáp' },]}>
            <Input onChange={(e) => handlePropertyChange('Loại cáp', e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Chiều dài" name="chieuDai" rules={[{ required: true, message: 'Vui lòng điền chiều dài' },]}>
            <Input onChange={(e) => handlePropertyChange('Chiều dài', e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Công suất sạc" name="congSuatSac" rules={[{ required: true, message: 'Vui lòng điền công suất sạc' },]}>
            <Input onChange={(e) => handlePropertyChange('Công suất sạc', e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Tính năng" name="tinhNang" rules={[{ required: true, message: 'Vui lòng điền tính năng' },]}>
            <Input onChange={(e) => handlePropertyChange('Tính năng', e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Chất liệu" name="chatLieu" rules={[{ required: true, message: 'Vui lòng điền chất liệu' },]}>
            <Input onChange={(e) => handlePropertyChange('Chất liệu', e.target.value)} />
          </Form.Item>
        </>
      );
    } else if (selectedCategory === 'Pin dự phòng') {
      return (
        <>
          <Form.Item
            label="Kích thước" name="kichThuoc" rules={[{ required: true, message: 'Vui lòng điền kích thước' },]}>
            <Input onChange={(e) => handlePropertyChange('Kích thước', e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Trọng lượng" name="trongLuong" rules={[{ required: true, message: 'Vui lòng điền trọng lượng' },]}>
            <Input onChange={(e) => handlePropertyChange('Trọng lượng', e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Dòng điện vào" name="inputE" rules={[{ required: true, message: 'Vui lòng điền dòng điện vào' },]}>
            <Input onChange={(e) => handlePropertyChange('Dòng điện vào', e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Công suất đầu ra" name="congSuatOut" rules={[{ required: true, message: 'Vui lòng điền công suất đầu ra' },]}>
            <Input onChange={(e) => handlePropertyChange('Công suất đầu ra', e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Cổng sạc vào" name="congVao" rules={[{ required: true, message: 'Vui lòng điền cổng sạc vào' },]}>
            <Input onChange={(e) => handlePropertyChange('Cổng sạc vào', e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Cổng sạc ra" name="congRa" rules={[{ required: true, message: 'Vui lòng điền cổng sạc ra' },]}>
            <Input onChange={(e) => handlePropertyChange('Cổng sạc ra', e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Công suất" name="congSuat" rules={[{ required: true, message: 'Vui lòng điền công suất' },]}>
            <Input onChange={(e) => handlePropertyChange('Công suất', e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Dung lượng" name="dungLuong" rules={[{ required: true, message: 'Vui lòng điền dung lượng' },]}>
            <Input onChange={(e) => handlePropertyChange('Dung lượng', e.target.value)} />
          </Form.Item>
        </>
      );
    } else if (selectedCategory === 'Tai nghe') {
      return (
        <>
          <Form.Item
            label="Pin" name="pin" rules={[{ required: true, message: 'Vui lòng điền pin' },]}>
            <Input onChange={(e) => handlePropertyChange('Pin', e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Micro" name="micro" rules={[{ required: true, message: 'Vui lòng điền micro' },]}>
            <Input onChange={(e) => handlePropertyChange('Micro', e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Tương thích" name="tuongThich" rules={[{ required: true, message: 'Vui lòng điền phương thức tương thích' },]}>
            <Input onChange={(e) => handlePropertyChange('Tương thích', e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Phạm vi kết nối" name="connectRange" rules={[{ required: true, message: 'Vui lòng điền phạm vi kết nối' },]}>
            <Input onChange={(e) => handlePropertyChange('Phạm vi kết nối', e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Cổng sạc" name="congSac" rules={[{ required: true, message: 'Vui lòng điền cổng sạc' },]}>
            <Input onChange={(e) => handlePropertyChange('Cổng sạc', e.target.value)} />
          </Form.Item>
        </>
      );
    }else {
      return null;
    }
  };
  const handleCategoryChange = async (value) => {
    setSelectedCategory(value);

    try {
      const category = categories.find((cat) => cat.name === value);
      if (category) {
        const categoryId = category._id;
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/brand/getBrand/${categoryId}`);
        setBrands(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching brands for the selected category:', error);
    }
  };

  const onFinish = async (values) => {

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/product/addProduct`, {
        ...values, properties: formProperties
      }
      );
      message.success('Thêm sản phẩm thành công')
      form.resetFields();
      setSelectedCategory(null);
    } catch (error) {
      message.error('Hãy thêm biến thể cho danh mục vừa thêm')
    }
  };
  return (
    <Form
      {...formItemLayout}
      form={form}
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Alert
        message="Lưu ý: Sau khi thêm sản phẩm phải thêm ít nhất 1 biến thể của sản phẩm thì mới có thể tiếp tục thêm sản phẩm"
        type="warning"
        showIcon
        style={{ marginBottom: '16px', background: '#FFFF99' }}
      />
      <Form.Item
        name="name"
        label="Tên sản phẩm"
        rules={[
          {
            required: true,
            message: 'Điền tên của sản phẩm',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="warrantyPeriod"
        label="Bảo hành/tháng"
        rules={[
          {
            required: true,
            message: 'Vui lòng điền thời gian bảo hành',
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        name="categoryName"
        label="Danh mục"
        rules={[
          {
            required: true,
            message: 'Chọn danh mục',
          },
        ]}
      >
        <Select placeholder="Chọn danh mục" onChange={handleCategoryChange}>
          {categories.map((category) => (
            <Option key={category.id} value={category.name}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="brandName"
        label="Thương hiệu"
        rules={[
          {
            required: true,
            message: 'Chọn thương hiệu',
          },
        ]}
      >
        <Select placeholder="Chọn thương hiệu">
          {brands.map((brand) => (
            <Option key={brand.id} value={brand.name}>
              {brand.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="releaseTime"
        label="Ngày ra mắt"
        rules={[
          {
            required: true,
            message: 'Chọn ngày ra mắt',
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Alert
        message="Lưu ý: Sản phẩm có phụ kiện đi kèm thì điền vào"
        type="info"
        showIcon
        style={{ marginBottom: '16px' }}
      />
      <Form.Item
        name="include"
        label="Sản phẩm gồm"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="thumnails"
        label="Hình ảnh"
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn ảnh',
          },
        ]}
      >
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Ảnh</Button>
        </Upload>
      </Form.Item>
      <Form.Item
        name="desc"
        label="Mô tả"
        rules={[
          {
            required: true,
            message: 'Vui lòng điền mô tả bảo hành',
          },
        ]}
      >
        <ReactQuill
          theme="snow"
          placeholder="Nhập mô tả ở đây..."
        />
      </Form.Item>
      {renderAttributes()}
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Thêm
        </Button>
      </Form.Item>
    </Form>
  );
};
export default NewProduct;