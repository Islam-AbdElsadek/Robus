# Scroll Animations Guide

## نظرة عامة
تم إضافة نظام **Scroll Animations** المتقدم للصفحة، حيث تظهر جميع العناصر برسوم متحركة سلسة عند وصول المستخدم إليها أثناء التمرير.

## الميزات الرئيسية

### 1. تأثيرات الحركة المتعددة
- **fade-up**: العنصر يظهر من الأسفل مع تلاشي
- **fade-down**: العنصر يظهر من الأعلى مع تلاشي
- **fade-left**: العنصر يظهر من اليسار مع تلاشي
- **fade-right**: العنصر يظهر من اليمين مع تلاشي
- **scale**: العنصر يظهر مع تكبير تدريجي

### 2. التأثيرات المتسلسلة (Staggered Animation)
- عند وجود عناصر متعددة بجانب بعضها البعض، تظهر بتسلسل زمني
- كل عنصر يظهر بعد الآخر بمدة 150ms
- يخلق تأثير ديناميكي جميل

### 3. الكشف الذكي عند التمرير (Intersection Observer)
- الانيميشن يبدأ فقط عندما يصل العنصر إلى viewport
- يحسّن الأداء بعدم تشغيل جميع الانيميشنز في نفس الوقت
- يوفر تجربة مستخدم سلسة

## الاستخدام

### إضافة انيميشن لعنصر واحد

```html
<!-- fade-up animation (default) -->
<div data-scroll-animate="fade-up">محتوى</div>

<!-- fade-right animation -->
<div data-scroll-animate="fade-right">محتوى</div>

<!-- scale animation -->
<div data-scroll-animate="scale">محتوى</div>
```

### إضافة انيميشن لمجموعة عناصر (مع التسلسل)

```html
<div data-scroll-animate-group>
    <button data-scroll-animate="fade-up">زر 1</button>
    <button data-scroll-animate="fade-up">زر 2</button>
    <button data-scroll-animate="fade-up">زر 3</button>
</div>
```

عند التمرير لهذا القسم:
- الزر الأول يظهر فوراً
- الزر الثاني يظهر بعد 150ms
- الزر الثالث يظهر بعد 300ms

## التنفيذ التقني

### الملفات المعدلة

1. **assets/css/main.css**
   - تم إضافة keyframes جديدة للانيميشنز
   - classes للتحكم في الانيميشن

2. **assets/js/main.js**
   - تم إضافة `initScrollAnimations()` function
   - استخدام Intersection Observer API
   - دعم العناصر الديناميكية

3. **index.html**
   - إضافة `data-scroll-animate` attributes لجميع الأقسام الرئيسية
   - إضافة `data-scroll-animate-group` للعناصر المتجاورة

## الأقسام التي تحتوي على الانيميشن

### ✅ معدلة مسبقاً
- **Courses Section** - جميع buttons و cards
- **Projects Section** - project cards
- **Choose Us Section** - معلومات الأقسام
- **Reviews Section** - section title
- **Questions Section** - section title

### 🔧 يمكن إضافة المزيد من الانيميشنز

لإضافة انيميشن لعنصر جديد:

```html
<!-- أضف هذا الـ attribute -->
<div data-scroll-animate="fade-up">
    محتوى جديد
</div>
```

أو للعناصر المتجاورة:

```html
<div data-scroll-animate-group>
    <div data-scroll-animate="fade-right">عنصر 1</div>
    <div data-scroll-animate="fade-right">عنصر 2</div>
    <div data-scroll-animate="fade-right">عنصر 3</div>
</div>
```

## الخصائص المتقدمة

### تخصيص مدة الانيميشن

في CSS (في `assets/css/main.css`):

```css
.scroll-animate {
    animation-duration: 0.8s; /* يمكن تغييرها */
    animation-timing-function: ease-out; /* يمكن تغييره */
}
```

### تخصيص التأخير بين العناصر

في JavaScript (في `assets/js/main.js`):

```javascript
const staggerDelay = indexInParent * 0.15; // غيّر 0.15 إلى قيمة أخرى
```

## الأداء

- ✅ **محسّن**: استخدام Intersection Observer بدلاً من scroll events
- ✅ **خفيف الوزن**: CSS animations فقط (بدون JavaScript runtime)
- ✅ **سلس**: 60 FPS على معظم الأجهزة
- ✅ **متوافق**: يعمل على جميع المتصفحات الحديثة

## دعم اللغات

النظام يدعم:
- ✅ اللغة العربية (RTL)
- ✅ اللغة الإنجليزية (LTR)
- ✅ جميع اللغات الأخرى

## استكشاف الأخطاء

### الانيميشن لا تظهر؟

1. تحقق من وجود `data-scroll-animate` attribute
2. افتح Console (F12) وتحقق من عدم وجود أخطاء JavaScript
3. تأكد من تحميل ملفات CSS و JS بشكل صحيح

### الانيميشن تعمل بسرعة كبيرة؟

عدّل `animation-duration` في CSS:

```css
.scroll-animate {
    animation-duration: 1.2s; /* زيادة المدة */
}
```

## الدعم والتطوير

للإضافة على النظام:
- يمكن إضافة انيميشنز جديدة في CSS
- يمكن تخصيص التأخيرات الزمنية
- يمكن إضافة triggers جديدة (mouse hover, click, etc.)

---

**تاريخ الإضافة**: 23 أبريل 2026
**الإصدار**: 1.0
