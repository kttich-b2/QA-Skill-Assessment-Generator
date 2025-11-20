
import { Theme } from './types';

export const THEMES: Theme[] = [
  // หมวดที่ 1: แก่นของการประกันคุณภาพและกลยุทธ์
  {
    id: "risk-based",
    category: "Core QA Fundamentals & Strategy",
    title: "การตัดสินใจบนพื้นฐานของความเสี่ยง (Risk-Based Decision Making)",
    why: "ฝึกให้ทีมมองเห็นว่าไม่ใช่ทุกบั๊กมีความสำคัญเท่ากัน และเรียนรู้ที่จะจัดลำดับความสำคัญตามผลกระทบต่อธุรกิจและผู้ใช้งาน",
    example: "เหลือเวลา 2 ชั่วโมงก่อนจะปล่อย Hotfix แก้บั๊ก Critical ที่กระทบลูกค้า 5% แต่ทีม QA เพิ่งเจอบั๊กใหม่ระดับ Medium ที่ทำให้ UI แสดงผลเพี้ยนใน Browser รุ่นเก่าที่ User base เรามีอยู่ 10% แต่ไม่กระทบฟังก์ชันหลัก คุณจะตัดสินใจอย่างไร? จะยอมปล่อย Hotfix ไปก่อนแล้วค่อยแก้บั๊ก UI ทีหลัง หรือจะขอเลื่อน Hotfix เพื่อแก้ทั้งสองอย่าง? อธิบายเหตุผลและวิธีสื่อสารความเสี่ยงนี้ให้ Product Manager เข้าใจ"
  },
  {
    id: "regression-strategy",
    category: "Core QA Fundamentals & Strategy",
    title: "กลยุทธ์การทำ Regression Testing ที่มีประสิทธิภาพ (Effective Regression Strategy)",
    why: "การทำ Full Regression ทุกครั้งนั้นเสียเวลาและไม่จำเป็นเสมอไป ทีมต้องเรียนรู้ที่จะเลือกทดสอบเฉพาะส่วนที่จำเป็นและมีความเสี่ยงสูง",
    example: "แอปพลิเคชัน Mobile Banking ของเรากำลังจะปล่อยเวอร์ชันใหม่ในอีก 48 ชั่วโมงข้างหน้า ซึ่งมีการเปลี่ยนแปลงสำคัญ 2 อย่าง: 1) อัปเกรด Security Library ที่กระทบ Flow การโอนเงินทั้งหมด และ 2) ปรับดีไซน์หน้า Dashboard เล็กน้อย ทีม Automated Regression Suite ที่รันบน CI/CD ครอบคลุมเฉพาะ Happy Path ของการโอนเงินและใช้เวลา 6 ชั่วโมงจึงจะเสร็จสมบูรณ์ แต่ทีมเพิ่งพบว่า Test Environment มีความล่าช้า (latency) สูงกว่าปกติ 50% ทำให้คาดว่าเทสต์จะรันเสร็จใน 9 ชั่วโมง นอกจากนี้ ทีม Manual QA มี resource จำกัดแค่ 1 คน เนื่องจากอีกคนลาป่วย ในฐานะ QA Lead คุณจะวางแผนการทำ Regression Testing ในสถานการณ์ที่กดดันนี้อย่างไร? โปรดระบุว่าจะเลือกทดสอบอะไร, ใช้วิธีใด (Automated/Manual/Exploratory), จัดลำดับความสำคัญอย่างไร, และจะสื่อสารความเสี่ยงที่เหลืออยู่ (Residual Risk) ให้กับ Stakeholders อย่างไรบ้าง?"
  },
  {
    id: "exploratory-testing",
    category: "Core QA Fundamentals & Strategy",
    title: "การทดสอบเชิงสำรวจ (Exploratory Testing)",
    why: "ฝึกฝนทักษะการ 'คิดนอกกรอบ' การหาบั๊กที่ซับซ้อนซึ่ง Test Case ทั่วไปอาจมองข้ามไป",
    example: "นี่คือฟีเจอร์ใหม่เกี่ยวกับการอัปโหลดและจัดการไฟล์ ลองใช้เวลา 30 นาทีทำ Exploratory Testing โดยสมมติตัวเองเป็น User 3 ประเภท: 1) User ทั่วไป 2) Power User ที่พยายามทำอะไรแผลงๆ 3) Hacker ที่พยายามจะเจาะระบบ หลังจาก 30 นาที ให้สรุปสิ่งที่ค้นพบ, บั๊กที่เจอ, และข้อเสนอแนะเพิ่มเติมเกี่ยวกับ UX/UI"
  },
  {
    id: "test-design",
    category: "Core QA Fundamentals & Strategy",
    title: "การออกแบบ Test Case และการจัดการ Test Data (Test Design & Data Management)",
    why: "หัวใจของการทดสอบที่มีคุณภาพคือ Test Case ที่ครอบคลุม และ Test Data ที่สมจริง",
    example: "เรากำลังจะสร้างฟีเจอร์โปรโมชัน 'ซื้อครบ 1,000 บาท ลด 10% แต่ไม่เกิน 200 บาท สำหรับสมาชิกระดับ Gold เท่านั้น และใช้ได้แค่ครั้งแรก' ช่วยออกแบบ Test Case โดยใช้เทคนิค Boundary Value Analysis และ Equivalence Partitioning มาอย่างน้อย 5 เคส พร้อมระบุ Test Data ที่ต้องใช้ในแต่ละเคส"
  },
  {
    id: "release-criteria",
    category: "Core QA Fundamentals & Strategy",
    title: "เกณฑ์การปล่อยโปรดักต์ (Release Criteria / Go-No-Go Decision)",
    why: "ฝึกให้ QA มีส่วนร่วมในการตัดสินใจครั้งสำคัญว่าจะ 'ปล่อย' หรือ 'ไม่ปล่อย' โปรดักต์ โดยใช้ข้อมูลและหลักการ",
    example: "ถึงวันปล่อยฟีเจอร์ใหญ่ แต่ยังมี Known Bugs ระดับ Medium 3 ตัว และระดับ Low 10 ตัว Automated tests ผ่าน 95% (มี Flaky tests 5%) ในฐานะ QA Lead คุณจะให้ 'Go' หรือ 'No-Go' สำหรับการปล่อยครั้งนี้? คุณต้องใช้ข้อมูลอะไรเพิ่มเติมเพื่อประกอบการตัดสินใจ และจะนำเสนอข้อมูลนี้ใน Go/No-Go meeting อย่างไร?"
  },
  // หมวดที่ 2: ทักษะด้านเทคนิคและระบบอัตโนมัติ
  {
    id: "automation-strategy",
    category: "Technical & Automation Skills",
    title: "กลยุทธ์การทำ Automation ที่เน้นปฏิบัติ (Pragmatic Automation Strategy)",
    why: "Automation ไม่ใช่ยาวิเศษ ทีมต้องเข้าใจว่า 'อะไร' ควรทำ automate, 'เมื่อไหร่' และ 'ทำไม' ภายใต้ข้อจำกัดด้านเวลาและทรัพยากร",
    example: "ทีมมีเวลา 1 sprint (2 สัปดาห์) ในการเพิ่ม Test Automation Coverage ให้กับฟีเจอร์ A ซึ่งมีทั้ง UI, API และ Business Logic ที่ซับซ้อน คุณจะเลือกทำ Automation ที่ Layer ไหน (UI, API, Unit) เป็นหลัก? เพราะอะไร? และจะวัดผลความสำเร็จของงานนี้อย่างไร?"
  },
  {
    id: "debugging",
    category: "Technical & Automation Skills",
    title: "การดีบักและวิเคราะห์ต้นตอของปัญหา (Technical Debugging & Root Cause Analysis)",
    why: "ยกระดับ QA จากแค่ 'ผู้รายงานปัญหา' เป็น 'ผู้ช่วยวิเคราะห์ปัญหา'",
    example: "Automated test ตัวหนึ่งเกิด Flaky (ผ่านบ้างไม่ผ่านบ้าง) เมื่อรันใน CI/CD Pipeline แต่รันบนเครื่อง Local ของคุณผ่านตลอด คุณจะมีขั้นตอนในการ Debug และหา Root Cause ของปัญหานี้อย่างไร? เครื่องมืออะไรบ้างที่คุณจะใช้ (เช่น ดู logs, ตรวจสอบ network traffic, เช็ก database state)?"
  },
  {
    id: "api-testing",
    category: "Technical & Automation Skills",
    title: "การทดสอบ API (API Testing)",
    why: "แอปพลิเคชันส่วนใหญ่ขับเคลื่อนด้วย API การทดสอบที่ระดับนี้เร็วกว่าและเสถียรกว่าการทดสอบผ่าน UI",
    example: "นี่คือ Endpoint ใหม่: `POST /users` พร้อมกับ documentation ช่วยเขียน Test Case สำหรับทดสอบ API นี้ให้ครอบคลุมทั้ง Happy Path (สร้าง User สำเร็จ), Negative Path (เช่น ส่งข้อมูลไม่ครบ, อีเมลซ้ำ) และ Edge Cases (เช่น ส่ง payload ขนาดใหญ่) โดยใช้เครื่องมืออย่าง Postman หรือเขียนเป็น Script ก็ได้"
  },
  {
    id: "cicd",
    category: "Technical & Automation Skills",
    title: "ความเข้าใจใน CI/CD Pipeline (Understanding of CI/CD)",
    why: "QA สมัยใหม่ต้องทำงานอยู่ใน Pipeline เดียวกับ Developer ต้องเข้าใจว่าคุณภาพถูกสร้างและตรวจสอบในขั้นตอนไหนบ้าง",
    example: "ช่วยวาดแผนภาพ CI/CD Pipeline ในอุดมคติของคุณ และระบุว่า Quality Gates (เช่น Unit Tests, Integration Tests, Security Scans, UI Tests) ควรจะอยู่ที่ขั้นตอนไหนของ Pipeline เพราะอะไร?"
  },
  {
    id: "env-management",
    category: "Technical & Automation Skills",
    title: "การจัดการสภาพแวดล้อมการทดสอบ (Test Environment Management)",
    why: "ปัญหาคอขวดที่พบบ่อยคือ Test Environment ไม่พร้อม, ไม่เสถียร, หรือข้อมูลไม่ตรงกับ Production",
    example: "ทีม Developer บอกว่า Test Environment กำลังมีปัญหา ทำให้ข้อมูลไม่ถูกต้องและ Service บางตัวล่ม คุณในฐานะ QA จะทำอย่างไรเพื่อไม่ให้งานของคุณสะดุด? คุณมีแผนสำรองหรือไม่? และจะสื่อสารปัญหานี้กับทีมอย่างไรเพื่อหาทางแก้ไขในระยะยาว?"
  },
  {
    id: "performance-testing",
    category: "Technical & Automation Skills",
    title: "ความรู้พื้นฐานด้าน Performance Testing (Performance Testing Fundamentals)",
    why: "เพื่อให้เข้าใจว่า 'ช้า' หมายความว่าอย่างไรในเชิงเทคนิค และสามารถระบุปัญหาเบื้องต้นได้",
    example: "Product Manager บอกว่า 'รู้สึกว่าหน้า Home โหลดช้าลง' คุณจะเริ่มต้นตรวจสอบปัญหานี้อย่างไร? จะใช้เครื่องมืออะไร (เช่น Chrome DevTools, Lighthouse) เพื่อหาข้อมูลมายืนยันสมมติฐาน และจะรายงานผลการตรวจสอบเบื้องต้นนี้อย่างไรให้ทีมเข้าใจ?"
  },
  {
    id: "security-awareness",
    category: "Technical & Automation Skills",
    title: "ความตระหนักด้านความปลอดภัย (Security Awareness)",
    why: "QA คือด่านแรกที่สามารถเจอปัญหาความปลอดภัยพื้นฐานได้",
    example: "ระหว่างที่ทดสอบฟอร์มลงทะเบียน คุณจะมองหาช่องโหว่ด้านความปลอดภัยพื้นฐานอะไรบ้าง? (เช่น SQL Injection, XSS, การจัดการ Password ที่ไม่ปลอดภัย) ลองยกตัวอย่างวิธีทดสอบมา 2-3 อย่าง"
  },
  // หมวดที่ 3: ความเข้าใจในผลิตภัณฑ์, ธุรกิจ และผู้ใช้งาน
  {
    id: "business-impact",
    category: "Product, Business & User Acumen",
    title: "การเชื่อมโยงบั๊กกับผลกระทบทางธุรกิจ (Connecting Bugs to Business Impact)",
    why: "เปลี่ยนการรายงานบั๊กจาก 'ปุ่มสีเพี้ยน' เป็น 'ปุ่ม CTA สีเพี้ยน อาจทำให้ Conversion Rate ลดลง X%' ซึ่งทำให้ทีมอื่นเห็นความสำคัญ",
    example: "คุณเจอบั๊กที่ทำให้ขั้นตอนการ Checkout มี 1 สเต็ปที่ต้องคลิกเพิ่มโดยไม่จำเป็น คุณจะเขียน Bug Report นี้อย่างไรให้ Product Manager และทีมบริหารเห็นถึง 'Business Impact' ไม่ใช่แค่ 'Functional Bug'?"
  },
  {
    id: "data-driven",
    category: "Product, Business & User Acumen",
    title: "การใช้ข้อมูลในการขับเคลื่อนคุณภาพ (Data-Driven Quality)",
    why: "ใช้ข้อมูลจริง (เช่น Analytics, User feedback, Error logs) มาช่วยในการวางแผนการทดสอบ",
    example: "จาก Dashboard Analytics เราพบว่า User ส่วนใหญ่ใช้แอปของเราบน Chrome (80%), Safari (15%) และ Firefox (5%) และมี User จำนวนมากออกจากหน้าจ่ายเงิน (drop-off) คุณจะใช้ข้อมูลนี้ในการวางแผน Regression Testing และ Exploratory Testing สำหรับ Sprint หน้าอย่างไร?"
  },
  {
    id: "user-empathy",
    category: "Product, Business & User Acumen",
    title: "ความเข้าอกเข้าใจผู้ใช้งาน (User Empathy)",
    why: "QA ที่ดีที่สุดคือผู้ที่ปกป้องประสบการณ์ของผู้ใช้งาน",
    example: "เรากำลังจะเปลี่ยน Flow การสมัครสมาชิกจาก 5 ขั้นตอนเหลือ 2 ขั้นตอน แต่ต้องขอ Permission เข้าถึงข้อมูลส่วนตัวของผู้ใช้เร็วขึ้น ในฐานะตัวแทนของผู้ใช้ คุณมองว่าการเปลี่ยนแปลงนี้มีข้อดี/ข้อเสียอย่างไร? มีความเสี่ยงอะไรที่ทีมอาจมองข้ามไปบ้าง?"
  },
  // หมวดที่ 4: การสื่อสารและการทำงานร่วมกับผู้อื่น
  {
    id: "communication",
    category: "Communication & Collaboration",
    title: "การสื่อสารทางเทคนิคและการโน้มน้าว (Technical Communication & Collaboration)",
    why: "ความสามารถในการอธิบายปัญหาที่ซับซ้อนให้ Developer เข้าใจ และโน้มน้าวให้เห็นความสำคัญของบั๊ก",
    example: "Developer ปิด Ticket ของคุณพร้อมคอมเมนต์ว่า 'Cannot Reproduce' หรือ 'Works as Intended' ทั้งๆ ที่คุณมั่นใจว่าเป็นบั๊ก คุณจะมีขั้นตอนการสื่อสารกลับไปอย่างไร? ต้องเตรียมข้อมูลอะไรบ้าง (เช่น Logs, Screen recording, Environment details) เพื่อให้การพูดคุยครั้งต่อไปมีประสิทธิภาพและนำไปสู่การแก้ไข?"
  },
  {
    id: "feedback",
    category: "Communication & Collaboration",
    title: "การให้และรับฟีดแบค (Giving & Receiving Feedback)",
    why: "การทำงานเป็นทีมต้องมีการให้และรับฟีดแบคอย่างสร้างสรรค์ ทั้งในเรื่อง Bug Report, Code Review ของ Test Automation, หรือกระบวนการทำงาน",
    example: "ให้ QA คนหนึ่งรีวิว Test Automation Code ของอีกคน แล้วให้ฟีดแบคในประเด็นต่างๆ เช่น Code readability, Maintainability, และ Effectiveness โดยเน้นการให้ฟีดแบคที่สร้างสรรค์และนำไปปฏิบัติได้จริง"
  },
  {
    id: "collaboration",
    category: "Communication & Collaboration",
    title: "การทำงานร่วมกับ Product Manager และ Designer (Working with PMs & Designers)",
    why: "QA ต้องทำงาน 'ต้นน้ำ' (Shift-Left) โดยเข้าไปมีส่วนร่วมตั้งแต่ขั้นตอนการออกแบบและวางแผน",
    example: "คุณได้เข้าร่วมประชุม Requirement Grooming สำหรับฟีเจอร์ใหม่ คุณในฐานะ QA จะถามคำถามอะไรบ้างเพื่อให้แนใจว่า Requirement มีความชัดเจน, ทดสอบได้, และครอบคลุมทุกกรณี?"
  }
];
