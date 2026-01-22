# วิธีทดสอบ API ด้วย Postman

## 1. ติดตั้ง Postman
- ดาวน์โหลด Postman จาก https://www.postman.com/downloads/
- ติดตั้งบน Windows/Mac/Linux

## 2. Import Collection
### วิธีที่ 1: Import ไฟล์จากระบบ
1. เปิด Postman
2. คลิก **File** → **Import**
3. เลือก **Upload Files** 
4. เลือกไฟล์ `Software-API.postman_collection.json` ในโฟลเดอร์โปรเจค
5. คลิก **Import**

### วิธีที่ 2: ก็อปปี้ JSON และวางเป็นข้อความ
1. เปิด Postman
2. คลิก **Import** → **Paste Raw Text**
3. ก็อปปี้เนื้อหาไฟล์ `Software-API.postman_collection.json`
4. วาง (Paste) และคลิก **Continue**

## 3. เซตอัป Environment Variables
1. ในหน้า Collections ของ Postman เลือก **Software Request API**
2. คลิขึ้น tab **Variables**
3. ตรวจสอบ `base_url` ว่าตั้งค่าเป็น `http://localhost:8080`
4. ถ้าต่างจากนี้ให้แก้ไขเป็น URL ของ Backend Server

## 4. ทดสอบ API Endpoints

### ขั้นตอนทดสอบ:

#### Step 1: ตรวจสอบว่า Backend ทำงาน
```
คลิก: 1. Get All Requests (Draft)
ผลที่คาดหวัง: ได้รับ HTTP 200 พร้อม JSON array (อาจว่าง)
```

#### Step 2: สร้างคำขอใหม่
```
คลิก: 2. Create New Request
ปุ่ม Send
ผลที่คาดหวัง: HTTP 201 สตาตัส "Draft saved successfully"
```

#### Step 3: ดูคำขอที่สร้าง
```
คลิก: 1. Get All Requests (Draft)
ปุ่ม Send
ผลที่คาดหวัง: เห็น object ใหม่ที่สร้าง (จดจำ id)
```

#### Step 4: ดูคำขอตามรหัส
```
คลิก: 3. Get Request by ID
แก้ URL จาก /1 เป็น /ID_ที่จดจำ
ปุ่ม Send
ผลที่คาดหวัง: HTTP 200 พร้อมข้อมูลรายละเอียด
```

#### Step 5: อัปเดตคำขอ
```
คลิก: 4. Update Request (Draft)
แก้ URL จาก /1 เป็น /ID_ที่จดจำ
ปรับปรุง Body ข้อมูลตามต้องการ
ปุ่ม Send
ผลที่คาดหวัง: HTTP 200 สตาตัส "Draft updated successfully"
```

#### Step 6: ลบคำขอ
```
คลิก: 5. Delete Request
แก้ URL จาก /1 เป็น /ID_ที่จดจำ
ปุ่ม Send
ผลที่คาดหวัง: HTTP 200 สตาตัส "Request deleted successfully"
```

## 5. ตัวอย่างการทดสอบจริง

### Test สร้างข้อมูล:
```
- ใน "2. Create New Request" คลิก Send
- ดูใน Response panel ส่วน Status: 201 Created
- คัดลอก id จาก response (เช่น 1, 2, 3)
```

### Test อัปเดตข้อมูล:
```
- ใน "4. Update Request (Draft)"
- เปลี่ยน URL: /1 → /3 (ตัวอย่าง)
- แก้ Body เปลี่ยนค่า ciName เป็น "New CI Name"
- คลิก Send
- ดู Response: "Draft updated successfully"
```

### Test ลบข้อมูล:
```
- ใน "5. Delete Request"
- เปลี่ยน URL: /1 → /3 (ตัวอย่าง)
- คลิก Send
- ดู Response: "Request deleted successfully"
```

## 6. ป้องกันปัญหาที่พบบ่อย

### ❌ ข้อผิดพลาด: "Connection refused"
- **สาเหตุ**: Backend ไม่ทำงาน
- **วิธีแก้**: 
  - ตรวจสอบว่า Backend API กำลังทำงาน (port 8080)
  - รันคำสั่ง: `go run cmd/main.go` ในโฟลเดอร์ software-api

### ❌ ข้อผิดพลาด: "Invalid JSON"
- **สาเหตุ**: Body ไม่ใช่ JSON ที่ถูกต้อง
- **วิธีแก้**: 
  - ตรวจสอบ Content-Type header เป็น "application/json"
  - ใช้ Postman's format ให้ถูกต้อง

### ❌ ข้อผิดพลาด: HTTP 404 Not Found
- **สาเหตุ**: ID ไม่มีอยู่
- **วิธีแก้**: 
  - ตรวจสอบ ID ถูกต้องหรือไม่
  - ใช้ "Get All Requests" เพื่อดูรายการ ID ที่มี

## 7. Tips ในการใช้ Postman

1. **ใช้ Environment Variables**:
   - เปลี่ยน base_url ไว้ในตัวแปร ไม่ต้องเปลี่ยนในทุกคำขอ

2. **เซฟ Response**:
   - คลิกขวาใน Response → Save as Example

3. **ใช้ Pre-request Script** (สำหรับอัตโนมัติ):
   - ตั้ง timestamp หรือข้อมูลแบบสุ่ม

4. **ดู Request History**:
   - คลิก **History** ด้านซ้าย เพื่อดูคำขอที่ส่งไปแล้ว

## 8. ตัวอย่างคำขออย่างละเอียด

### Request: Create (POST)
```
URL: http://localhost:8080/software-requests
Method: POST
Headers: Content-Type: application/json

Body (JSON):
{
  "ciName": "Payment Gateway",
  "ciVersion": "2.5.1",
  "serviceName": "Payment Service",
  "createdBy": "Admin User"
}
```

### Response ที่คาดหวัง:
```
Status: 201 Created
Body: 
{
  "message": "Draft saved successfully"
}
```

---

**หมายเหตุ**: ทุกครั้งที่แก้ไข collection.json ต้อง re-import ใน Postman เพื่อให้มีผลใช้งาน
