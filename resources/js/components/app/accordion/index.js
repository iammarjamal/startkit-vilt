import AppAccordion from './Accordion.vue';
import AppAccordionContent from './AccordionContent.vue';
import AppAccordionItem from './AccordionItem.vue';
import AppAccordionTrigger from './AccordionTrigger.vue';

export { AppAccordion, AppAccordionContent, AppAccordionItem, AppAccordionTrigger };

// Auto-import support
export default {
    install(app) {
        app.component('AppAccordion', AppAccordion);
        app.component('AppAccordionItem', AppAccordionItem);
        app.component('AppAccordionTrigger', AppAccordionTrigger);
        app.component('AppAccordionContent', AppAccordionContent);
    },
};
