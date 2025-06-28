<template>
    <div class="space-y-6 p-6">
        <h1 class="text-2xl font-bold text-[var(--primary)]">مثال على مكون Accordion (Shadcn Style)</h1>

        <!-- Single Accordion -->
        <div class="space-y-4">
            <h2 class="text-lg font-semibold">Accordion مفرد (افتراضي)</h2>
            <AppAccordion type="single" collapsible>
                <AppAccordionItem value="item-1">
                    <AppAccordionTrigger>ما هو Vue.js؟</AppAccordionTrigger>
                    <AppAccordionContent>
                        <p>Vue.js هو إطار عمل JavaScript تقدمي لبناء واجهات المستخدم. يتميز بسهولة الاستخدام والأداء العالي.</p>
                    </AppAccordionContent>
                </AppAccordionItem>
                <AppAccordionItem value="item-2">
                    <AppAccordionTrigger>ما هي مزايا Vue.js؟</AppAccordionTrigger>
                    <AppAccordionContent>
                        <ul class="list-inside list-disc space-y-1">
                            <li>سهولة التعلم والاستخدام</li>
                            <li>أداء عالي</li>
                            <li>مرونة في التطوير</li>
                            <li>دعم جيد للمشاريع الصغيرة والكبيرة</li>
                        </ul>
                    </AppAccordionContent>
                </AppAccordionItem>
                <AppAccordionItem value="item-3">
                    <AppAccordionTrigger>كيفية تثبيت Vue.js؟</AppAccordionTrigger>
                    <AppAccordionContent>
                        <p>يمكنك تثبيت Vue.js باستخدام npm أو yarn:</p>
                        <code class="mt-2 block rounded bg-[var(--muted)] p-2">npm install vue</code>
                    </AppAccordionContent>
                </AppAccordionItem>
            </AppAccordion>
        </div>

        <!-- Multiple Accordion -->
        <div class="space-y-4">
            <h2 class="text-lg font-semibold">Accordion متعدد (multiple)</h2>
            <AppAccordion type="multiple" :default-value="['item-1']">
                <AppAccordionItem value="item-1">
                    <AppAccordionTrigger>قسم 1</AppAccordionTrigger>
                    <AppAccordionContent>
                        <p>هذا القسم مفتوح افتراضياً ويمكن فتح أقسام أخرى معه.</p>
                    </AppAccordionContent>
                </AppAccordionItem>
                <AppAccordionItem value="item-2">
                    <AppAccordionTrigger>قسم 2</AppAccordionTrigger>
                    <AppAccordionContent>
                        <p>يمكن فتح هذا القسم مع القسم الأول في نفس الوقت.</p>
                    </AppAccordionContent>
                </AppAccordionItem>
                <AppAccordionItem value="item-3">
                    <AppAccordionTrigger>قسم 3</AppAccordionTrigger>
                    <AppAccordionContent>
                        <p>جميع الأقسام يمكن فتحها وإغلاقها بشكل مستقل.</p>
                    </AppAccordionContent>
                </AppAccordionItem>
            </AppAccordion>
        </div>

        <!-- Controlled Accordion -->
        <div class="space-y-4">
            <h2 class="text-lg font-semibold">Accordion مُتحكم به</h2>
            <div class="space-y-2">
                <div class="flex gap-2">
                    <button
                        @click="controlledValue = 'item-1'"
                        :class="[
                            'rounded px-3 py-1 text-sm',
                            controlledValue === 'item-1' ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' : 'bg-[var(--muted)]',
                        ]"
                    >
                        فتح القسم الأول
                    </button>
                    <button
                        @click="controlledValue = 'item-2'"
                        :class="[
                            'rounded px-3 py-1 text-sm',
                            controlledValue === 'item-2' ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' : 'bg-[var(--muted)]',
                        ]"
                    >
                        فتح القسم الثاني
                    </button>
                    <button
                        @click="controlledValue = ''"
                        :class="[
                            'rounded px-3 py-1 text-sm',
                            controlledValue === '' ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' : 'bg-[var(--muted)]',
                        ]"
                    >
                        إغلاق الكل
                    </button>
                </div>
                <AppAccordion type="single" collapsible v-model:value="controlledValue">
                    <AppAccordionItem value="item-1">
                        <AppAccordionTrigger>قسم مُتحكم به 1</AppAccordionTrigger>
                        <AppAccordionContent>
                            <p>هذا القسم يتم التحكم به من الخارج.</p>
                        </AppAccordionContent>
                    </AppAccordionItem>
                    <AppAccordionItem value="item-2">
                        <AppAccordionTrigger>قسم مُتحكم به 2</AppAccordionTrigger>
                        <AppAccordionContent>
                            <p>هذا القسم أيضاً يتم التحكم به من الخارج.</p>
                        </AppAccordionContent>
                    </AppAccordionItem>
                </AppAccordion>
            </div>
        </div>

        <!-- Disabled Item -->
        <div class="space-y-4">
            <h2 class="text-lg font-semibold">Accordion مع عنصر معطل</h2>
            <AppAccordion type="single" collapsible>
                <AppAccordionItem value="item-1">
                    <AppAccordionTrigger>قسم عادي</AppAccordionTrigger>
                    <AppAccordionContent>
                        <p>هذا قسم عادي يمكن فتحه وإغلاقه.</p>
                    </AppAccordionContent>
                </AppAccordionItem>
                <AppAccordionItem value="item-2" :disabled="true">
                    <AppAccordionTrigger>قسم معطل</AppAccordionTrigger>
                    <AppAccordionContent>
                        <p>هذا القسم معطل ولا يمكن فتحه.</p>
                    </AppAccordionContent>
                </AppAccordionItem>
                <AppAccordionItem value="item-3">
                    <AppAccordionTrigger>قسم آخر</AppAccordionTrigger>
                    <AppAccordionContent>
                        <p>هذا قسم آخر عادي.</p>
                    </AppAccordionContent>
                </AppAccordionItem>
            </AppAccordion>
        </div>

        <!-- Custom Icon -->
        <div class="space-y-4">
            <h2 class="text-lg font-semibold">Accordion مع أيقونة مخصصة</h2>
            <AppAccordion type="single" collapsible>
                <AppAccordionItem value="item-1">
                    <AppAccordionTrigger>
                        قسم مع أيقونة مخصصة
                        <template #icon>
                            <Icon
                                icon="mdi:plus"
                                class="pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200"
                            />
                        </template>
                    </AppAccordionTrigger>
                    <AppAccordionContent>
                        <p>هذا القسم يستخدم أيقونة مخصصة بدلاً من السهم الافتراضي.</p>
                    </AppAccordionContent>
                </AppAccordionItem>
            </AppAccordion>
        </div>
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';

// State for controlled accordion
const controlledValue = ref('item-1');
</script>
