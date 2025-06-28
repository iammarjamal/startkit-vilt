# مكون Accordion (Shadcn Style)

مكون Accordion مبني بنفس خصائص وواجهة Shadcn UI، مع إمكانية الاستيراد التلقائي في Vue.js.

## الميزات

- ✅ **متوافق مع Shadcn**: نفس الخصائص والواجهة تماماً
- ✅ **الاستيراد التلقائي**: يعمل مع `unplugin-vue-components`
- ✅ **دعم متعدد الأقسام**: يمكن فتح عدة أقسام في نفس الوقت
- ✅ **الرسوم المتحركة**: انتقالات سلسة عند الفتح والإغلاق
- ✅ **إمكانية الوصول**: دعم كامل للوحة المفاتيح والقراءات الشاشة
- ✅ **التحكم الخارجي**: دعم `v-model` للتحكم من الخارج
- ✅ **التصميم المتجاوب**: يعمل على جميع أحجام الشاشات
- ✅ **دعم الترجمة**: ترجمة عربية وإنجليزية مدمجة

## الاستخدام الأساسي

```vue
<template>
    <AppAccordion type="single" collapsible>
        <AppAccordionItem value="item-1">
            <AppAccordionTrigger>عنوان القسم الأول</AppAccordionTrigger>
            <AppAccordionContent>محتوى القسم الأول</AppAccordionContent>
        </AppAccordionItem>
        <AppAccordionItem value="item-2">
            <AppAccordionTrigger>عنوان القسم الثاني</AppAccordionTrigger>
            <AppAccordionContent>محتوى القسم الثاني</AppAccordionContent>
        </AppAccordionItem>
    </AppAccordion>
</template>
```

## الخصائص (Props)

### AppAccordion

| الخاصية        | النوع                    | الافتراضي   | الوصف                               |
| -------------- | ------------------------ | ----------- | ----------------------------------- |
| `type`         | `'single' \| 'multiple'` | `'single'`  | نوع Accordion                       |
| `collapsible`  | Boolean                  | `false`     | السماح بإغلاق جميع الأقسام          |
| `defaultValue` | String \| Array          | `[]`        | القيم الافتراضية المفتوحة           |
| `value`        | String \| Array          | `undefined` | القيم المُتحكم بها (للتحكم الخارجي) |

### AppAccordionItem

| الخاصية    | النوع   | الافتراضي | الوصف                    |
| ---------- | ------- | --------- | ------------------------ |
| `value`    | String  | -         | معرف فريد للعنصر (مطلوب) |
| `disabled` | Boolean | `false`   | تعطيل العنصر             |
| `class`    | String  | `''`      | فئات CSS إضافية          |

### AppAccordionTrigger

| الخاصية    | النوع   | الافتراضي | الوصف           |
| ---------- | ------- | --------- | --------------- |
| `disabled` | Boolean | `false`   | تعطيل الزر      |
| `class`    | String  | `''`      | فئات CSS إضافية |

### AppAccordionContent

| الخاصية | النوع  | الافتراضي | الوصف           |
| ------- | ------ | --------- | --------------- |
| `class` | String | `''`      | فئات CSS إضافية |

## أمثلة الاستخدام

### Accordion مفرد (افتراضي)

```vue
<AppAccordion type="single" collapsible>
  <AppAccordionItem value="item-1">
    <AppAccordionTrigger>ما هو Vue.js؟</AppAccordionTrigger>
    <AppAccordionContent>
      Vue.js هو إطار عمل JavaScript تقدمي لبناء واجهات المستخدم.
    </AppAccordionContent>
  </AppAccordionItem>
  <AppAccordionItem value="item-2">
    <AppAccordionTrigger>ما هي مزايا Vue.js؟</AppAccordionTrigger>
    <AppAccordionContent>
      <ul>
        <li>سهولة التعلم والاستخدام</li>
        <li>أداء عالي</li>
        <li>مرونة في التطوير</li>
      </ul>
    </AppAccordionContent>
  </AppAccordionItem>
</AppAccordion>
```

### Accordion متعدد

```vue
<AppAccordion type="multiple" :default-value="['item-1']">
  <AppAccordionItem value="item-1">
    <AppAccordionTrigger>قسم 1</AppAccordionTrigger>
    <AppAccordionContent>
      هذا القسم مفتوح افتراضياً
    </AppAccordionContent>
  </AppAccordionItem>
  <AppAccordionItem value="item-2">
    <AppAccordionTrigger>قسم 2</AppAccordionTrigger>
    <AppAccordionContent>
      يمكن فتح هذا مع القسم الأول
    </AppAccordionContent>
  </AppAccordionItem>
</AppAccordion>
```

### Accordion مُتحكم به

```vue
<template>
    <div>
        <button @click="value = 'item-1'">فتح القسم الأول</button>
        <button @click="value = 'item-2'">فتح القسم الثاني</button>
        <button @click="value = ''">إغلاق الكل</button>

        <AppAccordion type="single" collapsible v-model:value="value">
            <AppAccordionItem value="item-1">
                <AppAccordionTrigger>قسم 1</AppAccordionTrigger>
                <AppAccordionContent>محتوى القسم الأول</AppAccordionContent>
            </AppAccordionItem>
            <AppAccordionItem value="item-2">
                <AppAccordionTrigger>قسم 2</AppAccordionTrigger>
                <AppAccordionContent>محتوى القسم الثاني</AppAccordionContent>
            </AppAccordionItem>
        </AppAccordion>
    </div>
</template>

<script setup>
const value = ref('item-1');
</script>
```

### Accordion مع عناصر معطلة

```vue
<AppAccordion type="single" collapsible>
  <AppAccordionItem value="item-1">
    <AppAccordionTrigger>قسم عادي</AppAccordionTrigger>
    <AppAccordionContent>محتوى عادي</AppAccordionContent>
  </AppAccordionItem>
  <AppAccordionItem value="item-2" :disabled="true">
    <AppAccordionTrigger>قسم معطل</AppAccordionTrigger>
    <AppAccordionContent>هذا القسم معطل</AppAccordionContent>
  </AppAccordionItem>
</AppAccordion>
```

### Accordion مع أيقونة مخصصة

```vue
<AppAccordion type="single" collapsible>
  <AppAccordionItem value="item-1">
    <AppAccordionTrigger>
      قسم مع أيقونة مخصصة
      <template #icon>
        <Icon icon="mdi:plus" class="size-4" />
      </template>
    </AppAccordionTrigger>
    <AppAccordionContent>
      محتوى القسم
    </AppAccordionContent>
  </AppAccordionItem>
</AppAccordion>
```

## الأحداث (Events)

### AppAccordion

| الحدث          | الوصف                       |
| -------------- | --------------------------- |
| `update:value` | يتم إطلاقه عند تغيير القيمة |

## التخصيص

المكون يستخدم متغيرات CSS المخصصة للتصميم:

```css
:root {
    --border: #e5e7eb;
    --accent: #f3f4f6;
    --accent-foreground: #374151;
    --muted-foreground: #6b7280;
    --ring: #3b82f6;
    --popover: #ffffff;
}
```

## التوافق مع Shadcn

هذا المكون متوافق تماماً مع خصائص Shadcn UI:

- ✅ نفس الخصائص (`type`, `collapsible`, `value`, `defaultValue`)
- ✅ نفس البنية (`AccordionItem`, `AccordionTrigger`, `AccordionContent`)
- ✅ نفس الأحداث (`update:value`)
- ✅ نفس التصميم والأنيميشن
- ✅ نفس إمكانية الوصول

## التوافق

- Vue 3.x
- Vite/Webpack
- unplugin-vue-components
- Tailwind CSS (للتصميم)
- Iconify (للأيقونات)

## التطوير

لإضافة ميزات جديدة أو تعديل السلوك:

1. عدل ملف `Accordion.vue` للخصائص العامة
2. عدل ملف `AccordionItem.vue` لسلوك العناصر الفردية
3. عدل ملف `AccordionTrigger.vue` لسلوك الأزرار
4. عدل ملف `AccordionContent.vue` للرسوم المتحركة
5. أضف الترجمة في ملف `i18n` إذا لزم الأمر
6. اختبر التغييرات في ملف `example.vue`
