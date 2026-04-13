import { createPinia } from 'pinia';
import { watch } from 'vue';

export default class PiniaConfig {
    private static migrateLegacyState(state: unknown): Record<string, unknown> {
        if (!state || typeof state !== 'object') {
            return {};
        }

        const migratedState = { ...(state as Record<string, unknown>) };
        const domesticAnimalState = migratedState.domesticAnimal;

        if (domesticAnimalState && typeof domesticAnimalState === 'object') {
            const domesticAnimalObject = { ...(domesticAnimalState as Record<string, unknown>) };

            if (
                Array.isArray(domesticAnimalObject.domesticAnimals) &&
                !Array.isArray(domesticAnimalObject.animals)
            ) {
                domesticAnimalObject.animals = domesticAnimalObject.domesticAnimals;
            }

            if (!Array.isArray(domesticAnimalObject.animals)) {
                domesticAnimalObject.animals = [];
            }

            migratedState.domesticAnimal = domesticAnimalObject;
        }

        return migratedState;
    }

    public static init() {
        const pinia = createPinia();
        const savedState = localStorage.getItem('piniaState');

        if (savedState) {
            try {
                const parsedState = JSON.parse(savedState);

                if (parsedState && typeof parsedState === 'object') {
                    pinia.state.value = this.migrateLegacyState(parsedState) as typeof pinia.state.value;
                }
            } catch {
                localStorage.removeItem('piniaState');
            }
        }

        watch(
            pinia.state,
            (state) => {
                localStorage.setItem('piniaState', JSON.stringify(state));
            },
            { deep: true },
        );

        return pinia;
    }
}