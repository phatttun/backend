import { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Textbox } from '../../../components/textbox/Textbox';
import type { TextboxProps } from '../../../components/textbox/Textbox';

// Icon components สำหรับใช้ใน stories
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19 19L13.8033 13.8033M13.8033 13.8033C15.1605 12.4461 16 10.5711 16 8.5C16 4.35786 12.6421 1 8.5 1C4.35786 1 1 4.35786 1 8.5C1 12.6421 4.35786 16 8.5 16C10.5711 16 12.4461 15.1605 13.8033 13.8033Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 10C12.2091 10 14 8.20914 14 6C14 3.79086 12.2091 2 10 2C7.79086 2 6 3.79086 6 6C6 8.20914 7.79086 10 10 10Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M16 18C16 15.2386 13.3137 13 10 13C6.68629 13 4 15.2386 4 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1 5L8.913 10.926C9.247 11.177 9.414 11.303 9.599 11.355C9.764 11.401 9.939 11.401 10.104 11.355C10.289 11.303 10.456 11.177 10.79 10.926L18.703 5M3 17H17C18.105 17 19 16.105 19 15V5C19 3.895 18.105 3 17 3H3C1.895 3 1 3.895 1 5V15C1 16.105 1.895 17 3 17Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8C8.89543 8 8 8.89543 8 10C8 11.1046 8.89543 12 10 12Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M1 10C2.73 6.89 6.27 4 10 4C13.73 4 17.27 6.89 19 10C17.27 13.11 13.73 16 10 16C6.27 16 2.73 13.11 1 10Z"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export default {
  title: 'Components/Textbox',
  component: Textbox,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    helperText: {
      control: 'text',
    },
    error: {
      control: 'text',
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
    variant: {
      control: {
        type: 'select',
        options: ['outlined', 'filled', 'underlined'],
      },
    },
    disabled: {
      control: 'boolean',
    },
    readonly: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    multiline: {
      control: 'boolean',
    },
    rows: {
      control: {
        type: 'number',
        min: 1,
        max: 10,
      },
    },
    showCharCount: {
      control: 'boolean',
    },
    maxLength: {
      control: {
        type: 'number',
        min: 1,
        max: 1000,
      },
    },
    loading: {
      control: 'boolean',
    },
    type: {
      control: {
        type: 'select',
        options: ['text', 'password', 'email', 'number', 'tel', 'url'],
      },
    },
  },
} as Meta<typeof Textbox>;

const Template: StoryFn<TextboxProps> = (args: TextboxProps) => <Textbox {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  label: 'ชื่อผู้ใช้',
  placeholder: 'กรอกชื่อผู้ใช้',
};

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  label: 'อีเมล',
  placeholder: 'กรอกอีเมลของคุณ',
  helperText: 'เราจะไม่เปิดเผยอีเมลของคุณกับผู้อื่น',
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'รหัสผ่าน',
  placeholder: 'กรอกรหัสผ่าน',
  error: 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร',
};

export const DifferentSizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
    <Textbox
      label="ขนาดเล็ก"
      placeholder="Small size"
      size="small"
    />
    <Textbox
      label="ขนาดกลาง (ค่าเริ่มต้น)"
      placeholder="Medium size"
      size="medium"
    />
    <Textbox
      label="ขนาดใหญ่"
      placeholder="Large size"
      size="large"
    />
  </div>
);

export const DifferentVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
    <Textbox
      label="Outlined (ค่าเริ่มต้น)"
      placeholder="Outlined variant"
      variant="outlined"
    />
    <Textbox
      label="Filled"
      placeholder="Filled variant"
      variant="filled"
    />
    <Textbox
      label="Underlined"
      placeholder="Underlined variant"
      variant="underlined"
    />
  </div>
);

export const WithIcons = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
    <Textbox
      label="ค้นหา"
      placeholder="ค้นหาผู้ใช้..."
      startIcon={<SearchIcon />}
    />
    <Textbox
      label="อีเมล"
      placeholder="กรอกอีเมล"
      startIcon={<EmailIcon />}
    />
    <Textbox
      label="รหัสผ่าน"
      placeholder="กรอกรหัสผ่าน"
      type="password"
      endIcon={<EyeIcon />}
    />
    <Textbox
      label="ชื่อผู้ใช้"
      placeholder="กรอกชื่อผู้ใช้"
      startIcon={<UserIcon />}
      endIcon={<EyeIcon />}
    />
  </div>
);

export const DisabledState = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
    <Textbox
      label="ช่องปิดใช้งาน"
      placeholder="คุณไม่สามารถกรอกข้อมูลได้"
      disabled
    />
    <Textbox
      label="ช่องอ่านอย่างเดียว"
      placeholder="อ่านได้อย่างเดียว"
      defaultValue="ข้อมูลตัวอย่าง"
      readonly
    />
  </div>
);

export const WithCharacterCount = Template.bind({});
WithCharacterCount.args = {
  label: 'ข้อความ',
  placeholder: 'กรอกข้อความ...',
  showCharCount: true,
  maxLength: 100,
  defaultValue: 'ข้อความตัวอย่าง',
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  label: 'กำลังโหลดข้อมูล',
  placeholder: 'รอสักครู่...',
  loading: true,
};

export const RequiredField = Template.bind({});
RequiredField.args = {
  label: 'อีเมล (จำเป็น)',
  placeholder: 'กรอกอีเมลที่จำเป็น',
  required: true,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  label: 'ช่องแบบเต็มความกว้าง',
  placeholder: 'กรอกข้อมูล...',
  fullWidth: true,
};

export const Multiline = Template.bind({});
Multiline.args = {
  label: 'รายละเอียด',
  placeholder: 'กรอกรายละเอียด...',
  multiline: true,
  rows: 4,
  helperText: 'กรอกรายละเอียดให้ครบถ้วน',
};

export const DifferentTypes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
    <Textbox
      label="อีเมล"
      type="email"
      placeholder="name@example.com"
    />
    <Textbox
      label="รหัสผ่าน"
      type="password"
      placeholder="••••••••"
    />
    <Textbox
      label="เบอร์โทรศัพท์"
      type="tel"
      placeholder="0XX-XXX-XXXX"
    />
    <Textbox
      label="จำนวน"
      type="number"
      placeholder="0"
    />
    <Textbox
      label="URL"
      type="url"
      placeholder="https://example.com"
    />
  </div>
);

// Interactive Example
export const InteractiveExample = () => {
  const [value, setValue] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Textbox
        label="ชื่อผู้ใช้"
        placeholder="กรอกชื่อผู้ใช้"
        value={value}
        onChange={setValue}
        helperText={`กรอกแล้ว ${value.length} ตัวอักษร`}
        startIcon={<UserIcon />}
      />
      
      <Textbox
        label="รหัสผ่าน"
        type={showPassword ? 'text' : 'password'}
        placeholder="กรอกรหัสผ่าน"
        value={password}
        onChange={setPassword}
        endIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#666',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <EyeIcon />
          </button>
        }
        helperText="รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร"
      />
      
      <Textbox
        label="ความคิดเห็น"
        placeholder="แสดงความคิดเห็น..."
        multiline
        rows={3}
        showCharCount
        maxLength={200}
      />
      
      <div style={{ 
        padding: '16px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        fontSize: '14px',
        color: '#666'
      }}>
        <strong>ข้อมูลที่กรอก:</strong>
        <div>ชื่อผู้ใช้: {value || '(ยังไม่ได้กรอก)'}</div>
        <div>รหัสผ่าน: {password ? '••••••••' : '(ยังไม่ได้กรอก)'}</div>
      </div>
    </div>
  );
};

// Form Example
export const FormExample = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    alert('ส่งแบบฟอร์มเรียบร้อยแล้ว!');
  };

  return (
    <div style={{ maxWidth: '500px', padding: '24px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ marginTop: 0, marginBottom: '24px', color: '#333' }}>แบบฟอร์มติดต่อ</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Textbox
          label="ชื่อ-สกุล"
          placeholder="กรอกชื่อและสกุล"
          value={formData.name}
          onChange={handleChange('name')}
          required
          startIcon={<UserIcon />}
        />
        
        <Textbox
          label="อีเมล"
          type="email"
          placeholder="กรอกอีเมล"
          value={formData.email}
          onChange={handleChange('email')}
          required
          startIcon={<EmailIcon />}
          helperText="เราจะส่งการตอบกลับไปยังอีเมลนี้"
        />
        
        <Textbox
          label="เบอร์โทรศัพท์"
          type="tel"
          placeholder="กรอกเบอร์โทรศัพท์"
          value={formData.phone}
          onChange={handleChange('phone')}
          startIcon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 3C2 2.44772 2.44772 2 3 2H5.15287C5.64171 2 6.0589 2.35341 6.13927 2.8356L6.87858 7.27147C6.95075 7.70451 6.73206 8.13397 6.3394 8.3303L4.79126 9.10437C5.69403 11.2592 7.40994 13.1312 9.55471 14.2091L10.3296 12.6612C10.5263 12.2685 10.9565 12.0496 11.3902 12.122L15.8259 12.8612C16.3081 12.9415 16.6615 13.3587 16.6615 13.8475V16C16.6615 16.5523 16.2137 17 15.6615 17H13.5C7.42487 17 2.5 12.0751 2.5 6V3Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          }
        />
        
        <Textbox
          label="ข้อความ"
          placeholder="กรอกข้อความที่ต้องการติดต่อ"
          multiline
          rows={4}
          value={formData.message}
          onChange={handleChange('message')}
          showCharCount
          maxLength={500}
        />
        
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setFormData({ name: '', email: '', phone: '', message: '' })}
            style={{
              padding: '10px 20px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              background: 'white',
              color: '#333',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            ล้างข้อมูล
          </button>
          <button
            onClick={handleSubmit}
            disabled={!formData.name || !formData.email}
            style={{
              padding: '10px 30px',
              border: 'none',
              borderRadius: '6px',
              background: !formData.name || !formData.email ? '#ccc' : '#1976d2',
              color: 'white',
              cursor: !formData.name || !formData.email ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              if (formData.name && formData.email) {
                e.currentTarget.style.backgroundColor = '#1565c0';
              }
            }}
            onMouseLeave={(e) => {
              if (formData.name && formData.email) {
                e.currentTarget.style.backgroundColor = '#1976d2';
              }
            }}
          >
            ส่งข้อมูล
          </button>
        </div>
      </div>
    </div>
  );
};

// Controlled vs Uncontrolled Example
export const ControlledVsUncontrolled = () => {
  const [controlledValue, setControlledValue] = useState('');

  return (
    <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginTop: 0 }}>Controlled Textbox</h3>
        <Textbox
          label="Controlled Input"
          value={controlledValue}
          onChange={setControlledValue}
          placeholder="ลองพิมพ์ดู..."
        />
        <div style={{ marginTop: '8px', color: '#666' }}>
          ค่า: {controlledValue || '(ยังไม่ได้กรอก)'}
        </div>
      </div>

      <div>
        <h3 style={{ marginTop: 0 }}>Uncontrolled Textbox</h3>
        <Textbox
          label="Uncontrolled Input"
          placeholder="ไม่ถูกควบคุม"
          defaultValue="เริ่มต้น"
        />
      </div>
    </div>
  );
};
