import { DialogBuilder } from "./DialogBuilder";
import { Instance } from "../Models/Instance";
import { SelectOption } from "@slack/client";

class OrderDialogBuilder extends DialogBuilder {
    set(instance: Instance, triggerId: string): OrderDialogBuilder {
        this.dialogArguments = {
            trigger_id: triggerId,
            dialog: {
                callback_id: instance.token + '_order',
                elements: [],
                title: 'Pick your food nibba'
            },
        };
        const menu = (instance.restaurant)? instance.restaurant.menu: null;

        if (menu) {
            menu.categories.forEach(category => {
                const options = category.items.map((item) => {
                    const t: SelectOption = {
                        label: `${item.name} | ${item.price} €`,
                        value: item.name
                    }
                    return t;
                })
                this.dialogArguments.dialog.elements.push({
                    name: category.name,
                    label: category.name,
                    type: 'select',
                    options: options
                });
            });
            
        } else {
            this.dialogArguments.dialog.elements.push({
                name: 'uzsakymas',
                label: 'order',
                type: 'text',
            });
        }

        this.dialogArguments.dialog.elements.push({
            name: 'comment',
            label: 'Komentaras',
            type: 'text',
            optional: true
        });

        return this;
    }
}

export { OrderDialogBuilder };