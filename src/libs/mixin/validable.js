export const Validable = (superClass) =>
    class extends superClass {
        constructor() {
            super();
            this.item = {};
            this.validables = {
                descripcion: {
                    invalid: false,
                    isInvalid: () => {
                        return false;
                    },
                },

                delegado: {
                    invalid: false,
                    isInvalid: () => {
                        return false;
                    },
                },
            };
            this.item.validables = this.validables;
        }

        isValidItem(objetosValidables, camposPermitidos) {
            let isValid = true;

            objetosValidables.forEach((v) => {
                Object.entries(v.validables).forEach(([field, value]) => {
                    if (!camposPermitidos || camposPermitidos.includes(field)) {
                        v.validables[field].invalid = v.validables[field].isInvalid(v[field]);
                        isValid = isValid && !v.validables[field].invalid;
                    }
                });
            });

            return isValid;
        }

        forceValidity(objetosValidables) {
            let objetos = objetosValidables || this.item.validables;

            objetos.forEach((v) => {
                Object.entries(v.validables).forEach(([field, value]) => {
                    v.validables[field].invalid = false;
                });
            });
        }

        setValue(field, prop) {
            return (e) => this.setAndUpdateValidity(e, field, prop);
        }

        setAndUpdateValidity(e, field, prop) {
            let objeto = prop || this.item;

            objeto[field] = e.currentTarget.value;
            if (e.currentTarget.type == "checkbox") objeto[field] = e.currentTarget.checked;
            if (objeto.validables[field]) {
                objeto.validables[field].invalid = objeto.validables[field].isInvalid(objeto[field]);
            }

            this.requestUpdate();
        }
    };
